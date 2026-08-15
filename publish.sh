#!/usr/bin/env bash
# portfolio-publish — sync curated vault notes, gate on secrets/PII, build, deploy to GitHub Pages.
# Reads ONLY from the hub vault's Projects/ folder — never the qojix/school vaults.
set -euo pipefail

VAULT="$HOME/vaults/afif/Projects"
REPO="$HOME/dev/portfolio"
CONTENT="$REPO/src/content/projects"
REMOTE="origin"

# PII regexes live outside the repo so the gate never publishes its own patterns.
PII_FILE="${PORTFOLIO_PII_PATTERNS:-$HOME/.config/portfolio/pii-patterns}"

cd "$REPO"

echo "==> Syncing project notes  ($VAULT  ->  src/content/projects)"
mkdir -p "$CONTENT"
rsync -a --delete --exclude '_img' "$VAULT/" "$CONTENT/"
if [ -d "$VAULT/_img" ]; then
  mkdir -p "$REPO/public/projects"
  rsync -a --delete "$VAULT/_img/" "$REPO/public/projects/"
fi

SCAN=("$CONTENT")
[ -d "$REPO/public/projects" ] && SCAN+=("$REPO/public/projects")

echo "==> Security gate 1/2: file types"
# grep -I skips binaries, so a PDF could carry an ID or address straight past the
# text scan. Publishable content is markdown and images only; anything else aborts.
#
# Exception: pre-built static web bundles dropped under a project's own
# "architecture/" dir (e.g. an Understand-Anything graph viewer). These are
# generated build output, not vault content, so the .md/image rule doesn't fit
# them — but they still go through gate 2 below (secret/PII regex scan) like
# everything else. Scoped to */architecture/* so this doesn't loosen the rule
# for anything else under public/projects/.
BAD=$(find "${SCAN[@]}" -type f -not -path '*/architecture/*' \
  ! -iname '*.md' ! -iname '*.png' ! -iname '*.jpg' ! -iname '*.jpeg' \
  ! -iname '*.svg' ! -iname '*.webp' ! -iname '*.gif' ! -iname '.DS_Store' -print
find "${SCAN[@]}" -type f -path '*/architecture/*' \
  ! -iname '*.md' ! -iname '*.png' ! -iname '*.jpg' ! -iname '*.jpeg' \
  ! -iname '*.svg' ! -iname '*.webp' ! -iname '*.gif' ! -iname '.DS_Store' \
  ! -iname '*.js' ! -iname '*.css' ! -iname '*.html' ! -iname '*.json' \
  ! -iname '*.ico' -print)
if [ -n "$BAD" ]; then
  echo "$BAD" >&2
  echo "!!! ABORT: non-publishable file type in content above. Nothing built or pushed." >&2
  echo "    Only .md and images may be published. Remove it from $VAULT and re-run." >&2
  exit 1
fi
echo "    clean"

echo "==> Security gate 2/2: secrets / PII"
if [ ! -r "$PII_FILE" ]; then
  echo "!!! ABORT: PII pattern file not readable: $PII_FILE" >&2
  echo "    The gate fails closed rather than publish unscanned content." >&2
  echo "    Create it (mode 600), one regex per line, '#' for comments." >&2
  exit 1
fi
PII=$(grep -vE '^[[:space:]]*(#|$)' "$PII_FILE" | paste -sd'|' -)
if [ -z "$PII" ]; then
  echo "!!! ABORT: $PII_FILE has no patterns. Failing closed." >&2
  exit 1
fi

# Credential formats actually found in these vaults, plus the usual suspects.
KEYS='sk-[A-Za-z0-9]{20}|sk-ant-|sk-or-v1-|SUPABASE_[A-Z_]*KEY|service_role'
KEYS="$KEYS"'|-----BEGIN [A-Z ]*PRIVATE KEY|xox[baprs]-[A-Za-z0-9-]+'
KEYS="$KEYS"'|AIza[0-9A-Za-z_-]{20}|GOCSPX-[A-Za-z0-9_-]{20}'
KEYS="$KEYS"'|ghp_[A-Za-z0-9]{30}|gho_[A-Za-z0-9]{30}|github_pat_[A-Za-z0-9_]{20}'
KEYS="$KEYS"'|EAA[A-Za-z0-9]{40}|re_[A-Za-z0-9]{20}|AKIA[0-9A-Z]{16}'
KEYS="$KEYS"'|[0-9]{9,10}:AA[A-Za-z0-9_-]{33}'
KEYS="$KEYS"'|postgres(ql)?://[^[:space:]]*:[^[:space:]]*@|mongodb\+srv://[^[:space:]]*:[^[:space:]]*@'
KEYS="$KEYS"'|Singapore [0-9]{6}|#[0-9]{2}-[0-9]{2,3}'

PATTERNS="$PII|$KEYS"

set +e
HITS=$(grep -rEIn "$PATTERNS" "${SCAN[@]}")
rc=$?
set -e
# grep: 0 = match found, 1 = no match, >1 = error. Fail CLOSED on match OR error.
if [ "$rc" -eq 0 ]; then
  echo "$HITS" >&2
  echo "!!! ABORT: possible secret/PII in the content above. Nothing built or pushed." >&2
  echo "    Scrub the offending note in $VAULT and re-run." >&2
  exit 1
elif [ "$rc" -gt 1 ]; then
  echo "!!! ABORT: security scan errored (rc=$rc). Failing closed; nothing built or pushed." >&2
  exit 1
fi
echo "    clean"

echo "==> Building"
npm run build

echo "==> Committing source (main)"
git add -A
if git diff --cached --quiet; then
  echo "    no source changes"
else
  git commit -m "portfolio: update ($(date +%Y-%m-%d))"
fi
git push "$REMOTE" main

echo "==> Deploying built site to gh-pages"
touch dist/.nojekyll
rm -rf dist/.git
git -C dist init -q -b gh-pages
git -C dist add -A
git -C dist -c user.name=Afif -c user.email=afif@qojix.com commit -q -m "deploy $(date +%Y-%m-%dT%H:%M)"
git -C dist push -f "$(git remote get-url "$REMOTE")" gh-pages
rm -rf dist/.git

echo "==> Done. Live at https://r5th.github.io  (Pages rebuild ~1 min)"

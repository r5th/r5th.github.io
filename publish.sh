#!/usr/bin/env bash
# portfolio-publish — sync curated vault notes, gate on secrets/PII, build, deploy to GitHub Pages.
# Reads ONLY from the hub vault's Projects/ folder — never the qojix/school vaults.
set -euo pipefail

VAULT="$HOME/vaults/afif/Projects"
REPO="$HOME/dev/portfolio"
CONTENT="$REPO/src/content/projects"
REMOTE="origin"

cd "$REPO"

echo "==> Syncing project notes  ($VAULT  ->  src/content/projects)"
mkdir -p "$CONTENT"
rsync -a --delete --exclude '_img' "$VAULT/" "$CONTENT/"
if [ -d "$VAULT/_img" ]; then
  mkdir -p "$REPO/public/projects"
  rsync -a --delete "$VAULT/_img/" "$REPO/public/projects/"
fi

echo "==> Security gate: scanning published content for secrets / PII"
PATTERNS='__PII_PATTERN__|sk-[A-Za-z0-9]{20}|SUPABASE_[A-Z_]*KEY|-----BEGIN|xox[baprs]-[A-Za-z0-9-]+|AIza[0-9A-Za-z_-]{20}|ghp_[A-Za-z0-9]{30}'
if grep -rEIn "$PATTERNS" "$CONTENT" "$REPO/public/projects" 2>/dev/null; then
  echo "!!! ABORT: possible secret/PII in the content above. Nothing built or pushed." >&2
  echo "    Scrub the offending note in $VAULT and re-run." >&2
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

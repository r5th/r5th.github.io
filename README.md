# portfolio

Afif's portfolio site. Astro + Tailwind, deployed on Cloudflare Pages.

## How it works
- Project content is authored as curated notes in the **afif Obsidian vault** at
  `~/vaults/afif/Projects/*.md` (the source of truth).
- `src/content/projects/` is a **generated mirror** of those notes — never hand-edit it.
  Edit the vault, then run the publish step.
- Astro reads the mirror via a content collection (`src/content.config.ts`) and builds
  static pages. Only notes with `publish: true` ship.

## Publish
From the vault, run `/portfolio-publish` (added in Phase 2), or manually:

```sh
rsync -a --delete --exclude _img ~/vaults/afif/Projects/ src/content/projects/
# (covers, when present: rsync ~/vaults/afif/Projects/_img/ public/projects/)
git add -A && git commit -m "portfolio: update projects" && git push
```

Cloudflare Pages auto-builds on push (`npm run build` → `dist/`).

## Dev
```sh
npm run dev      # local dev server
npm run build    # static build to dist/
```

## Security
Never copy raw content from the `qojix` or `school` vaults here — they hold secrets/PII.
Only `Projects/` notes and `resume/Career Facts.md` from the hub vault feed this site.

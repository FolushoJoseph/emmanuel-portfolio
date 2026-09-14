# Emmanuel Joseph Portfolio

A static Next.js portfolio hosted on GitHub Pages. No database or admin server is required.

## Develop and build

Use Node.js 22 and run `npm ci`, then `npm run dev`.
Run `npm run lint` and `npm run build` before publishing. The deployable website is generated in `out/`; `next start` does not serve a static export.
For a local Pages-path build in PowerShell: `$env:NEXT_PUBLIC_BASE_PATH='/emmanuel-portfolio'; npm run build`.

## Add a project

1. Copy `content/projects/example.json` to a new JSON file in the same folder.
2. Choose a unique lowercase slug, such as `acme-branding`. Keep it unchanged to preserve shared links.
3. Add images to `public/media/acme-branding/`. Use paths such as `/media/acme-branding/cover.webp` in the JSON (omit the repository prefix).
4. Fill in the title, description, client, role, year, categories and credits.
5. Add gallery sections using the examples below. Use unique section IDs and numeric order values.
6. Set `published` to `true` when ready. Lower project `order` values appear first; ties use descending year, then slug.
7. Commit and push to `main`. GitHub Actions rebuilds and publishes the website.

Allowed categories: Brand, Marketing, Product. The example stays unpublished and does not appear on the website. Drafts in a public repository are still visible in GitHub; media under `public/` is always deployed, so do not store confidential drafts there.

Example sections:

```json
[
  { "id": "identity", "type": "full-image", "assets": ["/media/acme-branding/identity.webp"], "order": 0 },
  { "id": "details", "type": "double-image", "assets": ["/media/acme-branding/detail-1.webp", "/media/acme-branding/detail-2.webp"], "order": 1 },
  { "id": "motion", "type": "video", "assets": ["/media/acme-branding/motion.mp4"], "order": 2 }
]
```

Compress images before committing. Keep videos short and compressed; large video collections are not a good fit for a Git repository.
To hide a project, set `published` to `false` and deploy again. To remove its media from the website, also remove the files from `public/media/`.

## GitHub Pages setup

Repository: https://github.com/FolushoJoseph/emmanuel-portfolio
Expected default URL: https://folushojoseph.github.io/emmanuel-portfolio/
In Settings > Pages, choose GitHub Actions as the build source. The workflow in `.github/workflows/pages.yml` deploys `out/` after pushes to `main` or manual runs. It reads the configured Pages base path, including for a custom domain.

## Contact form

EmailJS remains optional. Copy `.env.local.example` to `.env.local` for development. For deployment, add these repository variables under Settings > Secrets and variables > Actions > Variables:

- NEXT_PUBLIC_EMAILJS_SERVICE_ID
- NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
- NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

These are browser-visible EmailJS identifiers, not private server credentials. Configure the EmailJS template to accept `from_name`, `organization`, `subject`, `message`, and `from_email`, and allow the deployed website origin in EmailJS. Without these variables the form is disabled and visitors are directed to social links. Rebuild after changing variables.

About text and experience live in `app/about/page.tsx`; social links are in `components/Footer.tsx`. Colours and spacing are in `app/globals.css`.

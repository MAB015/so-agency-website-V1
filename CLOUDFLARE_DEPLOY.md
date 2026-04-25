# Deploying to Cloudflare Pages (Static Export)

This project uses Next.js static export (`output: 'export'`), which generates a fully static site in the `out/` folder. **Do not use Wrangler or OpenNext** - just deploy the static files directly.

## Cloudflare Pages Settings

In your Cloudflare Pages project settings:

### Build Configuration
- **Framework preset**: `None` (not Next.js!)
- **Build command**: `pnpm run build`
- **Build output directory**: `out`
- **Root directory**: `/` (or leave empty)

### Environment Variables
- `NODE_VERSION`: `20`

## Important Notes

1. **Do NOT select "Next.js" as the framework** - this triggers Wrangler/OpenNext which is for server-side Next.js apps
2. The `next build` command automatically generates static HTML in the `out/` folder
3. All pages are pre-rendered at build time - no server required

## Manual Deployment

You can also deploy manually:

```bash
# Build the static site
pnpm run build

# The `out/` folder contains the static site
# Upload this folder to Cloudflare Pages via dashboard or Wrangler Pages
npx wrangler pages deploy out --project-name=soagency
```

## Troubleshooting

If you see errors about Wrangler or OpenNext:
1. Go to Cloudflare Pages dashboard
2. Select your project > Settings > Builds & deployments
3. Change Framework preset from "Next.js" to "None"
4. Set Build output directory to `out`
5. Redeploy

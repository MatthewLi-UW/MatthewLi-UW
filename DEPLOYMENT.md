# Hosting and analytics

## Vercel

1. Import `MatthewLi-UW/MatthewLi-UW` from GitHub into Vercel.
2. Use the Vite preset, repository root, `npm run build`, and `dist` output.
3. Enable Web Analytics and Speed Insights in the project's dashboard.
4. Deploy (or redeploy after enabling them), then visit the production URL.
5. View visitor statistics in Analytics and performance metrics in Speed Insights.

Vercel sets `VERCEL=1` during builds. The Vite configuration uses this to serve
assets from `/` and enable the official analytics components. No API keys are
needed in the frontend. The components also cover the plain portfolio view.

Web Analytics includes page views, visitors, referrers, countries, browsers,
and devices. Speed Insights measures real visitor performance. Section clicks
are not custom events; Vercel currently requires Pro or Enterprise for those.

Setup: https://vercel.com/docs/analytics/quickstart
Performance: https://vercel.com/docs/speed-insights/quickstart

## GitHub Pages

`npm run deploy` continues to build with the `/MatthewLi-UW/` asset prefix.
Vercel analytics components are excluded from this build because GitHub Pages
does not serve Vercel's collection endpoints.

## Local validation

```sh
npm run lint
npm run build
VERCEL=1 npm run build
```

The final command validates the Vercel asset paths and analytics integration;
actual data collection requires a Vercel deployment with both features enabled.

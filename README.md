# Senin Kentin Municipality Dashboard

This repository publishes two static Vite dashboard mockups for the Senin Kentin municipality dashboard concept.

## Live pages

- Landing page: https://ikbal-urbanist.github.io/municipal_dashboard/
- Free dashboard: https://ikbal-urbanist.github.io/municipal_dashboard/free/
- Pro mockup: https://ikbal-urbanist.github.io/municipal_dashboard/pro/

## Local development

Run the free dashboard:

```bash
cd mockup-free-dashboard
npm install
npm run dev
```

Run the pro mockup:

```bash
cd mock-up-pro
npm install
npm run dev
```

## Verification

Each app can be checked independently:

```bash
cd mockup-free-dashboard
npm run lint
npm run build

cd ../mock-up-pro
npm run lint
npm run build
```

GitHub Pages deployment is handled by `.github/workflows/deploy-pages.yml`.

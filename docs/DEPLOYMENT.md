# Deployment

## Vercel

Production URL:

```txt
https://memo-test-recharged.vercel.app
```

Configuracion en Vercel:

| Setting | Value |
|---|---|
| Framework Preset | Astro |
| Root Directory | `./` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm ci` |
| Node.js | 22.x |

### Notas Vercel

- El proyecto requiere Node.js `>=22.13.0` (Astro 7).
- No se debe configurar `GITHUB_PAGES=true` en Vercel.
- Salida estatica: Astro genera `dist/` sin adaptador de servidor.

## GitHub Pages

El proyecto esta preparado para publicar `dist` en GitHub Pages mediante GitHub Actions.

Requisito de runtime/build: Node.js `>=22.13.0`.

## Configuracion (GitHub Pages)

`astro.config.mjs` usa variables de entorno para ajustar `base` en GitHub Pages:

```js
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
```

## Pasos (GitHub Pages)

1. Subir el proyecto a GitHub.
2. Ir a `Settings > Pages`.
3. Elegir `GitHub Actions`.
4. Hacer push a `main`.

## Rollback

Vercel permite volver a un deploy anterior desde su dashboard.

GitHub Pages permite redeploy de ejecuciones anteriores desde Actions si una version falla.

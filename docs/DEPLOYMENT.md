# Deployment

## GitHub Pages

El proyecto esta preparado para publicar `dist` en GitHub Pages mediante GitHub Actions.

Requisito de runtime/build: Node.js `>=22.13.0`.

## Configuracion

`astro.config.mjs` usa variables de entorno para ajustar `base` en GitHub Pages:

```js
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
```

## Pasos

1. Subir el proyecto a GitHub.
2. Ir a `Settings > Pages`.
3. Elegir `GitHub Actions`.
4. Hacer push a `main`.

## Rollback

GitHub Pages permite redeploy de ejecuciones anteriores desde Actions si una version falla.

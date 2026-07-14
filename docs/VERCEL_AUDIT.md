# Auditoría de despliegue en Vercel

## Framework

Astro 7 con React 19 como isla interactiva, TypeScript, Tailwind CSS y Motion.

## Versión de Node.js

El proyecto declara Node.js `>=22.13.0` en `package.json`.

## Gestor de paquetes

npm con `package-lock.json` versionado.

## Comando de instalación

```bash
npm ci
```

## Comando de build

```bash
npm run build
```

El script ejecuta `astro check && astro build`.

## Carpeta de salida

```txt
dist
```

## Variables de entorno

| Variable | Requerida | Entorno | Descripción |
|---|---:|---|---|
| `PUBLIC_SITE_URL` | No | Build | URL pública usada por Astro si se quiere fijar `site` explícitamente. |
| `GITHUB_PAGES` | No | CI GitHub Pages | Activa la subruta del repositorio para GitHub Pages. No debe configurarse en Vercel. |
| `GITHUB_REPOSITORY` | No | CI GitHub Pages | Permite derivar el nombre del repositorio para GitHub Pages. |

No se detectaron secretos requeridos.

## Servicios externos

No requiere servicios externos. La aplicación funciona como sitio estático y persiste datos en `localStorage`.

## APIs

No consume APIs externas.

## Base de datos

No utiliza base de datos.

## Adaptadores actuales

No utiliza adaptador de servidor. Astro genera salida estática. La configuración de `base` solo cambia para GitHub Pages cuando `GITHUB_PAGES=true`.

## Riesgos

- El proyecto requiere Node.js `>=22.13.0`; Vercel debe usar una versión compatible.
- Los datos de ranking y estadísticas son locales al navegador.
- No debe configurarse `GITHUB_PAGES=true` en Vercel, porque forzaría una subruta incorrecta.

## Decisión: compatible / compatible con cambios / no compatible

Compatible directamente con Vercel como sitio estático.

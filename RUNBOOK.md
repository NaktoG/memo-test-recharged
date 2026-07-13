# Runbook

Guia operativa minima para mantener Memo Test Recharged en desarrollo y produccion.

## Produccion

- Hosting: GitHub Pages
- Rama de produccion: `main`
- Workflow de deploy: `Deploy GitHub Pages`
- Build command: `npm run build`
- Publish directory: `dist`
- Node: `>=22.13.0`
- URL: `https://naktog.github.io/memo-test-recharged/`

## Desarrollo local

### Levantar la app

```bash
npm install
npm run dev
```

La app queda disponible en `http://localhost:4321`.

### Detener la app

Detener el proceso del servidor de desarrollo con `Ctrl+C`.

### Reiniciar la app

```bash
npm run dev
```

Si hay problemas raros de dependencias o cache local:

```bash
rm -rf node_modules dist .astro
npm install
npm run dev
```

## Deploy

1. Hacer cambios en una rama temporal desde `develop`.
2. Validar localmente con Node 22:

```bash
npx -p node@22.13.0 -c "npm run lint"
npx -p node@22.13.0 -c "npm run test"
npx -p node@22.13.0 -c "npm run build"
```

3. Abrir PR contra `develop`.
4. Mergear a `develop` cuando CI pase.
5. Abrir PR de release de `develop` a `main`.
6. Mergear a `main`.
7. Ejecutar o verificar el workflow `Deploy GitHub Pages`.

## Health checks manuales

- Abrir `/memo-test-recharged/` y verificar que carga la pantalla inicial.
- Confirmar que el favicon sea la carta de memoria oscuro/dorado.
- Cambiar idioma entre Espanol e Ingles.
- Escribir nickname y empezar una partida.
- Seleccionar cartas y verificar que los pares se resuelvan.
- Ganar una partida y confirmar celebracion visual.
- Confirmar que el ranking local agrega la partida ganada.
- Recargar la pagina y verificar que nickname, idioma, sonido y estadisticas persisten.
- Probar en ancho movil y escritorio.

## Logs y diagnostico

### Local

- Errores de build y TypeScript: salida de `npm run build`.
- Errores de lint: salida de `npm run lint`.
- Errores de tests: salida de `npm run test`.
- Errores de runtime: consola del navegador.

### GitHub Pages

- Deploys: GitHub Actions -> `Deploy GitHub Pages`.
- CI: GitHub Actions -> `CI` -> job `Validate`.
- Si falla antes del build con `Service Unavailable`, suele ser un problema temporal de GitHub Actions. Reintentar el workflow.

## Errores comunes

### La pagina no carga estilos o JS en GitHub Pages

Sintoma: HTML carga, pero la app aparece sin estilos o la isla React no arranca.

Acciones:

1. Verificar que `astro.config.mjs` calcule correctamente `base` para GitHub Pages.
2. Confirmar que el deploy se hizo desde `main`.
3. Abrir DevTools y revisar rutas 404 bajo `/memo-test-recharged/`.
4. Reejecutar `Deploy GitHub Pages` si el artifact fue anterior al ultimo merge.

### El favicon no cambia

Los navegadores cachean favicons de forma agresiva.

Acciones:

1. Confirmar en el HTML publicado que `<link rel="icon">` apunta al SVG nuevo.
2. Recargar con cache deshabilitada desde DevTools.
3. Abrir la app en ventana privada.
4. Esperar unos minutos si GitHub Pages aun esta propagando el deploy.

### No aparece el ranking

El ranking local solo registra partidas ganadas.

Acciones:

1. Completar una partida con victoria.
2. Verificar que haya nickname configurado.
3. Revisar `localStorage` del sitio en DevTools.
4. Confirmar que no se hayan limpiado datos del navegador.

### Se perdieron estadisticas

Las estadisticas viven solo en el navegador.

Acciones:

1. Confirmar que se esta usando el mismo navegador/dispositivo.
2. Verificar si se limpiaron datos del sitio.
3. Revisar extensiones o configuraciones que limpien `localStorage`.

No hay recuperacion si `localStorage` fue eliminado.

### Falla el deploy con `Service Unavailable`

Sintoma: GitHub Actions falla en `Set up job` o descargando acciones.

Acciones:

1. Verificar que el error ocurra antes de `npm run build`.
2. Reintentar el workflow `Deploy GitHub Pages`.
3. Revisar el estado de GitHub Actions si se repite.
4. No cambiar codigo si el build local y CI pasan.

## Rollback

### Desde GitHub Actions

1. Ir a `Actions`.
2. Abrir `Deploy GitHub Pages`.
3. Seleccionar una ejecucion estable anterior si GitHub permite redeploy.

### Desde Git

```bash
git revert <commit>
git push origin main
```

Despues del revert, ejecutar `Deploy GitHub Pages` nuevamente.

## Datos y privacidad

- No hay backend.
- No hay cuentas reales.
- No hay base de datos remota.
- Nickname, preferencias, estadisticas y ranking se guardan en `localStorage`.
- El usuario puede borrar estos datos limpiando los datos del sitio en el navegador.

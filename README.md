# Memo Test Recharged

Juego de memoria moderno construido con **Astro**, **React**, **TypeScript**, **Tailwind CSS** y **Motion**. La aplicacion conserva la idea original del proyecto: seleccionar categoria y dificultad, encontrar pares antes de que termine el tiempo y registrar estadisticas locales.

Incluye entrada con nickname local, interfaz bilingue Espanol/Ingles, sonidos opcionales y celebracion visual al ganar.

## Stack

- Astro para shell, build estatico y GitHub Pages.
- React para la isla interactiva del juego.
- TypeScript strict para dominio y UI.
- Tailwind CSS con tokens CSS para responsive design.
- Motion para animaciones de cartas, pantallas y microinteracciones.
- Vitest para tests unitarios de dominio.
- ESLint y Prettier para calidad automatizada.

## Comandos

Requisito: Node.js `>=22.13.0`.

```bash
npm install
npm run dev
npm run build
npm run preview
npm run test
npm run lint
```

## Arquitectura

La logica de negocio vive separada de la UI.

```txt
src/features/game/
  domain/       reglas puras, entidades y servicios de dominio
  application/  hooks/facades que conectan dominio con React
  ui/           componentes visuales y animaciones
  data/         catalogos estaticos de niveles, categorias y tiles
```

La UI no decide reglas del juego. Solo llama acciones como `startGame`, `selectCard` y `resetGame`.

## Estadisticas

Las estadisticas se guardan en `localStorage` y no contienen datos personales.

- partidas jugadas
- ganadas y perdidas
- win rate
- racha actual y mejor racha
- mejor tiempo por dificultad
- mejor score por dificultad
- nickname, idioma y sonido como preferencias locales

## Deploy En GitHub Pages

El proyecto incluye workflow para GitHub Pages en `.github/workflows/deploy.yml`.

En el repositorio de GitHub:

1. Ir a `Settings > Pages`.
2. Seleccionar `GitHub Actions` como source.
3. Hacer push a `main`.

La URL sera similar a:

```txt
https://TU_USUARIO.github.io/NOMBRE_DEL_REPO/
```

## Flujo De Ingenieria

El repositorio esta preparado para trabajar con ramas profesionales:

- `main`: produccion estable.
- `develop`: integracion.
- `feature/*`, `fix/*`, `chore/*`, `release/*`: trabajo temporal.

Ver [`docs/GIT_WORKFLOW.md`](docs/GIT_WORKFLOW.md).

## Documentacion

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- [`docs/TESTING.md`](docs/TESTING.md)
- [`docs/ACCESSIBILITY.md`](docs/ACCESSIBILITY.md)
- [`docs/PRIVACY.md`](docs/PRIVACY.md)
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)
- [`docs/decisions`](docs/decisions)
- [`docs/diagrams`](docs/diagrams)

<div align="center">

# Memo Test Recharged

### Juego de memoria moderno, responsive y bilingue

**Repositorio:** [github.com/NaktoG/memo-test-recharged](https://github.com/NaktoG/memo-test-recharged)

[![Astro](https://img.shields.io/badge/Astro-7.0-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=111111)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-222222?logo=github&logoColor=white)](https://pages.github.com)

</div>

---

## Descripcion

**Memo Test Recharged** es una aplicacion web de juego de memoria. El objetivo es encontrar todos los pares antes de que termine el tiempo, seleccionando categoria y dificultad.

La app esta construida con Astro como shell estatico y React como isla interactiva. Incluye onboarding con nickname, interfaz bilingue Espanol/Ingles, sonidos opcionales, animaciones, celebracion visual al ganar, estadisticas persistidas en el navegador y ranking local.

## Caracteristicas

| Funcionalidad | Descripcion |
|---|---|
| Juego de memoria | Seleccion de cartas, pares, victoria, derrota por tiempo y reinicio |
| Categorias y dificultad | Catalogos estaticos para variar partidas y reglas |
| Nickname local | Identifica al jugador en estadisticas y ranking local |
| Ranking local | Top 10 ordenado por mas puntos, menor tiempo y menos movimientos |
| Estadisticas | Partidas jugadas, ganadas/perdidas, rachas, mejores tiempos y scores |
| Internacionalizacion | Textos en Espanol e Ingles con preferencia local |
| Sonido opcional | Preferencia guardada en el navegador |
| Animaciones | Transiciones de cartas, pantallas y microinteracciones con Motion |
| Responsive | Interfaz adaptada a escritorio y movil |
| Accesibilidad | Targets tactiles, foco visible, estructura semantica y contraste cuidado |
| Privacidad | Sin backend: datos guardados solo en `localStorage` |
| Deploy estatico | Publicacion automatizada en GitHub Pages |

## Demo

> [Demo en vivo](https://naktog.github.io/memo-test-recharged/)

## Stack tecnologico

| Capa | Tecnologia | Version |
|---|---|---|
| Meta-framework | [Astro](https://astro.build/) | 7.0 |
| UI Framework | [React](https://react.dev/) | 19.0 |
| Lenguaje | [TypeScript](https://www.typescriptlang.org/) | 5.7 |
| CSS | [Tailwind CSS](https://tailwindcss.com/) | 3.4 |
| Animaciones | [Motion](https://motion.dev/) | 12.0 |
| Tests unitarios | [Vitest](https://vitest.dev/) | 4.1 |
| Linting | [ESLint](https://eslint.org/) | 9.17 |
| Formateo | [Prettier](https://prettier.io/) | 3.4 |
| Hosting | [GitHub Pages](https://pages.github.com/) | Actions |

## Instalacion

### Requisitos previos

- [Node.js](https://nodejs.org/) `>=22.13.0`
- npm

### Ejecutar en local

```bash
git clone https://github.com/NaktoG/memo-test-recharged.git
cd memo-test-recharged
npm install
npm run dev
```

La aplicacion estara disponible en `http://localhost:4321`.

## Scripts de desarrollo

| Comando | Descripcion |
|---|---|
| `npm run dev` | Servidor de desarrollo con hot-reload |
| `npm run build` | Type-check de Astro y build de produccion |
| `npm run preview` | Previsualizar build local |
| `npm run test` | Ejecutar tests unitarios con Vitest |
| `npm run test:watch` | Tests en modo observador |
| `npm run lint` | Linting con ESLint |
| `npm run format` | Formatear codigo con Prettier |

## Persistencia local

La aplicacion no usa backend ni base de datos. Todo se guarda en el navegador mediante `localStorage`.

Datos persistidos:

- nickname
- idioma
- preferencia de sonido
- estadisticas generales
- mejores tiempos y scores por dificultad
- ranking local top 10

Limitaciones conocidas:

- Los datos existen solo en el navegador/dispositivo actual.
- Si se limpian los datos del sitio, se pierden estadisticas y ranking.
- El ranking no es compartido entre usuarios ni dispositivos.
- Para ranking global haria falta backend, base de datos y control anti-abuso.

## Estructura del proyecto

```txt
src/
├── components/                  # Componentes Astro compartidos
│   └── layout/
│       └── AppFooter.astro      # Footer con enlace al repositorio
│
├── features/
│   └── game/
│       ├── application/         # Hooks/facades que conectan dominio con React
│       │   ├── i18n.ts          # Textos Espanol/Ingles
│       │   ├── useGameStats.ts  # Lectura/escritura de estadisticas
│       │   └── useMemoryGame.ts # Orquestacion de partida
│       │
│       ├── data/                # Catalogos estaticos de juego
│       │   └── gameCatalog.ts   # Categorias, dificultades y tiles
│       │
│       ├── domain/              # Reglas puras, entidades y servicios
│       │   ├── entities/        # Tipos de partida, cartas y estadisticas
│       │   ├── services/        # Motor de reglas y persistencia local
│       │   └── __tests__/       # Tests unitarios de dominio
│       │
│       └── ui/                  # Componentes visuales React
│           ├── GameApp.tsx      # App interactiva principal
│           ├── GameBoard.tsx    # Tablero de cartas
│           ├── GameCard.tsx     # Carta individual
│           ├── SetupPanel.tsx   # Configuracion de partida
│           └── StatsPanel.tsx   # Estadisticas y ranking
│
├── pages/
│   └── index.astro              # Shell HTML y montaje de la isla React
│
├── styles.css                   # Tailwind y estilos globales
└── favicon.svg                  # Icono de la app
```

## Testing

### Tests unitarios

```bash
npm run test
```

Cobertura actual:

- `src/features/game/domain/__tests__/game-rules.test.ts` — reglas de partida, cartas y resultado
- `src/features/game/domain/__tests__/stats-storage.test.ts` — estadisticas, ranking local y ordenamiento
- `src/features/game/application/__tests__/player-settings.test.ts` — preferencias locales de jugador

### Validacion recomendada antes de publicar

```bash
npm run lint
npm run test
npm run build
```

## Arquitectura y decisiones de diseno

### Islands Architecture

Astro renderiza el shell HTML estatico y React se hidrata solo en la isla interactiva del juego (`GameApp`). Esto mantiene el sitio simple de publicar en GitHub Pages y limita el JavaScript interactivo a donde se necesita.

### Separacion dominio/UI

Las reglas criticas viven en `domain` y no dependen de React. La UI llama acciones de aplicacion como `startGame`, `selectCard`, `resetGame` y `recordResult`, pero no decide reglas de victoria, derrota ni scoring.

### Persistencia sin backend

`localStorage` se usa para preferencias, estadisticas y ranking. Esta decision mantiene la app estatica, barata de operar y privada por defecto, pero impide compartir rankings entre dispositivos.

### Animaciones controladas

Motion se usa para mejorar feedback visual en cartas, paneles y celebraciones. La animacion no forma parte de las reglas del juego.

## Deploy en GitHub Pages

El proyecto incluye el workflow `.github/workflows/deploy.yml`.

### Requisitos

- Repositorio en GitHub.
- GitHub Pages configurado con source `GitHub Actions`.
- Rama de produccion: `main`.

### Pasos

1. Mergear cambios a `main` siguiendo el flujo del repositorio.
2. Ejecutar o esperar el workflow `Deploy GitHub Pages`.
3. Verificar la URL publica.

URL actual:

```txt
https://naktog.github.io/memo-test-recharged/
```

## Documentacion adicional

- [`RUNBOOK.md`](RUNBOOK.md)
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- [`docs/TESTING.md`](docs/TESTING.md)
- [`docs/ACCESSIBILITY.md`](docs/ACCESSIBILITY.md)
- [`docs/PRIVACY.md`](docs/PRIVACY.md)
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)
- [`docs/GIT_WORKFLOW.md`](docs/GIT_WORKFLOW.md)
- [`docs/decisions`](docs/decisions)
- [`docs/diagrams`](docs/diagrams)

## Contribucion

1. Crear una rama desde `develop` (`feature/*`, `fix/*` o `chore/*`).
2. Hacer cambios pequenos y testeables.
3. Ejecutar validaciones locales.
4. Abrir Pull Request contra `develop`.
5. Publicar a `main` mediante PR de release.

### Convenciones

- Commits: [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `chore:`).
- Codigo: ESLint + Prettier.
- Tests: agregar o actualizar tests cuando cambien reglas de dominio.

---

<div align="center">

Hecho por [NaktoG](https://github.com/NaktoG)

</div>

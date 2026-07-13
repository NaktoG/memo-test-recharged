# Contributing

Este repositorio sigue un flujo de trabajo profesional basado en ramas protegidas, Pull Requests y validaciones automaticas.

## Requisitos

- Node.js `>=22.13.0`
- npm `>=10`

```bash
nvm use
npm ci
```

## Flujo De Trabajo

1. Crear una rama desde `develop`.
2. Implementar cambios pequenos y revisables.
3. Ejecutar validaciones locales.
4. Abrir Pull Request hacia `develop`.
5. Merge a `main` solo para releases estables.

## Convencion De Ramas

- `main`: produccion estable.
- `develop`: integracion de cambios aprobados.
- `feature/*`: nuevas funcionalidades.
- `fix/*`: correcciones.
- `chore/*`: mantenimiento, tooling o documentacion.
- `release/*`: estabilizacion de versiones.

## Validaciones Obligatorias

```bash
npm run lint
npm run test
npm run build
npm audit
```

## Commits

Usar mensajes claros y accionables. Formato recomendado:

```txt
type(scope): summary
```

Ejemplos:

```txt
feat(game): add local statistics panel
fix(domain): prevent selecting matched cards
docs(repo): document branch workflow
```

## Pull Requests

Todo PR debe incluir:

- Descripcion del cambio.
- Evidencia de tests/build.
- Riesgos o decisiones relevantes.
- Screenshots si cambia UI.

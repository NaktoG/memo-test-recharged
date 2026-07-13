# ADR-003: Motion Para Animaciones

## Estado

Aceptado.

## Contexto

El juego requiere flips, microinteracciones, transiciones de pantalla y feedback de resultado.

## Decision

Usar `motion/react` para animaciones en componentes React.

## Alternativas

- CSS puro: menor dependencia, mas manual para estados complejos.
- Motion UI: menos integrado con React y estado interactivo.

## Consecuencias

- Animaciones declarativas por componente.
- Dependencia adicional controlada.
- Se debe respetar `prefers-reduced-motion`.

# ADR-002: Separacion Dominio/UI

## Estado

Aceptado.

## Contexto

El codigo original mezclaba estado, reglas y UI en componentes. Eso dificulta tests, mantenimiento y evolucion.

## Decision

Mover reglas del juego a `features/game/domain` y conectar la UI mediante hooks en `features/game/application`.

## Consecuencias

- Las reglas se prueban sin renderizar UI.
- La UI puede redisenarse sin tocar dominio.
- El storage local queda encapsulado.

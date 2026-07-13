# ADR-001: Astro + React Stack

## Estado

Aceptado.

## Contexto

El proyecto original era una app Angular pequeña. El objetivo nuevo es una reescritura moderna, rapida, estatica, desplegable gratis y con UI altamente interactiva.

## Decision

Usar Astro como shell estatico y React como isla interactiva del juego.

## Alternativas

- Angular moderno: menor cambio, pero no responde al objetivo de migrar a Astro.
- Astro + Svelte: liviano, pero el usuario eligio React.
- React + Vite: valido, pero pierde ventajas de Astro para sitio estatico y Pages.

## Consecuencias

- Deploy simple en GitHub Pages.
- Hidratacion limitada a la isla del juego.
- Dominio independiente de Astro/React.

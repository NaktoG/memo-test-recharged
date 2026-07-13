# Accessibility

## Baseline

La UI apunta a WCAG 2.1 AA.

## Decisiones

- Las cartas son `button`, no `div` clickeables.
- El foco visible esta definido globalmente.
- El resultado de partida usa `aria-live`.
- Los selects tienen labels explicitos.
- Las animaciones respetan `prefers-reduced-motion`.
- Los targets tactiles tienen al menos 44px.

## Checklist Manual

- Navegar todo el juego con teclado.
- Verificar contraste en mobile y desktop.
- Probar zoom del navegador al 200%.
- Probar que el resultado se comunica sin depender solo del color.
- Probar `prefers-reduced-motion`.

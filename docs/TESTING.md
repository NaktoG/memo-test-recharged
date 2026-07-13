# Testing

## Estrategia

- Tests unitarios para reglas de dominio.
- Tests unitarios para persistencia y calculo de estadisticas.
- E2E recomendado con Playwright para el flujo de partida completa.

## Comandos

```bash
npm run test
npm run build
npm run lint
```

## Cobertura Critica

- Crear partida valida.
- Seleccionar cartas.
- Resolver pares correctos e incorrectos.
- Detectar victoria.
- Detectar derrota por timer.
- Registrar estadisticas.

## Regla

La logica critica debe probarse en `domain` antes de tocar UI. Los tests no deben depender de servicios externos.

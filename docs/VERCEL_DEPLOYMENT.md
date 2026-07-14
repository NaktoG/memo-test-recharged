# Despliegue en Vercel

## Proyecto

`memo-test-recharged`

## Estado

- [ ] Preview desplegada
- [ ] Producción desplegada
- [ ] Variables configuradas
- [ ] Dominio configurado
- [x] Pruebas completadas

## Configuración

| Campo | Valor |
|---|---|
| Framework | Astro |
| Root Directory | `./` |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node.js | `>=22.13.0` |
| Gestor de paquetes | npm |

## Variables de entorno

No hay variables obligatorias para Vercel.

Opcional:

| Nombre | Entorno | Pública/Privada | Descripción |
|---|---|---|---|
| `PUBLIC_SITE_URL` | Preview/Production | Pública | URL pública del sitio si se quiere fijar `site` durante el build. |

No configurar `GITHUB_PAGES=true` en Vercel.

## Servicios externos

No requiere backend, base de datos ni almacenamiento externo. La persistencia se realiza en `localStorage`.

## Pruebas realizadas

Comandos ejecutados localmente con Node.js `v22.23.1`:

```bash
npm ci
npm run check
npm run lint
npm run test
npm run build
```

Resultado: instalación, Astro check, lint, tests unitarios y build estático completados correctamente. `astro check` informó un hint de deprecación en `eslint.config.js`, sin errores ni warnings de compilación.

## Limitaciones

- Ranking, estadísticas y preferencias existen solo en el navegador actual.
- No hay sincronización entre dispositivos.
- No se configura dominio propio en esta etapa.

## Rollback

Revertir la Pull Request de migración. El despliegue actual de GitHub Pages puede mantenerse independiente mientras se valida Vercel.

## Última revisión

2026-07-14

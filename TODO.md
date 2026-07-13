# Technical Debt

- [ ] Reemplazar el placeholder del enlace GitHub en `AppFooter.astro`.
  - Contexto: falta el enlace real del repositorio.
  - Impacto: bajo.
  - Riesgo: mantenimiento.
  - Accion sugerida: actualizar `repositoryUrl` cuando exista el repo.
  - Momento ideal: antes del primer deploy publico.

- [ ] Reemplazar el placeholder de `.github/CODEOWNERS`.
  - Contexto: falta el usuario real de GitHub.
  - Impacto: bajo.
  - Riesgo: mantenimiento.
  - Accion sugerida: cambiar `@your-github-user` por el usuario u organizacion real.
  - Momento ideal: al crear el repositorio remoto.

- [ ] Agregar Playwright para E2E.
  - Contexto: la base actual cubre dominio con Vitest.
  - Impacto: medio.
  - Riesgo: regresion funcional.
  - Accion sugerida: cubrir inicio de partida, victoria y reset de stats.
  - Momento ideal: antes de compartir la URL publica.

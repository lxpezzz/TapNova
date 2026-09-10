# Reglas de Desarrollo — TapNova

## 1. Regla Mandatoria de Diseño y Modificaciones Responsive (Desktop & Mobile)
- **Sincronización Total Desktop-Mobile**: Cualquier cambio visual, de contenido, de enlaces, de botones CTA o de componentes que se solicite para desktop **DEBE aplicarse y verificarse de inmediato en su versión para móvil** (`@media (max-width: 1023px)` y `@media (max-width: 639px)`).
- **Consistencia Visual y Funcional**: Si se agrega, modifica o elimina un elemento (botones, textos, halos/efectos de fondo, espaciados), ambas vistas deben reflejar la misma jerarquía y experiencia estética. Nunca dejar la versión móvil desactualizada ni con estilos antiguos o heredados.
- **Estructuras Unificadas**: Evitar duplicar bloques enteros de HTML para móvil y escritorio cuando una sola estructura semántica con CSS responsive pueda resolver ambos casos con elegancia y sin desincronizaciones.
- **Accesibilidad y Ergonomía Móvil**:
  - Objetivos táctiles mínimos de 48px (`min-height: 48px`).
  - No restringir contenedores con anchos fijos estrechos ni con `overflow: hidden` innecesarios que corten sombras, textos o halos decorativos.
  - Tipografía escalable con `clamp()` que conserve la personalidad display de la marca sin desbordar.

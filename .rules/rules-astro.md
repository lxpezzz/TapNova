REGLA ASTRO-FIRST

Todo componente debe ser estático por defecto.

No añadas:
- client:load
- client:visible
- client:idle
- React/Vue/Svelte
- JavaScript en cliente

salvo que exista una interacción que realmente lo necesite.

Para contenido, layout, imágenes, cards, navegación estática y secciones visuales:
usa Astro + HTML + CSS.

Si necesitas JavaScript para una interacción sencilla, utiliza JavaScript nativo y limita el código al propio componente.

Objetivo:
enviar al navegador la menor cantidad posible de JavaScript.
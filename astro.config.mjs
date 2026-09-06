import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://tapnova.es',
  compressHTML: true,
  devToolbar: {
    enabled: false,
  },
  integrations: [tailwind({
    applyBaseStyles: false,
  })],
  redirects: {
    '/catalogo': '/productos',
  },
});

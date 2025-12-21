import { defineConfig } from 'astro/config';

export default defineConfig({
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (info) =>
            /\.(png|jpe?g|gif|svg|webp|avif)$/i.test(info.name || '')
              ? 'assets/images/[name]-[hash][extname]'
              : '_astro/[name]-[hash][extname]',
          entryFileNames: '_astro/[name]-[hash].js',
          chunkFileNames: '_astro/[name]-[hash].js',
        },
      },
    },
  },
});

import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'next', 'next/image', 'clsx'],
  treeshake: true,
  banner: {
    js: "'use client';",
  },
});

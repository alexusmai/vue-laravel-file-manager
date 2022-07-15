import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        minify: true,
        cssCodeSplit: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: [],
                },
            },
        },
    },

    css: { preprocessorOptions: { scss: { charset: false } } },
});

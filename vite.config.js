import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), EnvironmentPlugin(['VUE_APP_LFM_AXIOS_BASE_URL', 'VUE_APP_LFM_CSRF_TOKEN'])],
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

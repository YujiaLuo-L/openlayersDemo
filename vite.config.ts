import { defineConfig } from 'vite';
import * as path from 'path';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    resolve: {
        alias: {
            '@': path.join(__dirname, './src'),
        },
    },
    server: {
        proxy: {
            '/acqforjs': {
                target: 'http://172.16.11.33:8071',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    plugins: [vue()],
});

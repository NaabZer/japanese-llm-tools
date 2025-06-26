import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        tanstackRouter({
            target: 'react',
            autoCodeSplitting: true,
        }),
        react()
    ],
    resolve: {
        alias: {
            src: "/src",
            components: "/src/components",
            assets: "/src/assets",
            api: "/src/api",
            context: "/src/context",
            styles: "/src/styles",
            types: "/src/types",
            hooks: "/src/hooks",
        },
    },
})

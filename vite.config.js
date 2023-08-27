import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { fileURLToPath, URL } from "node:url";


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
            "@ui": fileURLToPath(new URL("./src/lib/ui", import.meta.url)),
            "@project": fileURLToPath(new URL("./src/lib", import.meta.url)),
        },
    },
});

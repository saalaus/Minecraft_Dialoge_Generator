import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import { sass } from 'svelte-preprocess-sass';


export default {
    input: 'src/index.js',
    name: 'ReteSvelteRenderPluginPlugin',
    plugins: [
        svelte({
            preprocess:{
                style: sass()
            }
        }),
        resolve({
            browser: true,
            dedupe: ["svelte"]
        })
    ]
}
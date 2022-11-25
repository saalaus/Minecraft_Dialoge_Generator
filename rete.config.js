import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import preprocess from 'svelte-preprocess';


export default {
    input: 'src/index.js',
    name: 'ReteSvelteRenderPlugin',
    plugins: [
        svelte({
            preprocess: preprocess(),
	    emitCss: false
        }),

        resolve({
            browser: true,
            dedupe: ['svelte']
        })
     ]
}
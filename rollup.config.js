import resolve from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import preprocess from 'svelte-preprocess';
import css from 'rollup-plugin-css-only';

const pkgName = require('./package.json').name;

export default {
    input: 'src/index.js',
    output: [
        {
            format: 'esm',
            sourcemap: true,
            file: `build/${pkgName}.esm.js`
        },
        {
            format: 'cjs',
            sourcemap: true,
            file: `build/${pkgName}.common.js`
        },
        {
            format: 'umd',
            sourcemap: true,
            name: 'SvelteRenderPlugin',
            file: `build/${pkgName}.min.js`
        }
    ],
    plugins: [
        css({
            output: "styles.css"
        }),
        svelte({
            preprocess: preprocess()
        }),

        resolve({
            browser: true,
            dedupe: ['svelte']
        })
     ]
}
<script>
    import Snackbar from "./Snackbar.svelte";
import { mount } from "svelte";
    /**
     * @typedef {Object} Props
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props} */
    let { children } = $props();

    let element = $state();

    export function create(text, duration) {
        mount(Snackbar, {
                    target: element,
                    props: {
                        text: text,
                        duration: duration,
                    },
                });
    }
</script>

<div class="snackbar" bind:this={element}>
    {@render children?.()}
</div>

<style>
    .snackbar {
        position: fixed;
        right: 0;
        bottom: 0;
        margin-right: 2em;
    }
</style>

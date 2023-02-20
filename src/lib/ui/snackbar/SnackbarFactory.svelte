<script>
    import Snackbar from "./Snackbar.svelte";

    let element;

    export function create(text, duration) {
        new Snackbar({
            target: element,
            props: {
                text: text,
                duration: duration,
            },
        });
    }
</script>

<div class="snackbar" bind:this={element}>
    <slot />
</div>

<style>
    .snackbar {
        position: fixed;
        right: 0;
        bottom: 0;
        margin-right: 2em;
    }
</style>

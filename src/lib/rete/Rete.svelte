<script context="module">
    export let editor;
</script>

<script>
    import { onMount } from "svelte";
    import createEngine from "./engine";

    let element;

    onMount(() => {
        editor = createEngine(element);
    });
</script>

<div id="app" bind:this={element} />

<style>
    #app {
        min-height: 100vh;
    }
</style>

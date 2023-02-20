<script context="module">
    export let editor;
</script>

<script>
    import { onMount } from "svelte";
    import createEngine from "./rete.engine";

    let element;

    onMount(() => {
        editor = createEngine(element);
        console.log(editor);
        window.editor = editor;
    });
</script>

<div id="app" bind:this={element} />

<style>
    #app {
        min-height: 100vh;
    }
</style>

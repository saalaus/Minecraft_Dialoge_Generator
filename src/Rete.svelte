<script>
    import { onMount } from "svelte";
    import createEngine from "./rete-engine";
    let element;
    let engine;

    onMount(() => {
        engine = createEngine(element);
        console.log(engine);
    });
    export function getEngine(){
        return engine;
    }
</script>

<div id="app" bind:this={element} />

<style>
    #app{
        height: 100vh;
    }
</style>
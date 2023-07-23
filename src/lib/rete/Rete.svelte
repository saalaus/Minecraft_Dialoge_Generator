<script context="module">
    export let editor;
</script>

<script>
    import { createEventDispatcher, onMount } from "svelte";
    import createEngine from "./engine";

    let element;
    const dispatch = createEventDispatcher()

    onMount(() => {
        createEngine(element).then(data => {
            data.area.addPipe((context) => {
                switch (context.type){
                    case "contextmenu":
                        const pos = { x: context.data.event.clientX, y: context.data.event.clientY };
                        console.log(context)
                        dispatch("contextmenu", {type: "bg", pos: pos})
                        return false
                    case "nodetranslate":
                        dispatch("contextmenu", {type: ""})
                        return context
                    case "zoom":
                        dispatch("contextmenu", {type: ""})
                        return context
                    case "translate":
                        dispatch("contextmenu", {type: ""})
                        return context
                    default:
                        return context
                }
            });
        });

    });
</script>

<div id="app" bind:this={element} />

<style>
    #app {
        min-height: 100vh;
    }
</style>

<script>
    import { createEventDispatcher } from "svelte";

    export let element;
    const dispatch = createEventDispatcher();

    export function focus() {
        element.focus();
    }

    export function trigger() {
        onInput();
    }

    function onInput() {
        dispatch("input", element);
    }
</script>

<div
    contenteditable="true"
    class="text-input"
    on:input={onInput}
    on:focus
    on:blur
    bind:this={element} />

<style>
    .text-input {
        padding: 0.75em 0.75em 0.75em 0.75em;
        border: 0.0625em solid #a0a0a0;
        background-color: black;
        color: white;
        outline: none;
        font: 12pt "Minecraftia", sans-serif;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
    }

    .text-input :global(br) {
        display: none;
    }

    .text-input :global(*) {
        display: inline;
        white-space: nowrap;
    }
</style>

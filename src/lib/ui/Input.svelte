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

    :global(.obfuscated) {
        text-shadow: 6px 2px 0px;
        padding: 0 8px 0 4px;
    }

    :global(.bold) {
        font-weight: bold;
    }

    :global(.italic) {
        font-style: italic;
    }

    :global(.strike) {
        text-decoration: line-through;
    }

    :global(.underline) {
        text-decoration: underline;
    }

    :global(.strike.underline) {
        text-decoration: underline line-through;
    }

    :global(.dark_red) {
        color: rgb(170, 0, 0);
    }

    :global(.white) {
        color: white;
    }

    :global(.black) {
        color: black;
    }

    :global(.dark_blue) {
        color: rgb(0, 0, 170);
    }

    :global(.dark_green) {
        color: rgb(0, 170, 0);
    }

    :global(.dark_aqua) {
        color: rgb(0, 170, 170);
    }

    :global(.dark_purple) {
        color: rgb(170, 0, 170);
    }

    :global(.gold) {
        color: rgb(255, 170, 0);
    }

    :global(.gray) {
        color: rgb(170, 170, 170);
    }

    :global(.dark_gray) {
        color: rgb(85, 85, 85);
    }

    :global(.blue) {
        color: rgb(85, 85, 255);
    }

    :global(.green) {
        color: rgb(85, 255, 85);
    }

    :global(.aqua) {
        color: rgb(85, 255, 255);
    }

    :global(.red) {
        color: rgb(255, 85, 85);
    }

    :global(.light_purple) {
        color: rgb(255, 85, 255);
    }

    :global(.yellow) {
        color: rgb(255, 255, 85);
    }

    :global(b) {
        font-weight: normal;
    }

    :global(i) {
        font-style: normal;
    }

    :global(u) {
        text-decoration: none;
    }
</style>

<script>
    let { element = $bindable(), oninput = undefined, onfocus = undefined, onblur = undefined } = $props();

    export function focus() {
        element.focus();
    }

    export function trigger() {
        oninput();
    }
</script>

<div
    contenteditable="true"
    class="text-input"
    {oninput}
    {onfocus}
    {onblur}
    bind:this={element}></div>

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

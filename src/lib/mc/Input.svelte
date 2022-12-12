<script>
    import { input_text } from "../stores";


    let element;

    export function focus(){
        element.focus();
    }

    export function trigger(){
        input_text.set(element)
    }

    function onInput(e){
        input_text.set(e.target)
    }
</script>

<div contenteditable="true" class="text-input" on:input={onInput} on:focus on:blur bind:this={element}/>

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
    }

</style>

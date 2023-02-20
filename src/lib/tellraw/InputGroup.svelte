<script>
    import { createEventDispatcher } from "svelte";
    import Button from "../ui/Button.svelte";
    import Input from "../ui/Input.svelte";

    let element_group;
    export let element;
    const dispatch = createEventDispatcher();

    function removeInput(){
            dispatch("kill", element_group)
    }
</script>



<div class="editor_text-input" bind:this={element_group}>
    <Input bind:element></Input>
    <Button type="negative" on:click={removeInput}>-</Button>
</div>

<style>
    .editor_text-input{
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px
    }
    
    .editor_text-input :global(.text-input){
        margin-right: 5px;
    }
</style>

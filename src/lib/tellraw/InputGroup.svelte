<script>
    import Button from "@ui/Button.svelte";
    import Input from "@ui/Input.svelte";

    let element_group;
    let {element = $bindable(), id, onkill = undefined} = $props();

    function removeInput(){
        console.log(element)
        onkill(id)
    }
</script>



<div class="editor_text-input" bind:this={element_group}>
    <Input bind:element></Input>
    <Button type="negative" onclick={removeInput}>-</Button>
</div>

<style lang="scss">
    .editor_text-input{
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;

        & :global(.text-input){
            margin-right: 5px;
        }
    }
</style>

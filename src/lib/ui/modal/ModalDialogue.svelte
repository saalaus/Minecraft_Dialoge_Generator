<script>
    import Modal from "./Modal.svelte"
    import Editor from "@project/tellraw/Editor.svelte";
    import Button from "@ui/Button.svelte";

    let { onclose = undefined, multiple = true, oncreate = undefined } = $props()

    let input = $state();
    let time = $state();
    function create(){
        const data = {
            input: input.getInput(),
            time: time
        }
        oncreate(data)
    }
</script>


<Modal name="New Dialogue" {onclose}>
    {#snippet body()}
        <Editor {multiple} bind:this={input} bind:time/>
    {/snippet}
    {#snippet footer()}
        <div class="footer">
            <Button onclick={() => create()}>Create</Button>
            <Button type="secondary" onclick={() => onclose()}>Cancel</Button>
        </div>
    {/snippet}
</Modal>

<style>
    .footer{
        display: flex;
        justify-content: space-evenly;
    }
</style>

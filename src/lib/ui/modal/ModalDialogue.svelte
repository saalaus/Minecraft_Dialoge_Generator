<script>
    import Modal from "./Modal.svelte"
    import Editor from "@project/tellraw/Editor.svelte";
    import Button from "@ui/Button.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher()
    let input;
    let time;
    export let multiple = false;
    function create(){
        const data = {
            input: input.getInput(),
            time: time
        }
        dispatch("create", data)
    }
</script>


<Modal name="New Dialogue" on:close>
    <div slot="body">
        <Editor {multiple} bind:this={input} bind:time/>
    </div>
    <div slot="footer" style="display: flex; justify-content: space-evenly;">
        <Button on:click={() => create()}>Create</Button>
        <Button type="secondary" on:click={() => dispatch("close")}>Cancel</Button>
    </div>
</Modal>

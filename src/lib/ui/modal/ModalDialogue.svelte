<script>
    import Modal from "./Modal.svelte"
    import Editor from "../../tellraw/Editor.svelte";
    import Button from "../Button.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher()
    let input;
    export let multiple = false;
    function create(){
        dispatch("create", input.getInput())
    }
</script>


<Modal name="New Dialogue" on:close>
    <div slot="body">
        <Editor {multiple} bind:this={input}/>
    </div>
    <div slot="footer" style="display: flex; justify-content: space-evenly;">
        <Button on:click={() => create()}>Create</Button>
        <Button type="secondary" on:click={() => dispatch("close")}>Cancel</Button>
    </div>
</Modal>

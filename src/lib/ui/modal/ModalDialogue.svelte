<script>
    import Modal from "./Modal.svelte"
    import Editor from "../../tellraw/Editor.svelte";
    import Button from "../Button.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher()
    export let multiple = false;
</script>


<Modal name="New Dialogue" on:close>
    <div slot="body">
        <Editor {multiple}/>
    </div>
    <div slot="footer" style="display: flex; justify-content: space-evenly;">
        <Button on:click={() => dispatch("create")}>Create</Button>
        <Button type="secondary" on:click={() => dispatch("close")}>Cancel</Button>
    </div>
</Modal>

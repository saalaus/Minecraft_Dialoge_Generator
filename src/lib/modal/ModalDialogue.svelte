<script>
    import Modal from "./Modal.svelte"
    import Editor from "../mc/Editor.svelte";
    import Button from "../mc/Button.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher()
</script>


<Modal name="New Dialogue" on:close>
    <div slot="body">
        <Editor/>
    </div>
    <div slot="footer" style="display: flex; justify-content: space-evenly;">
        <Button on:click={() => dispatch("create")}>Create</Button>
        <Button type="secondary" on:click={() => dispatch("close")}>Cancel</Button>
    </div>
</Modal>
<script>
    import Modal from "./Modal.svelte"
    import Editor from "../mc/Editor.svelte";
    import Button from "../mc/Button.svelte";
</script>


<Modal name="New Dialogue">
    <div slot="body">
        <Editor/>
    </div>
    <div slot="footer">
        <Button>Create</Button>
    </div>
</Modal>
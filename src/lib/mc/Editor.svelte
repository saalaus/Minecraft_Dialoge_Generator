<script>
    import Button from "./Button.svelte";
    import Input from "./Input.svelte";
    import ColorChoose from "./ColorChoose.svelte";
</script>

<Input />
<div style="display: flex;" class="btn-group">
    <Button >B</Button>
    <Button>I</Button>
    <Button>U</Button>
    <Button>S</Button>
    <Button>O</Button>
    <Button>R</Button>
</div>
<ColorChoose />

<style>
    *{
        margin: 5px;
    }

    :global(.btn-group *){
        margin: 5px;
    }
</style>

<script>
    import { createEventDispatcher } from "svelte";
    import Menu from "./Menu.svelte";
    import MenuOption from "./MenuOption.svelte";

    let dispatch = createEventDispatcher()

    function click(name){
        mode = ""
        dispatch(name)
    }

    export let mode;
    export let pos;
</script>

{#if mode == "bg"}
    <Menu {...pos} on:clickoutside={() => mode = ""}>
        <MenuOption on:click={() => click("newdialogue")}>New Dialogue</MenuOption>
        <MenuOption on:click={() => click("newchoose")}>New Choose</MenuOption>
        <MenuOption on:click={() => click("downloaddatapack")}>Download Datapack</MenuOption>
    </Menu>
{:else if mode == "node"}
    <Menu {...pos} on:clickoutside={() => (mode = "")}>
        <MenuOption on:click={() => click("editnode")}>Edit</MenuOption>
        <MenuOption on:click={() => click("deletenode")}>Delete</MenuOption>
    </Menu>
{/if}

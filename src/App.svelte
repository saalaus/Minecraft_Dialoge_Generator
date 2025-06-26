<script lang="ts">
    // import { onMount } from "svelte";
    import { SvelteFlow, Background } from '@xyflow/svelte';
    import '@xyflow/svelte/dist/style.css';
    // import type { NodeEditor } from "rete";
    // import type { AreaPlugin } from "rete-area-plugin";
    // import type { SvelteArea2D, ClassicScheme } from "rete-svelte-plugin/5";
    // import type { ClassicPreset } from "rete";
    import ModalDialogue from "./lib/ui/modal/ModalDialogue.svelte";
    import Menu from "./lib/ui/contextmenu/Menu.svelte";
    import MenuOption from "./lib/ui/contextmenu/MenuOption.svelte";
    // import SnackbarFactory from "./lib/components/SnackbarFactory.svelte";
    // import createEditor from "./lib/rete/engine";
    let nodes = $state.raw([
        {
            id: '1',
            position: { x: 0, y: 0 },
            data: { label: 'Hello' },
        },
        {
            id: '2',
            position: { x: 100, y: 100 },
            data: { label: 'World' },
        },
    ]);

    let contextMenu = $state(false);
    let modal = $state(false);
    let cm_x = $state(0)
    let cm_y = $state(0)
    let snackbar = { show: false, text: "" };
    // let editor: NodeEditor<ClassicScheme>;
    // let area: AreaPlugin<ClassicScheme, SvelteArea2D<ClassicScheme>>;

    // onMount(async () => {
    //     const container = document.querySelector('.editor');
    //     if (container) {
    //         // const result = await createEditor(container);
    //         // editor = result.editor;
    //         // area = result.area;
    //     }
    // });

    // function handleDialogue() {
    //     if (!editor) return;
    //     const node = editor.addNode("dialogue") as ClassicPreset.Node;
    //     const pos = { x: position.x, y: position.y };
    //     area.translate(node.id, pos);
    //     modal = false;
    //     contextMenu = false;
    // }

    // function handleChoose() {
    //     if (!editor) return;
    //     const node = editor.addNode("choose") as ClassicPreset.Node;
    //     const pos = { x: position.x, y: position.y };
    //     area.translate(node.id, pos);
    //     modal = false;
    //     contextMenu = false;
    // }

    function handlePageClick(event: MouseEvent) {
        if (event.button === 2) {
            console.log(event)
            event.preventDefault()
            cm_x = event.clientX
            cm_y = event.clientY
            contextMenu = true;
        } else {
            contextMenu = false;
        }
    }

    // function handleNodeDeselect() {
    //     if (!editor) return;
    //     editor.selected.clear();
    // }

    function handleKeyup(event: KeyboardEvent) {
        // if (event.key === "Delete" && editor) {
        //     editor.selected.each((node) => {
        //         editor.removeNode(node.id);
        //     });
        // }
    }

    function handleModalClose() {
        modal = false;
        contextMenu = false;
    }

    function modalClick(){
        modal = true;
    }

    // function downloadData() {
    //     if (!editor) return;
    //     const data = editor.toJSON();
    //     const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    //     const url = URL.createObjectURL(blob);
    //     const a = document.createElement("a");
    //     a.href = url;
    //     a.download = "dialogue.json";
    //     a.click();
    //     URL.revokeObjectURL(url);
    // }

    // function uploadData(event: Event) {
    //     const file = (event.target as HTMLInputElement).files?.[0];
    //     if (!file || !editor) return;

    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //         try {
    //             const data = JSON.parse(e.target?.result as string);
    //             editor.fromJSON(data);
    //             snackbar = { show: true, text: "Диалог успешно загружен" };
    //         } catch (error) {
    //             snackbar = { show: true, text: "Ошибка при загрузке диалога" };
    //         }
    //     };
    //     reader.readAsText(file);
    // }
</script>

<div style:width="100vw" style:height="100vh"> 
    <SvelteFlow bind:nodes oncontextmenu={handlePageClick} onclick={handlePageClick}
                onmove={handlePageClick} onconnectstart={handlePageClick}>
        <!-- <Background /> -->
        {#if contextMenu}
            <Menu x={cm_x} y={cm_y}>
                <MenuOption onclick={() => modal = true}>Add Dialogue</MenuOption>
                <!-- <MenuOption>Добавить выбор</MenuOption> -->
            </Menu>
        {/if}
    </SvelteFlow>
</div>

{#if modal}
    <ModalDialogue onclose={handleModalClose} />
{/if}


<!-- <div class="container" on:click={handleNodeDeselect} on:keyup={handleKeyup}>
    <div class="editor" on:contextmenu|preventDefault={handlePageClick}>
        {#if editor && area}
            <svelte:component this={area.view} />
        {/if}
    </div>

    {#if contextMenu}
        <Menu x={position.x} y={position.y}>
            <MenuOption on:click={handleDialogue}>Добавить диалог</MenuOption>
            <MenuOption on:click={handleChoose}>Добавить выбор</MenuOption>
        </Menu>
    {/if}


    <div class="controls">
        <button on:click={downloadData}>Сохранить</button>
        <input type="file" accept=".json" on:change={uploadData} />
    </div>

    <SnackbarFactory bind:show={snackbar.show} bind:text={snackbar.text} />
</div> -->

<style lang="scss">
    .container {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
    }

    .editor {
        flex: 1;
        position: relative;
        background: #1a1a1a;
    }

    .controls {
        padding: 1rem;
        background: #2a2a2a;
        display: flex;
        gap: 1rem;
    }

    button {
        padding: 0.5rem 1rem;
        background: #4a4a4a;
        border: none;
        color: white;
        cursor: pointer;
        border-radius: 4px;

        &:hover {
            background: #5a5a5a;
        }
    }

    input[type="file"] {
        display: none;
    }
</style>

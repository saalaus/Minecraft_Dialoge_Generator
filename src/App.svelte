<script>
    import Rete, { editor } from "@project/rete/Rete.svelte";
    import { onMount } from "svelte";
    import ModalDialogue from "@ui/modal/ModalDialogue.svelte";
    import Menu from "@ui/contextmenu/Menu.svelte";
    import MenuOption from "@ui/contextmenu/MenuOption.svelte";
    import { engine, input_text } from "@project/stores";
    import { createChoose, createDialogue } from "@project/rete/engine";
    import SnackbarFactory from "@ui/snackbar/SnackbarFactory.svelte";

    let contextmenu = "";
    let modal = "";
    let pos = { x: 0, y: 0 };
    let snackbar;

    onMount(() => {
        // console.log($engine.components.values());
        // editor.on("contextmenu", (e) => {
        //     console.log(e);
        //     e.e.preventDefault();
        //     pos = { x: e.e.clientX, y: e.e.clientY };

        //     if (e.e.target.classList.contains("rete-background"))
        //         deselectNode();
        //     if (
        //         e.e.target.classList.contains("input") ||
        //         e.e.target.classList.contains("input-title") ||
        //         e.e.target.classList.contains("output") ||
        //         e.e.target.classList.contains("output-title")
        //     ) {
        //         contextmenu = "node";
        //         e.node ? editor.selectNode(e.node) : null;
        //         return;
        //     }
        //     contextmenu = "bg";
        //     console.log("RC: ", e);
        // });

        // editor.on("zoom translate nodetranslate", () => {
        //     contextmenu = "";
        // });

        // editor.on("rendernode", ({ el, node }) => {
        //     el.addEventListener("click", () => editor.selectNode(node));
        // });
    });

    function createDialogueNode(e) {
        console.log(e);
        const time = e.detail.time != undefined ? e.detail.time : 20
        createDialogue(editor, e.detail.input, time);
        closeModal();
        snackbar.create("Create dialogue");
    }

    function createChooseNode(e) {
        console.log(e);
        const time = e.detail.time != undefined ? e.detail.time : 20
        createChoose(editor, e.detail.input, time);
        closeModal();
    }

    function onPageClick(e) {
        if (
            e.target.classList.contains("input") ||
            e.target.classList.contains("input-title") ||
            e.target.classList.contains("output") ||
            e.target.classList.contains("output-title")
        )
            return;
        deselectNode();
    }

    function deselectNode() {
        const node = editor.selected.list[0];
        if (!node) return;
        editor.selected.list = [];
        node.svelteContext.update();
    }

    function keyup(e) {
        if (e.keyCode === 46) {
            const node = editor.selected.list[0];
            if (!node) return;
            editor.removeNode(node);
        }
        if (e.keyCode === 27) deselectNode();
    }

    function closeModal() {
        modal = "";
    }

    async function download() {
        // await $engine.process(editor.toJSON());
        const trigger_name = "talk.trigger";
        const timer_name = "talk.timer";
        let string = "";
        Array.from($engine.components.values()).forEach((c) => {
            c = Object.assign(Object.create(Object.getPrototypeOf(c)), c);

            c.worker = (node, inputs, outputs) => {
                const code = c.code(node, inputs, {
                    trigger: trigger_name,
                    timer: timer_name,
                    current_time: 0
                });
                string += code.cmd;
                Object.keys(node.outputs).forEach(key => {
                    outputs[key] = code.outputs[key]
                })
            };
            c.worker.bind(c);

            $engine.components.set(c.name, c);
        });

        await $engine.process(editor.toJSON());

        console.log(string);
    }
</script>

<svelte:body
    on:click={onPageClick}
    on:keyup={keyup} 
    on:contextmenu|preventDefault={() => {}}/>

<Rete on:contextmenu={(e) => {
    pos = e.detail.pos;
    contextmenu = e.detail.type
}}/>

{#if contextmenu == "bg"}
    <Menu
        {...pos}
        on:close={() => (contextmenu = "")}>
        <MenuOption on:click={() => (modal = "newdialogue")}>
            New Dialogue
        </MenuOption>
        <MenuOption on:click={() => (modal = "newchoose")}>
            New Choose
        </MenuOption>
        <MenuOption on:click={() => download()}>Download Datapack</MenuOption>
    </Menu>
{:else if contextmenu == "node"}
    <Menu
        {...pos}
        on:close={() => (contextmenu = "")}>
        <MenuOption on:click={() => console.log("editnode")}>Edit</MenuOption>
        <MenuOption on:click={() => editor.removeNode(editor.selected.list[0])}>
            Delete
        </MenuOption>
    </Menu>
{/if}

{#if modal == "newdialogue"}
    <ModalDialogue
        on:close={closeModal}
        on:create={createDialogueNode} />
{:else if modal == "newchoose"}
    <ModalDialogue
        multiple={true}
        on:close={closeModal}
        on:create={createChooseNode} />
{/if}

<SnackbarFactory bind:this={snackbar} />

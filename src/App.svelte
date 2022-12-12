<script>
  import Rete, { editor } from "./Rete.svelte";
  import { onMount } from "svelte";
  import ModalDialogue from "./lib/modal/ModalDialogue.svelte";
  import Menu from "./lib/contextmenu/Menu.svelte";
  import MenuOption from "./lib/contextmenu/MenuOption.svelte";
  import htmlToTellraw from "./lib/tellraw";
  import { input_text } from "./lib/stores";
  import { components } from "./rete-engine";

  let contextmenu = "";
  let modal = "";
  let pos = { x: 0, y: 0 };

  onMount(() => {
    editor.on("contextmenu", (e) => {
      pos = { x: e.e.clientX, y: e.e.clientY };

      if (e.e.target.classList.contains("rete-background")) {
        contextmenu = "bg";
      }
      if (
        e.e.target.classList.contains("input") ||
        e.e.target.classList.contains("input-title") ||
        e.e.target.classList.contains("output") ||
        e.e.target.classList.contains("output-title")
      ) {
        contextmenu = "node";
        e.node ? editor.selectNode(e.node) : null;
      }
      e.e.preventDefault();
      console.log("RC: ", e);
    });

    editor.on("zoom translate nodetranslate", () => {
      contextmenu = "";
    });
  });
</script>

<Rete />
{#if contextmenu == "bg"}
  <Menu
    {...pos}
    on:clickoutside={() => (contextmenu = "")}
    on:close={() => (contextmenu = "")}
  >
    <MenuOption on:click={() => (modal = "newdialogue")}
      >New Dialogue</MenuOption
    >
    <MenuOption on:click={() => console.log("newchoose")}>New Choose</MenuOption
    >
    <MenuOption on:click={() => console.log("download")}
      >Download Datapack</MenuOption
    >
  </Menu>
{:else if contextmenu == "node"}
  <Menu
    {...pos}
    on:clickoutside={() => (contextmenu = "")}
    on:close={() => (contextmenu = "")}
  >
    <MenuOption on:click={() => console.log("editnode")}>Edit</MenuOption>
    <MenuOption on:click={() => console.log("deletenode")}>Delete</MenuOption>
  </Menu>
{/if}

Menu
{#if modal == "newdialogue"}
  <ModalDialogue
    on:close={() => (modal = "")}
    on:create={() => createDialogue()}
  />
{/if}

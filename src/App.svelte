<script>
  import Rete, { editor } from "./Rete.svelte";
  import ContextMenu from "./lib/contextmenu/ContextMenu.svelte";
  import { onMount } from "svelte";
  import ModalDialogue from "./lib/modal/ModalDialogue.svelte";

  let contextmenu = "";
  let modal = ""
  let pos = { x: 0, y: 0 };

  onMount(() => {
    editor.on("contextmenu", (e) => {
      pos = { x: e.e.clientX, y: e.e.clientY };

      e.e.preventDefault();

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
      console.log("RC: ", e);
    });

    editor.on("zoom translate nodetranslate", () => {
      contextmenu = "";
    });
  });
</script>

<Rete />
<ContextMenu mode={contextmenu} {pos} on:newdialogue={() => modal = "newdialogue"} />
{#if modal == "newdialogue"}
  <ModalDialogue/> 
{/if}

import Rete from "rete";
import ConnectionPlugin from "rete-connection-plugin";
import SvelteRenderPlugin from "rete-svelte-render-plugin";
import Dialogue from "./rete-components/dialogue";
import AreaPlugin from "rete-area-plugin"

function loadPlugins(editor){
    editor.use(ConnectionPlugin)
    editor.use(SvelteRenderPlugin)

    const background = document.createElement("div");
    background.className = "rete-background";
    
    editor.use(AreaPlugin, {
        background: background,
        scaleExtent: { min: 0.1, max: 1}
    })
}


export default function createEditor(element){
    const editor = new Rete.NodeEditor("dialogue-generator@2.0.0", element)
    const engine = new Rete.Engine("dialogue-generator@2.0.0");

    loadPlugins(editor)

    let dialogue = new Dialogue()

    editor.register(dialogue)
    engine.register(dialogue)

    return editor;
}
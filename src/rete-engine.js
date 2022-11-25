import Rete from "rete";
import ConnectionPlugin from "rete-connection-plugin";
import SvelteRenderPlugin from "rete-svelte-render-plugin";
import Dialogue from "./rete-components/dialogue";

function loadPlugins(editor){
    editor.use(ConnectionPlugin)
    editor.use(SvelteRenderPlugin)
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
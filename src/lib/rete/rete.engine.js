import Rete from "rete";
import ConnectionPlugin from "rete-connection-plugin";
import SvelteRenderPlugin from "rete-svelte-render-plugin";
import Dialogue, { socket } from "./rete.components/dialogue";
import AreaPlugin from "rete-area-plugin";
import htmlToTellraw from "../tellraw/generate";
import Choose from "./rete.components/choose";
import RecursionPlugin from "./plugins/recursiondetection";
import { engine } from "../stores";


export const components = [new Dialogue(), new Choose()];

function registerComponents(editor, engine) {
    components.forEach((e) => {
        editor.register(e);
        engine.register(e);
    });
}

function loadPlugins(editor) {
    editor.use(ConnectionPlugin);
    editor.use(SvelteRenderPlugin);

    editor.use(AreaPlugin, {
        background: document.createElement("div"),
        scaleExtent: { min: 0.1, max: 1 },
    });

    editor.use(RecursionPlugin)
}

export default function createEditor(element) {
    const editor = new Rete.NodeEditor("dialogue-generator@2.0.0", element);
    const rete_engine = new Rete.Engine("dialogue-generator@2.0.0");
    engine.set(rete_engine)

    loadPlugins(editor);
    registerComponents(editor, rete_engine);

    return editor;
}

export function createDialogue(editor, input_el, time) {
    const display = input_el.innerHTML;
    const tellraw = htmlToTellraw(input_el);
    Promise.resolve(
        components[0].createNode({
            display: display,
            tellraw: tellraw,
            time: time,
        })
    ).then(function (node) {
        node.position = [editor.view.area.mouse.x, editor.view.area.mouse.y];
        node.addOutput(new Rete.Output("next", display, socket, false));
        editor.addNode(node);
        console.log(node);
    });
}

export function createChoose(editor, input_list, time){
    let outputs = [];
    input_list.forEach(input => {
        const html = input.component.innerHTML;
        const tellraw = htmlToTellraw(input.component);
        outputs.push({html: html, tellraw: tellraw})
    })
    
    Promise.resolve(
        components[1].createNode({
            time: time,
            outputs: outputs
        })
    ).then(function(node) {
        node.position = [editor.view.area.mouse.x, editor.view.area.mouse.y];
        let add = 0
        outputs.forEach((output, index) => {
            node.addOutput(new Rete.Output("next"+index, output.html, socket, false));
            add++
        })
        editor.addNode(node);
        console.log(node);
    })
}

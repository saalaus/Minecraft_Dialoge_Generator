import { NodeEditor, ClassicPreset } from "rete";
import { AreaPlugin, AreaExtensions } from "rete-area-plugin";
import {
    ConnectionPlugin,
    Presets as ConnectionPresets,
} from "rete-connection-plugin";
import { SveltePlugin, Presets } from "rete-svelte-plugin";

import htmlToTellraw from "../tellraw/generate";

import Node from "./components/Node.svelte";
import Connection from "./components/Connection.svelte";
import Socket from "./components/Socket.svelte";

async function testNodes(editor, area) {
    const socket = new ClassicPreset.Socket("socket");
    const a = new ClassicPreset.Node("A");
    a.addOutput("a", new ClassicPreset.Output(socket, "Hello world!"));
    a.addInput("b", new ClassicPreset.Input(socket));
    await editor.addNode(a);

    const b = new ClassicPreset.Node("B");
    b.addInput("b", new ClassicPreset.Input(socket));
    await editor.addNode(b);

    await editor.addConnection(new ClassicPreset.Connection(a, "a", b, "b"));

    await area.translate(a.id, { x: 0, y: 0 });
    await area.translate(b.id, { x: 270, y: 0 });
}

export default async function createEditor(element) {
    const editor = new NodeEditor();
    const render = createRender();
    const area = createArea(element);

    const connection = new ConnectionPlugin();

    connection.addPreset(ConnectionPresets.classic.setup());
    editor.use(area);
    area.use(connection);
    area.use(render);

    await testNodes(editor, area);

    return {
        destroy: () => area.destroy(),
        area: area
    };
}

function createContextMenu(render){
    const contextMenu = new ContextMenuPlugin({
        items(context, plugin) {
            if (context === "root") {
                return {
                    searchBar: false,
                    list: [
                        {
                            label: "Create dialogue",
                            key: "1",
                            handler: () => console.log(1),
                        },
                        {
                            label: "Create choose",
                            key: "2",
                            handler: () => console.log(2),
                        },
                        {
                            label: "Download datapack",
                            key: "3",
                            handler: () => console.log(3),
                        },
                    ],
                };
            }
            return {
                searchBar: false,
                list: [
                    {
                        label: "Create dialogue",
                        key: "1",
                        handler: () => console.log(1),
                    },
                ],
            };
        },
    });
    
    return contextMenu

}

function createRender() {
    const render = new SveltePlugin();
    render.addPreset(
        // @ts-ignore
        Presets.classic.setup({
            customize: {
                node() {
                    return Node;
                },
                connection() {
                    return Connection;
                },
                socket() {
                    return Socket;
                },
            },
        })
    );

    render.addPreset(Presets.contextMenu.setup());

    return render;
}

function createArea(element) {
    const area = new AreaPlugin(element);

    AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
        accumulating: { active: () => false },
    });
    AreaExtensions.restrictor(area, {
        scaling: () => ({ min: 0.1, max: 1 }),
    });

    const background = document.createElement("div");

    background.classList.add("background");
    background.classList.add("fill-area");

    area.area.content.add(background);

    return area;
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

export function createChoose(editor, input_list, time) {
    let outputs = [];
    input_list.forEach((input) => {
        const html = input.component.innerHTML;
        const tellraw = htmlToTellraw(input.component);
        outputs.push({ html: html, tellraw: tellraw });
    });

    Promise.resolve(
        components[1].createNode({
            time: time,
            outputs: outputs,
        })
    ).then(function (node) {
        node.position = [editor.view.area.mouse.x, editor.view.area.mouse.y];
        let add = 0;
        outputs.forEach((output, index) => {
            node.addOutput(
                new Rete.Output("next" + index, output.html, socket, false)
            );
            add++;
        });
        editor.addNode(node);
        console.log(node);
    });
}

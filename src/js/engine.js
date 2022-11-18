const container = $('#rete')[0];
const editor = new Rete.NodeEditor('demo@0.1.0', container);
const components = [new Dialogue()];
const background = document.createElement('div');
background.classList = 'background';


editor.use(ConnectionPlugin.default);
editor.use(Stage0RenderPlugin);
editor.use(RecursionPlugin)
editor.use(AreaPlugin, {
    background: background,
    scaleExtent: { min: 0.1, max: 1 },
})


const engine = new Rete.Engine('dialoguegenerator@0.1.0');
components.map(c => {
    editor.register(c);
    engine.register(c);
});



editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
    await engine.abort();
    await engine.process(editor.toJSON());
});

function deleteNode(node) {
    node = node ? node : editor.selected.list[0];
    for (let output of node.outputs.values()) {
        for (let connection of output.connections) {
            editor.removeConnection(connection)
        }
    }
    return editor.view.removeNode(node);
}

function unselectedNode() {
    editor.selected.clear()
    editor.nodes.map(n => n.update())
}

editor.on("contextmenu", (object) => {
    console.log(object)
    object.e.preventDefault();
    console.log(object.e.target)
    if (object.e.target == background) {
        contextmenu.toggleMenuOn("background");
        unselectedNode()
    }
    if (object.e.target.classList.contains("input") ||
        object.e.target.classList.contains("inputs") ||
        object.e.target.classList.contains("output")) {
        contextmenu.toggleMenuOn("node");
        object.node ? editor.selectNode(object.node) : null
    }
})

editor.on("zoom translate nodetranslate", () => {
    contextmenu.toggleMenuOff();
});


editor.on("keyup", (e) => {
    if (e.keyCode === 27) {
        contextmenu.toggleMenuOff();
    }
})
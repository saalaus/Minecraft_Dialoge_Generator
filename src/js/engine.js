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


const engine = new Rete.Engine('demo@0.1.0');
components.map(c => {
    editor.register(c);
    engine.register(c);
});



editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
    await engine.abort();
    await engine.process(editor.toJSON());
});

editor.on("contextmenu", (object) => {
    console.log(object)
    object.e.preventDefault();
    console.log(object.e.target)
    if (object.e.target == background){
        positionMenu();
        toggleMenuOn();
    }
})
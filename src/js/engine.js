const container = $('#rete')[0];
const editor = new Rete.NodeEditor('demo@0.1.0', container);
const components = [new Dialogue()];

editor.use(ConnectionPlugin.default);
editor.use(Stage0RenderPlugin);


const engine = new Rete.Engine('demo@0.1.0');
components.map(c => {
    editor.register(c);
    engine.register(c);
});



editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
    await engine.abort();
    await engine.process(editor.toJSON());
});

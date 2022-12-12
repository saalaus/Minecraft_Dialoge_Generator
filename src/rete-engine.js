import Rete from "rete";
import ConnectionPlugin from "rete-connection-plugin";
import SvelteRenderPlugin from "rete-svelte-render-plugin";
import Dialogue from "./rete-components/dialogue";
import AreaPlugin from "rete-area-plugin";

export const components = [new Dialogue()];

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
}

export default function createEditor(element) {
  const editor = new Rete.NodeEditor("dialogue-generator@2.0.0", element);
  const engine = new Rete.Engine("dialogue-generator@2.0.0");

  loadPlugins(editor);
  registerComponents(editor, engine);

  return editor;
}

function createDialogue(editor) {
  const pos = [editor.view.area.mouse.x, editor.view.area.mouse.y];
  const display = $input_text.innerHTML;
  const tellraw = htmlToTellraw($input_text);
  Promise.resolve(
    components[0].createNode({
      display: display,
      tellraw: tellraw,
      time: time,
    })
  ).then(function (node) {
    node.position = pos;
    node.addOutput(new Rete.Output("next", display, socket, false));
    editor.addNode(node);
    node.update();
  });
}

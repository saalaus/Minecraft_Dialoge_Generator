// components
const socket = new Rete.Socket('');




class Dialogue extends Rete.Component {
    constructor() {
        super('Dialogue')
    }

    builder(node) {
        node.addInput(new Rete.Input('prev', '', socket, false));
    }

    worker(node, inputs, outputs) {
        //   outputs['num'] = node.data.num;
    }
}

// components gen

function makeDialogue(display, tellraw, time, pos){
    if (!pos) pos = [editor.view.area.mouse.x, editor.view.area.mouse.y];
    Promise.resolve(components[0].createNode({ display: display, tellraw: tellraw, time: time })).then(function(node){
        node.position = pos;
        node.addOutput(new Rete.Output('next', display, socket, false));
        editor.addNode(node);
        node.update();
    });
}
import Rete from "rete";

export const socket = new Rete.Socket("any");

export default class Dialogue extends Rete.Component {
    constructor() {
        super("Dialogue");
    }

    builder(node) {
        node.addInput(new Rete.Input("prev", "", socket, false));
    }

    // worker(node, inputs, outputs) {
    //     console.log(node, inputs, outputs);
    //     if (inputs[0]){
    //         outputs.next = inputs.prev[0] + JSON.stringify(node.data.tellraw);
    //     }
    //     else{
    //         outputs.next = JSON.stringify(node.data.tellraw);
    //     }
    // }

    code(node, inputs, data) {
        console.log(node, inputs)
        let time = node.data.time
        const trigger = inputs.prev[0]?inputs.prev[0].trigger:1
        if (inputs.prev[0] != undefined) {
            time = time + inputs.prev[0].time;
        }
        const cmd = `tellraw @a[scores={${data.timer}=${time},${
            data.trigger
        }=${trigger}}] ${JSON.stringify(node.data.tellraw)}\n`;
        return {
            cmd: cmd,
            outputs: { next: {time: node.data.time, trigger: trigger} },
        };
    }
}

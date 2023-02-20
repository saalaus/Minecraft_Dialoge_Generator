import Rete from "rete";

export const socket = new Rete.Socket("any")

export default class Dialogue extends Rete.Component {
    constructor() {
        super("Dialogue");
    }

    builder(node) {
        node.addInput(new Rete.Input('prev', '', socket, false));
    }

    worker(node, input, output) {
        output["num"] = node.data.num;
    }
}


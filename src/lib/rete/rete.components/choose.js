import Rete from "rete";
import { socket } from "./dialogue";

export default class Choose extends Rete.Component {
    constructor() {
        super("Choose");
    }

    builder(node) {
        node.addInput(new Rete.Input("prev", "", socket, false));
    }

    worker(node, input, output) {
        output["num"] = node.data.num;
    }
}

import Rete from "rete";
import Node from "rete-svelte-render-plugin"

export default class Dialogue extends Rete.Component {
  constructor() {
    super("Dialogue");
    this.data.component = Node.Dialogue;
  }

  builder(node) {
    node.addOutput(
      new Rete.Output("num", "Number", new Rete.Socket("Number value"))
    );
    node.addOutput(
      new Rete.Output("num2", "Number", new Rete.Socket("Number value"))
    );
    node.addOutput(
      new Rete.Output("num3", "Number", new Rete.Socket("Number value"))
    );
    node.addInput(
      new Rete.Input("out1", "test", new Rete.Socket("Number value"))
    );
  }

  worker(node, input, output) {
    outputs["num"] = node.data.num;
  }
}
        outputs['num'] = node.data.num;
    }
}

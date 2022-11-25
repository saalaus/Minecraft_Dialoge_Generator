import Rete from "rete";
import Node from "rete-svelte-render-plugin"

export default class Dialogue extends Rete.Component{
    constructor(){
        super("Dialogue")
        this.data.component = Node.Dialogue
    }

    builder(node){
        let out = new Rete.Output('num', 'Number', new Rete.Socket('Number value'));

        node.addOutput(out);
    }

    worker(node, input, output){
        outputs['num'] = node.data.num;
    }
}
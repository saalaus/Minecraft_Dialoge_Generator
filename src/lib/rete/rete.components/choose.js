import Rete from "rete";
import { socket } from "./dialogue";

export default class Choose extends Rete.Component {
    constructor() {
        super("Choose");
    }

    builder(node) {
        node.addInput(new Rete.Input("prev", "", socket, false));
    }

    code(node, inputs, data) {
        let tellraw = [];
        let outputs = [];
        let time = node.data.time;
        const trigger = inputs.prev[0] ? inputs.prev[0].trigger : 1;
        
        if (inputs.prev[0] != undefined) {
            time = time + inputs.prev[0].time;
        }
        
        node.data.outputs.forEach((output, index) => {
            output.tellraw.forEach((output2) => {
                output2.clickEvent = {
                    action: "run_command",
                    value: `/trigger talk.trigger set ${trigger + index + 1}`,
                };
            });
            tellraw.push(output.tellraw);
        
        });
        let cmd = `tellraw @a[scores={${data.timer}=${time},${
            data.trigger
        }=${trigger}}] ${JSON.stringify(tellraw)}\n`;
        cmd += `scoreboard players enable @a[scores={talk.trigger=${trigger},talk.timer=${time}}] talk.trigger\nscoreboard players set @a[scores={talk.trigger=${trigger},talk.timer=${time}}] talk.trigger 0\n`;
        
        Object.keys(node.outputs).forEach((key, index) => {
            outputs[key] = { trigger: trigger + index + 1, time: time };
        });

        return {
            cmd: cmd,
            outputs: outputs,
        };
    }
}

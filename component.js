const anyType = new Rete.Socket('Any type');
var text = ""
var result = ""
var time_worker = 0
var choose
var trigger = 0
var max_time = 1
var max_trigger = 1

var scores_name_trigger = ""
var scores_name_timer = ""

class Text extends Rete.Component {
    constructor() {
        super('Dialogue');
    }

    builder(node) {
        var prev = node.addInput(new Rete.Input('prev', "", anyType, false))
    }

    worker(node, inputs, outputs) {
        if (inputs['prev'].length != 0) {
            let time = Number(node.data.time) + Number(inputs['prev'][0].time)
            if(time > max_time){
                max_time = time
            }
            result += "tellraw @a[scores={" + scores_name_trigger + "=" + inputs['prev'][0].tag + "," + scores_name_timer + "=" + time + "}] " + node.data.text + "\n"
            outputs['next'] = {
                "tag": inputs['prev'][0].tag,
                "time": time
            }
        } else {
            max_time = Number(node.data.time)
            trigger = 0//document.getElementById('tri_def').value
            result += "tellraw @a[scores={" + scores_name_trigger + "="+trigger+"," + scores_name_timer + "=" + node.data.time + "}] " + node.data.text + "\n"
            outputs['next'] = {
                "tag": trigger,
                "time": Number(node.data.time)
            }
        }
    }
}


class Choose extends Rete.Component {
    constructor() {
        super('Choose');
        this.data.component = Node;
    }

    builder(node) {
        var prev = node.addInput(new Rete.Input('prev', '', anyType, false))
    }

    worker(node, inputs, outputs) {
        var chos = []
        if (inputs['prev'].length != 0) {
            let time = Number(node.data.time) + Number(inputs['prev'][0].time)
            if(time > max_time){
                max_time = time
            }
            for (let i = 0; i < node.data.choose.length; i++) {
                trigger++
                let trig_cmd = "/trigger " + scores_name_trigger + " set " + trigger
                node.data.choose[i].text.clickEvent = {
                    "action": "run_command",
                    "value": trig_cmd
                }
                result += "tellraw @a[scores={" + scores_name_trigger + "=" + inputs['prev'][0].tag + "," + scores_name_timer + "=" + time + "}] " + JSON.stringify(node.data.choose[i].text) + "\n"
                outputs['next' + i] = {
                    "tag": trigger,
                    "time": 1
                }
                if (i == node.data.choose.length - 1) {
                    result += "scoreboard players enable @a[scores={" + scores_name_trigger + "=" + inputs['prev'][0].tag + "," + scores_name_timer + "=" + time + "}] " + scores_name_trigger + "\n" + "scoreboard players set @a[scores={" + scores_name_trigger + "=" + inputs['prev'][0].tag + "," + scores_name_timer + "=" + time + "}] " + scores_name_trigger + " 0\n"
                    max_trigger = trigger
                }
            }
        } else {
            var value = 0//document.getElementById('tri_def').value
            let time = node.data.time
            max_time = Number(time)
            trigger = value
            for (let i = 0; i < node.data.choose.length; i++) {
                trigger++
                let trig_cmd = "/trigger " + scores_name_trigger + " set " + trigger
                node.data.choose[i].text.clickEvent = {
                    "action": "run_command",
                    "value": trig_cmd
                }
                result += "tellraw @a[scores={" + scores_name_trigger + "=" + value + "," + scores_name_timer + "=" + time + "}] " + JSON.stringify(node.data.choose[i].text) + "\n"
                outputs['next' + i] = {
                    "tag": trigger,
                    "time": 1
                }
                if (i == node.data.choose.length - 1) {
                    result += "scoreboard players enable @a[scores={" + scores_name_trigger + "=" + value + "," + scores_name_timer + "=" + time + "}] " + scores_name_trigger + "\n" + "scoreboard players set @a[scores={" + scores_name_trigger + "=" + 1 + "," + scores_name_timer + "=" + time + "}] " + scores_name_trigger + " 0\n"
                    max_trigger = trigger
                }
            }
        }
    }
}

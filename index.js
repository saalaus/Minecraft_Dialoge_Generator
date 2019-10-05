/*jshint esversion: 8 */
var container = document.querySelector('#rete');
var editor = null;


var editor = new Rete.NodeEditor("demo@0.1.0", container);
editor.use(ConnectionPlugin);
editor.use(AlightRenderPlugin);
editor.use(AreaPlugin);
// editor.use(MinimapPlugin.default);
// editor.use(MinimapPlugin);

var engine = new Rete.Engine("demo@0.1.0");

[new Text(), new Choose()].map(c => {
    editor.register(c);
    engine.register(c);
});


var dialog = null;
var chose = null;
var trigger_name = 'random_trigger';
var timer_name = 'random_timer';


editor.on("process", () => {
    requestAnimationFrame(async () => {
        await engine.abort();
        await engine.process(editor.toJSON());
    });
});

function upd() {
    var output_html = document.getElementsByClassName("output-title");
    for (let lol = 0; lol < output_html.length; lol++) {
        if (output_html[lol].classList[1] !== "add") {
            output_html[lol].innerHTML = output_html[lol].innerText;
            output_html[lol].classList.add("add");
        }
    }
}
editor.on('nodecreated', node => {
    upd();
});

editor.view.resize();

var components = [new Text(), new Choose()];

async function createDialog(display, text) {
    var n1 = await components[0].createNode();
    n1.position = [editor.view.area.mouse.x, editor.view.area.mouse.y];
    n1.data.time = 0;
    n1.data.text = text;
    n1.data.display = display;
    n1.addOutput(new Rete.Output('next', n1.data.display, anyType, false));
    editor.addNode(n1);
    $('.dialogue').oncontextmenu = function (event) {
        close_contextmenu();
        show_contextmenu([{
            text: 'Edit',
            onclick: edit_node
        }, {
            text: 'Delete',
            onclick: "editor.removeNode(editor.selected.list[0])"
        }], [event.pageX, event.pageY]);
    };
    $('.dialogue').onmouseover = function () {
        mouse_over_dialoge = true;
    };
    $('.dialogue').onmouseout = function () {
        mouse_over_dialoge = false;
    };
}

async function createChoose(display, text) {
    components[1] = new Choose();
    choo = await components[1].createNode();
    choo.position = [editor.view.area.mouse.x, editor.view.area.mouse.y];
    choo.addOutput(new Rete.Output('next0', display, anyType, false));
    choo.data.time = 0;
    choo.data.choose = [];
    choo.data.choose.push({
        "text": JSON.parse(text),
        "display": display
    });
    editor.addNode(choo);
    $('.choose').oncontextmenu = function (event) {
        close_contextmenu();
        show_contextmenu([{
            text: 'Edit',
            onclick: edit_node
        }, {
            text: "Add Choose",
            onclick: add_choose_modal
        }, {
            text: 'Delete',
            onclick: "editor.removeNode(editor.selected.list[0])"
        }], [event.pageX, event.pageY]);
    };
    $('.choose').onmouseover = function () {
        mouse_over_dialoge = true;
    };
    $('.choose').onmouseout = function () {
        mouse_over_dialoge = false;
    };
}

function new_choose() {
    var node = editor.selected.list[0];
    let choose = gen_cmd();
    let display = document.getElementById('textarea').innerHTML;
    node.addOutput(new Rete.Output('next' + node.data.choose.length, display, anyType, false));
    node._alight.scan();
    node.data.choose.push({
        "text": JSON.parse(choose),
        "display": display
    });
    upd();
}

function add_choose() {
    var node = editor.selected.list[0];
    let choose = gen_cmd();
    let display = document.getElementById('textarea').innerHTML.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    // if (node !== undefined && node.name == "Choose") {
    //   node.addOutput(new Rete.Output('next' + node.data.choose.length, display, anyType, false));
    // node._alight.scan()
    //  node.data.choose.push(JSON.parse(choose))
    //  } else {
    createChoose(display, choose);
    //  }
    // if (document.getElementById('clear').checked == true) {
    //    document.getElementById('textarea').innerHTML = ''
    //}
}


function add_text() {
    let text = gen_cmd();
    let display = document.getElementById('textarea').innerHTML.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    createDialog(display, text);
    // if (document.getElementById('clear').checked == true) {
    //    document.getElementById('textarea').innerHTML = ''
    //}
}

// function removenode() {
//     if (editor.selected.list.length != 0) {
//         editor.removeNode(editor.selected.list[0])
//         editor.selected.clear()
//     } else {
//         alert('Сначала выделите узел!')
//     }
//     document.getElementsByClassName('select')[0].hidden = true
// }

editor.on('selectnode', node => {
    //
});


function add_time() {
    var node = editor.selected.list[0];
    var time = document.getElementById('numb').value;
    if (node !== undefined) {
        node.data.time = time;
        alert('Delay ' + time + ' maked!');
        node._alight.scan();
    } else {
        alert('Select node!');
    }
}

function maketag() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function make_namespace() {
    let text = "";
    let possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


function down_func() {
    if (trigger_name == 'random_trigger') {
        scores_name_trigger = maketag() + "_trigger";
    } else {
        scores_name_trigger = trigger_name;
    }
    if (timer_name == 'random_timer') {
        scores_name_timer = maketag() + "_timer";
    } else {
        scores_name_timer = timer_name;
    }
    result = "scoreboard objectives add " + scores_name_trigger + " trigger\nscoreboard objectives add " + scores_name_timer + " dummy\nscoreboard players add @a[scores={" + scores_name_trigger + "=1..}] " + scores_name_timer + " 1\nscoreboard players set @a[scores={" + scores_name_trigger + "=0}] " + scores_name_timer + " 0\n";
    if (document.getElementById('feedback').checked == true) {
        result += "gamerule sendCommandFeedback false\n";
    }
    Promise.resolve(engine.process(editor.toJSON())).then(function (value) {
        result += "scoreboard players set @a[scores={" + scores_name_trigger + "=" + document.getElementById('tri_def').value + ".." + max_trigger + "," + scores_name_timer + "=" + max_time + "}] " + scores_name_trigger + " 0\nscoreboard players set @a[scores={" + scores_name_timer + "=" + max_time + "}] " + scores_name_timer + " 0";
        var blob = new Blob([result], {
            type: "text/plain;charset=utf-8"
        });
        let file_name = 'dialoge_' + maketag();
        saveAs(blob, file_name + ".mcfunction");
    }, function (value) {
        alert(value);
    });
}

function download_zip() {
    var zip = new JSZip();
    //if (trigger_name == 'random_trigger') {
    scores_name_trigger = maketag() + "_trigger";
    //} else {
    //   scores_name_trigger = trigger_name
    //  }
    // if (timer_name == 'random_timer') {
    scores_name_timer = maketag() + "_timer";
    // } else {
    //    scores_name_timer = timer_name
    //  }
    result = "scoreboard players add @a[scores={" + scores_name_trigger + "=1..}] " + scores_name_timer + " 1\nscoreboard players set @a[scores={" + scores_name_trigger + "=0}] " + scores_name_timer + " 0\n";
    var datapack_name = 'dialoge_' + make_namespace();
    var namespace = make_namespace();
    zip.file(datapack_name + "/data/" + namespace + '/functions/dialoge_init.mcfunction', "scoreboard objectives add " + scores_name_trigger + " trigger\nscoreboard objectives add " + scores_name_timer + "dummy\ngamerule sendCommandFeedback false\n");
    zip.file(datapack_name + '/pack.mcmeta', '{"pack":{"pack_format":1,"description":"description"}}');
    Promise.resolve(engine.process(editor.toJSON())).then(function (value) {
        result += "scoreboard players set @a[scores={" + scores_name_trigger + "=" + 1 + ".." + max_trigger + "," + scores_name_timer + "=" + max_time + "}] " + scores_name_trigger + " 0\nscoreboard players set @a[scores={" + scores_name_timer + "=" + max_time + "}] " + scores_name_timer + " 0";
        zip.file(datapack_name + "/data/" + namespace + '/functions/dialoge_main.mcfunction', result);
        zip.file(datapack_name + "/data/minecraft/tags/functions/tick.json", '{"values":["' + namespace + ':dialoge_main"]}');
        zip.file(datapack_name + "/data/minecraft/tags/functions/load.json", '{"values":["' + namespace + ':dialoge_init"]}');
        zip.generateAsync({
                type: "blob"
            })
            .then(function (content) {
                // see FileSaver.js
                saveAs(content, "datapack.zip");
            });
    }, function (value) {
        alert(value);
    });
}

var mouse_over_dialoge = false;

function show_contextmenu(menu, e) {

    $("#menu").innerHTML = "";
    for (let wrath = 0; wrath < menu.length; wrath++) {
        $('#menu').innerHTML += `<li onclick="${menu[wrath].onclick}">${menu[wrath].text}</li>`;
        $('#context-menu-container').style.left = `${e[0]}px`;
        $('#context-menu-container').style.top = `${e[1]}px`;
        $("#context-menu-container").style.display = "block";
    }
}

function close_contextmenu() {
    $("#context-menu-container").style.display = "none";
}

function modal(head, body, footer) {
    $('#head').innerHTML = `<h2>${head}</h2>`;
    $('#body').innerHTML = `<p>${body}</p>`;
    $('#foot').innerHTML = `<h3>${footer}</h3>`;
    $('.modal').style.display = 'block';
}

// закрыть модальное окно
function closeModal() {
    $('.modal').style.display = "none";
}

document.onclick = function () {
    close_contextmenu();
};

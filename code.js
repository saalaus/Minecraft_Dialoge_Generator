var json = {
    text1: {}
}
var prev = "";
var c = 1;
var cmd = '';
var cmd_c = 0;

function $(element) {
    return document.querySelector(element);
}

// при загрузке страницы
window.onload = function () {
    rangy.init();
};

function makeClass(clas) {
    if (prev != clas && clas != 'obs' && clas != 'bold' && clas != 'italic' && clas != 'underline' && clas != 'strikeThrough') {
        var edits = rangy.createClassApplier(prev, {
            useExistingElements: false,
            applyToEditableOnly: true
        });
        edits.undoToSelection();
    }
    var make = rangy.createClassApplier(clas, {
        useExistingElements: false,
        applyToEditableOnly: true
    });
    make.toggleSelection();
}


// форматирование текста
function edit(cmd, args) {
    var editor = document.getElementById('textarea');
    document.execCommand(cmd, false, args);
    editor.focus();
}


function gen_tellaw(oParent) {
    if (oParent.hasChildNodes()) {
        for (var oNode = oParent.firstChild; oNode; oNode = oNode.nextSibling) {
            if (oNode.nodeName == "#text") {
                json['text' + c]['text'] = oNode.textContent;
                for (var pNode = oNode.parentNode; pNode; pNode = pNode.parentNode) {
                    if (pNode.nodeName == "SPAN" && pNode.className == 'bold') {
                        json['text' + c]['bold'] = true;
                    }
                    if (pNode.nodeName == "SPAN" && pNode.className == 'italic') {
                        json['text' + c]['italic'] = true;
                    }
                    if (pNode.nodeName == "SPAN" && pNode.className == 'underline') {
                        json['text' + c]['underlined'] = true;
                    }
                    if (pNode.nodeName == "SPAN" && pNode.className == 'strikeThrough') {
                        json['text' + c]['strikethrough'] = true;
                    }
                    if (pNode.nodeName == 'SPAN' && pNode.className == 'obs') {
                        json['text' + c]['obfuscated'] = true;
                    }
                    if (pNode.nodeName == 'SPAN' && pNode.className != 'obs' && pNode.className != 'bold' && pNode.className != 'italic' && pNode.className != 'underline' && pNode.className != 'strikeThrough') {
                        json['text' + c]['color'] = pNode.className;
                    }
                }
                c++;
                json['text' + c] = {};
            }
            gen_tellaw(oNode);

        }
    }
}

function gen_cmd(e) {
    if (e) {
        gen_tellaw(e);
    } else {
        gen_tellaw(document.getElementById('textarea'));
    }
    cmd_c = 0
    cmd = ''
    for (var key in json) {
        if (JSON.stringify(json[key]) == '{}') {
            if (key == 'text2') {
                delete command.extra;
            }
            break
        }
        if (cmd_c == 0) {
            var command = json['text1'];
            command.extra = []
            cmd_c++
        } else {
            command.extra.push(json[key]);
        }
    }
    cmd = JSON.stringify(command);
    cmd = cmd.replace(' ', ' ');
    json = {};
    json['text1'] = {};
    c = 1
    return cmd;
}

const dialoge_modal = `modal('Make new Dialogue',toolbar+time_input,button_add_text);`;
const choose_modal = `modal('Make new Choose',toolbar+time_input,button_add_choose)`;
const add_choose_modal = `modal('Add new choose',toolbar,button_add_new_choose)`;
const edit_node = `modal('Edit',edit_gui(),button_edit_accept)`
const download = `download_zip()`

let toolbar = `<button onclick="makeClass('bold')">B</button>
<button onclick="makeClass('italic')">I</button>
<button onclick="makeClass('underline')">U</button>
<button onclick="makeClass('strikeThrough')">S</button>
<button onclick="makeClass('obs')">O</button>`
toolbar += `<button onclick="document.getElementById('textarea').innerHTML = '' ">C</button>`
toolbar += `<select id="chooseColor" onchange="makeClass(this.options[this.selectedIndex].value);prev = this.options[this.selectedIndex].value;this.selectedIndex = 0">
<option value="none">Choose Color</option>
 <option value="white">White</option>
 <option value="black">Black</option>
 <option value="dark_blue">Dark Blue</option>
 <option value="dark_green">Dark Green</option>
 <option value="dark_aqua">Dark Aqua</option>
 <option value="dark_red">Dark Red</option>
 <option value="dark_purple">Dark Purple</option>
 <option value="gold">Gold</option>
 <option value="gray">Gray</option>
 <option value="dark_gray">Dark Gray</option>
 <option value="blue">Blue</option>
 <option value="green">Green</option>
 <option value="aqua">Aqua</option>
 <option value="red">Red</option>
 <option value="light_purple">Light Purple</option>
 <option value="yellow">Yellow</option>
</select>`;
toolbar += `<div id='textarea' contenteditable="true"></div>`;

const time_input = `<br><input type="number" value="1" id="time">`
const button_add_text = `<button id="BUTTONADDTEXT" onclick="add_text();closeModal()">Make</button>`;
const button_add_choose = `<button id="BUTTONADDTEXT" onclick="add_choose();closeModal()">Make</button>`;
const button_add_new_choose = `<button id="BUTTONADDTEXT" onclick="new_choose();closeModal()">Make</button>`;
const button_edit_accept = `<button id="BUTTONADDTEXT" onclick="accept_edit();closeModal()">Accept</button>`;

function edit_gui() {
    let selected = editor.selected.list[0];
    let gui = `<button onclick="makeClass('bold')">B</button>
    <button onclick="makeClass('italic')">I</button>
    <button onclick="makeClass('underline')">U</button>
    <button onclick="makeClass('strikeThrough')">S</button>
    <button onclick="makeClass('obs')">O</button>`
    gui += `<select id="chooseColor" onchange="makeClass(this.options[this.selectedIndex].value);prev = this.options[this.selectedIndex].value;this.selectedIndex = 0">
<option value="none">Choose Color</option>
 <option value="white">White</option>
 <option value="black">Black</option>
 <option value="dark_blue">Dark Blue</option>
 <option value="dark_green">Dark Green</option>
 <option value="dark_aqua">Dark Aqua</option>
 <option value="dark_red">Dark Red</option>
 <option value="dark_purple">Dark Purple</option>
 <option value="gold">Gold</option>
 <option value="gray">Gray</option>
 <option value="dark_gray">Dark Gray</option>
 <option value="blue">Blue</option>
 <option value="green">Green</option>
 <option value="aqua">Aqua</option>
 <option value="red">Red</option>
 <option value="light_purple">Light Purple</option>
 <option value="yellow">Yellow</option>
    </select>`;
    if (selected.name == "Dialogue") {
        gui += `<div class='textarea' contenteditable="true">${selected.data.display}</div>`
        gui += `<button onclick="editor.removeNode(editor.selected.list[0]);closeModal()">Delete</button>`
    } else {
        for (let h = 0; h < selected.data.choose.length; h++) {
            gui += `<div class='textarea' contenteditable="true">${selected.data.choose[h].display}</div>`
            gui += `<button class="${h}" onclick="if(document.getElementsByClassName('textarea').length == 1){editor.removeNode(editor.selected.list[0]);closeModal()};document.getElementsByClassName('textarea')[Number(this.getAttribute('class'))].remove();this.remove();updModal();">Delete</button>`
        }
        gui += `<button onclick="document.getElementById('body').insertBefore(createDiv()[0],this);document.getElementById('body').insertBefore(createDiv()[1],this)">Add</button>`
    }
    gui += `<br><input type="number" value="${selected.data.time}" id="time">`
    return gui
}

function createDiv() {
    var button_delete = document.createElement('button')
    button_delete.innerText = "Delete"
    button_delete.className = document.getElementsByClassName('textarea').length - 1
    button_delete.onclick = function () {
        if (document.getElementsByClassName('textarea').length == 1) {
            editor.removeNode(editor.selected.list[0]);
            closeModal()
        };
        document.getElementsByClassName('textarea')[Number(this.getAttribute('class'))].remove();
        updModal();
        this.remove()
    }
    var div = document.createElement('div');
    div.contentEditable = true
    div.className = "textarea"
    return [div, button_delete]
}

function updModal() {
    let element = document.getElementsByClassName('textarea')
    let array = []
    for (let me = 0; me < element.length; me++) {
        array.push(element[me].innerHTML)
    }
    let gui = `<button onclick="makeClass('bold')">B</button>
    <button onclick="makeClass('italic')">I</button>
    <button onclick="makeClass('underline')">U</button>
    <button onclick="makeClass('strikeThrough')">S</button>
    <button onclick="makeClass('obs')">O</button>`
    gui += `<select id="chooseColor" onchange="makeClass(this.options[this.selectedIndex].value);prev = this.options[this.selectedIndex].value;this.selectedIndex = 0">
<option value="none">Choose Color</option>
 <option value="white">White</option>
 <option value="black">Black</option>
 <option value="dark_blue">Dark Blue</option>
 <option value="dark_green">Dark Green</option>
 <option value="dark_aqua">Dark Aqua</option>
 <option value="dark_red">Dark Red</option>
 <option value="dark_purple">Dark Purple</option>
 <option value="gold">Gold</option>
 <option value="gray">Gray</option>
 <option value="dark_gray">Dark Gray</option>
 <option value="blue">Blue</option>
 <option value="green">Green</option>
 <option value="aqua">Aqua</option>
 <option value="red">Red</option>
 <option value="light_purple">Light Purple</option>
 <option value="yellow">Yellow</option>
    </select>`
    document.getElementById('body').innerHTML = ""
    for (let h = 0; h < array.length; h++) {
        gui += `<div class='textarea' contenteditable="true">${array[h]}</div>`
        gui += `<button class="${h}" onclick="if(document.getElementsByClassName('textarea').length == 1){editor.removeNode(editor.selected.list[0]);closeModal()};document.getElementsByClassName('textarea')[Number(this.getAttribute('class'))].remove();updModal();this.remove();">Delete</button>`
    }
    gui += `<button onclick="document.getElementById('body').insertBefore(createDiv()[0],this);document.getElementById('body').insertBefore(createDiv()[1],this);updModal()">Add</button>`
    document.getElementById('body').innerHTML = gui
}

function accept_edit() {
    let selected = editor.selected.list[0]
    if (selected.name == "Dialogue") {
        selected.removeOutput(new Rete.Output('next', "", anyType, false))
        selected.data.display = document.getElementsByClassName('textarea')[0].innerHTML
        selected.data.text = gen_cmd(document.getElementsByClassName('textarea')[0])
        selected.addOutput(new Rete.Output('next', selected.data.display, anyType, false))
        selected._alight.scan()
        closeModal()
        upd()
    } else {
        let element = document.getElementsByClassName('textarea')
        selected.data.choose = []
        selected.outputs.forEach(function (node) {
            selected.removeOutput(node)
        })
        for (let me = 0; me < element.length; me++) {
            selected.data.choose.push({
                "display": element[me].innerHTML,
                "text": gen_cmd(element[me])
            })
            selected.addOutput(new Rete.Output(`next${me}`, selected.data.choose[me].display, anyType, false))
            selected._alight.scan()
            selected.data.choose[me].text = JSON.parse(selected.data.choose[me].text)
            closeModal()
            upd()
        }
    }
    selected.data.time = document.getElementById('time').value
}

var json = {}
json['text1'] = {}
var prev = ""
var c = 1
var cmd = ''
var cmd_c = 0

// при загрузке страницы
window.onload = function () {
    rangy.init();
};

function makeClass(clas) {
    if (prev != clas && clas != 'obs' && clas != 'bold' && clas != 'italic' && clas != 'underline' && clas != 'strikeThrough') {
        var edits = rangy.createClassApplier(prev, {
            useExistingElements: false,
            applyToEditableOnly: true
        })
        edits.undoToSelection()
    }
    var make = rangy.createClassApplier(clas, {
        useExistingElements: false,
        applyToEditableOnly: true
    })
    make.toggleSelection()
}


// форматирование текста
function edit(cmd, args) {
    var editor = document.getElementById('textarea')
    document.execCommand(cmd, false, args)
    editor.focus()
}


function gen_tellaw(oParent) {
    if (oParent.hasChildNodes()) {
        for (var oNode = oParent.firstChild; oNode; oNode = oNode.nextSibling) {
            if (oNode.nodeName == "#text") {
                json['text' + c]['text'] = oNode.textContent
                for (var pNode = oNode.parentNode; pNode; pNode = pNode.parentNode) {
                    if (pNode.nodeName == "SPAN" && pNode.className == 'bold') {
                        json['text' + c]['bold'] = true
                    }
                    if (pNode.nodeName == "SPAN" && pNode.className == 'italic') {
                        json['text' + c]['italic'] = true
                    }
                    if (pNode.nodeName == "SPAN" && pNode.className == 'underline') {
                        json['text' + c]['underlined'] = true
                    }
                    if (pNode.nodeName == "SPAN" && pNode.className == 'strikeThrough') {
                        json['text' + c]['strikethrough'] = true
                    }
                    if (pNode.nodeName == 'SPAN' && pNode.className == 'obs') {
                        json['text' + c]['obfuscated'] = true
                    }
                    if (pNode.nodeName == 'SPAN' && pNode.className != 'obs' && pNode.className != 'bold' && pNode.className != 'italic' && pNode.className != 'underline' && pNode.className != 'strikeThrough') {
                        json['text' + c]['color'] = pNode.className
                    }
                }
                c++
                json['text' + c] = {}
            }
            gen_tellaw(oNode);

        }
    }
}

function gen_cmd() {
    gen_tellaw(document.getElementById('textarea'))
    cmd_c = 0
    cmd = ''
    for (var key in json) {
        if (JSON.stringify(json[key]) == '{}') {
            if (key == 'text2') {
                delete command.extra
            }
            break
        }
        if (cmd_c == 0) {
            var command = json['text1']
            command.extra = []
            cmd_c++
        } else {
            command.extra.push(json[key])
        }
    }
    cmd = JSON.stringify(command)
    cmd = cmd.replace(' ', ' ')
    json = {};
    json['text1'] = {};
    c = 1
    return cmd
}

function CustomAlert() {
    this.render = function () {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH + "px";
        dialogbox.style.left = (winW / 2) - (550 * .5) + "px";
        dialogbox.style.top = "100px";
        dialogbox.style.display = "block";
    }
    this.ok = function () {
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
    }
    this.delete = function () {
        editor.clear()
        document.getElementById('textarea').innerHTML = ''
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
    }
}
var Alert = new CustomAlert();

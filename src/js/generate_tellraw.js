let json = {}
let iter = 1

rangy.init();
bold = rangy.createClassApplier("bold");
italic = rangy.createClassApplier("italic");
underline = rangy.createClassApplier("underline");
strike = rangy.createClassApplier("strike");
obfuscated = rangy.createClassApplier("obfuscated");

white = rangy.createClassApplier("white");
black = rangy.createClassApplier("black");
dark_blue = rangy.createClassApplier("dark_blue");
dark_green = rangy.createClassApplier("dark_green");
dark_aqua = rangy.createClassApplier("dark_aqua");
dark_red = rangy.createClassApplier("dark_red");
dark_purple = rangy.createClassApplier("dark_purple");
gold = rangy.createClassApplier("gold");
gray = rangy.createClassApplier("gray");
dark_gray = rangy.createClassApplier("dark_gray");
blue = rangy.createClassApplier("blue");
green = rangy.createClassApplier("green");
aqua = rangy.createClassApplier("aqua");
red = rangy.createClassApplier("red");
light_purple = rangy.createClassApplier("light_purple");
yellow = rangy.createClassApplier("yellow");

const all_color = [white, black, dark_blue, dark_green, dark_aqua, dark_red, dark_purple, gold, gray, dark_gray, blue, green, aqua, red, light_purple, yellow];
const all_applier = [bold, italic, underline, strike, obfuscated].concat(all_color);


function isSelectInTag(tag) {
    return tag.isAppliedToSelection();
}


function allTestApplier() {
    let tests = [];
    for (let i in all_applier) {
        tests[i] = isSelectInTag(all_applier[i]);
    }
    return tests;
}

function isSelectedText() {
    return window.getSelection().toString() ? true : false;
}


// const create_btn = document.getElementById("create-btn")
// create_btn.onclick = () => {
//     json = {}
//     iter = 1
//     parseHTML()
//     makeDialogue(document.getElementById("editor").innerHTML, json, 25)
//     close_modal()
// }


function toggleButton() {
    let tests = allTestApplier();
    let found = false;
    for (let i in tests) {
        let el = document.querySelector(`button[data-format="${i}"]`);
        if (tests[i]) {
            if (el) {
                el.style = 'border: 0.0625em solid;border-radius: 0.125em 0 0 0.125em;box-shadow: rgba(0, 0, 0, 0.6) 0px 0.0625em 0.3125em inset, rgba(0, 0, 0, 0.2) 0em 0.0625em ';
            } else {
                document.getElementById('chooseColor').options[i - 4].selected = true;
                found = true;
            }
        }
        if (!tests[i] && el) {
            el.style = '';
        }
        if (!found) {
            document.getElementById('chooseColor').options[0].selected = true;
        }

    }
    let chooseColor = document.getElementById('chooseColor');
    chooseColor.style = chooseColor.options[chooseColor.selectedIndex].style.cssText;

}


function resetAllFormat() {
    let tests = allTestApplier();
    for (let i in tests) {
        all_applier[i].undoToSelection();
    }
    toggleButton();
}


function changeColor(color) {
    for (let clr in all_color) {
        all_color[clr].undoToSelection();
        if (all_color[clr].className == color) {
            all_color[clr].toggleSelection();
        }
    }
    toggleButton();
    let chooseColor = document.getElementById('chooseColor');
    chooseColor.style = chooseColor.options[chooseColor.selectedIndex].style.cssText;
    focus();
}


function parseHTML(node) {
    node = !node?document.getElementById('editor'):node;
    if (node.hasChildNodes()) {
        for (var oNode = node.firstChild; oNode; oNode = oNode.nextSibling) {
            if (oNode.nodeName == "#text") {
                json['text' + iter] = {};
                json['text' + iter].text = oNode.textContent;
                for (var pNode = oNode.parentNode; pNode; pNode = pNode.parentNode) {
                    if(pNode.id == 'editor') break;
                    if (pNode.nodeName == 'SPAN') {
                        pNode.classList.forEach((className) => {
                            switch (className) {
                                case 'bold':
                                    json['text' + iter].bold = true;
                                    break;
                                case 'italic':
                                    json['text' + iter].italic = true;
                                    break;
                                case 'underline':
                                    json['text' + iter].underlined = true;
                                    break;
                                case 'strike':
                                    json['text' + iter].strikethrough = true;
                                    break;
                                case 'obfuscated':
                                    json['text' + iter].obfuscated = true;
                                    break;
                                default:
                                    json['text' + iter].color = className;
                                    break;
                            }
                        });
                    }
                }
                iter++;
            }
            parseHTML(oNode);
        }
    }
}



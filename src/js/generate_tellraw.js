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
    for (let applier in all_applier) {
        tests.push(isSelectInTag(all_applier[applier]));
    }
    return tests;
}


function setSelectStyle(){
    const select = document.getElementById('choice_color');
    const option = select.options[select.selectedIndex];
    const styles = getComputedStyle(option);
    select.style.backgroundColor = styles["background-color"];
    select.style.color = styles["color"];
}


function toggleButton() {
    let tests = allTestApplier();
    let found = false;
    const select = document.getElementById('choice_color')
    for (let test_index in tests) {
        let el = document.querySelector(`button[data-format="${test_index}"]`);
        if (tests[test_index]) {
            if (el) {
                el.classList.add("mc-button-toggle");
            } else {
                select.options[test_index - 4].selected = true;
                found = true;
            }
        }
        if (!tests[test_index] && el) {
            el.classList.remove("mc-button-toggle");
        }
        if (!found) {
            select.options[0].selected = true;
        }

    }
    setSelectStyle()
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
    setSelectStyle()
    focus();
}

function getParentsElements(node) {
    let nodes = []
    for (var pNode = node.parentNode; pNode; pNode = pNode.parentNode) {
        if (pNode.id == 'editor') break;
        nodes.push(pNode)
    }
    return nodes
}

document.getElementById("create_dialogue").addEventListener("click", () => {
    const tellraw = htmlToTellraw()
    const html = document.getElementById("editor").innerHTML
    console.log(tellraw)
    makeDialogue(html, tellraw)
    modal.close()
})

function htmlToTellraw(html) {
    html = !html ? document.getElementById("editor") : html;

    let json = [""];

    let text_nodes = document.createTreeWalker(html, NodeFilter.SHOW_TEXT, null, false);
    while (text_nodes.nextNode()) {
        const node = text_nodes.currentNode
        let current_json = { "text": node.textContent }
        const parent_nodes = getParentsElements(node)

        parent_nodes.forEach((node) => {
            node.classList.forEach((class_name) => {
                switch (class_name) {
                    case 'bold':
                        current_json.bold = true;
                        break;
                    case 'italic':
                        current_json.italic = true;
                        break;
                    case 'underline':
                        current_json.underlined = true;
                        break;
                    case 'strike':
                        current_json.strikethrough = true;
                        break;
                    case 'obfuscated':
                        current_json.obfuscated = true;
                        break;
                    default:
                        current_json.color = class_name;
                        break;
                }
            })
        })



        json.push(current_json);
    }
    return json

}



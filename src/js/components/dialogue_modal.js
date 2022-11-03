const dialogueModalView = stage0.h`
<div id="editor_ui" style='width: 100%;height: 100%;'>
    <div contenteditable="true" id="editor"></div>
    <div id="buttons_gui" class='noselect' >
        <div id="buttons" style='display: inline;'>
            <div class="row">
                <button onclick="bold.toggleSelection();toggleButton();" data-format="0" class='mc-button'>B</button>
                <button onclick="italic.toggleSelection();toggleButton();" data-format="1" class='mc-button'>I</button>
            </div>
            <div class="row">
                <button onclick="underline.toggleSelection();toggleButton();" data-format="2" class='mc-button'>U</button>
                <button onclick="strike.toggleSelection();toggleButton();" data-format="3" class='mc-button'>S</button>
            </div>
            <div class="row">
                <button onclick="obfuscated.toggleSelection();toggleButton();" data-format="4" class='mc-button'>O</button>
                <button onclick="resetAllFormat()" class='mc-button'>R</button>
            </div>
        </div>
        <div id="colors" style='display: inline;'>
            <select id="choice_color" onchange="changeColor(this.options[this.selectedIndex].value)">
                <option class="bg-none" value='None'>Change Color</option>
                <option value="white" class="bg-white">White</option>
                <option value="black" class="bg-black">Black</option>
                <option value="dark_blue" class="bg-dark_blue">Dark Blue</option>
                <option value="dark_green" class="bg-dark_green">Dark Green</option>
                <option value="dark_aqua" class="bg-dark_aqua">Dark Aqua</option>
                <option value="dark_red" class="bg-dark_red">Dark Red</option>
                <option value="dark_purple" class="bg-dark_purple">Dark Purple</option>
                <option value="gold" class="bg-gold">Gold</option>
                <option value="gray" class="bg-gray">Gray</option>
                <option value="dark_gray" class="bg-dark_gray">Dark Gray</option>
                <option value="blue" class="bg-blue">Blue</option>
                <option value="green" class="bg-green">Green</option>
                <option value="aqua" class="bg-aqua">Aqua</option>
                <option value="red" class="bg-red">Red</option>
                <option value="light_purple" class="bg-light_purple">Light Purple</option>
                <option value="yellow" class="bg-yellow">Yellow</option>
            </select>
        </div>
    </div>
</div>
`

function DialogueModal(){
    const root = dialogueModalView

    return root
}
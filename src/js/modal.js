var modal = document.getElementById("myModal");
var modal_header = document.getElementsByClassName("modal-header-text")[0];
var modal_body = document.getElementsByClassName("modal-body")[0];

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function close_modal(){
  modal.style.display = "none";
}


function showModalDialogue(){
    modal_header.innerText = "Create new dialogue";
    modal_body.innerHTML = main_modal;
    modal.style.display = "block";
}


let main_modal = `<div id="editor_ui" style='width: 100%;height: 100%;'>
<div id="buttons_gui" class='noselect' >
    <div id="buttons" style='display: inline;'>
        <button onclick="bold.toggleSelection();toggleButton();" data-format="0" class='sizeBtn'>B</button>
        <button onclick="italic.toggleSelection();toggleButton();" data-format="1" class='sizeBtn'>I</button>
        <button onclick="underline.toggleSelection();toggleButton();" data-format="2" class='sizeBtn'>U</button>
        <button onclick="strike.toggleSelection();toggleButton();" data-format="3" class='sizeBtn'>S</button>
        <button onclick="obfuscated.toggleSelection();toggleButton();" data-format="4" class='sizeBtn'>O</button>
        <button onclick="resetAllFormat()" class='sizeBtn'>R</button>
    </div>
    <div id="colors" style='display: inline;'>
        <select id="chooseColor" onchange="changeColor(this.options[this.selectedIndex].value)" class='sizeColor'>
            <option style='background-color: white;color:black' value='None'>Change Color</option>
            <option value="white" style='background-color: white;color:black;'>White</option>
            <option value="black" style='background-color: black;color:white;'>Black</option>
            <option value="dark_blue" style='background-color: blue;color:white;'>Dark Blue</option>
            <option value="dark_green" style='background-color: green;color:white;'>Dark Green</option>
            <option value="dark_aqua" style='background-color: darkturquoise;color:white'>Dark Aqua</option>
            <option value="dark_red" style='background-color: darkred;color:white;'>Dark Red</option>
            <option value="dark_purple" style='background-color: purple;color:white;'>Dark Purple</option>
            <option value="gold" style='background-color: gold;;color:black'>Gold</option>
            <option value="gray" style='background-color: gray;color:white;'>Gray</option>
            <option value="dark_gray" style='background-color:  dimgray;color:white;'>Dark Gray</option>
            <option value="blue" style='background-color: skyblue;;color:black'>Blue</option>
            <option value="green" style='background-color: limegreen;;color:black'>Green</option>
            <option value="aqua" style='background-color: aqua;;color:black'>Aqua</option>
            <option value="red" style='background-color: indianred;color:white;'>Red</option>
            <option value="light_purple" style='background-color: deeppink;;color:black'>Light Purple</option>
            <option value="yellow" style='background-color: yellow;color:black'>Yellow</option>
        </select>
    </div>
</div>
<div contenteditable="true" id="editor"></div>
</div>`;
const modalView = stage0.h`
<div id="create-dialogue" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
        <div class="modal-header">
            <h2 class="modal-header-text">#modal_name</h2>
        </div>
        <div class="modal-body" #modal_body>
        </div>
    <div class="modal-footer">
        <button class="mc-button button-big" id="create_dialogue">Create</button>
        <button class="mc-button button-big" #modal_close>Close</button>
    </div>
</div>`


function Modal(name){
    const root = modalView
    const refs = modalView.collect(root)

    let {modal_close, modal_name, modal_body, modal_footer} = refs

    modal_close.onclick = () => root.close()
    modal_name.nodeValue = "New Dialogue"
    modal_body.appendChild(DialogueModal())
    //root.replaceChild(DialogueModal(), modal_body)

    root.show = function(location){
        root.style.display = "block"
        newSection = route(location)
        // root.replaceChild(modal_body, DialogueModal())
    }

    root.close = function(){
        root.style.display = "none"
    }

    window.onclick = function(event) {
        if (event.target == root) {
        //   root.close();
        }
      }

    function route(location, data){
        if (location == "dialogue"){
            return DialogueModal()
        }
        if (location == "choose"){
            return
        }
    }

    root.update = function(){
        //root.replaceChild(DialogueModal(), modal_body)
    }
    return root
}

var modal = Modal()
document.body.append(modal)
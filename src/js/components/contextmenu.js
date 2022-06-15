const contextmenuView = stage0.h`
<nav class="context-menu" id="context-menu">
    <ul class="context-menu__items" #items>    
    </ul>
</nav>
`

const contextmenuItemView = stage0.h`
<li class="context-menu__item">
            <a href="#" class="context-menu__link" #item_click>
                <i class="fa"></i> #item_name
            </a>
</li>
`

function ContextmenuItem(name, callback){
    const root = contextmenuItemView
    const {item_name, item_click} = contextmenuItemView.collect(root)

    item_name.nodeValue = name
    item_click.onclick = callback

    return root
}

function ContextMenu(items_json){
    const root = contextmenuView
    const {items} = contextmenuView.collect(root)

    for (let i in items_json){
        items.appendChild(ContextmenuItem(items_json[i].name, items_json[i].callback))
    }

    return root
}

var contextmenu = ContextMenu([{name: "Create dialogue", callback: modal.show}])
document.body.append(contextmenu)
const contextmenuView = stage0.h`
<nav class="context-menu" id="context-menu">
    <ul class="context-menu__items" #items>    

    </ul>
</nav>
`


function ContextmenuItem(item, menu) {
    const getView = function () {
        return stage0.h`
        <li class="context-menu__item">
            <a href="#" class="context-menu__link" #item_click>
                #item_name
            </a>
        </li>
        `
    }

    const root = getView()
    const { item_name, item_click } = root.collect(root)

    root.update = function (name, callback) {
        item_name.nodeValue = name
        item_click.onclick = () => {callback();menu.toggleMenuOff()}
    }
    root.update(item.name, item.callback)

    return root
}

function ContextMenu() {
    const root = contextmenuView
    const { items } = contextmenuView.collect(root)
    let renderedValues = []

    const contextMenuClassName = "context-menu";
    const contextMenuActive = "context-menu--active";

    let clickCoords;
    let clickCoordsX;
    let clickCoordsY;

    const menu = root;
    let menuState = 0;
    let menuWidth;
    let menuHeight;
    let menuPosition;
    let menuPositionX;
    let menuPositionY;

    let windowWidth;
    let windowHeight;

    function getSection(section) {
        switch (section) {
            case "background":
                return [{ name: "Create dialogue", callback: modal.show},
                { name: "Create choice" },
                { name: "Download datapack" }]
            case "node":
                return [{ name: "Edit node" },
                { name: "Delete node", callback: deleteNode }]
        }
    }

    root.toggleMenuOn = (section) => {
        positionMenu();
        if (menuState !== 1) {
            menuState = 1;
            menu.classList.add(contextMenuActive);
        }
        let current_section = getSection(section)
        if (current_section != renderedValues) {
            stage0.keyed(
                'key',
                items,
                renderedValues,
                current_section,
                item => ContextmenuItem(item, root),
                (node, item) => node.update(item.name, item.callback)
            )
            renderedValues = current_section
        }
    }

    root.toggleMenuOff = () => {
        if (menuState !== 0) {
            menuState = 0;
            menu.classList.remove(contextMenuActive);
        }
    }

    root.contextMenuListener = (el, section) => {
        el.addEventListener("contextmenu", function (e) {
            e.preventDefault();
            toggleMenuOn(section);
        });
    }

    function getPosition(e) {
        var posx = 0;
        var posy = 0;

        if (!e) e = window.event;

        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop +
                document.documentElement.scrollTop;
        }

        return {
            x: posx,
            y: posy
        };
    }

    function positionMenu(e) {
        clickCoords = getPosition(e);
        clickCoordsX = clickCoords.x;
        clickCoordsY = clickCoords.y;

        menuWidth = menu.offsetWidth + 4;
        menuHeight = menu.offsetHeight + 4;

        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;

        if ((windowWidth - clickCoordsX) < menuWidth) {
            menu.style.left = windowWidth - menuWidth + "px";
        } else {
            menu.style.left = clickCoordsX + "px";
        }

        if ((windowHeight - clickCoordsY) < menuHeight) {
            menu.style.top = windowHeight - menuHeight + "px";
        } else {
            menu.style.top = clickCoordsY + "px";
        }
    }

    return root
}

var contextmenu = ContextMenu()
document.body.appendChild(contextmenu)
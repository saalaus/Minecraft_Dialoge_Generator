var contextMenuClassName = "context-menu";
var contextMenuItemClassName = "context-menu__item";
var contextMenuLinkClassName = "context-menu__link";
var contextMenuActive = "context-menu--active";
 
var taskItemClassName = "task";
var taskItemInContext;
 
var clickCoords;
var clickCoordsX;
var clickCoordsY;
 
var menu = document.querySelector("#context-menu");
var menuItems = menu.querySelectorAll(".context-menu__item");
var menuState = 0;
var menuWidth;
var menuHeight;
var menuPosition;
var menuPositionX;
var menuPositionY;
 
var windowWidth;
var windowHeight;

// document.oncontextmenu = function(e){e.preventDefault()}

function contextMenuListener(el) {
    el.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        toggleMenuOn();
    });
}

document.getElementById("app").oncontextmenu = function (e) {
    if (clickInsideElement(e, "app")){
        e.preventDefault();
        positionMenu();
        toggleMenuOn();
    }else{
        toggleMenuOff();
    }
};

document.addEventListener("click", function (e) {
    var clickeElIsLink = clickInsideElement( e, contextMenuLinkClassName );
 
    if ( clickeElIsLink ) {
      e.preventDefault();
      menuItemListener( clickeElIsLink );
    } else {
      var button = e.which || e.button;
      if ( button === 1 ) {
        toggleMenuOff();
      }
    }
});

window.onresize = function(e) {
    toggleMenuOff();
};

window.onkeyup = function (e) {
    if (e.keyCode === 27) {
        toggleMenuOff();
    }
};

function toggleMenuOn() {
    if (menuState !== 1) {
        menuState = 1;
        menu.classList.add(contextMenuActive);
    }
}

function toggleMenuOff() {
    if (menuState !== 0) {
        menuState = 0;
        menu.classList.remove(contextMenuActive);
    }
}


function clickInsideElement(e, className) {
    var el = e.srcElement || e.target;

    if (el.classList.contains(className)) {
        return el;
    } else {
        while (el = el.parentNode) {
            if (el.classList && el.classList.contains(className)) {
                return el;
            }
        }
    }

    return false;
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

function menuItemListener(el){
        switch(el.classList[1]){
            case "create_dialogue":
                // showModalDialogue();
                modal.show()

                document.getElementById('buttons_gui').onclick = (event) => {
                    if (event.target.id != 'chooseColor'){
                        editor_cmd.focus();
                    }
                };
                const editor_cmd = document.getElementById("editor");
                var interval = setInterval(toggleButton, 1000);
                clearInterval(interval);
                editor_cmd.focus = function() {
                    interval = setInterval(toggleButton, 200);
                };

                editor_cmd.blur = function(){
                    clearInterval(interval);
                };
                break;
            case "create_choose":
                console.log("choose");
                break;
            case "download":
                console.log("download");
                break;
        }
    toggleMenuOff();
}

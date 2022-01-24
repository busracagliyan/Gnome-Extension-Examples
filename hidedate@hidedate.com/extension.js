const Main = imports.ui.main;
const Panel = Main.panel;

let dateMenu = Panel.statusArea.dateMenu;
let hiding;

function enable() {
      dateMenu.container.hide();
      hiding = dateMenu.actor.connect('notify::visible', actor => {
        actor.hide()
      })
}

function disable() {
	if(hiding){
		dateMenu.actor.disconnect(hiding);
	}
    	dateMenu.container.show();
}

function init() {
}

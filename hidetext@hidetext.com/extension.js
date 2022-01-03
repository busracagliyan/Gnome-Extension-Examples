const Main = imports.ui.main;
const Panel = Main.panel;
const Overview = Main.overview;

class Extension {

    constructor(){
        this.keyboard = Panel.statusArea['appMenu'];
    }

    _show_panel(){
        this.keyboard.container.show();

    }

    _hide_panel(){
        this.keyboard.container.hide();
    }

    enable() {
		this._hide_panel();
		this.showing = Overview.connect('showing', this._show_panel.bind(this));
		this.hiding = Overview.connect('hiding', this._hide_panel.bind(this));
    }

    disable() {
    	Overview.disconnect(this.showing);
    	Overview.disconnect(this.hiding);
		this._show_panel();
    }
}

function init() {
	return new Extension();
}
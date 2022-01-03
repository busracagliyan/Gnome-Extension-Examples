const Main = imports.ui.main;
const PanelBox = Main.layoutManager.panelBox;

class Extension{
    constructor(){
        this.monitorChangedListener = null;
        this.heightNotifyListener = null;
        this.monitor = Main.layoutManager.primaryMonitor;
    }

    _topPanel(){
        PanelBox.set_pivot_point(0,0);
        PanelBox.set_position(0,0);
    }
    _bottomPanel(){
        PanelBox.set_pivot_point(0,(-1)*(this.monitor.height-PanelBox.height));
        PanelBox.set_position(0,(this.monitor.height-PanelBox.height));
    }
    enable(){
        this.monitorChangedListener = Main.layoutManager.connect("monitors-changed",this._bottomPanel);
        this.heightNotifyListener = PanelBox.connect("notify::height",this._bottomPanel);
        this._bottomPanel();
        Main.panel.actor.add_style_class_name("popup-menu");
    }
    disable(){
        if(this.heightNotifyListener !== null){
            PanelBox.disconnect(this.heightNotifyListener);
        }
        if(this.monitorChangedListener !== null){
            PanelBox.layoutManager.disconnect(this.monitorChangedListener);
        }
        this._topPanel();
        Main.panel.actor.remove_style_class_name("popup-menu");
    }
}

function init(){
    return new Extension;
}
const {St, GLib, Clutter} = imports.gi;
const Main = imports.ui.main; 
const Mainloop = imports.mainloop;

let panelButton, panelButtonText, timeout;

function setButtonText(){
    var arr = [];

    //date by GLib
    var now = GLib.DateTime.new_now_local();
    var str = now.format("%d/%m/%Y %H:%M:%S");
    arr.push(str);

    panelButtonText.set_text(arr.join('    '));

    return true;
}

function init(){
    panelButton = new St.Bin({
        style_class : "panel-button"
    });
    panelButtonText = new St.Label({
        style_class : "examplePanelText",
        text : "Starting ...",
        y_align : Clutter.ActorAlign.CENTER,
    });
    panelButton.set_child(panelButtonText);
}

function enable(){
    Main.panel._centerBox.insert_child_at_index(panelButton, 1); // _rightBox = sağ, _leftBox= sol
    timeout = Mainloop.timeout_add_seconds(1.0, setButtonText);
}

function disable(){
    Mainloop.source_remove(timeout);
    Main.panel._centerBox.remove_child(panelButton);
}

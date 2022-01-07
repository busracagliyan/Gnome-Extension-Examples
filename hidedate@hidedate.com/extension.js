const Main = imports.ui.main;

class Extension{
  constructor(){
    this.dateMenu = Main.panel.statusArea.dateMenu;
  }

  enable() {
    this.dateMenu.hide();
  }

  disable() {
    this.dateMenu.show();
  }
  
}

function init() {
  return new Extension;
}
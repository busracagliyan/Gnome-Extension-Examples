const Lang = imports.lang;
const Main = imports.ui.main;
const MessageTray = imports.ui.messageTray;

class Extension{
  constructor(){
    this.orig;
    this.banner;
  }

  _style(){
    this.banner = this.source.createBanner(this);
    this.banner.actor.add_style_class_name('notification-transparency');
    return this.banner;
  }

  enable(){
    this.orig = MessageTray.Notification.prototype.createBanner;
    MessageTray.Notification.prototype.createBanner = this._style;
  }

  disable(){
    MessageTray.Notification.prototype.createBanner = this.orig;
  }
}
function init() {
  return new Extension;
}
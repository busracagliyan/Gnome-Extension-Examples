const Me = imports.misc.extensionUtils.getCurrentExtension();
const Gettext = imports.gettext;

Gettext.bindtextdomain("example2", Me.dir.get_child("locale").get_path());
Gettext.textdomain("example2");
const _ = Gettext.gettext;

function init() {
    log( _("hallo mein Freund"));
    log(Gettext.ngettext("%d item", "%d items", 15).replace("%d",15));
}

function enable() {
}

function disable() {
}

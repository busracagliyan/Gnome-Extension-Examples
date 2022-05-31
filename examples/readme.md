Bu yazımızda pardus 21’in gnome masaüstü için basit bir gnome-shell eklentisi yapmayı öğreneceğiz. Eklentimiz panele ikon ekleyecek ve ikona tıkladığımızda açılan popup menu bize bildirim gönderecek. 

İlk olarak home klasörüne giriyoruz ve ctrl+h yapıp gizli dosyaları açıyoruz. Daha sonra .local/share/gnome-shell/extensions dizin konumuna giriyoruz. Burada extensions klasöründe example@example.com isimli yeni bir klasör oluşturuyoruz. Bu klasörün içerisinde extension.js ve metadata.json dosyalarını oluşturuyoruz. 
 
Metadata.json dosyası eklenti bilgilerinin olduğu dosyadır.
 
### metadata.json 
 
```
{ 
    "uuid": "example@example.com", 
    "name": "Example", 
    "description": "This extension puts an icon in the panel with a simple popup menu.", 
    "version": 1, 
    "shell-version": [ "3.38" ], 
    "url": "" 
}
```

* Uuid: Benzersiz bir isimdir ve dosya ismi ile aynı olmak zorundadır. 
* Name: Eklentinin ismi, kısa ve açıklayıcı olmalıdır. Örneğin Application Menu, Extension List, Dash to Dock vs. 
* Description: Eklentinin ne işe yaradığını kısaca açıklar. 
* Version: Eklentinin kaçıncı sürüm olduğunu belirtir. Tam sayı şeklinde olmalıdır. 
* Shell-version: Kullandığımız gnome sürümünü burada tanımlamalıyız. Pardus 21 3.38.6 gnome sürümünü kullanıyor. 
* Url: Yaptımız eklentinin linki varsa bu kısma ekliyoruz. 
 
metadata.json dosyamızı oluşturduktan sonra extension.js dosyamızı oluşturuyoruz. 

### extension.js  

```
'use strict'; 

const ExtensionUtils = imports.misc.extensionUtils; 
const Me = ExtensionUtils.getCurrentExtension(); 
 
function init() { 
    log(`initializing ${Me.metadata.name} version ${Me.metadata.version}`); 
} 
 
function enable() { 
    log(`enabling ${Me.metadata.name} version ${Me.metadata.version}`); 
} 
 
function disable() { 
    log(`disabling ${Me.metadata.name} version ${Me.metadata.version}`); 
} 
```

extension.js dosyamızın iskelet hali yukarıdaki gibidir. Şimdi dosyamıza ilk olarak kullanacağımız kütüphaneleri ekleyelim. 

```
'use strict';  

const {Gio, GLib, GObject, St} = imports.gi;  
const Main = imports.ui.main; 
const PanelMenu = imports.ui.panelMenu; 
const PopupMenu = imports.ui.popupMenu; 

const ExtensionUtils = imports.misc.extensionUtils;  
const Me = ExtensionUtils.getCurrentExtension(); 

function init() { 
    log(`initializing ${Me.metadata.name} version ${Me.metadata.version}`); 
} 
 
function enable() { 
    log(`enabling ${Me.metadata.name} version ${Me.metadata.version}`); 
} 
 
function disable() { 
    log(`disabling ${Me.metadata.name} version ${Me.metadata.version}`); 
} 
```

Şimdi eklentimiz için ikon ekleyelim.

```
'use strict'; 

const {Gio, GLib, GObject, St} = imports.gi; 
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

const ExtensionUtils = imports.misc.extensionUtils; 
const Me = ExtensionUtils.getCurrentExtension();

let Indicator = GObject.registerClass(
    class Indicator extends PanelMenu.Button{
        
        _init() {
            super._init(0.0, `${Me.metadata.name} Indicator`, false);

            let icon =new St.Icon({
                icon_name: 'face-smile-symbolic',
                style_class: 'system-status-icon'
            });
            this.actor.add_child(icon);
        }        
});

let indicator = null;
 
function init() { 
    log(`initializing ${Me.metadata.name} version ${Me.metadata.version}`); 
} 
 
function enable() { 
    log(`enabling ${Me.metadata.name} version ${Me.metadata.version}`);

    indicator = new Indicator();
    Main.panel.addToStatusArea(`${Me.metadata.name} Indicator`, indicator);
} 
 
function disable() { 
    log(`disabling ${Me.metadata.name} version ${Me.metadata.version}`); 

    if (indicator !== null) {
        indicator.destroy();
        indicator = null;
    }
} 
```

Son olarak da eklentimize popup menu ekleyip bildirim oluşturalım. 

```
'use strict'; 

const {Gio, GLib, GObject, St} = imports.gi; 
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

const ExtensionUtils = imports.misc.extensionUtils; 
const Me = ExtensionUtils.getCurrentExtension();

let Indicator = GObject.registerClass(
    class Indicator extends PanelMenu.Button{
        
        _init() {
            super._init(0.0, `${Me.metadata.name} Indicator`, false);

            let icon =new St.Icon({
                icon_name: 'face-smile-symbolic',
                style_class: 'system-status-icon'
            });
            this.actor.add_child(icon);

            let item = new PopupMenu.PopupMenuItem(_('Show Notification')); 
            item.connect('activate', () => {
                Main.notify(_('Whatʼs up?'));
            });
            this.menu.addMenuItem(item);
        }        
});

let indicator = null;
 
function init() { 
    log(`initializing ${Me.metadata.name} version ${Me.metadata.version}`); 
} 
 
function enable() { 
    log(`enabling ${Me.metadata.name} version ${Me.metadata.version}`);

    indicator = new Indicator();
    Main.panel.addToStatusArea(`${Me.metadata.name} Indicator`, indicator);
} 
 
function disable() { 
    log(`disabling ${Me.metadata.name} version ${Me.metadata.version}`); 

    if (indicator !== null) {
        indicator.destroy();
        indicator = null;
    }
}
```

Son olarak alt+f2 yapıp r komutunu çalıştıralım. İnce ayarlar uygulamasına baktığımızda eklentimizin isminin orada olduğunu göreceğiz.

![alt text](https://github.com/busracagliyan/Gnome-Extension-Examples/blob/main/examples/example.drawio.png)

Artık eklentimiz çalışır konumda. 

![alt text](https://github.com/busracagliyan/Gnome-Extension-Examples/blob/main/examples/screenshot1.png)

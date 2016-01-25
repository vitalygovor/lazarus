var Module = function(name) {
    this.name = name;
    this.workspace = null;
};

Module.prototype = {
    send: function(message, to) {
        this.workspace.send(message, this, to);
    },
    receive: function(message, from) {
        log.add(from.name + " to " + this.name + ": " + message);
    }
};

var Workspace = function() {
    var modules = {};
 
    return {
 
        on: function(module) {
            modules[module.name] = module;
            module.workspace = this;
        },
 
        send: function(message, from, to) {
            if (to) {                      // single message
                to.receive(message, from);    
            } else {                       // broadcast message
                for (key in modules) {   
                    if (modules[key] !== from) {
                        modules[key].receive(message, from);
                    }
                }
            }
        }
    };
};

// log helper
 
var log = (function() {
    var log = "";
 
    return {
        add: function(msg) { log += msg + "\n"; },
        show: function() { alert(log); log = ""; }
    }
})();

function run() {
    var core = new Module("core"),
        blocks = new Module("blocks"),
        animation = new Module("animation");
 
    var workspace = new Workspace();
    workspace.on(core);
    workspace.on(blocks);
    workspace.on(animation);
 
    core.send("I use you!");
    blocks.send("We need some animation!");
    animation.send("Hey, I'm here!", blocks);
 
    log.show();
}
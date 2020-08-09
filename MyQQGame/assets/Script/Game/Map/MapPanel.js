var BaseView = require("BaseView");
var MapPanel = cc.Class({
    extends: BaseView,

    ctor: function(){
        var ctrl = require("MapCtrl");
        this.ctrl = new ctrl(this);
        this.args = arguments[0];
        this.panelConfig = arguments[1];
    },

    Create()
    {
        let missionId = this.args.missionId;
        this.ctrl.SetUp(this.args);
    },
    
    OnDestroy: function(){
        this.ctrl.Destroy();
        this.ctrl = null;
    },
});

module.exports = MapPanel;

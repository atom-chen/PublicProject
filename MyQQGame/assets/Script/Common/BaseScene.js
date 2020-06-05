var UICanvas = require("UICanvas");

var BaseScene = cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    ctor: function(){
        this.InitCanvas();
        this.envLayers = {};
    },

    InitCanvas: function(){
        if (this.uiCanvas == null){
            this.uiCanvas = new UICanvas();
        }
    },

    GetLayer: function(name){
        return this.uiCanvas.Find(name);
    },

    PopModalPanel: function(sendInfo){},

    CloseModalPanel: function(requestId, actionName){},

    OnDestroy: function(){
        
    },

    Destroy: function(){
        this.OnDestroy();
    },

});
module.exports = BaseScene;

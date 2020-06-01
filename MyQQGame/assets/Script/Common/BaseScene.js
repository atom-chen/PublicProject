var GameConst = require("GameConst");

var BaseScene = cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    ctor: function(){
        this.InitCanvas();
        this.envLayers = {};
    },

    InitCanvas: function(){
        this.uiCanvas = cc.find("UICanvas");
        if (this.uiCanvas == null){
            this.uiCanvas = cc.loader.loadRes("Prefabs/Common/UICanvas", cc.Prefab, function(err, uiCanvas){
                uiCanvas.name = "UICanvas";
            });
        }
    },

    OnDestroy: function(){

    },

    Destroy: function(){
        this.OnDestroy();
    },

});

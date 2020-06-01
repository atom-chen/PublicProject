var ResMgr = require("ResMgr");

var Canvas = cc.Class({

    ctor: function(layer, parent){
        this.canvas = ResMgr.LoadAsset("Prefabs/Common/UICanvas", cc.Prefab)
    },
});
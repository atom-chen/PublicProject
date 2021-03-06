
var UICanvas = cc.Class({
    extends: cc.Component,

    ctor: function(){
        cc.loader.loadRes("Prefabs/Common/UICanvas", cc.Prefab, function(err, prefab){
            this.canvas = cc.instantiate(prefab);
            this.canvas.name = "UICanvas";
            cc.director.getScene().addChild(this.canvas);
            this.cameraObj = cc.find("UICamera", this.canvas);
            if (arguments[0]){
                arguments[0]();
            }
        }.bind(this));
    },

    Find: function(layerName){
        return cc.find(layerName, this.canvas);
    },

    Close: function(){
        this.canvas.active = false;
    },

    Open: function(){
        this.canvas.active = true;
    },

    Destroy: function(){
        this.canvas.destroy();
    },
});
module.exports = UICanvas;
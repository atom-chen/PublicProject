var BaseView = require("BaseView");
var StartPanel = cc.Class({
    extends: BaseView,

    properties: {

    },

    ctor: function(){
        this.assetAsynTable = {
            'ui' : {'assetName' : "Prefabs/Start/mainpanel_prefab_StartPanel"},
        }
    },
    
    Create: function(){
        cc.Mgr.AudioMgr.closeSFX();
        cc.Mgr.AudioMgr.playBGM("GameBegin");
        this.LoadAssetAsync();
    },

    OnAllLoadCallBack: function(){
        this.ui = cc.instantiate(this.gameObjsTable.ui);
        var parent = cc.find("Canvas", cc.director.getScene());
        this.ui.parent = parent;
        var btn = cc.find("Panel/BtnStart", this.ui)
        this.BtnFunc(btn, this.OnclickChooseChapter, this);
    },

    OnclickChooseChapter: function(){
        cc.Mgr.PanelMgr.OpenWindow("ChapterChoose", {}, "Start");
    },

    OnDestroy: function(){
        this.ui.destroy();
        this.ui = null;
    },

});
module.exports = StartPanel;

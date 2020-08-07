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
    this.LoadAssetAsync();
},

OnAllLoadCallBack: function(){
    this.ui = cc.instantiate(this.gameObjsTable.ui);
    cc.director.getScene().addChild(this.ui);
    var btn = cc.find("Panel/BtnStart", this.ui)
    this.BtnFunc(btn, this.OnclickChooseChapter, this);
},

OnclickChooseChapter: function(){
    cc.Mgr.PanelMgr.OpenWindow("ChapterChoose", {}, "Start");
},

});
module.exports = StartPanel;

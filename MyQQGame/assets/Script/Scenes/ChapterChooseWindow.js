var AnimTool = require("AnimTool");
var BaseView = require("BaseView");
var ChapterData = require("ChapterData");

var ChapterChooseWindow = cc.Class({
    extends: BaseView,

    properties: {

    },

    ctor: function(){
        this.assetAsynTable = {
            'ui' : {'assetName' : "Prefabs/ChapterChoose/mainpanel_prefab_ChapterChooseWindow"},
            'item' : {'assetName' : "Prefabs/ChapterChoose/mainpanel_prefab_ChapterItem"},
        }
    },  

    Create: function(){
        this.LoadAssetAsync();
    },

    OnAllLoadCallBack: function(){
        this.ui = cc.instantiate(this.gameObjsTable.ui);
        cc.director.getScene().addChild(this.ui);
        var btn = cc.find("Window/BtnClose", this.ui)
        this.BtnFunc(btn, cc.Mgr.PanelMgr.CloseWindow('ChapterChoose'), this);
        this.UpdateView();
        var args = [ window = this.ui ];
        AnimTool.DOWindow(args);
    },

    UpdateView: function(){
        var content = cc.find("Window/ScrollView/View/Content", this.ui)
        var data = ChapterData[1];
        for (k in data.cities){
            var chapterItem = cc.find(k, content);
            if (chapterItem == null){
                chapterItem = cc.instantiate(this.gameObjsTable.item);
                chapterItem.parent = content;
                chapterItem.name = k;
            }
            cc.find("Panel/TextName", chapterItem).getComponent(cc.Label).string = data.cities[k].cityName;
        }
    },

});
module.exports = ChapterChooseWindow;

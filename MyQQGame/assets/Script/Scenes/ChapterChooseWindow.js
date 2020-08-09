var BaseView = require("BaseView");
var ChapterData = require("ChapterData");

var ChapterChooseWindow = cc.Class({
    extends: BaseView,

    properties: {

    },

    ctor: function(){
        // this.assetAsynTable = {
        //     'ui' : {'assetName' : "Prefabs/ChapterChoose/mainpanel_prefab_ChapterChooseWindow",},
        //     'item' : {'assetName' : "Prefabs/ChapterChoose/mainpanel_prefab_ChapterItem",},
        // }
    },  

    Create: function(){
        this.LoadAssetsAsync("Prefabs/ChapterChoose");
    },

    OnAllLoadCallBack: function(){
        this.ui = cc.instantiate(this.gameObjsTable.mainpanel_prefab_ChapterChooseWindow);
        var parent = cc.find("Canvas", cc.director.getScene());
        this.ui.parent = parent;
        this.ui.getComponent(cc.Widget).target = parent;
        var btn = cc.find("Window/BtnClose", this.ui)
        this.BtnFunc(btn, this.Close, this);
        this.UpdateView();
        var args = { window : this.ui };
        cc.Tools.AnimTool.DOWindow(args);
    },

    GetPalyerData: function(){
        
    },

    UpdateView: function(){
        var content = cc.find("Window/ScrollView/View/Content", this.ui)
        var data = ChapterData[1];
        for (var k in data.cities){
            var chapterItem = cc.find(k, content);
            if (chapterItem == null){
                chapterItem = cc.instantiate(this.gameObjsTable.mainpanel_prefab_ChapterItem);
                chapterItem.parent = content;
                chapterItem.name = data.cities[k].cityId;
            }
            cc.find("Panel/TextName", chapterItem).getComponent(cc.Label).string = data.cities[k].cityName;
            var btn = cc.find("Panel/ImageBg", chapterItem);
            this.OnclickItem(btn, data.cities[k]);
            cc.find("Panel/StarInfo", chapterItem).active = data.cities[k].missionNum > 0;
        }
    },

    OnclickItem: function(btn, data){
        this.BtnFunc(btn, function(){
            if (data.missionNum > 0)
            {
                var args = {missionNum : data.missionNum,}
                cc.Mgr.PanelMgr.OpenWindow('MissionChoose', args, 'Start');
            }
            else
            {
                
            }
        }, this);
    },

    Close: function(){
        var args = {
            window : this.ui,
            endCallBack : function(){
                cc.Mgr.PanelMgr.CloseWindow('ChapterChoose');
            },
         };
        cc.Tools.AnimTool.DOWindowClose(args);
    },

    OnDestroy: function(){
        this.ui.destroy();
        this.ui = null;
    },
});
module.exports = ChapterChooseWindow;

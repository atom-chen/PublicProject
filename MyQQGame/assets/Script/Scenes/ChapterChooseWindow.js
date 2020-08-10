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
            this.UpdateItem(chapterItem, data.cities[k])
        }
    },

    UpdateItem: function(obj, data){
        var cityData = {}
        for (var k in cc.Mgr.UserDataMgr.userData.missionData){
            if (cc.Mgr.UserDataMgr.userData.missionData[k].cityId == data.cityId){
                cityData = cc.Mgr.UserDataMgr.userData.missionData[k];
                break;
            }
        }
        cc.find("Panel/TextName", obj).getComponent(cc.Label).string = data.cityName;
        var btn = cc.find("Panel/ImageBg", obj);
        this.OnclickItem(btn, cityData);
        cc.find("Panel/StarInfo", obj).active = cityData.isOpen && data.missionNum > 0;
        if (cityData.isOpen && data.missionNum > 0){
            cc.find("Panel/StarInfo/TextInfo", obj).getComponent(cc.Label).string = cityData.star + "/" + data.maxStar;
        }
        var sp = cityData.isOpen && "Textures/Common/Bg/bg_7" || "Textures/Common/Bg/bg_11";
        cc.loader.loadRes(sp, cc.SpriteFrame, function (err, spriteFrame) {
            cc.find("Panel/ImageBg", obj).getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    },

    OnclickItem: function(btn, data){
        this.BtnFunc(btn, function(){
            if (data.isOpen > 0)
            {
                console.log("gjwgjw", data);
                var args = {data : data,}
                cc.Mgr.PanelMgr.OpenWindow('MissionChoose', args, 'Start');
            }
            else
            {

            }
        }.bind(this), this);
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

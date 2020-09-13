var BaseView = require("BaseView");
var MissionChooseWindow = cc.Class({
    extends: BaseView,

    properties: {

    },

    ctor: function(){
        var args = arguments[0];
        this.data = args.data;
        this.missionNum = this.data.missionNum;
    },  

    Create: function(){
        this.LoadAssetsAsync("Prefabs/MissionChoose");
    },

    OnAllLoadCallBack: function(){
        this.ui = cc.instantiate(this.gameObjsTable.mainpanel_prefab_MissionChooseWindow);
        var parent = cc.find("Canvas", cc.director.getScene());
        this.ui.parent = parent;
        this.ui.getComponent(cc.Widget).target = parent;
        var btn = cc.find("Window/BtnClose", this.ui)
        this.BtnFunc(btn, this.Close, this);
        var btn = cc.find("Window/BtnClose2", this.ui)
        this.BtnFunc(btn, this.Close, this);
        this.UpdateView();
        var args = { window : this.ui };
        cc.Tools.AnimTool.DOWindow(args);
    },

    UpdateView: function(){
        var content = cc.find("Window/ScrollView/View/Content", this.ui)
        for (var i = 1; i <= this.missionNum; i++){
            var missionItem = cc.find(i.toString(), content);
            if (missionItem == null){
                missionItem = cc.instantiate(this.gameObjsTable.mainpanel_prefab_MissionItem);
                missionItem.parent = content;
                missionItem.name = i.toString();
            }
            this.UpdateMissionItem(missionItem, i);
        }
    },

    UpdateMissionItem: function(obj, index){
        var newIndex = "";
        if (index < 10){
            newIndex = "0" + index.toString();
        }
        else{
            newIndex = index.toString()
        }
        var missionId = "1" + this.data.cityId + newIndex;
        var missionData = {}
        for (var k in cc.Mgr.UserDataMgr.userData.missionData) {
            var cityData = cc.Mgr.UserDataMgr.userData.missionData[k];
            if (cityData.cityId == this.data.cityId)
            {
                for (var i in cityData.mission)
                {
                    if (cityData.mission[i].missionId == missionId){
                        missionData = cityData.mission[i];
                        break;
                    }
                }
                break;
            }
        }
        cc.find("Panel/StarPanel", obj).active = missionData.isOpen;
        cc.find("Panel/TextMission", obj).active = missionData.isOpen;
        cc.find("Panel/TextMission2", obj).active = !missionData.isOpen;
        if(missionData.isOpen){
            for (i = 1; i <= 3; i++){
                cc.find("Panel/StarPanel/" + i.toString() + "/ImageStar", obj).active = i <= missionData.star;
            }
        }
        var sp = missionData.isOpen && "Textures/Common/Bg/bg_20" || "Textures/Common/Bg/bg_19";
        cc.resources.load(sp, cc.SpriteFrame, function (err, spriteFrame) {
            cc.find("Panel/ImageBg", obj).getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        cc.find("Panel/TextMission", obj).getComponent(cc.Label).string = index;
        cc.find("Panel/TextMission2", obj).getComponent(cc.Label).string = index;
        var btn = cc.find("Panel/ImageBg", obj);
        this.BtnFunc(btn, function(){
            if (missionData.isOpen)
            {
                cc.Mgr.PanelMgr.ChangePanel("Map", {missionId : missionId,});
            }
        }.bind(this), this);
    },

    Close: function(){
        var args = {
            window : this.ui,
            endCallBack : function(){
                cc.Mgr.PanelMgr.CloseWindow('MissionChoose');
            },
         };
        cc.Tools.AnimTool.DOWindowClose(args);
    },

    OnDestroy: function(){
        this.ui.destroy();
        this.ui = null;
    },
});
module.exports = MissionChooseWindow;

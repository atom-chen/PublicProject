var BaseView = require("BaseView");
var MissionChooseWindow = cc.Class({
    extends: BaseView,

    properties: {

    },

    ctor: function(args){
        this.missionNum = args.missionNum;
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
            cc.find("Panel/TextMission", missionItem).getComponent(cc.Label).string = i;
            var btn = cc.find("Panel/ImageBg", missionItem);
            this.BtnFunc(btn, function(){}, this);
        }
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

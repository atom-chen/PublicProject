var BaseView = require("BaseView");

var ChallengeResultWindow = cc.Class({
    extends: BaseView,

    properties: {

    },

    ctor: function(args){
        this.data = args.data;
        this.assetAsynTable = {
            'ui' : {'assetName' : "Prefabs/ChallengeResult/mainpanel_prefab_ChallengeResultWindow",},
        }
    },  

    Create: function(){
        this.LoadAssetAsync();
    },

    OnAllLoadCallBack: function(){
        this.ui = cc.instantiate(this.gameObjsTable.ui);
        this.ui.zIndex = 4;
        var parent = cc.find("Canvas", cc.director.getScene());
        this.ui.parent = parent;
        this.ui.getComponent(cc.Widget).target = parent;
        var btn = cc.find("Window/BtnClose", this.ui);
        this.BtnFunc(btn, this.Close, this);
        this.UpdateView();
        var args = { window : this.ui };
        cc.Tools.AnimTool.DOWindow(args);
    },

    UpdateView: function(){
        cc.find("Window/WinPanel", this.ui).active = this.data.isWin;
        cc.find("Window/LosePanel", this.ui).active = !this.data.isWin;
        if (this.data.isWin){
            cc.find("Window/WinPanel/ResultPanel/TextMission", this.ui).getComponent(cc.Label).string = this.data.missionName;
            for (var k in this.data.star){
                var star = cc.find("Window/WinPanel/StarPanel/" + k.toString(), this.ui);
                cc.find("ImageStar", star).active = this.data.star[k];
                var resultPanel = cc.find("Window/WinPanel/ResultPanel/Result" + k.toString(), this.ui);
                this.UpdateResult(resultPanel, this.data.star[k]);
            }
        }
        else
        {

        }
    },

    UpdateResult: function(obj, active){
        cc.find("ImageStar", obj).active = active;
        var sp = "Textures/Common/Bg/bg_4";
        if(!data.star){
            sp = "Textures/Common/Bg/bg_5";
        }
        cc.resources.load(sp, cc.SpriteFrame, function (err, spriteFrame) {
            cc.find("ImageLine", obj).getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    },

    Close: function(){
        var args = {
            window : this.ui,
            endCallBack : function(){
                cc.Mgr.PanelMgr.CloseWindow('ChallengeResult');
            },
         };
        cc.Tools.AnimTool.DOWindowClose(args);
    },

    OnDestroy: function(){
        this.ui.destroy();
        this.ui = null;
    },
});
module.exports = ChallengeResultWindow;

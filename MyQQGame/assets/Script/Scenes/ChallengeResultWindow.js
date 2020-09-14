var BaseView = require("BaseView");

var ChallengeResultWindow = cc.Class({
    extends: BaseView,

    properties: {

    },

    ctor: function(){
        var args = arguments[0];
        this.data = args.data;
        this.callBack = args.callBack;
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
        this.UpdateView();
        var args = { window : this.ui };
        cc.Tools.AnimTool.DOWindow(args);
    },

    UpdateView: function(){
        // cc.find("Window/WinPanel", this.ui).active = this.data.isWin;
        // cc.find("Window/LosePanel", this.ui).active = !this.data.isWin;
        //if (this.data.isWin){
            cc.find("Window/WinPanel/ResultPanel/TextMission", this.ui).getComponent(cc.Label).string = this.data.missionName;
            var star = 0;
            for (var k in this.data.star){
                if (this.data.star[k] == true){
                    star += 1;
                }
            }
            for (var k in this.data.star){
                var star = cc.find("Window/WinPanel/StarPanel/" + k.toString(), this.ui);
                cc.find("ImageStar", star).active = k <= star;
                var resultPanel = cc.find("Window/WinPanel/ResultPanel/Result" + k.toString(), this.ui);
                this.UpdateResult(resultPanel, this.data.star[k], k);
            }
            this.BtnFunc(cc.find("Window/WinPanel/BtnBack", this.ui), function(){
                cc.Mgr.PanelMgr.ChangePanel("Start");
            }.bind(this), this);
            this.BtnFunc(cc.find("Window/WinPanel/BtnNext", this.ui), function(){
                if (this.callBack){
                    this.Close();
                    var country = parseInt(this.data.missionId / 10000);
                    var city = parseInt((this.data.missionId % 10000) / 100);
                    var mission = this.data.missionId % 100;
                    if (mission == 10){
                        mission = 1;
                        city += 1;
                    }
                    else{
                        mission += 1                    
                    }
                    var cityStr = city < 10 && ("0" + city.toString()) || city.toString();
                    var missionStr = mission < 10 && ("0" + mission.toString()) || mission.toString();
                    var id = country.toString() + cityStr.toString() + missionStr.toString();
                    this.callBack(id);
                }
            }.bind(this), this);
        // }
        // else
        // {

        // }
    },

    
    UpdateResult: function(obj, active, index){
        cc.find("ImageStar", obj).active = active;
        var sp = "Textures/Common/Bg/bg_4";
        if(active){
            sp = "Textures/Common/Bg/bg_5";
        }
        cc.loader.loadRes(sp, cc.SpriteFrame, function (err, spriteFrame) {
            cc.find("ImageLine", obj).getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        if (index == 2){
            cc.find("Window/WinPanel/ResultPanel/Result2/TextCondition", this.ui).getComponent(cc.Label).string = "在" + this.data.starTime + "秒内完成关卡";
        };
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
        this.data = null;
    },
});
module.exports = ChallengeResultWindow;

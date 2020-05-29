//是否完成过管理工具的初始化
cc.director.initMgr = false;
//初始化管理类
function initMgr(){
    cc.Mgr = {};
    cc.Mgr.Parse = false;
    cc.Mgr.preLoadingScene = false;
    cc.Mgr.initData = false;
    
    cc.Mgr.Event = require("Event");
    cc.Mgr.Utils = require("Utils");
    cc.Mgr.Config = require("Config");
    cc.Mgr.ShareInfos = require("ShareInfos");
    cc.Mgr.ShareInfos.init();

    cc.Mgr.Http = require("HttpMgr");
    cc.Mgr.NetMgr = require("NetMgr");

    //平台控制管理类
    cc.Mgr.PlatformController = require("PlatformController");
    cc.Mgr.PlatformController.Init();
    //广告
    cc.Mgr.AdsMgr = require("AdsMgr");
    cc.Mgr.AdsMgr.Init();

    var AudioMgr = require("AudioMgr");
    cc.Mgr.AudioMgr = new AudioMgr();
    cc.Mgr.AudioMgr.init();
    // cc.Mgr.AudioMgr.playBGM("bgm");

    var MapDataMgr = require("MapDataMgr");
    cc.Mgr.MapDataMgr = new MapDataMgr();
    cc.Mgr.MapDataMgr.initMaps(); //初始化解析数据表

    var UserDataMgr = require("UserDataMgr");
    cc.Mgr.UserDataMgr = new UserDataMgr();
}


cc.Class({
    extends: cc.Component,

    properties: {
        sprite: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Sprite, // optional, default is typeof default
           // serializable: true,   // optional, default is true
        },
    },

    onLoad:function () {
        //目前我们先不保存任何数据  每次开始清理一次
        //cc.sys.localStorage.clear();
        cc.director.GlobalEvent.clear();
        initMgr();
        cc.loader.load("http://106.14.223.175:9000/0.0.0.1/1.jpg", function(err, ret){
            if (err){
                console.log("错误:", err);
                return;
            }
            
            console.log("调用", ret)
            //this.sprite.node.active = false
            let frame = new cc.SpriteFrame(ret);
            console.log(frame)
            this.sprite.spriteFrame = frame;
        }.bind(this));

        console.log("platform: " + cc.Mgr.PlatformController.platform);
    },

    start () {
        //首先监听右上角的按钮
        cc.Mgr.PlatformController.ShareTopNav();
        cc.Mgr.PlatformController.ShowClubButton(true);
    },

    /*
    update(dt)
    {
        
    },
    */
});

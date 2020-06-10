
var LoginCtrl = cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    Init : function()
    {
        console.log("LoginCtrl 初始化");
        var loginView = require("LoginView");
        this.loginView = new loginView(this);
        this.loginView.Init();
    },

    StartRegist : function(count, passWord)
    {
        console.log("开始注册玩家账号信息");
        var url = `http://106.14.223.175:10000/root/gateway.action?command=user@createUser&userName=${count}&password=${passWord}`; 

        console.log(url);
        cc.Mgr.Http.SendAndRequest(url, this.OnRegist);
    },

    OnRegist : function(response)
    {
        console.log("注册监听返回");

    },

    StartLogin : function(count, passWord)
    {
        console.log("玩家开始登陆");
        var url = `http://106.14.223.175:10000/root/gateway.action?command=user@login&userName=${count}&password=${passWord}`; 
        cc.Mgr.Http.SendAndRequest(url, this.OnLogin);
    }, 

    OnLogin :function(response)
    {
        console.log("模拟登陆成功");
        console.log(response);
        var session = response.data.session
        var url = `http://106.14.223.175:11000/root/gateway.action?command=player@getPlayerInfo&session=${session}`; 
        cc.Mgr.Http.SendAndRequest(url, function(response){
            console.log("完成登录进入游戏宝贝！！！");
            cc.director.loadScene("MainScene");
        }.bind(this));
    },

    QQLogin : function()
    {

        console.log("开始QQ登陆");
    },

    EnterGame : function(response)
    {
        console.log("太令人伤心啦");
    },

    Test : function()
    {
        console.log("LoginView 调用 Ctrl");
    }
    
});

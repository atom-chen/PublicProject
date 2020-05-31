
var LoginCtrl = cc.Class({
    extends: cc.Component,

    properties: {
        userCount:"wangzhufeng",
        passWord : "123567",
    },

    Init : function()
    {
        console.log("LoginCtrl 初始化");
        var loginView = require("LoginView");
        this.loginView = new loginView(this);
        this.loginView.Init();
    },

    StartRegist : function()
    {
        console.log("开始注册玩家账号信息");
        console.log(cc.Mgr.Config.resgisterUrl);
        //var data = { userCount = this.userCount, passWord = this.passWord}
        //cc.Mgr.Http.statics.sendRequest(url, data, OnRegist, extraUrl)
    },

    OnRegist : function(response)
    {

    },

    StartLogin : function()
    {
        
    }, 

    Test : function()
    {
        console.log("LoginView 调用 Ctrl");
    }
    
});

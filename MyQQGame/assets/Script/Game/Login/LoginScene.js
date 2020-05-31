
var LoginScene = cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    initLoginScene : function()
    {
        console.log("登陆场景初始化");
        var loginCtrl = require("LoginCtrl");
        var loginCtrlInstance = new loginCtrl();
        loginCtrlInstance.Init();
    }
});

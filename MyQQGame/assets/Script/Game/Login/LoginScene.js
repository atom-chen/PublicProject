
var LoginScene = cc.Class({
    // extends: require("BaseScene"),
    extends: cc.Component,

    properties: {
        
    },

    ctor : function()
    {
        console.log("登陆场景初始化");
        var loginCtrl = require("LoginCtrl");
        var loginCtrlInstance = new loginCtrl();
        loginCtrlInstance.Init();
    },

    initLoginScene : function()
    {
        
    }
});

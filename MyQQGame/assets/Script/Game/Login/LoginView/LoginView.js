
var LoginView = cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    ctor : function(ctrl)
    {
        console.log("loginView 构造函数初始化")
        this.ctrl = ctrl;
        this.ctrl.Test();
    },

    LoginView(ctrl) {
        
    },

    Init()
    {
        console.log("登陆面板初始化");
        cc.loader.loadRes("LoginPanel", function (err, prefab) {
            var newNode = cc.instantiate(prefab);
            cc.director.getScene().addChild(newNode);
            this.loginPanel = newNode;
            newNode.setPosition(cc.v2(320, 568));
        });
    },

    SetUIInfo()
    {

    }
});

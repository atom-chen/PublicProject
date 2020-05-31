
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

    Init : function() 
    {
        console.log("登陆面板初始化");
        cc.loader.loadRes("LoginPanel", function (err, prefab) {
            var newNode = cc.instantiate(prefab);
            cc.director.getScene().addChild(newNode);
            this.loginPanel = newNode;
            newNode.setPosition(cc.v2(320, 568));
            this.AddButtonListener();
        });
    },

    AddButtonListener : function () {
        console.log("添加按钮点击事件");
        var button = this.loginPanel.getChildByName("RegisterButton").getComponent(cc.Button);
        button.node.on('click', this.RegisterClick, this);
    },
    
    RegisterClick: function (button) {
        console.log("注册按钮点击事件")
    },

    SetUIInfo : function()
    {

    }, 

});

var LoginView = cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    ctor : function(ctrl)
    {
        console.log("loginView 构造函数初始化")
        this.ctrl = ctrl;
    },

    Init : function() 
    {
        console.log("登陆面板初始化");
        console.log(cc.sys.platform );
        if(cc.sys.platform == cc.sys.WECHAT_GAME && !!wx)
        {
            //QQ小游戏渠道登陆
            console.log("小游戏渠道登陆");
        }
        else
        {
            //模拟登陆开始
            cc.loader.loadRes("LoginPanel", function (err, prefab) {
                    var newNode = cc.instantiate(prefab);
                    cc.director.getScene().addChild(newNode);
                    this.loginPanel = newNode;
                    newNode.setPosition(cc.v2(320, 568));
                    this.AddButtonListener();
                }.bind(this));
        }
    },

    AddButtonListener : function () {
        console.log("添加按钮点击事件");
        var button = this.loginPanel.getChildByName("RegisterButton").getComponent(cc.Button);
        button.node.on('click', this.RegisterClick, this);

        var loginButton = this.loginPanel.getChildByName("LoginButton").getComponent(cc.Button);
        loginButton.node.on('click', this.LoginClick, this);
    },
    
    RegisterClick: function (button) {
        console.log("注册点击事件响应");
        var node = this.loginPanel.getChildByName("CountEditBox");
        var countText = node.getComponent(cc.EditBox).string;
        console.log("注册账户");
        console.log(countText);

        var node = this.loginPanel.getChildByName("PasswordEditBox");
        var passText = node.getComponent(cc.EditBox).string;
        console.log("注册账户密码");
        console.log(passText);

        this.ctrl.StartRegist(countText, passText);
    },

    LoginClick : function (button) {
        console.log("登陆点击事件响应");

        var node = this.loginPanel.getChildByName("CountEditBox");
        var countText = node.getComponent(cc.EditBox).string;
        var node = this.loginPanel.getChildByName("PasswordEditBox");
        var passText = node.getComponent(cc.EditBox).string;
        this.ctrl.StartLogin(countText, passText);
    },

    SetUIInfo : function()
    {

    }, 

});


var LoginView = cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    ctor : function()
    {
        console.log("loginView 构造函数初始化")
        this.ctrl = arguments[0];
    },

    Init : function() 
    {
        console.log("登陆面板初始化");
        console.log(cc.sys.platform );
        if(cc.sys.platform == cc.sys.WECHAT_GAME && !!wx)
        {
            //QQ小游戏渠道登陆
            console.log("小游戏渠道登陆");
            let exportJson = {};
            let sysInfo = window.qq.getSystemInfoSync();
            console.log("获取小游戏系统信息");
            console.log(sysInfo.screenWidth);
            console.log(sysInfo.screenHeight);
            //获取qq界面大小
            let width = sysInfo.screenWidth;
            let height = sysInfo.screenHeight;

            window.qq.login(
                {success:(res) =>{
                    console.log("res.code:", res);
                    exportJson.code = res.code;         //向服务端传递code用于获取QQ小游戏的用户唯一标识
                    window.qq.getSetting({
                        success (res) {
                            console.log(res.authSetting);
                            if (res.authSetting["scope.userInfo"]) {
                                console.log("用户已授权");
                                window.qq.getUserInfo({
                                    success(res){
                                        console.log(res);
                                        exportJson.userInfo = res.userInfo;
                                        //此时可进行登录操作
                                        // this.ctrl.QQLogin();
                                        window.qq.request(
                                            {
                                                url : '',  //毛毛服务器地址
                                                data : {
                                                    code : exportJson.code,
                                                    appid : "1110485691",
                                                    appsecret : "VovkDfFNrqeoWQsr",
                                                },
                                                header : {'content-type': 'application/json' },// 默认值
                                                success(res) {
                                                    console.log(res.data)
                                                  }
                                            }
                                        );
                                    }
                                });
                            }else {
                                console.log("用户未授权");
                                let button = window.qq.createUserInfoButton({
                                    type: 'text',
                                    text: '',
                                    style: {
                                        left: 0,
                                        top: 0,
                                        width: width,
                                        height: height,
                                        backgroundColor: '#00000000',//最后两位为透明度
                                        color: '#ffffff',
                                        fontSize: 20,
                                        textAlign: "center",
                                        lineHeight: height,
                                    }
                                });
                                button.onTap((res) => {
                                    if (res.userInfo) {
                                        console.log("用户授权:", res);
                                        exportJson.userInfo = res.userInfo;
                                        //此时可进行登录操作
                                        // this.ctrl.QQLogin();
                                        window.qq.request(
                                            {
                                                url : '',  //毛毛服务器地址
                                                data : {
                                                    code : exportJson.code,
                                                    appid : "1110485691",
                                                    appsecret : "VovkDfFNrqeoWQsr",
                                                },
                                                header : {'content-type': 'application/json' },// 默认值
                                                success(res) {
                                                    console.log(res.data)
                                                  }
                                            }
                                        );

                                        button.destroy();
                                    }else {
                                        console.log("用户拒绝授权:", res);
                                    }
                                });
                            }
                        }
                    })
                }}
            );
            
        }
        else
        {
            //模拟登陆开始
            cc.loader.loadRes("LoginPanel", function (err, prefab) {
        //             var newNode = cc.instantiate(prefab);
        //             cc.director.getScene().addChild(newNode);
        //             this.loginPanel = newNode;
        //             newNode.setPosition(cc.v2(320, 568));
        //             this.AddButtonListener();
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

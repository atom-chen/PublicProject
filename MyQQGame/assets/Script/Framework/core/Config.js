//存放一些公用的参数
var Config = cc.Class({
    extends: cc.Component,

    statics: {
        //模拟登陆http的地址
        resgisterUrl : "http://106.14.223.175:10000/root/gateway.action?command=user@createUser&userName=%s&password=%s",
        //模拟登陆gate的地址
        gateUrl : "http://106.14.223.175:10000/root/gateway.action?command=user@login&userName=%s&password=%s",
        //登陆服
        loginUrl : "http://106.14.223.175:11000/root/gateway.action?command=player@getPlayerInfo&session=%s",
    },
});

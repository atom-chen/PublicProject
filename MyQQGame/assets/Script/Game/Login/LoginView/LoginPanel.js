// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        console.log("LoginPanel 生命周期开始");
        this.node.getChildByName("LoadingProgress").getComponent(cc.ProgressBar).progress = 0;
    },

    update (dt) {
        var progress = this.node.getChildByName("LoadingProgress").getComponent(cc.ProgressBar).progress;
        if (progress >= 0 && progress <= 1.0 ) {
            progress += dt * 0.5;
        }
        else {
            progress = 1;
            cc.director.loadScene("MainScene");
        }
        this.node.getChildByName("LoadingProgress").getComponent(cc.ProgressBar).progress = progress;
    },
});

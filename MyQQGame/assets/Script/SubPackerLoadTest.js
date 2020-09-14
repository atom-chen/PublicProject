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
        cc.loader.downloader.loadSubpackage('Textures', function (err) {
            if (err) {
                return console.error(err);
            }
            console.log('load subpackage successfully.');
            var sp = "Textures/Common/BigBg/bigBg_2";
            cc.loader.loadRes(sp, cc.SpriteFrame, function (err, spriteFrame) {
                this.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }.bind(this));
        }.bind(this));
    },

    // update (dt) {},
});

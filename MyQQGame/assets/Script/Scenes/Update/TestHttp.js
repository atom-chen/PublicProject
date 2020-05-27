// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

var global = require('Init')

cc.Class({
    extends: cc.Component,

    properties: {
        sprite:{
            type : cc.Sprite,
            default: null,
        }
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

        // this.load_remote();
        global.HTTP.Get(global.CONFIG.url, function(response){
            console.log("response", response)
        });
        //window.cmgr.Init();
    },
    
    load_remote(){
        cc.loader.load("http://07imgmini.eastday.com/mobile/20180916/20180916025438_9077fd04fa22975bf3d54fc6ccf66f44_1.jpeg", function(err, ret){
            if (err){
                console.log("错误:", err);
                return;
            }
            this.sprite.spriteFrame.setTexture(ret);
            //ret is cc.texture
        }.bind(this))
    },
    // update (dt) {},
});

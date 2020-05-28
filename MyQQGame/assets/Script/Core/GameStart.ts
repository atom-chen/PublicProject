import { HttpService } from "../../Framework/network/httpservice";
import Config from "../../Config/Config";
import { gen_handler } from "../../Framework/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    // onLoad () {}

    @property(cc.Sprite) sprite:cc.Sprite;

    start () {
        // console.log("platform", cc.sys.platform)
        // console.log("test", qq.getSystemInfo)
        // this.load_remote();
        // HttpService.getInst().doGet(Config.url, null, null, gen_handler(function(code, response){
        //     console.log("回调:", code, response);
        // }, null, null));
    }

    load_remote(){
        cc.loader.load("http://106.14.223.175:9000/0.0.0.1/1.jpg", function(err, ret){
            if (err){
                console.log("错误:", err);
                return;
            }
            
            console.log("调用", ret)
            //this.sprite.node.active = false
            let frame = new cc.SpriteFrame(ret);
            console.log(frame)
            this.sprite.spriteFrame = frame;
        }.bind(this));
    }
    // update (dt) {}
}

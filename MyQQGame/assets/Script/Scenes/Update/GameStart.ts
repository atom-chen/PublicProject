import { HttpService } from "../../Framework/network/httpservice";
import Config from "../../Config/Config";
import { gen_handler } from "../../Framework/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    // onLoad () {}

    @property(cc.Sprite) sprite:cc.Sprite;

    start () {
        this.load_remote();
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
            this.sprite.spriteFrame.setTexture(ret);
            //ret is cc.texture
        }.bind(this))
    },
    // update (dt) {}
}

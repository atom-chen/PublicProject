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

    onLoad ()
    {
        this.canvas = cc.find("Canvas");
        this.mainScenePanel = cc.find("Canvas/MainScenePanel");
        this.foodContent = this.node.getChildByName("Content");
        this.foodContenWorldPos = this.GetWorldPos();
        //监听
        this.node.on(cc.Node.EventType.TOUCH_START,this.on_touch_start,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.on_touch_move,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.on_touch_end,this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.on_touch_cancel,this);
        this.foodIconItem = this.foodContent.getChildByName("FoodItem");
        if(this.foodIconItem != null)
        {
            console.log(this.foodIconItem.getComponent(cc.Sprite).spriteFrame.name);
        };
    },

    start () {
        
    },

    on_touch_start(t)
    {
        cc.moveInNode = null;
        console.log("触摸开始");
        var pos = this.GetWorldPos();
        this.foodContent.setParent(this.canvas);
        this.SetWorldPos(pos);
    },

    on_touch_end(t)
    {
        console.log("触摸内结束");
        this.foodContent.setParent(this.node);
        this.foodContent.setPosition(cc.v2(0, 0));
    },

    on_touch_cancel(t)
    {
        console.log("触摸外结束");
        this.FindComposeFoodItemNode();
        this.foodContent.setParent(this.node);
        this.foodContent.setPosition(cc.v2(0, 0));
        if(cc.moveInNode != null)
        {
            console.log("触摸到其他格子");
            console.log(cc.moveInNode.name);
            if(cc.moveInNode.name != this.node.name)
            {
                console.log(this.node.name);
                console.log(cc.moveInNode.name);
                var state = this.CheckIsComposeOrReplace();
                if(state == 0)
                {
                    console.log("开始拖拽到这个地方");
                    this.foodIconItem.active = false;

                    var moveInSp = cc.moveInNode.getComponent("FoodItem");
                    moveInSp.foodIconItem.active = true;
                    moveInSp.foodIconItem.getComponent(cc.Sprite).spriteFrame = this.foodIconItem.getComponent(cc.Sprite).spriteFrame;
                }
                else if(state == 1)
                {
                    console.log("开始符合合成");
                    var spriteName = this.foodIconItem.getComponent(cc.Sprite).spriteFrame.name
                    console.log(spriteName);
                    var spriteFrame = this.GetComposeSpriteFrame(spriteName)
                    if(spriteFrame == null)
                    {
                        this.foodIconItem.active = true;
                    }
                    else
                    {
                        var moveInSp = cc.moveInNode.getComponent("FoodItem");
                        this.foodIconItem.active = false;
                        moveInSp.foodIconItem.active = true;
                        moveInSp.foodIconItem.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    }
                    // cc.loader.loadRes("Food/"+spriteName, function(err, spriteFrame)
                    // {
                    //     console.log("加载替换的资源");
                    //     let frame = new cc.SpriteFrame(spriteFrame);
                    //     moveInSp.foodIconItem.getComponent(cc.Sprite).spriteFrame = frame;
                    // });
                }
                else{
                    console.log("不执行任何操作");
                };
            };
        };
    },

    on_touch_move(t){
        //定义一个n_pos变量存储当前触摸点的位置
        //var n_pos = t.getLocation();
        var n_pos = t.getLocation();
        var delta=t.getDelta();
        this.foodContent.x+=delta.x;
        this.foodContent.y+=delta.y;
    },

    FindComposeFoodItemNode()
    {
        console.log("FindComposeFoodItemNode()");
        var layerout = cc.find("Canvas/MainScenePanel/ComposePanel/layout");
        console.log(layerout.name);
        for (var i=1; i <= 15; i++)
        {
            var childName = "FoodItem" + i.toString();
            console.log(childName);
            var foodItemSp = layerout.getChildByName(childName).getComponent("FoodItem");
            var foodContentWorldPos = foodItemSp.foodContenWorldPos;
            var curFoodContentWorldPos = this.GetWorldPos();
            var disX = Math.abs(curFoodContentWorldPos.x - foodContentWorldPos.x);
            var disY = Math.abs(curFoodContentWorldPos.y - foodContentWorldPos.y);
            if(disX <= 58.75 && disY <= 63.3)
            {
                cc.moveInNode = layerout.getChildByName("FoodItem"+ i.toString());
                console.log("找到需要合成的位置");
                console.log(cc.moveInNode.name);
                return;
            };
        };
    },

    //判断是合成还是拖到地方上去
    CheckIsComposeOrReplace()
    {
        if(cc.moveInNode != null)
        {
            var foodContent = cc.moveInNode.getChildByName("Content");
            var foodItemIcon = foodContent.getChildByName("FoodItem");
            if(foodItemIcon.active == false)
            {
                return 0;
            }
            else
            {
                var moveInSprite = foodItemIcon.getComponent(cc.Sprite);
                var dragSprite =  this.foodContent.getChildByName("FoodItem").getComponent(cc.Sprite);
                if(moveInSprite.spriteFrame.name == dragSprite.spriteFrame.name)
                {
                    return 1;
                }
                else
                {
                    return 2;
                };
                
            }
        }
        return -1;
    },

    GetComposeSpriteFrame(name)
    {
        if(name == "food_3")
        {
            console.log("已经是最高级不能合成");
            return null;
        }
        else if(name == "food_2")
        {
            var sprite = this.mainScenePanel.getChildByName("Food5").getComponent(cc.Sprite);
            return sprite.spriteFrame;
        }
        else if(name == "food_5")
        {
            var sprite = this.mainScenePanel.getChildByName("Food4").getComponent(cc.Sprite);
            return sprite.spriteFrame;
        }
        else if(name == "food_4")
        {
            var sprite = this.mainScenePanel.getChildByName("Food1").getComponent(cc.Sprite);
            return sprite.spriteFrame;
        }
        else if(name == "food_1")
        {
            var sprite = this.mainScenePanel.getChildByName("Food3").getComponent(cc.Sprite);
            return sprite.spriteFrame;
        }
    },

    GetWorldPos()
    {
        return this.foodContent.convertToWorldSpaceAR(cc.v2(0, 0));
    },

    SetWorldPos(pos)
    {
        this.foodContent.position = this.foodContent.parent.convertToNodeSpaceAR(pos);
    },
    // update (dt) {},
});

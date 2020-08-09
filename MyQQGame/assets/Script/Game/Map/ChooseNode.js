
cc.Class({
    extends: cc.Component,

    properties: {
        trial : cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.canvas = cc.find("Canvas");
        this.AddDragListener();
    },

    Init(chooseNodeData, chooseNodePool)
    {
        this.chooseNodeData = chooseNodeData;
        this.chooseNodePool = chooseNodePool;
        this.mapView = this.chooseNodePool.ctrl.mapView;
    },

    AddDragListener()
    {
        this.node.on(cc.Node.EventType.TOUCH_START,this.TouchStart,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.TouchMove,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.TouchEnd,this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.TouchCancel,this);
    },

    TouchStart(t)
    {
        console.log("触摸开始");
        var pos = this.GetWorldPos();
        this.trial.setParent(this.canvas);
        this.SetWorldPos(pos);
        this.trial.zIndex = 1;
    },

    TouchMove(t)
    {
        //定义一个n_pos变量存储当前触摸点的位置
        //var n_pos = t.getLocation();
        var n_pos = t.getLocation();
        var delta = t.getDelta();
        this.trial.x += delta.x;
        this.trial.y += delta.y;
    },

    TouchEnd(t)
    {
        console.log("触摸内结束");
        this.trial.setParent(this.node);
        this.trial.setPosition(cc.v2(0, 0));
        this.trial.zIndex = 0;
    },

    TouchCancel(t)
    {
        console.log("触摸外结束");
        //判断松开的时候是否在玩家需要填充的轨道上
        this.CheckIsInPlayerFillNode();
        this.CheckIsUpdateChooseNodePool();
        this.trial.setParent(this.node);
        this.trial.setPosition(cc.v2(0, 0));
    },

    //手指松开时判断是否在地图的玩家填充点；（如果是则填入并且检测是否通关，反之回到pool）
    CheckIsInPlayerFillNode()
    {
        console.log("开始检测是否在玩家需要填充轨道的点");
        var playerFillNodes = this.mapView.playerFilldNodes;
        for (let index = 0; index < playerFillNodes.length; index++) {

            console.log("开始循环检测");
            var playerFillNode = playerFillNodes[index];
            var playerFillNodeWorldPos = playerFillNode.nodeWorldPosition;
            var chooseNodeWorldPos = this.GetWorldPos();
            var disX = Math.abs(chooseNodeWorldPos.x - playerFillNodeWorldPos.x);
            var disY = Math.abs(chooseNodeWorldPos.y - playerFillNodeWorldPos.y);
            
            console.log(disX, disY);
            if(disX <=40 && disY <= 40)
            {
                console.log("检测到玩家需要填充的点");
                var spriteFrame = this.trial.getComponent(cc.Sprite).spriteFrame;
                var result = playerFillNode.UpdateSurface(spriteFrame, this.chooseNodeData);
                cc.chooseNode = this.node;
                
                if(result)
                {
                    this.chooseNodePool.UpdateNodePool();
                };
                return;
            };
        }
    },

    //是否需要更新池子中点，如果更新则需要
    CheckIsUpdateChooseNodePool()
    {

    },

    GetWorldPos()
    {
        return this.trial.convertToWorldSpaceAR(cc.v2(0, 0));
    },

    SetWorldPos(pos)
    {
        this.trial.position = this.trial.parent.convertToNodeSpaceAR(pos);
    },

    start () {

    },

    OnDestroy(){
        this.node.destroy();
        this.node = null;
    },
    // update (dt) {},
});

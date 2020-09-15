cc.Class({
    extends: cc.Component,

    properties: {
        mapDis : 107,
        trianNodeDis : 33.63,
    },

    onLoad ()
    {
       
    },

    Create(trialNodeList, callBack)
    {
        this.node.active = true;
        this.node.zIndex = 1;
        this.trianNode1 = this.node.getChildByName("Node1");
        this.trianNode2 = this.node.getChildByName("Node2");
        this.trianNode3 = this.node.getChildByName("Node3");
        console.log("火车初始化");
        console.log(this.trianNode1.name, this.trianNode2.name, this.trianNode3.name);
        console.log(this.trianNodeDis);
        this.moveIndex = 0;
        this.trialNodeList = trialNodeList;
        this.callBack = callBack;
        this.start = true;
        cc.Mgr.AudioMgr.playSFX("TrainStart");
        cc.Mgr.AudioMgr.playSFX("TarinRun");
        this.StartMove();
    },

    StartMove()
    {
        var mapNode = this.trialNodeList[this.moveIndex];
        console.log("检查火车链表数据");
        console.log(this.trialNodeList);

        if(mapNode != null)
        {
            if(this.moveIndex == 0)
            {
                this.trianNode1.setPosition(cc.v2(mapNode.data.col * this.mapDis - 268, mapNode.data.row * this.mapDis - 515));
                this.trianNode2.setPosition(cc.v2(mapNode.data.col * this.mapDis - 268 - 33.63, mapNode.data.row * this.mapDis - 515));
                this.trianNode3.setPosition(cc.v2(mapNode.data.col * this.mapDis - 268 - 33.63 * 2, mapNode.data.row * this.mapDis - 515));
                this.moveIndex = this.moveIndex + 1;
                this.StartMove();
            }
            else
            {
                this.SetRotation(mapNode);
                cc.tween(this.trianNode1)
                    .to(0.5, { position: cc.v2(mapNode.data.col * this.mapDis - 268, mapNode.data.row * this.mapDis - 515)})
                    .call(() => { 
                        this.moveIndex = this.moveIndex + 1;
                        console.log("火车头的位置");
                        console.log(this.trianNode1.position);
                        this.StartMove();
                     })
                    .start(() => {
                        
                    })
            };
        }
        else
        {
            console.log("移动结束拉");
            this.start = false;
            if(this.callBack != null)
            {
                this.callBack();
            };
        }
    },

    SetRotation(mapNode)
    {
        var target = cc.v2(mapNode.data.col * this.mapDis - 268, mapNode.data.row * this.mapDis - 515)
        var dx = target.x - this.trianNode1.x;
        var dy = target.y - this.trianNode1.y;
        var dir = cc.v2(dx,dy);
        var angle = dir.signAngle(cc.v2(1,0));
        var degree = angle / Math.PI * 180;
        this.trianNode1.angle = -degree;
    },



    //更新火车节点位置信息
    UpdateTrianNodes(index)
    {
        if(index == 2)
        {
            
            var preTrianNode = this.trianNode1;
            var dx = preTrianNode.position.x - this.trianNode2.position.x;
            var dy = preTrianNode.position.y - this.trianNode2.position.y;

            //设置角度
            var dir = cc.v2(dx,dy);
            var angle = dir.signAngle(cc.v2(1,0));
            var degree = angle / Math.PI * 180;
            this.trianNode2.angle = -degree;


            //根据向量计算当前位置并更新，以前一节节点为起始点
            var dirNormal = dir.normalize();
            var disVec = cc.v2(dirNormal.x * 33.63 * (-1), dirNormal.y * 33.63 * (-1));
            var pos = cc.v2(preTrianNode.position.x + disVec.x, preTrianNode.position.y + disVec.y);
            this.trianNode2.setPosition(pos);
        };

        if(index == 3)
        {
            var preTrianNode = this.trianNode2;
            var dx = preTrianNode.position.x - this.trianNode3.position.x;
            var dy = preTrianNode.position.y - this.trianNode3.position.y;

            //设置角度
            var dir = cc.v2(dx,dy);
            var angle = dir.signAngle(cc.v2(1,0));
            var degree = angle / Math.PI * 180;
            this.trianNode3.angle = -degree;

            //根据向量计算当前位置并更新，以前一节节点为起始点
            var dirNormal = dir.normalize();
            var disVec = cc.v2(dirNormal.x * 33.63 * (-1), dirNormal.y * 33.63 * (-1));
            var pos = cc.v2(preTrianNode.position.x + disVec.x, preTrianNode.position.y + disVec.y);
            this.trianNode3.setPosition(pos);
        };
    },

    update (dt) {
        if(this.start == true)
        {
            this.UpdateTrianNodes(2);
            this.UpdateTrianNodes(3);
        };
        
    },
});


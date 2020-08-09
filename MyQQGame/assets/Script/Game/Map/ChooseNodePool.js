
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    ctor : function()
    {
        this.ctrl = arguments[0];  
    },

    // LIFE-CYCLE CALLBACKS:

    Create()
    {
        this.canvas = cc.find("Canvas");
        this.chooseNodeDatas = this.ctrl.mapJson.chooseNodes;
        this.mapConstData = this.ctrl.mapConstJson;
        if(this.node == null)
        {
            cc.loader.loadRes("Prefabs/Map/ChooseNodePool", function(err,  prefab)
            {
                this.node = cc.instantiate(prefab);
                this.canvas.addChild(this.node);
                this.node.setPosition(cc.v2(9.048, -490));
                this.node.zIndex = 1;
                this.InitNodePool();
            }.bind(this));
        }
        else
        {
            this.UpdateWholePool();
        };
    },
    
    InitNodePool()
    {
        
        //初始化四个格子
        this.chooseNodes = new Array();
        this.chooseNextNode = this.node.getChildByName("ChooseNodeNext");
        this.chooseNodes[0] = this.node.getChildByName("ChooseNode1");
        this.chooseNodes[1] = this.node.getChildByName("ChooseNode2");
        this.chooseNodes[2] = this.node.getChildByName("ChooseNode3");
        this.chooseNodes[3] = this.node.getChildByName("ChooseNode4");

        this.UpdateWholePool();
    },

    UpdateWholePool()
    {
        this.node.active = true;
        this.chooseNodeDatas = this.ctrl.mapJson.chooseNodes;
        this.mapConstData = this.ctrl.mapConstJson;

        for (let index = 0; index < this.chooseNodes.length; index++) {
            var chooseNodeData = this.GetRandomChooseNode();
            this.UpdateNode(chooseNodeData, this.chooseNodes[index]);
        };

        //初始化下一个NextNode
        var chooseNodeData = this.GetRandomChooseNode();
        this.UpdateNode(chooseNodeData, this.chooseNextNode);
        this.nextChooseNodeData = chooseNodeData;
    },

    //从池子里随机获取一个数据
    GetRandomChooseNode()
    {
        var randomIndex = Math.floor(Math.random()* this.chooseNodeDatas.length); 
        if(randomIndex >= this.chooseNodeDatas.length)
        {
            randomIndex = this.chooseNodeDatas.length - 1;
        };

        return this.chooseNodeDatas[randomIndex];
    },

    //设置节点信息
    UpdateNode(nodeData, node)
    {
        if(nodeData.roadType > 0) 
        {
            var roadTypeKey = 'roadType' + nodeData.roadType;
            var roadPicKey = 'roadPic' + nodeData.roadPic;

            var chooseNodeData = this.mapConstData[roadTypeKey][roadPicKey]
            var surfaceSpName = chooseNodeData.pic;
            console.log(surfaceSpName);

            var chooseNode = node.getComponent("ChooseNode")
            if(chooseNode != null)
            {
                console.log("初始化池子小node")
                chooseNode.Init(chooseNodeData, this);
            }
            
            //根据配置去取地图图片资源(这是地图节点surface的图片)
            var path = "Textures/Map/MapNode/" + surfaceSpName;
            cc.loader.loadRes(path, cc.SpriteFrame, function (err, spriteFrame) {
                if (err) {
                    console.log(err);
                    return;
                }
                var trial = node.getChildByName("Trial");
                trial.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                trial.setPosition(cc.v2(nodeData.offsetX, nodeData.offsetY));
                trial.rotation = - chooseNodeData.rotateZ;


            }.bind(this));
        };
    },

    //拖拽之后更新
    UpdateNodePool()
    {
        //根据数据更新当前的pool
        if(cc.chooseNode != null)
        {
            this.UpdateNode(this.nextChooseNodeData, cc.chooseNode);
        };
        cc.chooseNode = null;

        //更新下一个点
        //初始化下一个NextNode
        var chooseNodeData = this.GetRandomChooseNode();
        this.UpdateNode(chooseNodeData, this.chooseNextNode);
        this.nextChooseNodeData = chooseNodeData;
    },

    Open()
     {
        this.node.active = true;
     },

     Close()
     {
        this.node.active = false;
     },

     OnDestroy(){
        this.node.destroy();
        this.node = null;
    },
    // update (dt) {},
});

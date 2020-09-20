
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    ctor : function()
    {
        this.refreshTime = 5;
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
                this.node.zIndex = 1;
                this.refreshNum = 3;
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
        this.SetUIInfo();
        this.AddButtonListener();
        this.UpdateFreshTimes();
    },

    UpdateFreshTimes()
    {
        this.taskId = cc.Mgr.UpdateMgr.DelayTask(function(){
            console.log("刷新按钮时间");
            if(this.refreshTime <= 5 && this.refreshTime > 0)
            {
                this.refreshTime--;
            };

            this.SetUIInfo();
        }.bind(this), 1);
    },

    SetUIInfo()
    {
        var switchNode = this.node.getChildByName("Switch");
        switchNode.getChildByName("TimesLabel").getComponent(cc.Label).string = "剩余时间:" + this.refreshTime;
        if(this.refreshTime == 0)
        {
            switchNode.getChildByName("TimesLabel").getComponent(cc.Label).string = "点击刷新";
        };
    },

    AddButtonListener() {
        console.log("添加按钮点击事件");
        var switchNode = this.node.getChildByName("Switch");
        var button = switchNode.getChildByName("SwitchBtn").getComponent(cc.Button)
        button.node.on('click', this.ClickRefresh, this);
    },

    ClickRefresh()
    {
        
        if(this.refreshTime == 0)
        {
            this.refreshTime = 5;
            this.UpdateWholePool();
            this.SetUIInfo();
        };
    },

    UpdateWholePool()
    {
        this.node.active = true;
        this.chooseRoads = this.ctrl.mapJson.chooseRoads;
        this.mapConstData = this.ctrl.mapConstJson;

        for (let index = 0; index < this.chooseNodes.length; index++) {
            var chooseRoad = this.GetRandomChooseNode();
            this.UpdateNode(chooseRoad, this.chooseNodes[index]);
        };

        //初始化下一个NextNode
        var chooseRoad = this.GetRandomChooseNode();
        this.UpdateNode(chooseRoad, this.chooseNextNode);
        this.nextChooseRoad = chooseRoad;
    },

    //从池子里随机获取一个数据
    GetRandomChooseNode()
    {
        var randomIndex = Math.floor(Math.random()* this.chooseRoads.length); 
        if(randomIndex >= this.chooseRoads.length)
        {
            randomIndex = this.chooseRoads.length - 1;
        };
        return this.chooseRoads[randomIndex];
    },

    //设置节点信息
    UpdateNode(chooseRoad, node)
    {
        var picName = chooseRoad.pic;
        console.log(picName);

        var chooseNode = node.getComponent("ChooseNode")
        if(chooseNode != null)
        {
            console.log("初始化池子小node")
            chooseNode.Init(chooseRoad, this);
        }
        
        var sp = "Textures/Map/MapNode/" + picName;
        cc.loader.loadRes(sp, cc.SpriteFrame, function (err, spriteFrame) {
            var trial = node.getChildByName("Trial");
            trial.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            trial.angle = chooseRoad.rotateZ;
        }.bind(this));

        //根据配置去取地图图片资源(这是地图节点surface的图片)
        // cc.Mgr.ResMgr.LoadAssetBundle(BundleName.MapNode, picName, cc.SpriteFrame, function(spriteFrame)
        // {
        //     var trial = node.getChildByName("Trial");
        //     trial.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        //     trial.angle = chooseRoad.rotateZ;
        // }.bind(this));
    },

    //拖拽之后更新
    UpdateNodePool()
    {
        //根据数据更新当前的pool
        if(cc.chooseNode != null)
        {
            this.UpdateNode(this.nextChooseRoad, cc.chooseNode);
        };
        cc.chooseNode = null;

        //更新下一个点
        //初始化下一个NextNode
        var chooseRoad = this.GetRandomChooseNode();
        this.UpdateNode(chooseRoad, this.chooseNextNode);
        this.nextChooseRoad = chooseRoad;
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
        cc.Mgr.UpdateMgr.CancelTask(this.taskId);
        this.node.destroy();
        this.node = null;
    },
    // update (dt) {},
});

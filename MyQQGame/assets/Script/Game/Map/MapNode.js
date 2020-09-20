
cc.Class({
    extends: cc.Component,

    properties: {
        playerFilled : cc.Node,
        imageItem : cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad ()
    {
        
    },

    start () {

    },

    //创建mapNode节点，注：data为json数据, mapConstData地图配置文件
    CreateMapNode(data, mapView)
    {
        this.mapView = mapView;
        this.data = data;
        this.UpdateNode();
        this.nodeWorldPosition = this.GetWorldPos();
    },

    UpdateNode()
    {
        var picName = this.data.mapItemData.pic;
        //bundle加载
        if(picName != null)
        {
            this.imageItem.active = true;
            console.log("加载的图片", picName);
            var sp = "Textures/Map/MapNode/" + picName;
            cc.loader.loadRes(sp, cc.SpriteFrame, function (err, spriteFrame) {
                this.imageItem.active = true;
                this.imageItem.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                this.imageItem.angle = this.data.mapItemData.rotateZ;
                this.UpdatePlayerFill();
            }.bind(this));
            // cc.Mgr.ResMgr.LoadAssetBundle(BundleName.MapNode, picName, cc.SpriteFrame, function(spriteFrame)
            // {
            //     this.imageItem.active = true;
            //     this.imageItem.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            //     this.imageItem.angle = this.data.mapItemData.rotateZ;
            //     this.UpdatePlayerFill();
            // }.bind(this));
        }
        else
        {
            this.imageItem.active = false;
        };
    },

    //清除出入口记录
    ClearWayRecord()
    {
        this.wayRecord = 0;
        this.wayAllUse = false;
    },

    //记录出入口使用
    RecordWay()
    {
        this.wayRecord = this.wayRecord + 1;
        if(this.wayRecord == this.data.mapItemData.ways.length)
        {
            this.wayAllUse = true;
        };
    },

    GetMapItemData()
    {
        return this.data.mapItemData;
    },

    //填充点挖掉
    UpdatePlayerFill()
    {
        if(this.data.playerFill)
        {
            this.imageItem.active = false;
            this.playerFilled.active = true;
        };
    },

    GetWorldPos()
    {
        return this.imageItem.convertToWorldSpaceAR(cc.v2(0, 0));
    },

    //玩家拖拽时，填充点更新
    UpdateItem(spriteFrame, chooseRoad)
    {
        // if(chooseRoad.itemType != this.data.mapItemData.itemType)
        // {
        //     console.log("地形不符合");
        //     return false;
        // }
        this.imageItem.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        this.imageItem.angle = chooseRoad.rotateZ;
        this.imageItem.active = true;

        //记录改填充点的所填充的节点信息
        this.data.mapItemData.ways = chooseRoad.ways;
        this.fillData = this.data;
        

        //同时检测是否完成关卡
        this.mapView.StartCheckIsComplete();

        return true;
    },

    onDestroy()
    {

    },

    // update (dt) {},
});

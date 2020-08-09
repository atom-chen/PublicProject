
cc.Class({
    extends: cc.Component,

    properties: {
        floor : cc.Node,
        surface : cc.Node,
        posLabel : cc.Label,
        playerFilled : cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad ()
    {
        this.floorNode = this.node.getChildByName("FloorNode");
        this.surfaceNode = this.node.getChildByName("SurfaceNode");
    },

    start () {

    },

    //创建mapNode节点，注：data为json数据, mapConstData地图配置文件
    CreateMapNode(data, mapConstData, mapView)
    {
        this.mapView = mapView;
        this.mapConstData = mapConstData;
        this.data = data;
        this.UpdateNode();
        this.UpdatePlayerFill();
        this.nodeWorldPosition = this.GetWorldPos();
    },

    UpdateNode()
    {
        if(this.data.roadType > 0) 
        {
            var nodeData = this.GetThisRoadConstData();
            var surfaceSpName = nodeData.pic;
            console.log(surfaceSpName);
            //根据配置去取地图图片资源(这是地图节点surface的图片)
            var path = "Textures/Map/MapNode/" + surfaceSpName;
            cc.loader.loadRes(path, cc.SpriteFrame, function (err, spriteFrame) {
                if (err) {
                    console.log(err);
                    return;
                }
                
                var surface = this.surfaceNode.getChildByName("Surface");
                surface.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                surface.setPosition(cc.v2(this.data.offsetX, this.data.offsetY));
                surface.rotation = - nodeData.rotateZ;
                
                
            }.bind(this));
        }
        else
        {
            this.surfaceNode.active = false;
        };

        if(this.data.bgType > 0)
        {
            this.floorNode.active = true;
            var bgData = this.GetThisBgConstData(this.data);
            var bgName = bgData.pic;
            
            //根据配置去取地图图片资源(这是地图节点floor的图片)
            var path = "Textures/Map/MapNode/" + bgName;
            cc.loader.loadRes(path, cc.SpriteFrame, function (err, spriteFrame) {
                if (err) {
                    console.log(err);
                    return;
                }
                
                var floor = this.floorNode.getChildByName("Floor");
                floor.getComponent(cc.Sprite).spriteFrame = spriteFrame

                floor.rotation = - bgData.rotateZ;
            }.bind(this));

        }
        else
        {
            this.floorNode.active = false;
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
        var constData = this.GetRoadConstData();
        if(this.wayRecord >= constData.ways.length)
        {
            this.wayAllUse = true;
        };
    },


    //获取配置信息(玩家填充的则是，返回玩家填充的信息)
    GetRoadConstData()
    {
        if(this.data.playerFill)
        {
            if(this.fillData != null)
            {
                var roadTypeKey = 'roadType' + this.fillData.roadType;
                var roadPicKey = 'roadPic' + this.fillData.roadPic;
                return this.mapConstData[roadTypeKey][roadPicKey]
            };
            return null;
        }


        var roadTypeKey = 'roadType' + this.data.roadType;
        var roadPicKey = 'roadPic' + this.data.roadPic;
        return this.mapConstData[roadTypeKey][roadPicKey];
    },

    GetThisRoadConstData()
    {
        var roadTypeKey = 'roadType' + this.data.roadType;
        var roadPicKey = 'roadPic' + this.data.roadPic;
        return this.mapConstData[roadTypeKey][roadPicKey];
    },

    //获取配置信息
    GetThisBgConstData()
    {
        var bgTypeKey = 'bgType' + this.data.bgType;
        return this.mapConstData['bg'][bgTypeKey];
    },

    //填充点挖掉
    UpdatePlayerFill()
    {
        if(this.data.playerFill)
        {
            this.surfaceNode.getChildByName("Surface").active = false;
            if(this.data.roadType != 2)
            {
                this.playerFilled.active = true;
            }
        };
    },

    GetWorldPos()
    {
        return this.surfaceNode.convertToWorldSpaceAR(cc.v2(0, 0));
    },


    //玩家拖拽时，填充点更新
    UpdateSurface(spriteFrame, chooseNodeData)
    {
        if(chooseNodeData.roadType != this.data.roadType)
        {
            console.log("地形不符合");
            return false;
        }

        var surface = this.surfaceNode.getChildByName("Surface");
        surface.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        surface.rotation = - chooseNodeData.rotateZ;
        surface.active = true;

        //记录改填充点的所填充的节点信息
        this.fillData = chooseNodeData;

        //同时检测是否完成关卡
        this.mapView.StartCheckIsComplete();

        return true;
    },

    onDestroy()
    {

    },

    // update (dt) {},
});

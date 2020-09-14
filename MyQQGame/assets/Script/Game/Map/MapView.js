
cc.Class({
    extends: cc.Component,

    
    properties: {
        chooseNode : cc.Node,
        mapDis : 107,
    },

    // LIFE-CYCLE CALLBACKS:
    
    //加载数据
    onLoad () {
        //this.Create();
    },

    ctor : function()
    {
        this.ctrl = arguments[0];  
    },

    Create()
    {
        this.ClearMap();//创建之前先清理
        this.mapJson = this.ctrl.mapJson;
        this.canvas = cc.find("Canvas");
        
        this.mapNodePool = new Array();
        this.playerFilldNodes = new Array();
        this.envItemPool = new Array();
        if(this.node == null)
        {
            cc.loader.loadRes("Prefabs/Map/MapScene", function(err,  prefab)
            {
                this.node = cc.instantiate(prefab);
                this.canvas.addChild(this.node);
                this.node.setPosition(cc.v2(0, 0));
                this.mapItems = this.node.getChildByName("MapItems")
                this.trian = this.mapItems.getChildByName("Trian");
                this.envLow = this.node.getChildByName("EnvLayerLow");
                this.envHigh = this.node.getChildByName("EnvLayerHigh");
                // cc.Mgr.ResMgr.LoadBundle(BundleName.MapNode, function(){
                //     this.CreateMap();
                // }.bind(this));
                this.CreateMap();
            }.bind(this));
        }
        else
        {
            this.CreateMap();
        };
    },

    //创建地图
    CreateMap()
    {
        this.node.active = true;
        this.trian.active = false;
        console.log(this.mapJson.missionName);
        cc.loader.loadRes("Prefabs/Map/MapItem", function(err,  prefab)
        {
            var mapRoads = this.mapJson.mapRoads
            var i = 0; //记录玩家填充点的index
            for (let index = 0; index < mapRoads.length; index++) 
            {
                var mapRoad = mapRoads[index];
                var col = mapRoad.col;
                var row = mapRoad.row;
                var newNode = cc.instantiate(prefab);
                newNode.name = "col_" + toString(mapRoad.col) + ":" + "row_" + toString(mapRoad.row);
                this.node.getChildByName("MapItems").addChild(newNode);
                newNode.setPosition(cc.v2(col * this.mapDis - 268, row * this.mapDis - 515));
                var mapNode = newNode.getComponent("MapNode");
                mapNode.CreateMapNode(mapRoad, this);

                this.mapNodePool[index] = mapNode;
                if(mapRoad.playerFill)
                {
                    this.playerFilldNodes[i] = mapNode;
                    i = i + 1;
                };

                //找到起点和终点
                if(mapRoad.start == true)
                {
                    this.startMapNode = mapNode;
                };

                if(mapRoad.end == true)
                {
                    this.endMapNode = mapNode;
                };
            }
        }.bind(this));

        this.AddMapEnvironment();
    },

    //创建地图环境
    AddMapEnvironment()
    {
        //创建EnvLow
        cc.loader.loadRes("Prefabs/Map/EnvItem", function(err,  prefab)
        {
            for (let index = 0; index < this.mapJson.mapLowEnv.length; index++) {
                var envItem = cc.instantiate(prefab);
                var lowEnvData = this.mapJson.mapLowEnv[index];
                this.envLow.addChild(envItem);
                this.CreateEnvItem(envItem, lowEnvData)
            };
        }.bind(this));

        //创建EnvHigh
        cc.loader.loadRes("Prefabs/Map/EnvItem", function(err,  prefab)
        {
            for (let index = 0; index < this.mapJson.mapHighEnv.length; index++) {
                var envItem = cc.instantiate(prefab);
                var highEnvData = this.mapJson.mapHighEnv[index];
                this.envHigh.addChild(envItem);
                
                this.CreateEnvItem(envItem, highEnvData)
            };
        }.bind(this));
    },

    CreateEnvItem(envItem, envData)
    {
        envItem.setPosition(cc.v2(envData.x - 268, envData.y - 195));
        envItem.angle = envData.mapEnvData.rotate;
        envItem.setScale(envData.mapEnvData.scale);
        var picName = envData.mapEnvData.pic

        this.envItemPool.push(envItem);
        var sp = "Textures/Map/MapNode/" + picName;
        cc.loader.loadRes(sp, cc.SpriteFrame, function (err, spriteFrame) {
            envItem.getChildByName("ImageItem").getComponent(cc.Sprite).spriteFrame = spriteFrame;
        }.bind(this));


        // cc.Mgr.ResMgr.LoadAssetBundle(BundleName.MapNode, picName, cc.SpriteFrame, function(spriteFrame)
        // {
        //     envItem.getChildByName("ImageItem").getComponent(cc.Sprite).spriteFrame = spriteFrame;
        // });
    },

    // 1-从轨道起始点开始检测, 根据起始点的出口，确定下一个点;
    // 2-判断填充点是否与上一个点接上，接上则跳转步骤3，否则判断不通关;(注：每一对出入口都要判断)
    // 3-确定当前填充点的出口和入口，根据出口，确定下一个填充点，没有填充点则判断不通关，下一点为终点则通关，下一点为填充点跳转第二步；
    StartCheckIsComplete()
    {
        if(this.trialNodeList == null)
        {
            this.trialNodeList = new Array();
        };  
        this.trialNodeList.splice(0, this.playerFilldNodes.length);
        this.trialIndex = 0;

        var mapItemData = this.startMapNode.data.mapItemData;
        var exit = mapItemData.ways[0].end;

        //清除所有的出入口记录
        for (let index = 0; index < this.trialNodeList.length; index++) {
            this.mapNodePool[index].ClearWayRecord();
        }

        //递归检测
        this.CheckIsComplete(this.startMapNode, exit)

    },

    StartTrianAnim(callBack)
    {
        this.moveIndex = 0;
        //this.PlayTrianAnim(callBack);
        this.trian.getComponent("Trian").Create(this.trialNodeList, callBack);
    },

    //播放火车动画
    PlayTrianAnim(callBack)
    {
        var mapNode = this.trialNodeList[this.moveIndex];
        console.log("检查火车链表数据");
        console.log(this.trialNodeList);

        if(mapNode != null)
        {
            if(this.moveIndex == 0)
            {
                this.trian.active = true;
                this.trian.zIndex = 1;
                this.trian.setPosition(cc.v2(mapNode.data.col * this.mapDis - 268, mapNode.data.row * this.mapDis - 515));
                this.moveIndex = this.moveIndex + 1;
                this.PlayTrianAnim(callBack);
            }
            else
            {
                this.SetRotation(mapNode);
                cc.tween(this.trian)
                    .to(0.15, { position: cc.v2(mapNode.data.col * this.mapDis - 268, mapNode.data.row * this.mapDis - 515)})
                    .call(() => { 
                        this.moveIndex = this.moveIndex + 1;
                        this.PlayTrianAnim(callBack);
                     })
                    .start(() => {
                        
                    })
            };
        }
        else
        {
            if(callBack != null)
            {
                callBack();
            }
            this.trian.active = false;
            return;
        }
    },

    SetRotation(mapNode)
    {
        var target = cc.v2(mapNode.data.col * this.mapDis - 268, mapNode.data.row * this.mapDis - 515)
        var dx = target.x - this.trian.x;
        var dy = target.y - this.trian.y;
        var dir = cc.v2(dx,dy);
        var angle = dir.signAngle(cc.v2(1,0));
        var degree = angle / Math.PI * 180;
        this.trian.rotation =  degree;
    },

    //检测是否通关,递归
    CheckIsComplete(startMapNode, exit)
    {
        if(startMapNode != null)
        {
            this.trialNodeList[this.trialIndex] = startMapNode
            this.trialIndex = this.trialIndex + 1;

            var data = startMapNode.data;
            if(startMapNode.data.playerFill)
            {
                data = startMapNode.fillData;
            };

            if(data == null)
            {
                console.log("该点未被填充");
                return;
            };

            console.log("当前点, col, row", data.col, data.row, exit);
            var mapNode = this.GetNextMapNodeByExit(data, exit);
            if(mapNode == null)
            {
                console.log("下一个点为空点，不通关");
                return;
            };
        
            //步骤2
            console.log("检测连接下一点", mapNode.data.col, mapNode.data.row);
            console.log(mapNode.data);
            var result = this.CheckIsLinkComplete(mapNode, exit);
            if(result == false)
            {
                console.log("与下一个点连接不上，不通关");
                return;
            };
            console.log("检测连接成功");

            console.log("检测是否最后一点");
            if(mapNode.data.end == true)
            {
                console.log("恭喜你已经通关");

                this.ctrl.CompleteChater();
                return;
            };

            console.log("不是最后一点");
            //步骤3
            var exit = result.end;
            console.log(exit);
            this.CheckIsComplete(mapNode, exit);
        };
    },


    //根据出口判断是否连接上
    CheckIsLinkComplete(mapNode, exit)
    {
        var newStartAndEnd = {};
        var mapItemData = mapNode.GetMapItemData();
        if(mapItemData != null)
        {
            if(mapItemData.ways == null)
            {
                return false;
            };

            console.log("下一个点为", mapNode.data.col, mapNode.data.row);
            console.log(mapItemData);
            for (let index = 0; index < mapItemData.ways.length; index++) {
                var way = mapItemData.ways[index];
                if(exit == 1)
                {
                    if(way.start == 3)
                    {
                        newStartAndEnd.start = 3;
                        newStartAndEnd.end = way.end;
                        mapNode.RecordWay();
                        return newStartAndEnd;
                    }else if(way.end == 3)
                    {
                        newStartAndEnd.start = 3;
                        newStartAndEnd.end = way.start;
                        mapNode.RecordWay();
                        return newStartAndEnd;
                    };
                    
    
                }else if(exit == 2)
                {
                    if(way.start == 4)
                    {
                        newStartAndEnd.start = 4;
                        newStartAndEnd.end = way.end;
                        mapNode.RecordWay();
                        return newStartAndEnd;
                    }else if(way.end == 4)
                    {
                        newStartAndEnd.start = 4;
                        newStartAndEnd.end = way.start;
                        mapNode.RecordWay();
                        return newStartAndEnd;
                    };
                    
    
                }else if(exit == 3)
                {
                    if(way.start == 1)
                    {
                        newStartAndEnd.start = 1;
                        newStartAndEnd.end = way.end;
                        mapNode.RecordWay();
                        return newStartAndEnd;
                    }else if(way.end == 1)
                    {
                        newStartAndEnd.start = 1;
                        newStartAndEnd.end = way.start;
                        mapNode.RecordWay();
                        return newStartAndEnd;
                    };
                }else if(exit == 4)
                {
                    if(way.start == 2)
                    {
                        newStartAndEnd.start = 2;
                        newStartAndEnd.end = way.end;
                        mapNode.RecordWay();
                        return newStartAndEnd;
                    }else if(way.end == 2)
                    {
                        newStartAndEnd.start = 2;
                        newStartAndEnd.end = way.start;
                        mapNode.RecordWay();
                        return newStartAndEnd;
                    };
                };
            }
        };
        return false;
    },

    //根据出口找下一个点
    GetNextMapNodeByExit(nodeData, exit)
    {
        var col = nodeData.col;
        var row = nodeData.row;
        if(exit == 1)
        {
            col = col - 1;
        }else if(exit == 2)
        {
            row = row - 1;
        }else if(exit == 3)
        {
            col = col + 1;
        }else if(exit == 4)
        {
            row = row + 1;
        };
        for (let index = 0; index < this.mapNodePool.length; index++) {
            var mapNode = this.mapNodePool[index];
            if(col == mapNode.data.col && row == mapNode.data.row)
            {
                return mapNode;
            }
        };
    },

    //评价通关星级,1-完成一星；2-在规定时间里一星；3-完美通关一星（总共三星, 这里不判断时间那个颗星）
    JudgeStar()
    {
        //检测是否所有填充点都用到
        var result = true;
        var isAllUse = true;
        for (let index = 0; index < this.playerFilldNodes.length; index++) {
            var mapNode = this.playerFilldNodes[index];
            if(mapNode.fillData == null)
            {
                console.log("填充点没有完全都用");
                console.log(mapNode.data);
                isAllUse = false;
                result = false;
                break;
            }
        };

        //判断所有出入口是否用到（起点和终点不需要判断）
        var isAllWaysUse = true;
        for (let index = 0; index < this.trialNodeList.length; index++) {
            var mapNode = this.trialNodeList[index];
            //检测轨道的点，装饰点不检测
            if(mapNode != null && mapNode.data != null && mapNode.data.roadType != null)
            {
                if(mapNode.data.roadType > 0 && mapNode.data.roadPic > 0)
                {
                    if(mapNode.data.start || mapNode.data.end)
                    {
                        console.log("该点为起点或者终点不判断");
                    }
                    else
                    {
                        if(mapNode.wayAllUse == false)
                        {
                            console.log("有点所有出入口并没有都用");
                            console.log(mapNode.data);
                            isAllWaysUse = false;
                            result = false
                            break;
                        };
                    };
                };
            };
        };

        return result;
    },

     //清理当前的地图
     ClearMap()
     {
        if(this.mapNodePool != null)
        {
            for (let index = 0; index < this.mapNodePool.length; index++) {
                var mapNode = this.mapNodePool[index];
                if(mapNode != null)
                {
                    mapNode.node.destroy();
                };
            };
            this.mapNodePool.splice(0, this.mapNodePool.length);
        };

        if(this.playerFilldNodes != null)
        {
            this.playerFilldNodes.splice(0, this.playerFilldNodes.length);
        };  

        if(this.envItemPool != null)
        {
            for (let index = 0; index < this.envItemPool.length; index++) {
                var envItem = this.envItemPool[index];
                if(envItem != null)
                {
                    envItem.destroy();
                };
            };
            this.envItemPool.splice(0, this.envItemPool.length);
        };
     },

     Close()
     {
         this.node.active = false;
     },

     Open()
     {
         this.node.active = true;
     },

     OnDestroy(){
        this.node.destroy();
        this.node = null;
    },

    // update (dt) {},
});


cc.Class({
    extends: cc.Component,

    properties: {
        chooseNode : cc.Node,
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
        this.mapConstJson = this.ctrl.mapConstJson;
        this.mapJson = this.ctrl.mapJson;
        this.canvas = cc.find("Canvas");
        
        this.mapNodePool = new Array();
        this.playerFilldNodes = new Array();
        if(this.node == null)
        {
            cc.loader.loadRes("Prefabs/Map/MapScene", function(err,  prefab)
            {
                this.node = cc.instantiate(prefab);
                this.canvas.addChild(this.node);
                this.node.setPosition(cc.v2(0, 0));
                this.trian = this.node.getChildByName("Trian");
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
        cc.loader.loadRes("Prefabs/Map/MapNode", function(err,  prefab)
        {
            var nodeDatas = this.mapJson.mapNodes
            var i = 0; //记录玩家填充点的index
            for (let index = 0; index < nodeDatas.length; index++) 
            {
                var nodeData = nodeDatas[index];
                var col = nodeData.col;
                var row = nodeData.row;
                var newNode = cc.instantiate(prefab);
                newNode.name = "col_" + toString(nodeData.col) + ":" + "row_" + toString(nodeData.row);
                this.node.addChild(newNode);
                newNode.setPosition(cc.v2(col * 80 - 280, row * 80 - 300));
                var mapNode = newNode.getComponent("MapNode");
                mapNode.CreateMapNode(nodeData, this.mapConstJson, this);

                this.mapNodePool[index] = mapNode;
                if(nodeData.playerFill)
                {
                    this.playerFilldNodes[i] = mapNode;
                    i = i + 1;
                };

                //找到起点和终点
                if(nodeData.start == true)
                {
                    this.startMapNode = mapNode;
                };

                if(nodeData.end == true)
                {
                    this.endMapNode = mapNode;
                };
            }
        }.bind(this));
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

        var constNodeData = this.startMapNode.GetRoadConstData();
        var exit = constNodeData.ways[0].end;

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
        this.PlayTrianAnim(callBack);
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
                this.trian.setPosition(cc.v2(mapNode.data.col * 80 - 280, mapNode.data.row * 80 - 300));
                this.moveIndex = this.moveIndex + 1;
                this.PlayTrianAnim(callBack);
            }
            else
            {
                this.SetRotation(mapNode);
                cc.tween(this.trian)
                    .to(0.15, { position: cc.v2(mapNode.data.col * 80 - 280, mapNode.data.row * 80 - 300)})
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
            return;
        }
    },

    SetRotation(mapNode)
    {
        var target = cc.v2(mapNode.data.col * 80 - 280, mapNode.data.row * 80 - 300)
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
                startMapNode.fillData.col = data.col;
                startMapNode.fillData.row = data.row;
                data = startMapNode.fillData;
            };

            if(data == null)
            {
                console.log("该点未被填充");
                console.log(data.col, data.row);
            };

            console.log("当前点", exit);
            var mapNode = this.GetNextMapNodeByExit(data, exit);
            if(mapNode == null)
            {
                console.log("下一个点为空点，不通关");
                return;
            };
        
            //步骤2
            console.log("检测连接");
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
        var constNodeData = mapNode.GetRoadConstData();
        if(constNodeData != null)
        {
            console.log("下一个点为", mapNode.data.col, mapNode.data.row);
            for (let index = 0; index < constNodeData.ways.length; index++) {
                var way = constNodeData.ways[index];
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
            row = row + 1;
        }else if(exit == 3)
        {
            col = col + 1;
        }else if(exit == 4)
        {
            row = row - 1;
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

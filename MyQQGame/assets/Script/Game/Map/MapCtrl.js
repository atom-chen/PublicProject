
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    ctor : function()
    {
        console.log("mapCtrl 构造函数初始化");
        //this.mapView = arguments[0];
    },

    onLoad () {
        this.CreateView();
        this.CreatMap("10301");
    },

    //创建表现层
    CreateView()
    {
        var mapView = require("MapView");
        this.mapView = new mapView(this);

        var chooseNodePool = require("ChooseNodePool");
        this.chooseNodePool = new chooseNodePool(this);

        var mapUIInfoPanel = require("MapUIInfoPanel");
        this.mapUIInfoPanel = new mapUIInfoPanel(this);
    },

    //加载配置数据
    LoadMapConst(callBack)
    {
        var constJsonPath = "Json/MapJson/mapConst.json";   //地图配置
        cc.loader.loadRes(constJsonPath, function(err, res) {
            if (err) {
                console.log(err);
                return;
            }
            this.mapConstJson = res.json;
            if(callBack != null)
            {
                callBack();
            };
        }.bind(this));
    },

    //加载地图数据
    LoadMap(missonId, callBack)
    {
        var jsonPath = "Json/MapJson/" + missonId + ".json";      //地图数据
        cc.loader.loadRes(jsonPath, function(err, res) {
            if (err) {
                console.log(err);
                return;
            }
            this.mapJson = res.json;
            if(callBack != null)
            {
                callBack();
            };
        }.bind(this));
    },

    //创建地图，包括UI, 选择的池子
    CreatMap(missonId)
    {
        if(this.mapConstJson == null)
        {
            this.LoadMapConst(function(){
                this.LoadMap(missonId, function(){
                    this.mapView.Create();
                    this.chooseNodePool.Create();
                    this.mapUIInfoPanel.Create();
                }.bind(this));
            }.bind(this));
        }
        else
        {
            this.LoadMap(missonId, function(){
                this.mapView.Create();
                this.chooseNodePool.Create();
                this.mapUIInfoPanel.Create();
            }.bind(this));
        };
    },

    //清理地图（数据层面上的清理,地图节点将会被清理）
    ClearMap()
    {
        this.mapView.ClearMap();
        this.mapUIInfoPanel.Close();
        this.chooseNodePool.Close();
    },

    //通关
    CompleteChater()
    {
        this.mapUIInfoPanel.StopRecordTime();
        //ToDo:获取时间判定那颗星
        var timeStar = this.mapUIInfoPanel.JudgeStar();
        var mapStar = this.mapView.JudgeStar();

        var star = timeStar + mapStar;
        //ToDo:弹出胜利面板
        console.log("弹出胜利面板", star);
    },

    //表现层关闭
    CloseMap()
    {
        this.mapView.Close();
        this.mapUIInfoPanel.Close();
        this.chooseNodePool.Close();
    },

    //
    OpenMap()
    {
        this.mapView.Open();
        this.mapUIInfoPanel.Open();
        this.chooseNodePool.Open();
    },

    BackClick()
    {
        console.log("从地图返回");
        this.CloseMap();
    },

    Destroy()
    {

    },

});

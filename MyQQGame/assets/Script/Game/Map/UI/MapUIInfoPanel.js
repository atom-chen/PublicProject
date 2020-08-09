// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,
    properties: {
    },

    ctor : function()
    {
        this.ctrl = arguments[0];  
    },

    Create()
    {
        this.canvas = cc.find("Canvas");
        if(this.node == null)
        {
            cc.loader.loadRes("Prefabs/Map/MapUIInfoPanel", function(err,  prefab)
            {
                this.node = cc.instantiate(prefab);
                this.canvas.addChild(this.node);
                this.node.setPosition(cc.v2(0, 0));
    
                this.SetUIInfo();
            }.bind(this));
        }
        else
        {
            this.SetUIInfo();
        };
    },

    SetUIInfo()
    {
        this.mapConstJson = this.ctrl.mapConstJson;
        this.mapJson = this.ctrl.mapJson;
        this.timeRecord = this.node.getComponent("TimeRecord");

        console.log("设置章节信息");
        this.node.active = true;

        var chapterNameLabel = this.node.getChildByName("MapChapterLabel").getComponent(cc.Label);
        chapterNameLabel.string = this.mapJson.missionName;

        var button = this.node.getChildByName("ReturnButton").getComponent(cc.Button);
        button.node.on('click', this.BackClick, this);
        this.UpdateRecordTime();
    },

    BackClick()
    {
        this.ctrl.BackClick();
    },

    UpdateRecordTime()
    {
       this.timeRecord.StartRecorTime();
    },

    StopRecordTime()
    {
        this.timeRecord.StopRecordTime();
    },

    JudgeStar()
    {
        if(this.timeRecord.sceonds <= this.mapJson.starTime)
        {
            return 1;
        };
        return 0;
    },

    Open()
    {
        this.node.active = true;
        this.timeRecord.StartRecorTime();
    },

    Close()
    {
        this.node.active = false;
        this.timeRecord.StopRecordTime();
    },

    start () {

    },
});

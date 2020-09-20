
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.taskJson = {};
        this.taskId = 1;
    },

    start ()
    {

    },

    //每隔delayTime执行一次
    DelayTask(callBack, delayTime)
    {
        this.taskJson[this.taskId] = function()   
        {
            console.log("计时器回掉");
            if(callBack != null)
            {
                callBack();
            };
        };
        var taskId = this.taskId;
        this.taskId = this.taskId + 1;
        this.schedule(function()   
        {
            console.log("计时器回掉");
            if(this.taskJson[taskId] != null)
            {
                this.taskJson[taskId]();
            };
        },delayTime);
        return taskId;
    },

    //delayTime执行一次
    DelayTaskOnce(callBack, delayTime)
    {
        this.taskJson[this.taskId] = function()   
        {
            if(callBack != null)
            {
                callBack();
            };
        };
        var taskId = this.taskId;
        this.taskId = this.taskId + 1;
        this.scheduleOnce(function(){
            console.log("计时器回掉");
            if(this.taskJson[taskId] != null)
            {
                this.taskJson[taskId]();
            };
        }, delayTime)

        return taskId;
    },

    //取消计时器
    CancelTask(taskId)
    {
        if(this.taskJson[taskId] != null)
        {
            this.unschedule(this.taskJson[taskId]);
        };
        this.taskJson[taskId] = null;
    },

    update (dt) {


    },
});

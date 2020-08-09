// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        timeLabel : cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    StartRecorTime()
    {
        this.sceonds = 0;
        this.timeLabel.string = this.FormatDateTime(this.sceonds);
        this.schedule(function(){
            this.sceonds = this.sceonds + 1;
            this.timeLabel.string = this.FormatDateTime(this.sceonds);
        },1);
    },

    StopRecordTime()
    {
        this.unscheduleAllCallbacks(this);
    },

    FormatDateTime (secondsParam) 
    {
        let minuteName = ":";
        let secondName = ":";
        var minutes = parseInt(secondsParam / 60);
        var seconds = parseInt(secondsParam % 60);

        if(minutes < 10)
        {
            minutes = "0" + minutes;
        }

        if(seconds < 10)
        {
            seconds = "0" + seconds;
        }
        return minutes + minuteName + seconds;
    },

    update (dt) {
        
    },
});

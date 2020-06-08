var BaseView = cc.Class({
    extends: cc.Component,

    ctor: function(){
        this.assetAsynTable = {};
        this.gameObjsTable = {};
        //this.scene = cc.Mgr.SceneMgr.GetCurScene();
        this.listeners = [];
    },

    Create: function(){},

    AddEventListener: function(eventName, listener){
        cc.Mgr.EventMgr.AddEventListener(eventName, listener);
        this.listeners.push([eventName, listener]);
        return listener;
    },

    OnAllLoadCallBack: function(){},

    ///添加按钮点击事件
    BtnFunc: function(btn, func){
        if(btn)
        {
            btn.on('click', func);
        }
        else
        {
            console.log("add btn listener failed", btn, func);
        }
    },

    ///面板销毁后把所有异步加载方法指向此方法
    EmptyFunction: function(){},

    DestroyView: function(view){
        if(view){
            view.Destroy()
        }
    },

    DestroyExtendObj: function(obj){
        if(obj){
            obj.destroy();
        }
    },

    OnDestroy: function(){},

    Destroy: function(){
        for(k in this.listeners){
            cc.Mgr.EventMgr.RemoveEventListener(this.listeners[k][0], this.listeners[k][1]);
        };
        
        this.OnDestroy();

        this.assetAsynTable = null;
        this.gameObjsTable = null;
        this.listeners = null;
    },


});
module.exports = BaseView;
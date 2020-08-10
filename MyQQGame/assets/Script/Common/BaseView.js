var BaseView = cc.Class({
    extends: cc.Component,

    ctor: function(){
        this.assetAsynTable = [];
        this.gameObjsTable = [];
        //this.scene = cc.Mgr.SceneMgr.GetCurScene();
        this.listeners = [];
    },

    Create: function(){},

    AddEventListener: function(eventName, listener){
        cc.Mgr.EventMgr.AddEventListener(eventName, listener);
        this.listeners.push([eventName, listener]);
        return listener;
    },

    ///加载单个资源
    LoadAssetAsync: function(){
        var abTableItemNum = 0;
        for(var k in this.assetAsynTable) {
            abTableItemNum++;
        }
        var loadedCount = 0;
        for (var k in this.assetAsynTable){
            cc.loader.loadRes(this.assetAsynTable[k].assetName, function (err, prefab) {
                this.gameObjsTable[k] = prefab;
                loadedCount = loadedCount + 1;
                if (this.assetAsynTable[k].callBack){
                    this.assetAsynTable[k].callBack();
                }
                if (loadedCount == abTableItemNum){
                    this.OnAllLoadCallBack();
                }
            }.bind(this));
        };
    },

    ///加载同一文件夹下多个资源
    LoadAssetsAsync: function(path){
        cc.loader.loadResDir(path, function(err, assets){
            for(var k in assets){
                this.gameObjsTable[assets[k].name] = assets[k];
            }
            this.OnAllLoadCallBack();
        }.bind(this));
    },

    OnAllLoadCallBack: function(){
        
    },

    ///添加按钮点击事件
    BtnFunc: function(btn, func, js){
        if(btn)
        {
            btn.on('click', func, js);
        }
        else
        {
            console.log("add btn listener failed", btn, func, js);
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
        for(var k in this.listeners){
            cc.Mgr.EventMgr.RemoveEventListener(this.listeners[k][0], this.listeners[k][1]);
        };
        
        this.OnDestroy();

        this.assetAsynTable = null;
        this.gameObjsTable = null;
        this.listeners = null;
    },


});
module.exports = BaseView;
//全局事件处理  分发和监听   相当于一个全局观察者
//这个事件分发处理机制 没有针对每个绑定个体的
var EventMgr = cc.Class({
    
    ctor: function(){
        this.listeners = [];
    },
    //事件派发
    DispatchEvent: function (eventName, data) {
        if (this.listeners[eventName] == null){
            console.log("事件未监听" + eventName);
            return;
        }
        var returns = []; //返回值
        console.log('事件派发', eventName);

        for (var findEvenName in this.listeners){
            if (findEvenName == eventName) {
                for (var i = 0; i < this.listeners[findEvenName].length; i++) {
                    if (this.listeners[findEvenName][i])
                    {
                        var returnValue = this.listeners[findEvenName][i](data)
                        returns.push(returnValue)
                        console.log("触发事件", eventName)
                    }
                }
            }
        }
        return returns
    },

    //添加普通事件  监听
    AddEventListener: function (eventName, callback) {
        this.listeners[eventName] = this.listeners[eventName] || [];
        this.listeners[eventName].push(callback);
        console.log('完成事件注册监听', eventName);
        return this.listeners[eventName].length;
    },

    //通过事件名和target移除一种事件监听
    RemoveEventListener: function (eventName, callback) {
        if (!this.listeners[eventName])
            return;

        for (var i = 0; i < this.listeners[eventName].length; i++) {
            if (this.listeners[eventName][i] == callback)
            {
                this.listeners[eventName][i] = null;
                console.log("移除事件", eventName, callback)
                return;
            }
        }
    },

    //用名字移除所有事件
    RemoveAllEventListenersForEvent: function(eventName){
        this.listeners[eventName] = null;
    },

    //一次性清空所有数据
    RemoveAllEventListeners: function(){
        this.listeners = [];
    },
});
module.exports = EventMgr


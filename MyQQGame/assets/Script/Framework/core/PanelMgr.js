var Panels = require("Panels");
var Windows = require("Windows");

var PanelMgr = cc.Class({
    
    ctor: function(){
        this.currPanel = null;
        this.currPanelName = null;
        this.prePanelName = null;
        this.panelStack = [];
        this.windowList = [];
    },

    ChangePanel: function(panelName, args){
        if(this.currPanelName == panelName){
            console.log("PanelManager", "已经在当前Panel", panelName);
            return;
        }
        
        var openPanelConfig = Panels[panelName];
        if(openPanelConfig)
        {
            ///新的panel入栈
            this.panelStack.push({'panelName': panelName, 'args': args});
            this.prePanelName = this.currPanelName;
            this.currPanelName = panelName;

            ///打开新panel
            this.CloseAllWindow();
            this.ShowPanel(openPanelConfig, args);
            console.log("PanelManager", "打开面板", panelName, this.prePanelName);
        }
        else
        {
            console.log("PanelManager", "无法找到对应Panel配置", panelName);
        } 
    },

    ///回退到上一个panel
    PopPanel: function(){
        var len = this.panelStack.length;
        console.log("PanelManager", "回退到上一个界面", len, this.currPanelName);

        if(len > 0)
        {
            ///关闭当前panel
            this.ClosePanel(this.currPanel);
            this.currPanel = null;
            ///移除栈顶panel
            this.panelStack.removeAt(len - 1);
            len = this.panelStack.length;
            if(len == 0)
            {
                this.Clear();
                this.ShowMain();
                return;
            }
            ///如果存在超过两个堆栈，去除多余的
            if(len > 2)
            {
                for(var i = 0; i < len - 3; i++)
                {
                    var removePanel = this.panelStack.shift();
                    console.log("PanelManager", "remove more panel", removePanel.panelName, "剩余panel数量", this.panelStack.length);
                }
            }

            len = this.panelStack.length;
            var topPanel = this.panelStack[len - 1];
            
            if(len > 1)
            {
                this.prePanelName = this.panelStack[len - 2].panelName;
            }
            else
            {
                this.prePanelName = null;
            }

            this.currPanelName = topPanel.panelName;
            var openPanelConfig = Panels[this.currPanelName];
            this.ShowPanel(openPanelConfig, topPanel.args);
        }
        else
        {
            this.ShowMain();
        }
    },

    Clear: function(){
        console.log("PanelManager", "Clear");
        this.CloseAllWindow();
        this.ClosePanel(this.currPanel);
        this.currPanel = null;
        this.currPanelName = null;
        this.prePanelName = null;
        this.panelStack = {};
    },

    ShowPanel: function(openPanelConfig, args){
        if(this.currPanel)
        {
            this.ClosePanel(this.currPanel);
        }
        var newPanel = openPanelConfig.module;
        this.currPanel = new newPanel(args, openPanelConfig);
        this.currPanel.Create();
    },
    
    ShowMain: function(args){
        // this.ChangePanel("Hall", args);
    },

    ClosePanel: function(panel){
        if(panel)
        {
            panel.Destroy();
        }
    },

    OpenWindow: function(windowName, args, dependPanelName){
        if(dependPanelName != this.currPanelName && dependPanelName != "Scene")
        {
            console.log("PanelManager", "打开的窗口所依赖的PanelName与当前的PanelName不符合", this.currPanelName, dependPanelName);
            return;
        }

        
        if(this.windowList[windowName])
        {
            console.log("PanelManager", "打开的窗口已经存在", windowName, dependPanelName);
            this.CloseWindow(windowName);
        }

        var openWindowConfig = Windows[windowName];
        if(openWindowConfig)
        {
            var module = openWindowConfig.module;
            var window = new module(args);
            this.windowList[windowName] = {'window': window, 'windowName': windowName, 'args': args};
            window.Create();
            console.log("PanelManager", "打开Window", windowName);
        }
        else
        {
            console.log("PanelManager", "无法找到对应Window配置", windowName);
        }
    },

    CloseWindow: function(windowName){
        console.log("PanelManager", "关闭window", windowName);
        var window = this.windowList[windowName];
        if(window)
        {
            this.windowList[windowName] = null;
            window.window.Destroy();
            window.windowName = null;
            window.window = null;
            window.args = null;
        }
        else
        {
            console.log("PanelManager", "无法找到要关闭的窗口", windowName);
        }
    },

    CloseAllWindow: function(){
        console.log("关闭所有窗口", this.windowList);
        for(var i in this.windowList)
        {
            var window = this.windowList[i];
            this.CloseWindow(window.windowName);
        }
        this.windowList = {};
    },

});
module.exports = PanelMgr;
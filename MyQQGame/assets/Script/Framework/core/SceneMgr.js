var SceneMgr = cc.Class({

    ctor: function(){
        this.curScene = null;
        this.curSceneName = null;
        this.curLoadingSceneName = null;

        this.preScene = null;
        this.preSceneName = null;
        this.isChangeScene = false;
    },

    ChangeScene: function(sceneName, args){
        if(this.curSceneName == sceneName || this.isChangeScene || this.curSceneName == "Loading"){
            return;
        }
        this.isChangeScene = true;
        this.curLoadingSceneName = sceneName;
        cc.director.loadScene(sceneName, function(){
            this.isChangeScene = false;
            this.curLoadingSceneName = null;
            this.preScene = this.curScene;
            this.preSceneName = this.curSceneName;

            var scene = require(sceneName);
            this.curScene = new scene(args);
            this.curSceneName = sceneName;
        });
    },

    PreLoadScene: function(sceneName, args){
        cc.director.preloadScene(sceneName, function () {
            cc.log("Next scene preloaded");
        });
    },

    GetCurScene: function(){
        return self.curScene;
    },
});
module.exports = SceneMgr;

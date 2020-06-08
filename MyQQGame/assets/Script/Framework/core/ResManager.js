var ResMgr = cc.Class({
   statics:{
        group2Assets : {},  //group到asset的映射表

        //加载资源
        LoadAsset : function(path, group, cb){
            // if (cc.Mgr.Config.platform == "pc"){
               cc.loader.load("http://106.14.223.175:9000/0.0.0.1/1.jpg", function(err, ret){
                  if (err){
                      console.log("[资源] 资源加载错误:", err);
                      return;
                  }
                  console.log("[资源] 资源加载成功:" + path + " group = " + group);     
                  console.log("[资源] 资源名称:" + typeof(ret));  
                  this.AddAsset2Group(group, ret);           
              }.bind(this));
            // }
        },

        //通过组名移除资源
        UnloadAssetWithGroup : function(group){

        },

        //将资源增加到资源组
        AddAsset2Group : function (group, addAsset){
            if (this.group2Assets[group] == null){
               this.group2Assets[group] = {};
            }
            // var 
            this.group2Assets[group]
        },
   },
});

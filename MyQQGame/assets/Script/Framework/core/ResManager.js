//Bundle配置名字
// BundleName = {
//     Login : "Login",
//     MapNode : "MapNode",
// };

//分包名字
// SubPackerName = {
//     Prefabs : 'Prefabs',
//     Textures : 'Textures',
// };

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

        // //加载 Asset Bundle(一个文件夹)bundleName
        // LoadBundle: function(bundleName, callBack)
        // {
        //     cc.assetManager.loadBundle(bundleName, (err, bundle) => {
        //         callBack(bundle);
        //     });
        // },

        // //根据AssetBundle加载Bundle中的资源
        // LoadAssetBundle: function(bundleName, objectName, assetType, callBack)
        // {
        //     let bundle = cc.assetManager.getBundle(bundleName);
        //     if(bundle != null)
        //     {
        //         console.log("当前bundle", bundleName, objectName);
        //         bundle.load(objectName, assetType, function (err, obj) {
        //             callBack(obj);
        //         });
        //     }
        //     else
        //     {
        //         console.log("当前bundle为空，需要加载", bundleName);
        //         //当前bundle为空，需要加载
        //         this.LoadBundle(bundleName, function(bundle)
        //         {
        //             bundle.load(objectName, assetType, function (err, obj) {
        //                 callBack(obj);
        //             });
        //         })
        //     }
        // },

        // //批量加载资源, path:传入该目录相对 Asset Bundle 的路径即可 
        // LoadMultyBundleAsset: function(bundleName, path, assetType, callBack)
        // {
        //     let bundle = cc.assetManager.getBundle(bundleName);
        //     if(bundle != null)
        //     {
        //         bundle.loadDir(path, assetType, function (err, assets) {
        //             callBack(assets);
        //         });
        //     };
        // },

        // //加载AssetBundle场景Scene
        // LoadSceneBundleAsset: function(bundleName, sceneName, callBack)=
        // {
        //     let bundle = cc.assetManager.getBundle(bundleName);
        //     if(bundle != null)
        //     {
        //         bundle.loadScene(sceneName, function (err, scene) {
        //             cc.director.runScene(scene);
        //             if(callBack != null)
        //             {callBack();}
        //         });
        //     };
        // },

        // //释放 Asset Bundle 中的单个资源
        // ReleaseBundleAsset: function(bundleName, assetName, assetType)
        // {
        //     let bundle = cc.assetManager.getBundle(bundleName);
        //     bundle.load(assetName, assetType, function (err, obj) {
        //         cc.assetManager.releaseAsset(obj);
        //     });
        // },

        // //释放 Asset Bundle 中的所有资源，请慎重使用
        // ReleaseBundleAllAsset: function(bundleName, assetType)
        // {
        //     let bundle = cc.assetManager.getBundle(bundleName);
        //     bundle.load(assetName, assetType, function (err, obj) {
        //         bundle.releaseAll();
        //     });
        // },

        // //移除某一个Bundle
        // RemoveBundle: function(bundleName)
        // {
        //     let bundle = cc.assetManager.getBundle(bundleName);
        //     cc.assetManager.removeBundle(bundle);   
        // },

        //加载分包
        LoadSubPacker: function(subPackName, callBack)
        {
            cc.loader.downloader.loadSubpackage(subPackName, function (err) {
                if (err) {
                    return console.error(err);
                }
                console.log('load subpackage successfully.', subPackName);
                if(callBack)
                {
                    callBack();
                };
            });
        },
    },
});

module.exports = ResMgr

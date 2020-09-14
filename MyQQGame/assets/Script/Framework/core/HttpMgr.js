var URL = "http://127.0.0.1:9000";
var HttpMgr = cc.Class({
    statics:{
        sessionId : 0,
        userId : 0,
        master_url:URL,
        url:URL,
        sendRequest : function(path,data,handler,extraUrl){
            var xhr = cc.loader.getXMLHttpRequest();
            xhr.timeout = 5000;
            var str = "?";
            for(var k in data){
                if(str != "?"){
                    str += "&";//增加一个中间的连接符
                }
                str += k + "=" + data[k];
            }
            if(extraUrl == null){
                extraUrl = HTTP.url;
            }
            var requestURL = extraUrl + path + encodeURI(str);
            console.log("RequestURL:" + requestURL);
            
            xhr.open("GET",requestURL, true);

            if (cc.sys.isNative){//是否是原生平台
                xhr.setRequestHeader("Accept-Encoding","gzip,deflate","text/html;charset=UTF-8");
            }
            
            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)){
                    console.log("http res("+ xhr.responseText.length + "):" + xhr.responseText);
                    try {
                        var ret = JSON.parse(xhr.responseText);
                        if(handler !== null){
                            handler(ret);
                        }
                    } catch (e) {
                        console.log("err:" + e);
                    }
                    finally{
                        
                    }
                }
            };

            xhr.ontimeout = function(event){

            },

            xhr.onerror = function(event){
                
            },

            xhr.send();
            return xhr;
        },

        SendAndRequest : function(url, handler)
        {
            var xhr = cc.loader.getXMLHttpRequest();
            xhr.timeout = 5000;

            xhr.open("GET", url, true);

            if (cc.sys.isNative){//是否是原生平台
                xhr.setRequestHeader("Accept-Encoding","gzip,deflate","text/html;charset=UTF-8");
            }
            
            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)){
                    console.log("http res("+ xhr.responseText.length + "):" + xhr.responseText);
                    try {
                        var ret = JSON.parse(xhr.responseText);
                        if(handler !== null){
                            handler(ret);
                        }
                    } catch (e) {
                        console.log("err:" + e);
                    }
                    finally{
                        
                    }
                }
            };

            xhr.ontimeout = function(event){

            },

            xhr.onerror = function(event){
                
            },

            xhr.send();
            return xhr;
        },

        //文件下载函数
        DownLoadBinary: function(item, callback)
        {
            console.log("加载远程资源")
            var url = item.url;
            var xhr = cc.loader.getXMLHttpRequest(), errInfo = "Load binary data failed: " + url;
            xhr.open("GET", url, true);
            xhr.responseType = item.type;
            xhr.onload = function () {
                var resp = xhr.response;
                if (resp) {
                    callback && callback(null, xhr.response);
                } else callback && callback(errInfo + "(no response)");
            };
            xhr.onerror = function () {
                callback && callback(errInfo + "(error)");
            };
            xhr.ontimeout = function () {
                callback && callback(errInfo + "(time out)");
            };
            xhr.send(null);
        },

        //下载Zip
        DownLoadZip(zipUrl)
        {     
            this.DownLoadBinary({ url: zipUrl, type: "arraybuffer" }, (err, data) => {
                if (null == err)
                {
                    let u8Arr = new Uint8Array(data);
                    //保存文件
                    let path = jsb.fileUtils.getWritablePath() + "classes/res/";
                    if (!jsb.fileUtils.isDirectoryExist(path)) {
                        jsb.fileUtils.createDirectory(path);
                    }
                    let fPath = `${path}test.zip`;
                    let rst = jsb.fileUtils.writeDataToFile(u8Arr, fPath)
                    if (rst) {
                        var testSp = this.node.getChildByName("testSp");
                        if (testSp) {
                            //解压压缩包
                            window.ui_login_main = this;
                            // 调用android 或者iOS 原生解压.zip
                            deviceHelper.unzipFilePath("test", path, path, "ui_login_main.unzipCallback");
                        }
                        return;
                    } 
                    else 
                    {
                        cc.log("Blade:下载失败1")
                    }
                } 
                else
                {
                    cc.log("Blade:下载失败2")
                }
            })
        },

        //解压加载 
        UnzipCallback:function(cbData) {
            cc.log("Blade:解压回调cbData:" + JSON.stringify(cbData));
            // zip包里放了两个测试文件cover_def.png和testPng.json
            let prePath = jsb.fileUtils.getWritablePath() + "classes/res/";
            // 检测其中一个文件是否存在
            cc.log("Blade:文件是否存在:" + jsb.fileUtils.isFileExist(prePath + "cover_def.png"));
        },
    },
});

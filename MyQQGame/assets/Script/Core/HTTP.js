
var http = {
    baseUrl : "Test",

    SetUrl : function (){
        console.log("Test")
    },

    Get : function(url, callBack){
        let xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            // cc.log("Get: readyState:" + xhr.readyState + " status:" + xhr.status);
            console.log("Get请求完毕:", xhr.status, xhr.readyState)
            if (xhr.readyState === 4 && xhr.status == 200) {
                let respone = xhr.responseText;
                let rsp = JSON.parse(respone);
                callback(rsp);
            } else if (xhr.readyState === 4 && xhr.status == 401) {
                callback({status:401});
            } else {
                //callback(-1);
            }
        };
        xhr.withCredentials = true;
        xhr.open('GET', url, true);
        setTimeout(function(){
            xhr.abort()
        })
        xhr.timeout = 8000;// 8 seconds for timeout
        xhr.send();
    },

    Post : function(url, callBack){
        let xhr = cc.loader.getXMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        xhr.onreadystatechange = function(){
            console.log("POST请求完毕:", xhr.status, xhr.readyState)
            if(xhr.readyState == 4 && (xhr.status >= 200 && xhr.status.status < 300)){
                var response = request.responseText;
                var json = JSON.parse(response)
                callBack(json)
            }
        };
        setTimeout(function(){
            xhr.abort()
        })
        xhr.send(new Uint8Array([1, 2, 3, 4, 5]));
    }
}

module.exports = http
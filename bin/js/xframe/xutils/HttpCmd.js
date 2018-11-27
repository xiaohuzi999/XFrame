/**
* name
*/
var HttpRequest = Laya.HttpRequest;
var xframe;
(function (xframe) {
    var HttpCmd = /** @class */ (function () {
        function HttpCmd() {
        }
        /**
         * 发送http请求
         * @param handler 请求回调；
         * @param srvArgs 参数；
        */
        HttpCmd.callServer = function (handler, srvArgs) {
            var xhr = Laya.Pool.getItem("HttpRequest");
            if (!xhr) {
                xhr = new HttpRequest();
            }
            xhr.http.timeout = 10000; //设置超时时间；
            xhr.once(Laya.Event.COMPLETE, null, completeHandler);
            xhr.once(Laya.Event.ERROR, null, errorHandler);
            //数据拼接
            xhr.send(HttpCmd.httpRoot, JSON.stringify(srvArgs), "post", "json");
            function completeHandler(data) {
                handler && handler.runWith(data);
                recover();
            }
            function errorHandler(data, e) {
                //需要一些特殊的处理
                handler && handler.runWith(data);
                recover();
            }
            function recover() {
                xhr.off(Laya.Event.COMPLETE, null, completeHandler);
                xhr.off(Laya.Event.ERROR, null, errorHandler);
                Laya.Pool.recover("HttpRequest", xhr);
            }
        };
        /**host*/
        HttpCmd.httpRoot = "http://127.0.0.1/amfphp/Amfphp/?contentType=application/json";
        return HttpCmd;
    }());
    xframe.HttpCmd = HttpCmd;
})(xframe || (xframe = {}));
//# sourceMappingURL=HttpCmd.js.map
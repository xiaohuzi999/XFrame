/**
* name
*/
var xframe;
(function (xframe) {
    var RES = /** @class */ (function () {
        function RES() {
        }
        /**
         * 初始化
         * @param resUrl		模块配置
         * @param uiUrl			UI配置
         * @param unpackUrl		未打包资源配置
         * @param cb 			回调
         */
        RES.init = function (resUrl, uiUrl, unpackUrl, cb) {
            var _this = this;
            var arr = [];
            resUrl && arr.push(resUrl);
            uiUrl && arr.push(uiUrl);
            unpackUrl && arr.push(unpackUrl);
            if (arr.length) {
                Laya.loader.load(arr, Handler.create(null, function () {
                    _this._resCfg = Laya.loader.getRes(resUrl) || {};
                    _this._moduleCfg = _this._resCfg.modules;
                    unpackUrl && (_this._unpackCfg = _this.getRes(unpackUrl));
                    uiUrl && (View.uiMap = Laya.loader.getRes(uiUrl));
                    cb.run();
                }));
            }
            else {
                cb.run();
            }
        };
        /**
         * 加载RES指定资源。
         * @param	group 资源组, RES.json配置的名字,一般使用模块
         * @param	complete 结束回调，如果加载失败，则返回 null 。
         * @param	progress 进度回调，回调参数为当前文件加载的进度信息(0-1)。
         * @param	type 资源类型。
         * @param	priority 优先级，0-4，五个优先级，0优先级最高，默认为1。
         * @param	cache 是否缓存加载结果。
         */
        RES.load = function (group, complete, progress, type, priority, cache) {
            if (complete === void 0) { complete = null; }
            if (progress === void 0) { progress = null; }
            if (type === void 0) { type = null; }
            if (priority === void 0) { priority = 1; }
            if (cache === void 0) { cache = true; }
            var urlArr = this.getUrlList(group, true);
            if (urlArr == null || urlArr.length < 1) {
                complete.run();
            }
            else {
                Laya.loader.load(urlArr, Handler.create(null, this.loadItemComplete, [complete]), Handler.create(null, this.onLoadProgress, [group, progress], false), type, priority, cache, group);
            }
        };
        //资源组加载完成
        RES.loadItemComplete = function (handler) {
            handler && handler.run();
        };
        //资源组加载中
        RES.onLoadProgress = function (name, proHandler, progress) {
            proHandler && proHandler.runWith(progress);
            xframe.trace("RES::onLoadProgress->" + name + "  progress:  " + progress);
        };
        /**
         * 获取资源，地址可以是配置res.json里面的配置
         * @param url
         */
        RES.getRes = function (url) {
            if (url.indexOf(this.URL_PRE) == -1) {
                url = this.URL_PRE + url;
            }
            return Loader.getRes(url);
        };
        /**
         * 按组卸载资源,供框架底层调用
         * @param group 组名，对应类名（潜规则!）
         * */
        RES.unloadGroup = function (group) {
            var urlArr = this.getUrlList(group);
            for (var i in urlArr) {
                this.unload(urlArr[i].url);
            }
        };
        /**
         * 卸载资源
         * @param url 资源地址
         * @param unpackOnly 是否作为未打包资源处理
         * */
        RES.unload = function (url, unpackOnly) {
            if (unpackOnly === void 0) { unpackOnly = false; }
            if (unpackOnly) {
                if (this._unpackCfg.indexOf(url) != -1) {
                    this.delQuote(url);
                }
            }
            else {
                this.delQuote(url);
            }
        };
        /**
         * 增加未打包资源引用
         * @param view 界面视图
         * */
        RES.addUnpackQuote = function (view) {
            for (var i in view._childs) {
                var skin = (view._childs[i] && view._childs[i].skin);
                if (skin && this._unpackCfg.indexOf(skin) != -1) {
                    this.addQuote(skin);
                }
            }
        };
        /**
         * 删除未打包资源引用
         * @param view 界面视图
         * */
        RES.delUnpackQuote = function (view) {
            for (var i in view._childs) {
                var skin = (view._childs[i] && view._childs[i].skin);
                if (skin && this._unpackCfg.indexOf(skin) != -1) {
                    this.delQuote(skin);
                }
            }
        };
        /**增加引用计数--*/
        RES.addQuote = function (url) {
            if (this._quoteDic[url]) {
                this._quoteDic[url] = this._quoteDic[url] + 1;
            }
            else {
                this._quoteDic[url] = 1;
            }
        };
        /**删除引用计数*/
        RES.delQuote = function (url) {
            if (this._quoteDic[url]) {
                this._quoteDic[url] -= 1;
                if (this._quoteDic[url] <= 0) {
                    Loader.clearRes(url);
                    delete this._quoteDic[url];
                }
            }
        };
        /**根据组名获取资源列表
         * @param group 组名，潜规则由类名担当
         * @param quote 使用需要建立引用。
         * */
        RES.getUrlList = function (group, quote) {
            if (quote === void 0) { quote = false; }
            var arr = this._moduleCfg[group];
            if (arr) {
                for (var i in arr) {
                    if (arr[i] instanceof String) {
                        arr[i] = { url: this.URL_PRE + arr[i], type: this.getTypeFromUrl(arr[i]), size: 1, priority: 1 };
                    }
                    //建立引用计数=====================================================
                    if (quote) {
                        this.addQuote(arr[i].url);
                    }
                }
            }
            return arr;
        };
        /**
         * 获取指定资源地址的数据类型,潜规则。
         * @param	url 资源地址。
         * @return 数据类型。
         */
        RES.getTypeFromUrl = function (url) {
            var tmp = (url + "").split(".");
            var type = tmp[tmp.length - 1];
            if (type) {
                type = Loader.typeMap[type.toLowerCase()];
                if (type == Loader.JSON && url.indexOf(this.URL_ATLAS) > -1) {
                    type = Loader.ATLAS;
                }
                return type;
            }
            xframe.trace("RES::Unkown file suffix", url);
            return Loader.TEXT;
        };
        /**未打包资源配置*/
        RES._unpackCfg = [];
        /**引用计数列表*/
        RES._quoteDic = {};
        /**资源路径头*/
        RES.URL_PRE = "res/";
        /**图集路径头*/
        RES.URL_ATLAS = "atlas/";
        return RES;
    }());
    xframe.RES = RES;
})(xframe || (xframe = {}));
//# sourceMappingURL=RES.js.map
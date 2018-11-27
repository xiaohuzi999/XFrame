/**
* name
*/
var trace = xframe.trace;
var xframe;
(function (xframe) {
    var XFacade = /** @class */ (function () {
        function XFacade() {
        }
        /**
         * 初始化
         * @param app 游戏C层实例。
         * @param resCfg 资源配置地址,数据格式
         * {
                "modules":
                {
                    "LoginView":["atlas/comp.json","config/by_monster.json"],
                }
            }
         * @param uiCfg UI配置地址,编辑器生成;
         * @param unpackCfg 未打包资源配置，编辑器生成;
         */
        XFacade.prototype.init = function (app, resCfg, uiCfg, unpackCfg) {
            if (resCfg === void 0) { resCfg = null; }
            if (uiCfg === void 0) { uiCfg = null; }
            if (unpackCfg === void 0) { unpackCfg = null; }
            this._app = app;
            xframe.LayerManager.init();
            xframe.ModuleManager.init();
            xframe.RES.init(resCfg, uiCfg, unpackCfg, Handler.create(this, this.start));
        };
        XFacade.prototype.start = function () {
            if (this._app) {
                this._app.start();
            }
            else {
                xframe.trace("需要一个顶级C");
            }
        };
        /**
         * 显示一个模块,加入到舞台
         * @param type 类型
         * @param args 数据;
         */
        XFacade.prototype.showModule = function (type) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            console.log("showModule=======>", type.name, "<==========");
            return xframe.ModuleManager.showModule.apply(xframe.ModuleManager, [type].concat(args));
        };
        /**
         * 关闭一个模块,从舞台移除
         * @param type 类型
         */
        XFacade.prototype.closeModule = function (type) {
            if (xframe.ModuleManager.hasModule(type)) {
                xframe.ModuleManager.getModule(type).close();
            }
        };
        /**
         * 根据类型获取一个窗体实例;
         * @param type 类型，实现IXWindow接口的类型（!!）;
         * */
        XFacade.prototype.getView = function (type) {
            return xframe.ModuleManager.getModule(type);
        };
        /**
         * 销毁一个实例，确定短时间内不再重用
         * @param view 销毁的模块。
         */
        XFacade.prototype.disposeView = function (view) {
            xframe.ModuleManager.disposeModule(view);
        };
        /**
         * 给一个对象注册TIP,当TIP显示时，会调用TIP对象的show()方法，并传入需要解析的数据，形如show(data);
         * 注意当模块进入休眠状体（close）时，最好调用removeTip回收掉！！
         * @param target 目标
         * @param data tip对象的数据
         * @param tipType tip类型,(注意是类型，不是实例)
         * */
        XFacade.prototype.addTip = function (target, data, tipType) {
            if (tipType === void 0) { tipType = null; }
            xframe.XTipManager.addTip(target, data, tipType);
        };
        /**
         * 移除TIP
         * @param target 注册过TIP的对象;
         * */
        XFacade.prototype.removeTip = function (target) {
            xframe.XTipManager.removeTip(target);
        };
        Object.defineProperty(XFacade, "instance", {
            /**单例*/
            get: function () {
                if (!XFacade._instance) {
                    XFacade._instance = new XFacade();
                }
                return XFacade._instance;
            },
            enumerable: true,
            configurable: true
        });
        return XFacade;
    }());
    xframe.XFacade = XFacade;
})(xframe || (xframe = {}));
//# sourceMappingURL=XFacade.js.map
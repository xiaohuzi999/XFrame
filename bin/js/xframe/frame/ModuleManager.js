/**
* name
*/
var xframe;
(function (xframe) {
    var ModuleManager = /** @class */ (function () {
        function ModuleManager() {
        }
        /**初始化*/
        ModuleManager.init = function () {
            Laya.timer.loop(ModuleManager.RECOVER_INTERVAL, ModuleManager, ModuleManager.recover);
            Laya.stage.on(Laya.Event.RESIZE, ModuleManager, ModuleManager.onResize);
            XEvent.instance.on(XEvent.CLOSE, null, this.onModuleClose);
        };
        /**
         * 显示一个模块
         * @param compClass 类型
         * @param args 参数
         */
        ModuleManager.showModule = function (compClass) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var baseView;
            if (compClass) {
                baseView = ModuleManager.getModule(compClass);
                baseView.show.apply(baseView, args);
            }
            return baseView;
        };
        /**
         * 获取一个实例,必须实现了IXWindow接口
         * @param compClass 类型
         */
        ModuleManager.getModule = function (compClass) {
            var tmp;
            for (var i in ModuleManager.viewsInfo) {
                tmp = ModuleManager.viewsInfo[i];
                if (tmp && tmp.view instanceof compClass) {
                    return tmp.view;
                }
            }
            //没找到缓存的实例对象
            var baseView = new compClass();
            ModuleManager.viewsInfo.push({ view: baseView });
            return baseView;
        };
        /**
         * 判断是否有该类型实例
         * @param compClass 类型
         */
        ModuleManager.hasModule = function (compClass) {
            var tmp;
            for (var i in ModuleManager.viewsInfo) {
                tmp = ModuleManager.viewsInfo[i];
                if (tmp && tmp.view instanceof compClass) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 将一个已经生成的实例加入实例控制
         * @param view 模块实例
         * @param compClass 模块类型
        */
        ModuleManager.addModule = function (view, compClass) {
            if (!this.hasModule(compClass)) {
                ModuleManager.viewsInfo.push({ view: view });
            }
            return view;
        };
        /**
         * 销毁一个实例
         * @param view 实例对象
         * */
        ModuleManager.disposeModule = function (view) {
            var tmp;
            for (var i in ModuleManager.viewsInfo) {
                tmp = ModuleManager.viewsInfo[i];
                if (tmp && tmp.view == view) {
                    view.destroy(true);
                    ModuleManager.viewsInfo.splice(parseInt(i), 1);
                    break;
                }
            }
        };
        /**回收*/
        ModuleManager.recover = function () {
            var tmp;
            var view;
            var time = Laya.Browser.now();
            for (var i = 0; i < ModuleManager.viewsInfo.length; i++) {
                tmp = ModuleManager.viewsInfo[i];
                view = tmp ? tmp.view : null;
                if (view && !view.displayedInStage && view.autoDispose) {
                    if (time - tmp.time > ModuleManager.RECOVER_TIME) {
                        view.destroy(true);
                        ModuleManager.viewsInfo.splice(i, 1);
                        break;
                    }
                }
            }
            //如果内存超标，强制销毁最早生成的模块------------------
            if (Laya.ResourceManager.systemResourceManager.memorySize > ModuleManager.MAX_MEMO_SIZE) {
                for (i = 0; i < ModuleManager.viewsInfo.length; i++) {
                    tmp = ModuleManager.viewsInfo[i];
                    view = tmp ? tmp.view : null;
                    if (view && !view.displayedInStage && view.autoDispose) {
                        view.destroy(true);
                        ModuleManager.viewsInfo.splice(i, 1);
                        break;
                    }
                }
            }
        };
        /**重新布局*/
        ModuleManager.onResize = function () {
            var tmp;
            var view;
            for (var i in ModuleManager.viewsInfo) {
                tmp = ModuleManager.viewsInfo[i];
                view = tmp ? tmp.view : null;
                if (view && view.displayedInStage) {
                    view.onStageResize();
                }
            }
        };
        /**模块关闭*/
        ModuleManager.onModuleClose = function (v) {
            var tmp;
            for (var i in ModuleManager.viewsInfo) {
                tmp = ModuleManager.viewsInfo[i];
                if (tmp && tmp.view == v) {
                    tmp.time = Laya.Browser.now();
                    //排到队列后面去
                    ModuleManager.viewsInfo.splice(parseInt(i), 1);
                    ModuleManager.viewsInfo.push(tmp);
                    break;
                }
            }
        };
        /**模块信息记录*/
        ModuleManager.viewsInfo = [];
        /**回收执行间隔-毫秒*/
        ModuleManager.RECOVER_INTERVAL = 10 * 1000;
        /**实例回收时间-毫秒*/
        ModuleManager.RECOVER_TIME = 0.5 * 60 * 1000;
        /**最大安全内存值-超过将强行开始回收掉实例*/
        ModuleManager.MAX_MEMO_SIZE = 256 * 1024 * 1024;
        return ModuleManager;
    }());
    xframe.ModuleManager = ModuleManager;
})(xframe || (xframe = {}));
//# sourceMappingURL=ModuleManager.js.map
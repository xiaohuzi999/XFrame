/**
* name
*/
var xframe;
(function (xframe) {
    var XTipManager = /** @class */ (function () {
        function XTipManager() {
        }
        /**
         * 给一个对象注册TIP,当TIP显示时，会调用TIP对象的show()方法，并传入需要解析的数据，形如show(data);
         * 注意当模块进入休眠状体（close）时，最好调用removeTip回收掉！！
         * @param target 目标
         * @param data tip对象的数据
         * @param tipType tip类型,(注意是类型，不是实例)
         * */
        XTipManager.addTip = function (target, data, tipType) {
            if (tipType === void 0) { tipType = null; }
            if (!tipType) {
                tipType = xframe.XToolTip;
            }
            this._dic.set(target, { data: data, type: tipType });
            target.on(Laya.Event.CLICK, this, this.onShowTip);
        };
        /**
         * 移除TIP
         * @param target 注册过TIP的对象;
         * */
        XTipManager.removeTip = function (target) {
            if (target && this._dic.get(target)) {
                target.off(Laya.Event.CLICK, this, this.onShowTip);
                this._dic.remove(target);
            }
        };
        /**
         * 主动显示一个tip
         * @param data 数据
         * @param type Tip类型 (注意是类型，不是实例)
         * @param setPos 是否需要设定位置
         * @param target TIP目标对象;
         * */
        XTipManager.showTip = function (data, type, setPos, target) {
            if (type === void 0) { type = null; }
            if (setPos === void 0) { setPos = true; }
            if (target === void 0) { target = null; }
            if (!type) {
                type = xframe.XToolTip;
            }
            if (data) {
                this.setCurTip(xframe.ModuleManager.showModule(type, data, target));
                //this._curTip = ModuleManager.showModule(type, data);
                setPos && this.showToStage(this._curTip);
            }
            else {
                this.hideTip();
            }
        };
        /**隐藏TIP,*/
        XTipManager.hideTip = function () {
            if (this._curTip && this._curTip.displayedInStage) {
                this._curTip.close();
            }
        };
        Object.defineProperty(XTipManager, "curTip", {
            /** */
            get: function () {
                return this._curTip;
            },
            enumerable: true,
            configurable: true
        });
        XTipManager.setCurTip = function (tip) {
            if (this._curTip && this._curTip != tip) {
                this._curTip.close();
            }
            this._curTip = tip;
        };
        /**
         * @private
         */
        XTipManager.showToStage = function (dis, offX, offY) {
            if (offX === void 0) { offX = 10; }
            if (offY === void 0) { offY = 10; }
            var rec = dis.getBounds();
            dis.x = Laya.stage.mouseX + offX;
            dis.y = Laya.stage.mouseY + offY;
            if (dis.x + rec.width > Laya.stage.width) {
                dis.x -= rec.width + offX;
            }
            if (dis.y + rec.height > Laya.stage.height) {
                dis.y -= rec.height + offY;
            }
        };
        //
        XTipManager.onShowTip = function (e) {
            var data = this._dic.get(e.currentTarget);
            this.showTip(data.data, data.type, true, e.currentTarget);
        };
        /**
         * tip 数据字典
         */
        XTipManager._dic = new Laya.Dictionary();
        return XTipManager;
    }());
    xframe.XTipManager = XTipManager;
})(xframe || (xframe = {}));
//# sourceMappingURL=XTipManager.js.map
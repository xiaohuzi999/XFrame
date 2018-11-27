var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var xframe;
(function (xframe) {
    var XToolTip = /** @class */ (function (_super) {
        __extends(XToolTip, _super);
        function XToolTip() {
            var _this = _super.call(this) || this;
            _this._layer = xframe.LayerManager.LAYER_TIP;
            _this._autoDispose = false;
            return _this;
        }
        XToolTip.prototype.show = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _super.prototype.show.call(this);
            var str = args[0];
            this._msgTF.text = str + "";
            //
            this._target = args[1];
        };
        /**
         * 覆盖getBounds方法
         * 获取本对象在父容器坐标系的矩形显示区域。
         * <p><b>注意：</b>计算量较大，尽量少用。</p>
         * @return 矩形区域。
         */
        XToolTip.prototype.getBounds = function () {
            return new Laya.Rectangle(0, 0, this._view.width, this._view.height);
        };
        XToolTip.prototype.onClose = function () {
            if (this._target && !xframe.XUtils.checkHit(this._target)) {
                this.close();
            }
        };
        XToolTip.prototype.createUI = function () {
            /**
             * ------------------------------------------
             * 需要配置定义一套UI----------------------------
             * ------------------------------------------
             * */
            this._view = new View();
            this._view.size(200, 100);
            this._view.graphics.drawRect(0, 0, 200, 100, "#999999");
            this.addChild(this._view);
            this._msgTF = new Laya.Text();
            this._view.addChild(this._msgTF);
        };
        XToolTip.prototype.initEvent = function () {
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onClose);
        };
        XToolTip.prototype.removeEvent = function () {
            Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.onClose);
        };
        return XToolTip;
    }(xframe.XWindow));
    xframe.XToolTip = XToolTip;
})(xframe || (xframe = {}));
//# sourceMappingURL=XToolTip.js.map
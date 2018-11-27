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
    var XTip = /** @class */ (function (_super) {
        __extends(XTip, _super);
        function XTip() {
            var _this = _super.call(this) || this;
            _this._layer = xframe.LayerManager.LAYER_POP;
            _this._align = xframe.LayerManager.ALIGN_CENTER;
            return _this;
        }
        /**
         * 显示一个tip
         * @param tipStr 提示信息
         * */
        XTip.showTip = function (tipStr) {
            var tip = Laya.Pool.getItem("XTip");
            if (!tip) {
                tip = new XTip();
            }
            tip.show(tipStr);
            Laya.Tween.to(tip, { y: tip.y - 180, alpha: 0 }, 500, null, Handler.create(tip, tip.close), 1200);
        };
        /**显示一个tip*/
        // public showTip(str:string):void{
        // 	this.show();
        // 	this._msgTF.text = str;
        // 	this._msgTF.x = (this._bg.width - this._msgTF.width)/2;
        // 	this._msgTF.y = (this._bg.height - this._msgTF.height)/2;
        // }
        XTip.prototype.show = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _super.prototype.show.call(this);
            this.alpha = 1;
            this._msgTF.text = args[0] + "";
            this._msgTF.x = (this._bg.width - this._msgTF.width) / 2;
            this._msgTF.y = (this._bg.height - this._msgTF.height) / 2;
        };
        XTip.prototype.close = function () {
            Laya.Pool.recover("XTip", this);
            _super.prototype.close.call(this);
        };
        //
        XTip.prototype.createUI = function () {
            this._bg = new Laya.Image();
            this._bg.sizeGrid = "26,25,20,22,0";
            this.addChild(this._bg);
            //this._bg.skin = "common\/item_bg0.png";
            if (!this._bg.texture) {
                this._bg.graphics.drawRect(0, 0, 300, 140, "#66ccff");
            }
            this._bg.size(300, 140);
            this._msgTF = new Laya.Label();
            this._msgTF.fontSize = 18;
            this.addChild(this._msgTF);
            this._msgTF.width = 260;
            this._msgTF.wordWrap = true;
            this._msgTF.color = "#ffffff";
            this._msgTF.align = "center";
        };
        return XTip;
    }(xframe.XWindow));
    xframe.XTip = XTip;
})(xframe || (xframe = {}));
//# sourceMappingURL=XTip.js.map
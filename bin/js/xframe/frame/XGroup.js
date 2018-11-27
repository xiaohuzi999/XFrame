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
* 可选择"组"
* btns 对象可以是任意带selected的对象；
* var btns:any[] = [];
* var group:XGroup = new XGroup(btns);
*/
var xframe;
(function (xframe) {
    var XGroup = /** @class */ (function (_super) {
        __extends(XGroup, _super);
        function XGroup(btns) {
            if (btns === void 0) { btns = null; }
            var _this = _super.call(this) || this;
            _this.buttons = btns;
            return _this;
        }
        /**销毁*/
        XGroup.prototype.destroy = function () {
            var btn;
            for (var i = 0; i < this._btns.length; i++) {
                btn = this._btns[i];
                btn.off(Laya.Event.CLICK, this, this.onSelect);
            }
            this._btns = null;
        };
        XGroup.prototype.onSelect = function (e) {
            this.selectedBtn = e.currentTarget;
        };
        Object.defineProperty(XGroup.prototype, "selectedBtn", {
            /**选中按钮*/
            get: function () {
                return this._selectedBtn;
            },
            /**选中按钮*/
            set: function (btn) {
                if (this._selectedBtn != btn) {
                    if (this._selectedBtn) {
                        this._selectedBtn.selected = false;
                        this._selectedBtn.mouseEnabled = true;
                    }
                    this._selectedBtn = btn;
                    if (this._selectedBtn) {
                        this._selectedBtn.selected = true;
                        this._selectedBtn.mouseEnabled = false;
                    }
                    this.event(Laya.Event.CHANGE);
                }
                this.event(Laya.Event.SELECT);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(XGroup.prototype, "selectedIndex", {
            /**获取选择序列*/
            get: function () {
                return this.buttons.indexOf(this._selectedBtn);
            },
            /***/
            set: function (v) {
                this.selectedBtn = this.buttons[v];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(XGroup.prototype, "buttons", {
            /**获取按钮组*/
            get: function () {
                return this._btns;
            },
            /**设置按钮组*/
            set: function (btns) {
                this._btns = btns;
                var btn;
                for (var i = 0; i < this._btns.length; i++) {
                    btn = this._btns[i];
                    if (btn instanceof Laya.Button) {
                        btn.toggle = true;
                    }
                    btn.on(Laya.Event.CLICK, this, this.onSelect);
                }
            },
            enumerable: true,
            configurable: true
        });
        return XGroup;
    }(Laya.EventDispatcher));
    xframe.XGroup = XGroup;
})(xframe || (xframe = {}));
//# sourceMappingURL=XGroup.js.map
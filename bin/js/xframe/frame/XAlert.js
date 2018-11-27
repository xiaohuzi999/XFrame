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
    var XAlert = /** @class */ (function (_super) {
        __extends(XAlert, _super);
        function XAlert() {
            var _this = _super.call(this) || this;
            _this._autoDispose = false;
            return _this;
        }
        /**
         * 显示警告
         * @param message 消息
         * @param yesHandler yes回调
         * @param noHandler 取消按钮回调
         * @param showYesBtn 是否显示确定按钮
         * @param showNoBtn 是否显示取消按钮
         * @param yesBtnLabel “确定”按钮标签
         * @param noBtnLabel “取消”按钮标签
         */
        XAlert.showAlert = function (message, yesHandler, noHandler, showYesBtn, showNoBtn, yesBtnLabel, noBtnLabel) {
            if (yesHandler === void 0) { yesHandler = null; }
            if (noHandler === void 0) { noHandler = null; }
            if (showYesBtn === void 0) { showYesBtn = true; }
            if (showNoBtn === void 0) { showNoBtn = true; }
            if (yesBtnLabel === void 0) { yesBtnLabel = null; }
            if (noBtnLabel === void 0) { noBtnLabel = null; }
            xframe.ModuleManager.showModule(XAlert, message, yesHandler, noHandler, showYesBtn, showNoBtn, yesBtnLabel, noBtnLabel);
        };
        XAlert.prototype.createUI = function () {
            //==============================================================
            //根据需要换UI====================================================
            //==============================================================
            this._view = new XXAlertUI();
            this.addChild(this._view);
            //==============================================================
            //END===========================================================
            //==============================================================
            this._btnYes = this._view["btnYes"];
            this._btnNo = this._view["btnNo"];
            this._btnClose = this._view["btnClose"];
            this._tfMsg = this._view["tfMsg"];
            //
            this._oriYesPos = this._btnYes.x;
            this._oriNoPos = this._btnNo.x;
        };
        /**加事件*/
        XAlert.prototype.initEvent = function () {
            this._view.on(Laya.Event.CLICK, this, this.onClick);
        };
        /**删除事件*/
        XAlert.prototype.removeEvent = function () {
            this._view.off(Laya.Event.CLICK, this, this.onClick);
        };
        XAlert.prototype.onClick = function (event) {
            switch (event.target) {
                case this._btnYes:
                    this._yesHandler && this._yesHandler.run();
                    this.close();
                    break;
                case this._btnNo:
                    this._noHandler && this._noHandler.run();
                    this.close();
                    break;
                case this._btnClose:
                    this.close();
                    break;
            }
        };
        /**
         * 显示警告
         * @param message 消息
         * @param yesHandler yes回调
         * @param noHandler 取消按钮回调
         * @param showYesBtn 是否显示确定按钮
         * @param showNoBtn 是否显示取消按钮
         * @param yesBtnLabel “确定”按钮标签
         * @param noBtnLabel “取消”按钮标签
         */
        XAlert.prototype.showAlert = function (message, yesHandler, noHandler, showYesBtn, showNoBtn, yesBtnLabel, noBtnLabel) {
            if (yesHandler === void 0) { yesHandler = null; }
            if (noHandler === void 0) { noHandler = null; }
            if (showYesBtn === void 0) { showYesBtn = true; }
            if (showNoBtn === void 0) { showNoBtn = true; }
            if (yesBtnLabel === void 0) { yesBtnLabel = null; }
            if (noBtnLabel === void 0) { noBtnLabel = null; }
            this._yesHandler = yesHandler;
            this._noHandler = noHandler;
            if (yesBtnLabel == null || yesBtnLabel == "") {
                yesBtnLabel = XAlert.LABEL_YES_DEFAULT;
            }
            if (noBtnLabel == null || noBtnLabel == "") {
                noBtnLabel = XAlert.LABEL_NO_DEFAULT;
            }
            this._tfMsg.innerHTML = message + "";
            this._tfMsg.y = (this._btnYes.y - this._tfMsg.contextHeight) * 0.5;
            var btnNum = 0;
            if (showYesBtn) {
                btnNum++;
                this._btnYes.visible = true;
                this._btnYes.label = yesBtnLabel;
            }
            else {
                this._btnYes.visible = false;
            }
            if (showNoBtn) {
                this._btnNo.label = noBtnLabel;
                this._btnNo.visible = true;
                btnNum++;
            }
            else {
                this._btnNo.visible = false;
            }
            var btn;
            if (btnNum == 1) {
                this._btnYes.visible ? btn = this._btnYes : btn = this._btnNo;
                btn.x = (this._view.width - btn.width) / 2;
            }
            else if (btnNum == 2) {
                this._btnYes.x = this._oriYesPos;
                this._btnNo.x = this._oriNoPos;
            }
        };
        /**覆盖show*/
        XAlert.prototype.show = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _super.prototype.show.call(this);
            this.showAlert.apply(this, args);
            xframe.AniUtil.popIn(this);
        };
        /**覆盖关闭*/
        XAlert.prototype.close = function () {
            xframe.AniUtil.popOut(this, Handler.create(this, this.onClose), 150, 200);
        };
        //
        XAlert.prototype.onClose = function () {
            this._yesHandler && this._yesHandler.recover();
            this._noHandler && this._noHandler.recover();
            this._yesHandler = this._noHandler = null;
            _super.prototype.close.call(this);
        };
        /**确定按钮默认label-静态常量*/
        XAlert.LABEL_YES_DEFAULT = "YES";
        /**取消按钮默认label-静态常量*/
        XAlert.LABEL_NO_DEFAULT = "NO";
        return XAlert;
    }(xframe.XMWindow));
    xframe.XAlert = XAlert;
    //默认UI
    var XXAlertUI = /** @class */ (function (_super) {
        __extends(XXAlertUI, _super);
        function XXAlertUI() {
            var _this = _super.call(this) || this;
            var bg = new Laya.Image();
            bg.size(500, 320);
            bg.graphics.drawRect(0, 0, 500, 320, "#66ccff");
            _this.addChild(bg);
            _this.tfMsg = new Laya.HTMLDivElement();
            _this.tfMsg.width = 460;
            _this.addChild(_this.tfMsg);
            _this.tfMsg.pos(20, 72);
            _this.tfMsg.style.fontFamily = "微软雅黑";
            _this.tfMsg.style.fontSize = 20;
            _this.tfMsg.style.color = "#ffffff";
            _this.tfMsg.style.align = "center";
            _this.btnYes = new Laya.Button("", "Yes");
            bg = new Laya.Image();
            bg.graphics.drawRect(0, 0, 100, 50, "#ff6600");
            _this.btnYes.size(100, 50);
            _this.btnYes.addChildAt(bg, 0);
            _this.addChild(_this.btnYes);
            _this.btnYes.pos(130, 220);
            _this.btnNo = new Laya.Button("", "No");
            bg = new Laya.Image();
            bg.graphics.drawRect(0, 0, 100, 50, "#ff6600");
            _this.btnNo.addChildAt(bg, 0);
            _this.btnNo.size(100, 50);
            _this.addChild(_this.btnNo);
            _this.btnNo.pos(260, 220);
            _this.btnYes.mouseEnabled = _this.btnNo.mouseEnabled = true;
            return _this;
        }
        return XXAlertUI;
    }(Laya.Component));
})(xframe || (xframe = {}));
//# sourceMappingURL=XAlert.js.map
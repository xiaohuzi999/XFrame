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
/*
* name;
*/
var MainView = /** @class */ (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        return _super.call(this) || this;
    }
    MainView.prototype.createUI = function () {
        this.ui = new ui.main.MainUI();
        this.addChild(this.ui);
    };
    return MainView;
}(xframe.XWindow));
//# sourceMappingURL=MainView.js.map
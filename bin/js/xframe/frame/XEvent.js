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
var XEvent = /** @class */ (function (_super) {
    __extends(XEvent, _super);
    function XEvent() {
        return _super.call(this) || this;
    }
    Object.defineProperty(XEvent, "instance", {
        /**单例 */
        get: function () {
            if (!XEvent._instance) {
                XEvent._instance = new XEvent();
            }
            return XEvent._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**事件-关闭 */
    XEvent.CLOSE = "close";
    return XEvent;
}(Laya.EventDispatcher));
//# sourceMappingURL=XEvent.js.map
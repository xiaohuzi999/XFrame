/**
* name
*/
var xframe;
(function (xframe) {
    var LayerManager = /** @class */ (function () {
        function LayerManager() {
        }
        /**初始化 */
        LayerManager.init = function () {
            LayerManager._container = new Laya.Sprite();
            Laya.stage.addChild(LayerManager._container);
        };
        /**
         *  打开界面，自动设定层级并对齐
         * @param view 功能界面,
         */
        LayerManager.openWindow = function (view) {
            if (!view.displayedInStage) {
                LayerManager.setLayer(view, view.layer);
            }
            LayerManager.setPosition(view, view.align);
        };
        /**
         *  设置功能界面层级
         * @param view 功能界面
         * @param layer 层级类型
         */
        LayerManager.setLayer = function (view, layer) {
            if (layer === void 0) { layer = LayerManager.LAYER_PANEL; }
            var len = LayerManager._container.numChildren;
            var win;
            for (var i = len - 1; i >= 0; i--) {
                win = LayerManager._container.getChildAt(i);
                if (win.layer && win.layer <= layer) {
                    //找到相应的位置，返回-
                    xframe.trace("setLayer__________________");
                    xframe.trace(win);
                    LayerManager._container.addChildAt(view, i + 1);
                    return;
                }
            }
            //层级最小
            LayerManager._container.addChildAt(view, 0);
        };
        /**
         * 设置面板位置
         * @param view 面板
         * @param postTpye 位置类型
         */
        LayerManager.setPosition = function (view, postTpye) {
            switch (postTpye) {
                case LayerManager.ALIGN_UP:
                    view.x = (Laya.stage.width - view.width) / 2;
                    view.y = 0;
                    break;
                case LayerManager.ALIGN_DOWN:
                    view.x = (Laya.stage.width - view.width) / 2;
                    view.y = Laya.stage.height - view.height;
                    break;
                case LayerManager.ALIGN_LEFTUP:
                    view.x = 0;
                    view.y = 0;
                    break;
                case LayerManager.ALIGN_CENTER:
                    view.x = (Laya.stage.width - view.width) / 2;
                    view.y = (Laya.stage.height - view.height) / 2;
                    break;
                default:
                    break;
            }
        };
        /**层级-底层-如地图*/
        LayerManager.LAYER_FIXED = 1;
        /**层级-普通窗体层*/
        LayerManager.LAYER_PANEL = 2;
        /**层级-固定UI层位-仅在需要压在窗体上面时使用*/
        LayerManager.LAYER_UI = 3;
        /**层级-弹出窗体层*/
        LayerManager.LAYER_POP = 4;
        /**层级-TIPS层级*/
        LayerManager.LAYER_TIP = 5;
        /**层级-顶层*/
        LayerManager.LAYER_TOP = 6;
        //LEFTUP////////////////UP////////////////RIGHTUP////
        /////////////////////////////////////////////////////
        //LEFT////////////////CENTER/////////////////RIGHT///
        /////////////////////////////////////////////////////
        //LEFTDOWN////////////DOWN/////////////RIGHTDOWN/////
        /**对齐-左上角，XWindow默认对齐方式*/
        LayerManager.ALIGN_LEFTUP = 0;
        /**对齐-居中上对齐*/
        LayerManager.ALIGN_UP = 1;
        /**对齐-居中,XMWindow默认对齐方式*/
        LayerManager.ALIGN_CENTER = 4;
        /**对齐-居中下对齐*/
        LayerManager.ALIGN_DOWN = 7;
        return LayerManager;
    }());
    xframe.LayerManager = LayerManager;
})(xframe || (xframe = {}));
//# sourceMappingURL=LayerManager.js.map
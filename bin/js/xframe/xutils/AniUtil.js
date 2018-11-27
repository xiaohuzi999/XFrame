/**
* name
*/
var xframe;
(function (xframe) {
    var AniUtil = /** @class */ (function () {
        function AniUtil() {
        }
        /**
         * 动画效果-入场，从下到当前位置，alpha从0到1
         * @param target 动画对象
         * @param time 动画时间
         * @param distance 移动距离
         */
        AniUtil.flowIn = function (target, time, distance) {
            if (time === void 0) { time = 200; }
            if (distance === void 0) { distance = 200; }
            Laya.Tween.from(target, { alpha: 0.5, y: target.y + distance }, time);
        };
        /**
         * 动画效果-出场，从当前位置往上，alpha从0到1
         * @param target 动画对象
         * @param callback 动画结束回调
         * @param time 动画时间
         * @param distance 移动距离
         */
        AniUtil.flowOut = function (target, callback, time, distance) {
            if (time === void 0) { time = 150; }
            if (distance === void 0) { distance = 200; }
            Laya.Tween.to(target, { alpha: 0, y: target.y - distance }, time, null, Handler.create(null, function () {
                target.alpha = 1;
                callback.run();
            }));
        };
        /**
         * 动画效果-出场2，从当前位置往下，alpha从0到1
         * @param target 动画对象
         * @param callback 动画结束回调
         * @param time 动画时间
         * @param distance 移动距离
         */
        AniUtil.flowBack = function (target, callback, time, distance) {
            if (time === void 0) { time = 150; }
            if (distance === void 0) { distance = 200; }
            Laya.Tween.to(target, { alpha: 0, y: target.y + distance }, time, null, Handler.create(null, function () {
                target.alpha = 1;
                callback.run();
            }));
        };
        /**
         * 动画效果-入场，弹出一个窗口,注意，只有没设置中心点或中心点坐标为(0,0)或中心坐标居中可用
         * @param target 动画对象
         * @param time 动画时间
         * @param distance 移动距离
         */
        AniUtil.popIn = function (target, time, distance) {
            if (time === void 0) { time = 200; }
            if (distance === void 0) { distance = 200; }
            Laya.Tween.clearTween(target);
            if (target.anchorX != 0.5) {
                target.anchorX = target.anchorY = 0.5;
                target.x += target.width * 0.5;
                target.y += target.height * 0.5;
            }
            target.scale(0.5, 0.5);
            Laya.Tween.to(target, { scaleX: 1, scaleY: 1, ease: Laya.Ease.backOut }, 300, null, Handler.create(null, function () {
                target.anchorX = target.anchorY = 0;
                target.scaleX = target.scaleY = 1;
                target.x -= target.width * 0.5;
                target.y -= target.height * 0.5;
            }));
        };
        /**
         * 动画效果-出场，从当前位置往上，alpha从1到0
         * @param target 动画对象
         * @param callback 动画结束回调
         * @param time 动画时间
         * @param distance 移动距离
         */
        AniUtil.popOut = function (target, callback, time, distance) {
            if (time === void 0) { time = 150; }
            if (distance === void 0) { distance = 200; }
            Laya.Tween.clearTween(target);
            target.anchorX = 0.5;
            target.anchorY = 0.5;
            target.x += target.width * 0.5;
            target.y += target.height * 0.5;
            Laya.Tween.to(target, { scaleX: 0.5, scaleY: 0.5 }, time, null, Handler.create(null, function () {
                target.anchorX = 0;
                target.anchorY = 0;
                target.scaleX = target.scaleY = 1;
                target.x -= target.width * 0.5;
                target.y -= target.height * 0.5;
                callback.run();
            }));
        };
        return AniUtil;
    }());
    xframe.AniUtil = AniUtil;
})(xframe || (xframe = {}));
//# sourceMappingURL=AniUtil.js.map
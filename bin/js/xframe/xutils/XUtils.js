var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/**
* name
*/
var xframe;
(function (xframe) {
    function trace() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log.apply(null, args);
    }
    xframe.trace = trace;
    var XUtils = /** @class */ (function () {
        function XUtils() {
        }
        /**
         * 判定一个对象是否有对象（主要是Object和数组）
         * @param obj 需要判定的对象
         * @return Boolean
         */
        XUtils.isEmpty = function (obj) {
            for (var i in obj) {
                return false;
            }
            return true;
        };
        /**
         * 删除数组某个元素
         * @param src 原数组
         * @param item 需要删除的数据;
         */
        XUtils.delArrItem = function (src, item) {
            var index = src.indexOf(item);
            if (index > -1) {
                src.splice(index, 1);
            }
        };
        /**
         * 数字跳动效果
         * @param curNum 当前值
         * @param targetNum 目标值
         * @param updateHandler 数字更新Handler，相关函数接受一个数值型参数
         * @param step 跳动多少次
         */
        XUtils.showTxtEffect = function (curNum, targetNum, updateHandler, step) {
            if (step === void 0) { step = 5; }
            var del = Math.floor((targetNum - curNum) / step);
            var index = 0;
            updateHandler.once = false;
            Laya.timer.loop(60, null, onUpdate);
            function onUpdate() {
                index++;
                curNum += del;
                if (index >= step) {
                    curNum = targetNum;
                    Laya.timer.clear(null, onUpdate);
                    updateHandler.runWith(curNum);
                    updateHandler.recover();
                }
                else {
                    updateHandler.runWith(curNum);
                }
            }
        };
        /**
         * 克隆一个对象
         * @param srcObj 需要克隆的对象
         * @return 一个新对象;
         */
        XUtils.clone = function (srcObj) {
            if (srcObj instanceof Array) {
                return srcObj.slice();
            }
            return __assign({}, srcObj);
        };
        /**
         * 判断鼠标是否点中
         * @param dis 目标对象
         * */
        XUtils.checkHit = function (dis) {
            return dis.visible && dis.mouseX > 0 && dis.mouseY > 0 && dis.mouseX <= dis.width && dis.mouseY <= dis.height;
        };
        /**
         * 数组随机排序
         * @param arr 源数组
         * @return 新数组
         *
        */
        XUtils.randomArr = function (arr) {
            var outputArr = arr.slice();
            var i = outputArr.length;
            var temp;
            var indexA;
            var indexB;
            while (i) {
                indexA = i - 1;
                indexB = Math.floor(Math.random() * i);
                i--;
                if (indexA == indexB)
                    continue;
                temp = outputArr[indexA];
                outputArr[indexA] = outputArr[indexB];
                outputArr[indexB] = temp;
            }
            return outputArr;
        };
        /**随机从数组中取出一个值 */
        XUtils.arrRandomValue = function (arr) {
            if (arr) {
                return arr[Math.floor(Math.random() * arr.length)];
            }
            return null;
        };
        /**
         * 画椭圆
         * @param sp 绘图Graphics
         * @param x 起始点x
         * @param y 起始点y
         * @param a 长轴
         * @param b 短轴
         * @param stepScale 比例
         * @param color 填充颜色
        */
        XUtils.drawEllipse = function (sp, x, y, a, b, stepScale, color) {
            if (stepScale === void 0) { stepScale = 1; }
            if (color === void 0) { color = '#ffffff'; }
            var points = [];
            var step = (a > b) ? stepScale / a : stepScale / b;
            //step是等于1除以长轴值a和b中的较大者
            //i每次循环增加1/step，表示度数的增加
            //这样可以使得每次循环所绘制的路径（弧线）接近1像素
            for (var i = 0; i < 2 * Math.PI; i += step) {
                //x²/a²+y²/b²=1 (a>b>0)
                //参数方程为x = a * cos(i), y = b * sin(i)，
                //参数为i，表示度数（弧度）
                //var point=new Point(x+a*Math.cos(i),y+b*Math.sin(i));
                //points.push(point);
                points.push(x + a * Math.cos(i) - a / 2, y + b * Math.sin(i));
            }
            sp && sp.drawPoly(points.shift(), points.shift(), points, color);
            return points;
        };
        return XUtils;
    }());
    xframe.XUtils = XUtils;
})(xframe || (xframe = {}));
//# sourceMappingURL=XUtils.js.map
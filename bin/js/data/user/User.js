/*
* name;
*/
var User = /** @class */ (function () {
    function User() {
        //
        this.heros = [];
        //
        this.pets = [];
    }
    /**初始化 */
    User.prototype.init = function () {
        var val = XDB.getData(XDB.USER);
        if (val) {
            if (typeof val === "string") {
                val = JSON.parse(val);
            }
            this.update(val);
        }
    };
    //更新
    User.prototype.update = function (value) {
        for (var i in value) {
            this[i] = value[i];
        }
    };
    User.getInstance = function () {
        if (!this._instance) {
            this._instance = new User();
        }
        return this._instance;
    };
    //事件-更新;
    User.UPDATE = "update";
    return User;
}());
//# sourceMappingURL=User.js.map
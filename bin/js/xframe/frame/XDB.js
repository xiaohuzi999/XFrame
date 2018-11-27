/*
* name;数据管理
*/
var XDB = /** @class */ (function () {
    function XDB() {
    }
    /**获取服务端数据 */
    XDB.fetchSrvData = function (cb) {
        //todo 获取远程数据
        //xframe.HttpCmd.callServer()
        //测试用，读取本地数据
        var data = Laya.LocalStorage.getItem(this.NAME);
        this.init(data);
        cb.run();
    };
    /**init with data*/
    XDB.init = function (data) {
        if (typeof data === "string") {
            trace("xxxxxxxxxxxxxxxxxxxxxxxxxxx");
            this._data = JSON.parse(data);
        }
        else {
            this._data = data;
        }
        trace("init------------->", typeof this._data);
        this._uniqueIndex = (this.data[this.UID] || 1);
    };
    /**del local data */
    XDB.delLocalData = function () {
        Laya.LocalStorage.removeItem(this.NAME);
    };
    /**get value by key */
    XDB.getData = function (key) {
        return this.data[key];
    };
    /**save */
    XDB.save = function (key, value) {
        this.data[key] = value;
        //save unique id index;
        this.data[this.UID] = this._uniqueIndex;
        this.data[key] = value;
        //save to local
        Laya.LocalStorage.setItem(this.NAME, JSON.stringify(this.data));
        //todo：save to srv
    };
    Object.defineProperty(XDB, "uid", {
        /**get unique index */
        get: function () {
            return this._uniqueIndex++;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XDB, "data", {
        get: function () {
            if (!this._data) {
                this._data = {};
            }
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    /**KEY-USER INFO */
    XDB.USER = "user";
    /**KEY-BAG */
    XDB.BAG = "bag";
    /**Unique id index */
    XDB.UID = "uid";
    /**unique id index */
    XDB._uniqueIndex = 0;
    /**local save key */
    XDB.NAME = "xdb";
    return XDB;
}());
//# sourceMappingURL=XDB.js.map
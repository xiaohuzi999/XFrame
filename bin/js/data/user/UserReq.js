var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/*
* name;
*/
var UserReq = /** @class */ (function () {
    function UserReq() {
    }
    //
    UserReq.getUserInfo = function (cb) {
        var userInfo = XDB.getData(XDB.USER);
        if (userInfo) {
            userInfo = JSON.parse(userInfo);
        }
        else {
            userInfo = createUser();
        }
        User.getInstance().update(userInfo);
        cb && cb.run();
        //
        function createUser() {
            return {
                id: 1,
                name: "xiaohuzi999",
                pic: "",
                gold: 0,
                diamond: 6,
                power: 10,
                role: __assign({}, DBMonster.calcTotalPro(0), { uid: 1 })
            };
        }
    };
    UserReq.save = function () {
        XDB.save(XDB.USER, JSON.stringify(User.getInstance()));
    };
    UserReq.addHero = function (id) {
        var role = DBMonster.calcTotalPro(id);
        role.state = Role.IN_FIGHT;
        role.uid = role.id;
        User.getInstance().heros.push(role);
        User.getInstance().emit();
    };
    //
    UserReq.getFightTeam = function () {
        var arr = [User.getInstance().role];
        //hero
        for (var i = 0; i < User.getInstance().heros.length; i++) {
            if (User.getInstance().heros[i].state == Role.IN_FIGHT) {
                arr.push(User.getInstance().heros[i]);
            }
        }
        //pet
        return arr;
    };
    return UserReq;
}());
//# sourceMappingURL=UserReq.js.map
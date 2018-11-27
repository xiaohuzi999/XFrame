/*
* name;
*/
var App = /** @class */ (function () {
    function App() {
    }
    App.prototype.start = function () {
        this.initEvent();
        //loading & login
        XFacade.instance.showModule(LoadingView);
    };
    //Focus here
    App.prototype.enterMain = function () {
        XFacade.instance.showModule(MainView);
    };
    App.prototype.initEvent = function () {
        XEvent.instance.once(LoadingView.RDY, this, this.enterMain);
    };
    return App;
}());
//# sourceMappingURL=App.js.map
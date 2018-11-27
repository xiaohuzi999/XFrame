/*
* name;
*/
class MainView extends xframe.XWindow{
    public ui:ui.main.MainUI;
    constructor(){
        super();
    }

    protected createUI():void{
        this.ui = new ui.main.MainUI();
        this.addChild(this.ui);
    }
}
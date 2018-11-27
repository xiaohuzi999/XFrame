/*
* name;
*/
class LoadingView extends xframe.XWindow{
    public ui:ui.loading.LoadingUI;
    /** */
    public static readonly RDY:string = "rdy";
    constructor(){
        super();
    }

    //step 1
    public show():void{
        super.show();
        //加载本地资源
        //let urlList:any[] = []
        let urlList:any[] = [
		    "res/atlas/share.atlas"
		]

        if(urlList.length){
            Laya.loader.load(urlList, Handler.create(this, this.fetchSrvData));
        }else{
            this.fetchSrvData();
        }
    }

    //step 2.获取远程存储数据
    private fetchSrvData():void{
        XDB.fetchSrvData(Laya.Handler.create(this, this.onFetchSrvData))
    }

    //step 3.已获取服务端数据
    private onFetchSrvData():void{
        //角色初始化；
        User.getInstance().init();
        //道具初始化；

        XEvent.instance.event(LoadingView.RDY);
        this.close();
    }

    protected createUI():void{
        this.ui = new ui.loading.LoadingUI();
        this.addChild(this.ui);
    }
}
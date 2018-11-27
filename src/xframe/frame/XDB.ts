/*
* name;数据管理
*/
class XDB{
    /**KEY-USER INFO */
    public static readonly USER:string = "user";
    /**KEY-BAG */
    public static readonly BAG:string = "bag";
    /**Unique id index */
    public static readonly UID:string = "uid";
    /**unique id index */
    private static _uniqueIndex:number = 0;
    /** */
    private static _data:any;
    /**local save key */
    private static readonly NAME:string = "xdb";
    constructor(){

    }

    /**获取服务端数据 */
    public static fetchSrvData(cb:Laya.Handler):void{
        //todo 获取远程数据
        //xframe.HttpCmd.callServer()
        //测试用，读取本地数据
        let data:any = Laya.LocalStorage.getItem(this.NAME);
        this.init(data);
        cb.run();
    }

    /**init with data*/
    public static init(data:any):void{
        if(typeof data === "string"){
            trace("xxxxxxxxxxxxxxxxxxxxxxxxxxx")
            this._data = JSON.parse(data);
        }else{
            this._data = data;
        }
        trace("init------------->", typeof this._data);
        this._uniqueIndex = (this.data[this.UID] || 1)
    }

    /**del local data */
    public static delLocalData():void{
        Laya.LocalStorage.removeItem(this.NAME);
    }

    /**get value by key */
    public static getData(key:string):any{
        return this.data[key];
    }

    /**save */
    public static save(key:string, value:any):void{
        this.data[key] = value;
        //save unique id index;
        this.data[this.UID] = this._uniqueIndex;
        this.data[key] = value;
        //save to local
        Laya.LocalStorage.setItem(this.NAME, JSON.stringify(this.data));
        //todo：save to srv
    }

    /**get unique index */
    public static get uid():number{
        return this._uniqueIndex++;
    }

    private static get data():any{
        if(!this._data){
            this._data = {};
        }
        return this._data;
    }
}
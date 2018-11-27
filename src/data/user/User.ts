/*
* name;
*/
class User{
    public id:string;

    public name:string;

    public pic:string;

    public power:number;

    public gold:number;
    
    public diamond:number;
    //
    public role:Role;
    //
    public heros:Role[] = [];
    //
    public pets:Role[] = [];

    //单例;
    private static _instance:User;
    //事件-更新;
    public static readonly UPDATE:string = "update";

    constructor(){
        
    }

    /**初始化 */
    public init():void{
        let val:any = XDB.getData(XDB.USER);
        if(val){
            if(typeof val === "string"){
                val = JSON.parse(val);
            }
            this.update(val);
        }
    }

    //更新
    public update(value:any):void{
        for(var i in value){
            this[i] = value[i];
        }
    }

    public static getInstance():User{
        if(!this._instance){
            this._instance = new User();
        }
        return this._instance;
    }
}
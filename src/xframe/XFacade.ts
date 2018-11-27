/**
* name 
*/
import trace = xframe.trace;

module xframe{
	export class XFacade{
		private static _instance:XFacade;
		//顶端C引用
		private _app:IApp;
		constructor(){
			
		}

		/**
		 * 初始化
		 * @param app 游戏C层实例。
		 * @param resCfg 资源配置地址,数据格式
		 * {
				"modules":
				{
					"LoginView":["atlas/comp.json","config/by_monster.json"],
				}
			}
		 * @param uiCfg UI配置地址,编辑器生成;
		 * @param unpackCfg 未打包资源配置，编辑器生成;
		 */
		public init(app:IApp, resCfg:string=null, uiCfg:string = null, unpackCfg:string=null):void{
			this._app = app;

			LayerManager.init();
			ModuleManager.init();

			RES.init(resCfg, uiCfg, unpackCfg, Handler.create(this, this.start));
		}

		private start():void{
			if(this._app){
				this._app.start();
			}else{
				trace("需要一个顶级C")
			}
		}

		/**
		 * 显示一个模块,加入到舞台
		 * @param type 类型
		 * @param args 数据;
		 */
		public showModule(type:any,...args):any{
			console.log("showModule=======>", type.name,"<==========");
			return ModuleManager.showModule.apply(ModuleManager,[type].concat(args));
		}
		
		/**
		 * 关闭一个模块,从舞台移除
		 * @param type 类型
		 */
		public closeModule(type:any):void{
			if (ModuleManager.hasModule(type)) {
				ModuleManager.getModule(type).close();
			}
		}
		
		/**
		 * 根据类型获取一个窗体实例;
		 * @param type 类型，实现IXWindow接口的类型（!!）;
		 * */
		public getView(type:any):any{
			return ModuleManager.getModule(type);
		}
		
		/**
		 * 销毁一个实例，确定短时间内不再重用
		 * @param view 销毁的模块。
		 */
		public disposeView(view:IXWindow):void{
			ModuleManager.disposeModule(view)
		}
		

		/**
		 * 给一个对象注册TIP,当TIP显示时，会调用TIP对象的show()方法，并传入需要解析的数据，形如show(data);
		 * 注意当模块进入休眠状体（close）时，最好调用removeTip回收掉！！
		 * @param target 目标
		 * @param data tip对象的数据
		 * @param tipType tip类型,(注意是类型，不是实例)
		 * */
		public addTip(target:Laya.Sprite, data:any, tipType:any = null):void{
			XTipManager.addTip(target, data, tipType)
		}

		/**
		 * 移除TIP
		 * @param target 注册过TIP的对象;
		 * */
		public removeTip(target:Laya.Sprite):void{
			XTipManager.removeTip(target);
		}
		

		/**单例*/
		public static get instance():XFacade{
			if(!XFacade._instance){
				XFacade._instance = new XFacade();
			}
			return XFacade._instance;
		}
	}
}
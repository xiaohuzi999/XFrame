/**
* name 
*/
module xframe{
	export class ModuleManager{
		/**模块信息记录*/
		public static viewsInfo:{view:IXWindow, time?:number}[] = [];
		/**回收执行间隔-毫秒*/
		public static RECOVER_INTERVAL:number = 10*1000; 
		/**实例回收时间-毫秒*/
		public static RECOVER_TIME:number = 0.5*60*1000;
		/**最大安全内存值-超过将强行开始回收掉实例*/
		public static MAX_MEMO_SIZE:number = 256*1024*1024;

		public constructor()
		{
			
		}
		
		/**初始化*/
		public static init():void{
			Laya.timer.loop(ModuleManager.RECOVER_INTERVAL, ModuleManager, ModuleManager.recover);
			Laya.stage.on(Laya.Event.RESIZE, ModuleManager, ModuleManager.onResize);
			XEvent.instance.on(XEvent.CLOSE, null, this.onModuleClose)
		}
		
		/**
		 * 显示一个模块
		 * @param compClass 类型
		 * @param args 参数
		 */
		public static showModule(compClass:any,...args):IXWindow{
			var baseView:IXWindow ;
			if(compClass){
				baseView = ModuleManager.getModule(compClass);
				baseView.show.apply(baseView, args);
			}
			return baseView;
		}
		
		/**
		 * 获取一个实例,必须实现了IXWindow接口
		 * @param compClass 类型
		 */
		public static getModule(compClass:any):IXWindow{
			var tmp:{view:IXWindow, time?:number};
			for(var i in ModuleManager.viewsInfo){
				tmp = ModuleManager.viewsInfo[i];
				if(tmp && tmp.view instanceof compClass){
					return tmp.view;
				}
			}
			//没找到缓存的实例对象
			var baseView:IXWindow = new  compClass();
			ModuleManager.viewsInfo.push({view:baseView});
			return baseView;
		}
		
		/**
		 * 判断是否有该类型实例
		 * @param compClass 类型
		 */
		public static hasModule(compClass:any):Boolean {
			var tmp:{view:IXWindow, time?:number};
			for(var i in ModuleManager.viewsInfo){
				tmp = ModuleManager.viewsInfo[i];
				if(tmp && tmp.view instanceof compClass){
					return true
				}
			}
			return false;
		}

		/**
		 * 将一个已经生成的实例加入实例控制 
		 * @param view 模块实例
		 * @param compClass 模块类型
		*/
		public static addModule(view:any, compClass:any):any{
			if(!this.hasModule(compClass)){
				ModuleManager.viewsInfo.push({view:view});
			}
			return view;
		}
		
		/**
		 * 销毁一个实例
		 * @param view 实例对象
		 * */
		public static disposeModule(view:IXWindow):void{
			var tmp:{view:IXWindow, time?:number};
			for(var i in ModuleManager.viewsInfo){
				tmp = ModuleManager.viewsInfo[i];
				if(tmp && tmp.view == view){
					view.destroy(true);
					ModuleManager.viewsInfo.splice(parseInt(i),1);
					break;
				}
			}
		}
		
		/**回收*/
		public static recover():void{
			var tmp:{view:IXWindow, time?:number};
			var view:IXWindow;
			var time:number = Laya.Browser.now();
			
			for(var i:number=0; i<ModuleManager.viewsInfo.length; i++){
				tmp = ModuleManager.viewsInfo[i];
				view= tmp?tmp.view:null;
				if(view && !view.displayedInStage && view.autoDispose){
					if(time - tmp.time > ModuleManager.RECOVER_TIME){
						view.destroy(true);
						ModuleManager.viewsInfo.splice(i,1);
						break;
					}
				}
			}
			
			//如果内存超标，强制销毁最早生成的模块------------------
			if(Laya.ResourceManager.systemResourceManager.memorySize > ModuleManager.MAX_MEMO_SIZE){
				for(i=0; i<ModuleManager.viewsInfo.length; i++){
					tmp = ModuleManager.viewsInfo[i];
					view= tmp?tmp.view:null;
					if(view && !view.displayedInStage && view.autoDispose){
						view.destroy(true);
						ModuleManager.viewsInfo.splice(i,1);
						break;
					}
				}
			}
		}
		
		/**重新布局*/
		public static onResize():void{
			var tmp:{view:IXWindow, time?:number};
			var view:IXWindow;
			for(var i in ModuleManager.viewsInfo){
				tmp = ModuleManager.viewsInfo[i];
				view= tmp?tmp.view:null;
				if(view  && (view as Laya.Sprite).displayedInStage){
					view.onStageResize();
				}
			}
		}
		
		/**模块关闭*/
		private static onModuleClose(v:IXWindow):void{
			var tmp:{view:IXWindow, time?:number};
			for(var i in ModuleManager.viewsInfo){
				tmp = ModuleManager.viewsInfo[i];
				if(tmp && tmp.view == v){
					tmp.time = Laya.Browser.now();
					//排到队列后面去
					ModuleManager.viewsInfo.splice(parseInt(i),1);
					ModuleManager.viewsInfo.push(tmp);
					break;
				}
			}
		}
	}
}
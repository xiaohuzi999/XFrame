package xiaohuzi999.xframe.frame
{
	
	import laya.display.Sprite;
	import laya.events.Event;
	import laya.resource.ResourceManager;
	import laya.utils.Browser;
	
	import xiaohuzi999.xframe.interfaces.IXWindow;

	/**实例管理器*/
	public class ModuleManager
	{				
		/**模块信息记录*/
		public static var viewsInfo:Array = [];
		/**回收执行间隔-毫秒*/
		public static const RECOVER_INTERVAL:int = 10*1000; 
		/**实例回收时间-毫秒*/
		public static const RECOVER_TIME:int = 0.5*60*1000;
		/**最大安全内存值-超过将强行开始回收掉实例*/
		public static const MAX_MEMO_SIZE:int = 256*1024*1024;
		public function ModuleManager()
		{
			
		}
		
		/**初始化-*/
		public static function init():void{
			Laya.timer.loop(ModuleManager.RECOVER_INTERVAL, ModuleManager, ModuleManager.recover);
			Laya.stage.on(Event.RESIZE, ModuleManager, ModuleManager.onResize);
			XEvent.instance.on(XEvent.CLOSE, null, onModuleClose)
		}
		
		/**
		 * 打开一个实例，不需要加载资源的那种使用这个方法
		 * @param compClass 类型
		 * @param args 参数
		 */
		public static function showModule(compClass:Class,...args):*{
			var baseView:IXWindow ;
			if(compClass){
				baseView = getModule(compClass);
				baseView.show(args);
			}
			return baseView;
		}
		
		/**
		 * 获取一个实例,必须实现了IBaseViewjieko
		 * @param compClass 类型
		 */
		public static function getModule(compClass:Class):IXWindow{
			var tmp:Object;
			for(var i:String in viewsInfo){
				tmp = viewsInfo[i];
				if(tmp && tmp.view is compClass){
					/**
					tmp.time = Browser.now();
					viewsInfo.splice(parseInt(i),1);
					viewsInfo.push(tmp);
					 */
					return tmp.view;
				}
			}
			//没找到缓存的实例对象
			var baseView:IXWindow = new  compClass();
			viewsInfo.push({view:baseView});
			return baseView;
		}
		
		/**
		 * 判断是否有该类型实例
		 * @param compClass 类型
		 */
		public static function hasModule(compClass:Class):Boolean {
			var tmp:Object;
			for(var i:String in viewsInfo){
				tmp = viewsInfo[i];
				if(tmp && tmp.view is compClass){
					return true
				}
			}
			return false;
		}
		
		/**
		 * 销毁一个实例
		 * @param view 实例对象
		 * */
		public static function disposeModule(view:IXWindow):void{
			var tmp:Object;
			for(var i:String in viewsInfo){
				tmp = viewsInfo[i];
				if(tmp && tmp.view == view){
					view.dispose();
					viewsInfo.splice(i,1);
					break;
				}
			}
		}
		
		/**回收*/
		public static function recover():void{
			var tmp:Object;
			var view:*;
			var time:Number = Browser.now();
			
			for(var i:int=0; i<viewsInfo.length; i++){
				tmp = viewsInfo[i];
				view= tmp?tmp.view:null;
				if(view && !view.displayedInStage && view.autoDispose){
					if(time - tmp.time > ModuleManager.RECOVER_TIME){
						view.dispose();
						viewsInfo.splice(i,1);
						break;
					}
				}
			}
			
			//如果内存超标，强制销毁最早生成的模块------------------
			if(ResourceManager.systemResourceManager.memorySize > MAX_MEMO_SIZE){
				for(i=0; i<viewsInfo.length; i++){
					tmp = viewsInfo[i];
					view= tmp?tmp.view:null;
					if(view && !view.displayedInStage && view.autoDispose){
						view.dispose();
						viewsInfo.splice(i,1);
						break;
					}
				}
			}
		}
		
		/**重新布局*/
		public static function onResize():void{
			var tmp:Object;
			var view:IXWindow;
			for(var i:String in viewsInfo){
				tmp = viewsInfo[i];
				view= tmp?tmp.view:null;
				if(view  && (view as Sprite).displayedInStage){
					view.onStageResize();
				}
			}
		}
		
		/**模块关闭*/
		private static function onModuleClose(v:IXWindow):void{
			var tmp:Object;
			for(var i:String in viewsInfo){
				tmp = viewsInfo[i];
				if(tmp && tmp.view == v){
					tmp.time = Browser.now();
					//排到队列后面去
					viewsInfo.splice(parseInt(i),1);
					viewsInfo.push(tmp);
					break;
				}
			}
		}
	}
}
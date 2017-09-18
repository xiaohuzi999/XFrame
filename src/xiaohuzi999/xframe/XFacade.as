package xiaohuzi999.xframe
{
	import laya.events.Event;
	import laya.net.Loader;
	import laya.ui.View;
	import laya.utils.Handler;
	
	import xiaohuzi999.xframe.frame.LayerManager;
	import xiaohuzi999.xframe.frame.ModuleManager;
	import xiaohuzi999.xframe.frame.RES;
	import xiaohuzi999.xframe.interfaces.IXWindow;
	
	/**
	 * XFacade 门面模式，合并底层比较重要的功能
	 * author:huhaiming
	 * XFacade.as 2017-3-1 上午10:28:15
	 * version 1.0
	 * 
	 * 加入引用计数，打包及未打包资源(效果待验证)
	 * 待处理：版本控制。
	 */
	public class XFacade
	{
		/**单例*/
		private static var _instance:XFacade;
		//管理层引用
		public var app:*;
		public function XFacade()
		{
			if(_instance){
				throw new Error("XFacade is singleton");
			}
			_instance = this;
		}
		
		/**
		 * @param appClass 管理入口类
		 * @param resConfig 资源配置地址，如：res/RES.json
		 * @param unpackURL ui配置地址,laya导出文件，如：res/ui.json
		 * @param unpackPath 不打包资源文件夹,由laya导出,如：res/unpack/
		 */
		public function init(appClass:Class,resConfig:String,uiURL:String, unpackPath:String=""):void{
			LayerManager.init();
			ModuleManager.init();
			app = new appClass();
			
			Laya.loader.once(Event.ERROR, this, onError);
			var urlArr:Array = [resConfig,uiURL];
			if(unpackPath){
				urlArr.push(unpackPath+"unpack.json");
			}
			Laya.loader.load(urlArr, Handler.create(this, this.onConfigLoaded,urlArr.concat(unpackPath)),null, Loader.JSON);
		}
		
		/***/
		private function onConfigLoaded(resConfig:String, uiURL:String,unpackURL:String, unpackPath:String):void{
			Laya.loader.off(Event.ERROR, this, onError);
			View.uiMap = Loader.getRes(uiURL);
			RES.init(Loader.getRes(resConfig), Loader.getRes(unpackURL), unpackPath);
			app.start();
		}
		
		private function onError():void{
			trace("onError");
		}
		
		/**
		 * 显示一个模块
		 * @param type 类型
		 * @param data 数据;
		 */
		public function showModule(type:Class,...args):void{
			RES.load(type.name, Handler.create(ModuleManager,ModuleManager.showModule,[type,args]));
		}
		
		/**
		 * 关闭一个模块
		 * @param moduleName 类型
		 * @param data 数据;
		 */
		public function closeModule(type:Class):void{
			if (ModuleManager.hasModule(type)) {
				ModuleManager.getModule(type).close();
			}
		}
		
		/**
		 * 根据类型获取一个窗体实例;
		 * @param type 类型，实现IBaseView接口的类型（非已存在的基础类型如BaseView,BaseDialog）;
		 * */
		public function getView(type:Class):*{
			return ModuleManager.getModule(type);
		}
		
		/**
		 * 销毁一个实例，确定短时间内不在重用
		 * @param view 销毁的模块。
		 */
		public function disposeView(view:IXWindow):void{
			ModuleManager.disposeModule(view)
		}
		
		
		/***/
		public static function get instance():XFacade{
			if(!XFacade._instance){
				XFacade._instance = new XFacade();
			}
			return XFacade._instance;
		}
	}
}
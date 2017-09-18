package xiaohuzi999.xframe.core
{
	import laya.ui.Component;
	
	import xiaohuzi999.xframe.frame.LayerManager;
	import xiaohuzi999.xframe.frame.RES;
	import xiaohuzi999.xframe.frame.XEvent;
	import xiaohuzi999.xframe.interfaces.IXWindow;

	/**
	 * XWindow 窗体基类，不能直接使用,必须继承这个类！
	 * author:huhaiming
	 * BaseView.as 2017-9-4 上午10:21:56
	 * version 1.0
	 *
	 */
	public class XWindow extends Component implements IXWindow
	{
		/**主显示view---*/
		protected var _view:*;
		/**是否初始化*/
		protected var _hasInit:Boolean = false;
		/**ui层次类型-默认为普通窗体层级  */			
		protected var _layer:int = LayerManager.LAYER_PANEL;
		/**ui坐标位置类型-默认左上角 */			
		protected var _align:int = LayerManager.LEFTUP;
		/**是否自动回收，默认自动回收(true),不回收(false)*/
		protected var _autoDispose:Boolean = true;
		
		public function XWindow()
		{
			super();	
		}
		
		/**
		 * 底层在加入到舞台之后调用
		 * @param 
		 */
		public function show(...args):void{
			if(!_hasInit){
				_hasInit = true;
				createUI();
				_view && RES.addUnpackQuote(_view);
			}
			addEvent();
			LayerManager.openWindow(this);
		}
		
		/**
		 * 关闭
		 */
		public function close():void{
			this.removeSelf();
			removeEvent();
			XEvent.instance.event(XEvent.CLOSE, this);
		}
		
		/**
		 * 创建UI界面。
		 */
		public function createUI():void {
			
		}
		
		public function onStageResize():void
		{
			//内部布局逻辑，对齐方式改由LayerManager控制
		}
		
		/**层级设定*/
		public function set layer(v:int):void{
			this._layer = v;
		}
		
		/**层级设定*/
		public function get  layer():int{
			return this._layer
		}
		
		/**ui坐标位置类型*/
		public function set align(v:int):void{
			this._align =v;
		}
		
		/**ui坐标位置类型*/
		public function get align():int{
			return this._align
		}
		
		/**设置是否自动销毁*/
		public function set autoDispose(b:Boolean):void{
			_autoDispose = b;
		}
		/**获取是否自动销毁*/
		public function get autoDispose():Boolean{
			return _autoDispose;
		}
		
		
		/**
		 * 添加事件
		 */		
		protected function addEvent():void{
			
		}
		
		/**
		 *  移除事件
		 */		
		protected function removeEvent():void{
			
		}
		
		/**
		 * 关闭界面  销毁对象
		 */	
		public function dispose():void{
			trace("dispose::",this["constructor"].name);
			if(_view){
				RES.delUnpackQuote(_view);
			}
			RES.unloadGroup(this["constructor"].name);
			this.destroy(true);
		}
	}
}
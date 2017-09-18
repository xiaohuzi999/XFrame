package xiaohuzi999.xframe.frame
{
	import laya.events.Event;
	import laya.ui.Image;
	
	import xiaohuzi999.xframe.frame.XDialog;

	/**
	 * XLoadingloading控制器 
	 * modify by xiaohuzi999
	 * 改类名，改实现方式,实例在ModuleManager管理范围之外，因此需要加StageResize事件
	 */	
	public class XLoading extends XDialog
	{
		private var _loadingImg:Image;
		
		public function XLoading()
		{
			super();
			this._layer = LayerManager.LAYER_TOP;
			this.bg.alpha = 0.01
		}
		
		
		/**显示loading*/
		public static function show(...args):void{
			instance.show(args)
		}
		
		/**关闭loading*/
		public static function close():void{
			instance.close();
		}
		
		
		//
		override public function show(...args):void{
			super.show();
			showLazyLoading();
			_loadingImg.visible = false;
			Laya.timer.once(800,this,showLazyLoading);
			
		}
		
		override public function close():void{
			super.close();
			Laya.timer.clear(this,showLazyLoading);
			Laya.timer.clear(this,this.onLoading);
		}
		//显示loading
		private function showLazyLoading():void{
			_loadingImg.visible = true;
			Laya.timer.frameLoop(1,this, this.onLoading);
		}
		
		private function onLoading():void{
			_loadingImg.rotation += 6;
		}
		
		override protected function addEvent():void{
			Laya.stage.on(Event.RESIZE, this, this.onStageResize);
			super.addEvent();
		}
		
		override protected function removeEvent():void{
			Laya.stage.off(Event.RESIZE, this, this.onStageResize);
			super.removeEvent();
		}
		
		override public function createUI():void{
			_loadingImg = new Image("common\/loading.png");
			_loadingImg.pivotX=50;
			_loadingImg.pivotY = 50;
			this.addChild(_loadingImg);
			//标志界面已经完成；
			_view = _loadingImg;
		}
		
		private static var _instance:XLoading;
		private static function get instance():XLoading{
			if(!_instance){
				_instance=new XLoading();
			}
			return _instance;
		}
	}
}
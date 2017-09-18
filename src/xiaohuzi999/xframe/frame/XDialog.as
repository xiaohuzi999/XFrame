package xiaohuzi999.xframe.frame
{
	import laya.events.Event;
	import laya.ui.Component;
	
	import xiaohuzi999.xframe.core.XWindow;
	
	/**
	 * XDialog 对话框，默认居中对齐；穿透模式可以切换
	 * author:huhaiming
	 * XDialog.as 2017-9-4 上午10:52:29
	 * version 1.0
	 */
	public class XDialog extends XWindow
	{
		//蒙板
		protected var _bg:Component;
		//蒙板颜色
		protected var _bgColor:String = "#000000";
		//蒙板透明都
		protected var _bgAlpha:Number = 0.3;
		//是否模式窗口状态,默认模式窗口，不可穿透
		protected var _isModel:Boolean = true;
		//是否可以点空白区域关闭，只有在模式窗窗口下有效,
		protected var _closeOnBlank:Boolean = false;
		
		
		public function XDialog()
		{
			super();	
			_layer = LayerManager.LAYER_POP;
			_align = LayerManager.CENTER;
			this.bg.alpha = this._bgAlpha;
		}
		
		override public function onStageResize():void{
			this.bg.size(Laya.stage.width, Laya.stage.height);
			LayerManager.setPosition(this, _align);
		}
		
		/**
		 * 显示
		 */
		override public function show(...args):void{
			super.show();
			if(!this.bg.displayedInStage){
				this.parent.addChildAt(this.bg, this.parent.getChildIndex(this));
				this.bg.size(Laya.stage.width, Laya.stage.height);
				this.bg.graphics.clear();
				this.bg.graphics.drawRect(0,0,Laya.stage.width, Laya.stage.height, _bgColor);
			}
		}
		
		/**关闭*/
		override public function close():void{
			this.bg.removeSelf();
			super.close();
		}
		
		
		/**是否模式窗口状态*/
		public function set isModel(v:Boolean):void{
			this._isModel = v;
			this.bg.visible = this._isModel;
		}
		
		/**是否模式窗口状态*/
		public function get isModel():Boolean{
			return this._isModel;
		}
		
		public function set closeOnBlank(v:Boolean):void{
			this._closeOnBlank = v;
		}
		
		public function get closeOnBlank():Boolean{
			return this._closeOnBlank;
		}
		
		/**取得蒙板对象*/
		public function get bg():Component{
			if(!this._bg){
				this._bg  = new Component();
				this._bg.mouseEnabled = true;
			}
			return this._bg;
		}
		
		protected function _onClick():void{
			if(this._closeOnBlank){
				this.close();
			}
		}
		
		override protected function addEvent():void{
			super.addEvent();
			this.bg.on(Event.CLICK, this, this._onClick);
		}
		
		override protected function removeEvent():void{
			super.removeSelf();
			this.bg.off(Event.CLICK, this, this._onClick);
		}
	}
}
package xiaohuzi999.xframe.frame
{
	import laya.display.Text;
	import laya.events.Event;
	import laya.maths.Rectangle;
	import laya.ui.Image;
	import laya.ui.View;
	
	import xiaohuzi999.xframe.core.XWindow;
	
	/**
	 * XToolTip 普通文本提示内容
	 * author:huhaiming
	 * XToolTip.as 2017-3-28 上午10:49:25
	 * version 1.0
	 *
	 */
	public class XToolTip extends XWindow
	{
		/**需要关联一下*/
		private var _msgTF:*;
		public function XToolTip()
		{
			super();
			this._layer = LayerManager.LAYER_TIP
		}
		
		override public function show(...args):void{
			super.show();
			var str:String = args[0];
			this._msgTF.text = str+"";
		}
		
		/**
		 * 获取本对象在父容器坐标系的矩形显示区域。
		 * <p><b>注意：</b>计算量较大，尽量少用。</p>
		 * @return 矩形区域。
		 */
		override public function getBounds():Rectangle {
			return new Rectangle(0, 0, this._view.width, this._view.height);
		}
		
		override public function createUI():void{
			/**
			 * ------------------------------------------
			 * 需要配置定义一套UI----------------------------
			 * ------------------------------------------
			 * */
			this._view = new View();
			this.addChild(_view);
			var img:Image = new Image();
			img.graphics.drawRect(0,0, 200, 100, "#999999");
			_view.addChild(img);
			_msgTF = new Text();
			_view.addChild(_msgTF)
		}
		
		override protected function addEvent():void{
			super.addEvent();
			Laya.stage.on(Event.MOUSE_DOWN, this, close);
		}
		
		override protected function removeEvent():void{
			super.removeEvent();
			Laya.stage.off(Event.MOUSE_DOWN, this, close);
		}
	}
}
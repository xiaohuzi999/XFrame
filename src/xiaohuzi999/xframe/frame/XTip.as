package xiaohuzi999.xframe.frame
{
	import laya.display.Text;
	import laya.ui.Image;
	import laya.utils.Handler;
	import laya.utils.Pool;
	import laya.utils.Tween;
	
	import xiaohuzi999.xframe.core.XWindow;
	
	/**
	 * XTip 简单提示类
	 * author:huhaiming
	 * XTip.as 2017-3-7 上午9:59:44
	 * version 1.0
	 *
	 */
	public class XTip extends XWindow
	{
		private var _bg:Image;
		private var _msgTF:Text;
		public function XTip()
		{
			this._layer = LayerManager.LAYER_POP;
			this._align = LayerManager.CENTER;
		}
		
		
		/**
		 * 显示一个tip
		 * @param tipStr 提示信息
		 * */
		public static function showTip(tipStr:String):void{
			var tip:XTip = Pool.getItemByClass("XTip", XTip);
			tip.showTip(tipStr);
			
			Tween.to(tip,{y:tip.y-180, alpha:0}, 500,null, Handler.create(tip, tip.close),1200);
		}
		
		/**显示一个tip*/
		public function showTip(str:String):void{
			this.show();
			this._msgTF.text = str;
			_msgTF.x = (_bg.width - _msgTF.width)/2;
			_msgTF.y = (_bg.height - _msgTF.height)/2;
		}
		
		override public function show(...args):void{
			super.show();
		}
		
		override public function close():void{
			Pool.recover("XTip", XTip);
			super.close();
		}
		
		//
		override public function createUI():void{
			this._bg = new Image();
			this._bg.sizeGrid = "26,25,20,22,0";
			this.addChild(this._bg);
			this._bg.skin = "common\/item_bg0.png";
			if(!_bg.texture){
				_bg.graphics.drawRect(0,0,300,140,"#66ccff")
			}
			this._bg.width = 300;
			this._bg.height = 140;
			
			this._msgTF = new Text();
			this._msgTF.fontSize = 18;
			this.addChild(_msgTF);
			_msgTF.width = 260;
			_msgTF.wordWrap = true;
			_msgTF.color = "#ffffff"
			_msgTF.align = "center";
		}
	}
}
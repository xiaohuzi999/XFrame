package xiaohuzi999.xframe.frame
{
	
	import laya.display.Sprite;
	import laya.events.Event;
	import laya.maths.Rectangle;
	import laya.utils.Dictionary;
	
	import xiaohuzi999.xframe.interfaces.IXWindow;

	/**
	 * TipManager 提示管理类
	 * author:huhaiming
	 * TipManager.as 2017-3-28 上午10:52:39
	 * version 1.0
	 *
	 */
	public class XTipManager
	{
		private static var _curTip:IXWindow;
		/**
		 * tip 数据字典
		 */
		private static var _dic:Dictionary = new Dictionary();
		public function XTipManager()
		{
		}
		
		/**
		 * 给一个对象注册TIP,！！注意当模块进入休眠状体（close）时，需要调用removeTip回收掉！！
		 * @param target 目标
		 * @param data tip对象的数据
		 * @param type tip类型
		 * */
		public static function addTip(target:Sprite, data:*, type:Class = null):void{
			if(!type){
				type = XToolTip;
			}
			_dic.set(target, {data:data,type:type});
			target.on(Event.CLICK, XTipManager, XTipManager.onShowTip);
		}
		
		/**
		 * 移除TIP
		 * @param target
		 * */
		public static function removeTip(target:Sprite):void{
			if(target){
				target.off(Event.CLICK, XTipManager, XTipManager.onShowTip);
				_dic.remove(target);
			}
		}
		
		/**
		 * 显示一个tip
		 * @param data 数据
		 * @param type Tip类型
		 * @param setPos 是否需要设定位置
		 * */
		public static function showTip(data:*, type:Class = null, setPos:Boolean=true):void{
			if(!type){
				type = XToolTip;
			}
			hideTip();
			if(data){
				_curTip = ModuleManager.showModule(type, data);
				setPos && showToStage(_curTip as Sprite);
			}
		}
		
		/**隐藏TIP,*/
		public static function hideTip():void{
			if(_curTip && Sprite(_curTip).displayedInStage){
				_curTip.close();
			}
		}
		
		public static function get curTip():Sprite{
			return _curTip as Sprite;
		}
		
		/**
		 * @private
		 */
		private static function showToStage(dis:Sprite, offX:int = 10, offY:int =10):void {
			var rec:Rectangle = dis.getBounds();
			dis.x = Laya.stage.mouseX + offX;
			dis.y = Laya.stage.mouseY + offY;
			if (dis.x + rec.width > Laya.stage.width) {
				dis.x -= rec.width + offX;
			}
			if (dis.y + rec.height > Laya.stage.height) {
				dis.y -= rec.height + offY;
			}
		}
		
		//
		private static function onShowTip(e:Event):void{
			var data:Object = _dic.get(e.currentTarget);
			showTip(data.data, data.type);
		}
	}
}
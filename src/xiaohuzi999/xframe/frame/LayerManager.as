package xiaohuzi999.xframe.frame
{
	
	import laya.display.Node;
	import laya.display.Sprite;
	
	import xiaohuzi999.xframe.interfaces.IXWindow;
	
	/**
	 * 层级管理器
	 */
	public class LayerManager
	{
		/**默认容器*/
		private static var _container:Sprite;
		
		/**常量-底层-如地图*/
		public static const LAYER_SCENE:int = 1;
		/**常量-普通窗体层*/
		public static const LAYER_PANEL:int = 2;
		/**常量-固定UI层位-仅在需要压在窗体上面时使用*/
		public static const LAYER_FIXED:int = 3;
		/**常量-弹出窗体层*/
		public static const LAYER_POP:int = 4;
		/**常量-TIPS层级*/
		public static const LAYER_TIP:int = 5;
		/**常量-顶层*/
		public static const LAYER_TOP:int = 6;
		
		//LEFTUP////////////////UP////////////////RIGHTUP////
		/////////////////////////////////////////////////////
		//LEFT////////////////CENTER/////////////////RIGHT///
		/////////////////////////////////////////////////////
		//LEFTDOWN////////////DOWN/////////////RIGHTDOWN/////
		public static const UP:int = 0x00000001;
		public static const DOWN:int = 0x00000010;
		public static const LEFT:int = 0x00000100;
		public static const RIGHT:int = 0x00001000;
		public static const CENTER:int = 0x00010000;
		
		public static const LEFTUP:int = LEFT | UP;
		public static const RIGHTUP:int = RIGHT | UP;
		public static const LEFTDOWN:int = LEFT | DOWN;
		public static const RIGHTDOWN:int = RIGHT | DOWN;
		public static const CENTERLEFT:int = CENTER | LEFT;
		public static const CENTERRIGHT:int = CENTER | RIGHT;
		
		public function LayerManager()
		{
		}
		/**
		 * 初始化 
		 * 
		 */		
		public static function init():void{
			_container = new Sprite();
			Laya.stage.addChild(_container);
		}
		
		/**
		 *  打开面板，自动设定层级并对齐
		 * @param view 面板
		 */		
		public static function openWindow(view:IXWindow):void
		{
			setLayer(view as Sprite,view.layer);
			setPosition(view as Sprite,view.align);
		}
		
		/**
		 *  添加面板到
		 * @param view 面板
		 * @param layerType 层类型
		 * 
		 */	
		public static function setLayer(view:Sprite,layerType:int=null):void{
			var len:Number = _container.numChildren;
			var node:Node;
			var win:IXWindow;
			for(var i:int=len-1; i>0; i--){
				node = _container.getChildAt(i);
				if(node is IXWindow){
					win = IXWindow(node);
					if(win.layer <= layerType){
						//找到相应的位置，返回-
						_container.addChildAt(view, i);
						return;
					}
				}
			}
			//还没加入任何显示对象。
			_container.addChild(view);
		}
		
		/**
		 * 设置面板位置 
		 * @param view 面板
		 * @param postTpye 位置类型
		 */		
		public static function setPosition(view:Sprite,postTpye:int):void
		{
			switch (postTpye)
			{
				case UP:
					view.x = (Laya.stage.width - view.width)/2 ;
					view.y = 0;
					break;
				case DOWN:
					view.x = (Laya.stage.width - view.width)/2;
					view.y = Laya.stage.height - view.height ;
					break;
				case LEFT:
					view.x = 0;
					view.y =  (Laya.stage.height - view.height)/2;
					break;
				case RIGHT:
					view.x = Laya.stage.width - view.width ;
					view.y =  (Laya.stage.height - view.height)/2;
					break;
				case LEFTUP:
					view.x = 0;
					view.y = 0;
					break;
				case RIGHTUP:
					view.x = Laya.stage.width - view.width ;
					view.y = 0;
					break;
				case LEFTDOWN:
					view.x = 0;
					view.y = Laya.stage.height - view.height ;
					break;
				case RIGHTDOWN:
					view.x = Laya.stage.width - view.width ;
					view.y = Laya.stage.height - view.height ;
					break;
				case CENTERLEFT:
					view.x = Laya.stage.width/2 - view.width;
					view.y =  (Laya.stage.height - view.height)/2;
					break;
				case CENTERRIGHT:
					view.x = Laya.stage.width/2;
					view.y =  (Laya.stage.height - view.height)/2;
					break;
				case CENTER:
					view.x = (Laya.stage.width - view.width)/2;					
					view.y = (Laya.stage.height - view.height)/2;
					break;
				default:
					break;
			}
		}
	}
}
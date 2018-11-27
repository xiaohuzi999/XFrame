/**
* name 
*/
module xframe{
	export class LayerManager{
		/**默认容器*/
		private static _container:Laya.Sprite;
		
		/**层级-底层-如地图*/
		public static LAYER_FIXED:number = 1;
		/**层级-普通窗体层*/
		public static LAYER_PANEL:number = 2;
		/**层级-固定UI层位-仅在需要压在窗体上面时使用*/
		public static LAYER_UI:number = 3;
		/**层级-弹出窗体层*/
		public static LAYER_POP:number = 4;
		/**层级-TIPS层级*/
		public static LAYER_TIP:number = 5;
		/**层级-顶层*/
		public static LAYER_TOP:number = 6;
 

		//LEFTUP////////////////UP////////////////RIGHTUP////
		/////////////////////////////////////////////////////
		//LEFT////////////////CENTER/////////////////RIGHT///
		/////////////////////////////////////////////////////
		//LEFTDOWN////////////DOWN/////////////RIGHTDOWN/////
		/**对齐-左上角，XWindow默认对齐方式*/
		public static ALIGN_LEFTUP:number = 0;
		/**对齐-居中上对齐*/
		public static ALIGN_UP:number = 1;
		/**对齐-居中,XMWindow默认对齐方式*/
		public static ALIGN_CENTER:number = 4;
		/**对齐-居中下对齐*/
		public static ALIGN_DOWN:number = 7;
		

		constructor(){
			
		}

		/**初始化 */
		public static init():void{
			LayerManager._container = new Laya.Sprite();
			Laya.stage.addChild(LayerManager._container);
		}

		/**
		 *  打开界面，自动设定层级并对齐
		 * @param view 功能界面,
		 */		
		public static openWindow(view:IXWindow):void
		{
			if(!view.displayedInStage){
				LayerManager.setLayer(<Laya.Sprite>view,view.layer);
			}
			LayerManager.setPosition(<Laya.Sprite>view,view.align);
		}

		/**
		 *  设置功能界面层级
		 * @param view 功能界面
		 * @param layer 层级类型
		 */	
		public static setLayer(view:Laya.Sprite, layer:number=LayerManager.LAYER_PANEL):void{
			let len:number = LayerManager._container.numChildren;
			let win:any;
			for(let i:number=len-1; i>=0; i--){
				win = LayerManager._container.getChildAt(i);
				if(win.layer && win.layer <= layer){
					//找到相应的位置，返回-
					trace("setLayer__________________")
					trace(win)
					LayerManager._container.addChildAt(view, i+1);
					return;
				}
			}
			//层级最小
			LayerManager._container.addChildAt(view, 0);
		}

		/**
		 * 设置面板位置 
		 * @param view 面板
		 * @param postTpye 位置类型
		 */		
		public static setPosition(view:Laya.Sprite,postTpye:number):void
		{
			switch (postTpye)
			{
				case LayerManager.ALIGN_UP:
					view.x = (Laya.stage.width - view.width)/2 ;
					view.y = 0;
					break;
				case LayerManager.ALIGN_DOWN:
					view.x = (Laya.stage.width - view.width)/2;
					view.y = Laya.stage.height - view.height ;
					break;
				case LayerManager.ALIGN_LEFTUP:
					view.x = 0;
					view.y = 0;
					break;
				case LayerManager.ALIGN_CENTER:
					view.x = (Laya.stage.width - view.width)/2;					
					view.y = (Laya.stage.height - view.height)/2;
					break;
				default:
					break;
			}
		}
	}
}
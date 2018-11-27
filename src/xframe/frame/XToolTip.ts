/**
* name 
*/
module xframe{
	export class XToolTip extends XWindow{
		/**需要关联一下*/
		private _msgTF:any;
		/**驱动tip的元素 */
		private _target:Laya.Sprite;
		constructor(){
			super();
			this._layer = LayerManager.LAYER_TIP;
			this._autoDispose = false;
		}
		
		public show(...args):void{
			super.show();
			var str:string = args[0];
			this._msgTF.text = str+"";
			//
			this._target = args[1];
		}
		
		/**
		 * 覆盖getBounds方法
		 * 获取本对象在父容器坐标系的矩形显示区域。
		 * <p><b>注意：</b>计算量较大，尽量少用。</p>
		 * @return 矩形区域。
		 */
		public getBounds():Laya.Rectangle {
			return new Laya.Rectangle(0, 0, this._view.width, this._view.height);
		}

		private onClose():void{
			if(this._target && !XUtils.checkHit(this._target)){
				this.close();
			}
		}
		
		public createUI():void{
			/**
			 * ------------------------------------------
			 * 需要配置定义一套UI----------------------------
			 * ------------------------------------------
			 * */
			this._view = new View();
			this._view.size(200,100);
			this._view.graphics.drawRect(0,0, 200, 100, "#999999");
			this.addChild(this._view);

			this._msgTF = new Laya.Text();
			this._view.addChild(this._msgTF);
		}
		
		protected  initEvent():void{
			Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onClose);
		}
		
		protected removeEvent():void{
			Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.onClose);
		}
	}
}
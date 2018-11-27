/**
* name 
*/
module xframe{
	export  abstract class XWindow extends Laya.Component implements IXWindow{
		protected _view:any;
		/**层级,常量定义在LayerManager中*/
		protected _layer:number = LayerManager.LAYER_PANEL;
		/**对齐方式,默认左上角*/
		protected _align:number = LayerManager.ALIGN_LEFTUP;
		/**是否自动销毁*/
		protected _autoDispose:boolean = true;
		/**ui是否初始化 */
		private _hasInit:boolean = false;

		constructor(){
			super();
		}

		/**
		 * 显示处理逻辑,每次打开界面会调用
		 * @param args 接受任意类型参数
		 */
		public show(...args):void{
			if(!this._hasInit){
				this._hasInit = true;
				this.createUI();
			}
			this.initEvent();
			LayerManager.openWindow(this);

		}
		
		/**关闭 */
		public close():void{
			this.removeEvent();
			this.removeSelf();
			XEvent.instance.event(XEvent.CLOSE, this);
		}

			
		/**自适应方法,窗口大小变化时供底层调用,在UI需要自动布局是需要*/
		public onStageResize():void{
			
		}

		/**初始化UI */
		protected abstract createUI():void;

		/**添加事件 */
		protected initEvent():void{

		}

		/**移除事件 */
		protected removeEvent():void{
			
		}
		
		/**设置层级,层级定义在LayerManager中*/
		public set layer(v:number){
			this._layer = v;
		}
		public get layer():number{
			return this._layer;
		}
		
		/**设置对齐方式*/
		public set align(v:number){
			this._align  = v;
		}
		public get align():number{
			return this._align;
		}
		
		/**设置是否自动销毁*/
		public set autoDispose(v:boolean){
			this._autoDispose = v;
		}
		public get autoDispose():boolean{
			return this._autoDispose;
		}
	}



	/**模式窗口，默认不可穿透 */
	export class XMWindow extends xframe.XWindow{
		//蒙板
		protected _bg:Laya.Component;
		//蒙板颜色
		protected _bgColor:string = "#000000";
		//蒙板透明都
		private _bgAlpha:number = 0.01;
		//是否模式窗口状态,默认模式窗口，不可穿透
		private _isModel:boolean = true;
		//是否可以点空白区域关闭，只有在模式窗窗口下有效,如果覆盖addEventListener,需要调用super.addEventListener();
		private _closeOnBlank:boolean = false;
		
		
		constructor(){
			super();	
			this._layer = xframe.LayerManager.LAYER_POP;
			this._align = xframe.LayerManager.ALIGN_CENTER;
			this.bg.alpha = this._bgAlpha;
		}
		
		public onStageResize():void{
			this.bg.size(Laya.stage.width, Laya.stage.height);
			xframe.LayerManager.setPosition(this, this._align);
		}
		
		/**
		 * 显示
		 */
		public show(...args):void{
			super.show();
			if(!this.bg.displayedInStage){
				this.parent.addChildAt(this.bg, this.parent.getChildIndex(this));
				this.bg.size(Laya.stage.width, Laya.stage.height);
				this.bg.graphics.clear();
				this.bg.graphics.drawRect(0,0,Laya.stage.width, Laya.stage.height, this._bgColor);
			}
		}
		
		/**关闭*/
		public close():void{
			this.bg.removeSelf();
			super.close();
		}
		
		
		/**是否模式窗口状态*/
		public set isModel(v:boolean){
			this._isModel = v;
			this.bg.visible = this._isModel;
		}
		
		/**是否模式窗口状态*/
		public get isModel():boolean{
			return this._isModel;
		}
		
		public set closeOnBlank(v:boolean){
			this._closeOnBlank = v;
		}
		
		public get closeOnBlank():boolean{
			return this._closeOnBlank;
		}

		public set bgAlpha(v:number){
			this._bgAlpha = v;
			this._bg && (this._bg.alpha = v);
		}

		public get bgAlpha():number{
			return this._bgAlpha;
		}
		
		/**取得蒙板对象*/
		public get bg():Laya.Component{
			if(!this._bg){
				this._bg  = new Laya.Component();
				this._bg.mouseEnabled = true;
			}
			return this._bg;
		}
		
		protected _onClick():void{
			if(this._closeOnBlank){
				this.close();
			}
		}
		
		protected createUI():void{
			
		}

		protected initEvent():void{
			this.bg.on(Laya.Event.CLICK, this, this._onClick);
		}
		
		protected removeEvent():void{
			this.bg.off(Laya.Event.CLICK, this, this._onClick);
		}
	}
}
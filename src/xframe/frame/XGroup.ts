/**
* name 
* 可选择"组"
* btns 对象可以是任意带selected的对象；
* var btns:any[] = [];
* var group:XGroup = new XGroup(btns);
*/
module xframe{
	export class XGroup extends Laya.EventDispatcher{
		//所有按钮
		private _btns:any[];
		//当前选中按钮
		private _selectedBtn:any;

		constructor(btns:any[]=null){
			super();
			this.buttons = btns;
		}
		
		/**销毁*/
		public destroy():void{
			var btn:any;
			for(var i=0; i<this._btns.length; i++){
				btn = this._btns[i]
				btn.off(Laya.Event.CLICK, this, this.onSelect);
			}
			this._btns = null;
		}
		
		private onSelect(e:Event):void{
			this.selectedBtn = <any>e.currentTarget
		}
		
		/**选中按钮*/
		public set selectedBtn(btn:any){
			if(this._selectedBtn != btn){
				if(this._selectedBtn){
					this._selectedBtn.selected = false;
					this._selectedBtn.mouseEnabled = true;
				}
				this._selectedBtn = btn;
				if(this._selectedBtn){
					this._selectedBtn.selected = true;
					this._selectedBtn.mouseEnabled = false;
				}
				this.event(Laya.Event.CHANGE);
			}
			this.event(Laya.Event.SELECT);
		}
		
		/**选中按钮*/
		public get selectedBtn():any{
			return this._selectedBtn;
		}
		
		/***/
		public set selectedIndex(v:number){
			this.selectedBtn = this.buttons[v];
		}
		
		/**获取选择序列*/
		public get selectedIndex():number{
			return this.buttons.indexOf(this._selectedBtn);
		}
		
		/**设置按钮组*/
		public set buttons(btns:any[]){
			this._btns = btns;
			var btn:any;
			for(var i=0; i<this._btns.length; i++){
				btn = this._btns[i];
				if(btn instanceof Laya.Button){
					btn.toggle = true;
				}
				btn.on(Laya.Event.CLICK, this, this.onSelect);
			}
		}
		
		/**获取按钮组*/
		public get buttons():any[]{
			return this._btns
		}
	}
}
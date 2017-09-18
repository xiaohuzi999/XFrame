package xiaohuzi999.xframe.frame
{
	import laya.events.Event;
	import laya.events.EventDispatcher;
	import laya.ui.Button;
	
	/**
	 * XGroup 按钮组
	 * author:huhaiming
	 * XGroup.as 2017-5-16 上午10:33:28
	 * version 1.0
	 * 事件：Event.CHANGE，Event.SELECT
	 * !!当所在界面销毁时，需要手动调用销毁方法
	 */
	public class XGroup extends EventDispatcher
	{
		private var _btns:Array;
		private var _selectedBtn:Button;
		public function XGroup(btns:Array=null)
		{
			super();
			this.buttons = btns;
		}
		
		/**销毁*/
		public function dispose():void{
			var btn:Button;
			for(var i:int=0; i<_btns.length; i++){
				btn = this._btns[i]
				btn.off(Event.CLICK, this, this.onSelect);
			}
			_btns = null;
		}
		
		private function onSelect(e:Event):void{
			this.selectedBtn = e.currentTarget as Button
		}
		
		/**选中按钮*/
		public function set selectedBtn(btn:Button):void{
			if(_selectedBtn != btn){
				if(this._selectedBtn){
					this._selectedBtn.selected = false;
					this._selectedBtn.mouseEnabled = true;
				}
				this._selectedBtn = btn;
				if(this._selectedBtn){
					this._selectedBtn.selected = true;
					this._selectedBtn.mouseEnabled = false;
				}
				this.event(Event.CHANGE);
			}
			this.event(Event.SELECT);
		}
		
		/**选中按钮*/
		public function get selectedBtn():Button{
			return this._selectedBtn;
		}
		
		/***/
		public function set selectedIndex(v:Number):void{
			selectedBtn = this.buttons[v];
		}
		
		/**获取选择序列*/
		public function get selectedIndex():Number{
			return this.buttons.indexOf(_selectedBtn);
		}
		
		/**设置按钮组*/
		public function set buttons(btns:Array):void{
			this._btns = btns;
			var btn:Button;
			for(var i:int=0; i<_btns.length; i++){
				btn = this._btns[i]
				btn.toggle = true;
				btn.on(Event.CLICK, this, this.onSelect);
			}
		}
		
		/**获取按钮组*/
		public function get buttons():Array{
			return this._btns
		}
	}
}
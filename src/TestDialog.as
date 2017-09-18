package
{
	import laya.events.Event;
	import laya.utils.Handler;
	
	import ui.test.TextDialogUI;
	
	import xiaohuzi999.xframe.XFacade;
	import xiaohuzi999.xframe.frame.RES;
	import xiaohuzi999.xframe.frame.XDialog;
	import xiaohuzi999.xframe.utils.AniUtil;
	
	/**
	 * TestDialog
	 * author:huhaiming
	 * TestDialog.as 2017-9-5 下午2:47:16
	 * version 1.0
	 *
	 */
	public class TestDialog extends XDialog
	{
		public function TestDialog()
		{
			super();
		}
		
		private function onClick(e:Event):void{
			switch(e.target){
				case TextDialogUI(_view).closeBtn:
					this.close();
					break;
			}
		}
		
		override public function show(...args):void{
			super.show();
			AniUtil.flowIn(this);
		}
		
		override public function close():void{
			AniUtil.flowOut(this, this.onClose);
		}
		private function onClose():void{
			super.close();
		}
		
		override public function createUI():void{
			this._view = new TextDialogUI();
			this.addChild(_view);
		}
		
		override protected function addEvent():void{
			this._view.on(Event.CLICK, this, this.onClick);
		}
		
		override protected function removeEvent():void{
			this._view.off(Event.CLICK, this, this.onClick);
		}
	}
}
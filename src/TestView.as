package
{
	import laya.ani.bone.Skeleton;
	import laya.ani.bone.Templet;
	import laya.events.Event;
	
	import ui.test.TestViewUI;
	
	import xiaohuzi999.xframe.XFacade;
	import xiaohuzi999.xframe.core.XWindow;
	import xiaohuzi999.xframe.frame.XAlert;
	import xiaohuzi999.xframe.frame.XLoading;
	import xiaohuzi999.xframe.frame.XTipManager;
	import xiaohuzi999.xframe.utils.AniUtil;
	
	/**
	 * TestView
	 * author:huhaiming
	 * TestView.as 2017-9-4 下午3:38:52
	 * version 1.0
	 *
	 */
	public class TestView extends XWindow
	{
		public function TestView()
		{
			super();
		}
		
		private function onClick(e:Event):void{
			switch(e.target){
				case view.closeBtn:
					this.close();
					break;
				case view.tipBtn:
					//XLoading.show();
					XTipManager.showTip("121385868")
					//XTip.showTip("If you can't, just try it harder.");
					XAlert.showAlert("venusvenusvenus")
					break;
				case view.dialogBtn:
					XFacade.instance.showModule(TestDialog)
					break;
			}
		}
		
		
		
		private var mAniPath:String;
		private var mStartX:Number = 400;
		private var mStartY:Number = 500;
		private var mFactory:Templet;
		private var mActionIndex:int = 0;
		private var mCurrIndex:int = 0;
		private var mArmature:Skeleton;
		private var mCurrSkinIndex:int = 0;
		public function startFun():void
		{
			mAniPath = "res/test/c010011.sk";
			mFactory = new Templet();
			mFactory.on(Event.COMPLETE, this, parseComplete);
			mFactory.on(Event.ERROR, this, onError);
			mFactory.loadAni(mAniPath);
		}
		
		private function onError(e:*):void
		{
			trace("error");
		}
		
		private function parseComplete(fac:Templet):void {
			//创建模式为1，可以启用换装
			mArmature = mFactory.buildArmature(0);
			mArmature.x = mStartX;
			mArmature.y = mStartY;
			mArmature.scale(0.5, 0.5);
			Laya.stage.addChild(mArmature);
			mArmature.on(Event.STOPPED, this, completeHandler);
			play();
		}
		
		private function completeHandler():void
		{
			play();
		}
		
		private function play():void
		{
			mCurrIndex++;
			if (mCurrIndex >= mArmature.getAnimNum())
			{
				mCurrIndex = 0;
			}
			mArmature.play(mCurrIndex,false);
			
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		override public function show(...args):void{
			super.show();
			startFun();
		}
		
		override public function createUI():void{
			this._view = new TestViewUI();
			this.addChild(this._view);
		}
		
		override protected function addEvent():void{
			this._view.on(Event.CLICK, this, this.onClick);
		}
		
		public function get view():TestViewUI{
			return _view as TestViewUI
		}
	}
}
package {
	import laya.events.Event;
	import laya.resource.ResourceManager;
	import laya.utils.Stat;
	import laya.webgl.WebGL;
	
	import xiaohuzi999.xframe.BaseApp;
	import xiaohuzi999.xframe.XFacade;

	public class LayaSample {
		
		public function LayaSample() {
			//初始化引擎
			Laya.init(1136, 640, WebGL);
			XFacade.instance.init(BaseApp, "res/RES.json","res/ui.json","res/unpack/");
			
			Laya.stage.on(Event.MOUSE_DOWN,this,stageClick);
			Stat.show();
		}	
		
		private function stageClick(e:Event):void{
			ResourceManager.systemResourceManager.check();
		}
	}
}
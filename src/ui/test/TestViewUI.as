/**Created by the LayaAirIDE,do not modify.*/
package ui.test {
	import laya.ui.*;
	import laya.display.*; 

	public class TestViewUI extends View {
		public var closeBtn:Button;
		public var dialogBtn:Button;
		public var tipBtn:Button;

		override protected function createChildren():void {
			super.createChildren();
			loadUI("test/TestView");
		}
	}
}
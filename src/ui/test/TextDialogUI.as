/**Created by the LayaAirIDE,do not modify.*/
package ui.test {
	import laya.ui.*;
	import laya.display.*; 

	public class TextDialogUI extends View {
		public var closeBtn:Button;

		override protected function createChildren():void {
			super.createChildren();
			loadUI("test/TextDialog");
		}
	}
}
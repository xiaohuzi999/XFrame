/**
* name 
*/
module xframe{
	export class XTip extends XWindow{
		private _bg:Laya.Image;
		private _msgTF:Laya.Label;
		constructor(){
			super();
			this._layer = LayerManager.LAYER_POP;
			this._align = LayerManager.ALIGN_CENTER;
		}
		
		
		/**
		 * 显示一个tip
		 * @param tipStr 提示信息
		 * */
		public static showTip(tipStr:string):void{
			var tip:XTip = Laya.Pool.getItem("XTip");
			if(!tip){
				tip = new XTip();
			}
			tip.show(tipStr);
			
			Laya.Tween.to(tip,{y:tip.y-180, alpha:0}, 500,null, Handler.create(tip, tip.close),1200);
		}
		
		/**显示一个tip*/
		// public showTip(str:string):void{
		// 	this.show();
		// 	this._msgTF.text = str;
		// 	this._msgTF.x = (this._bg.width - this._msgTF.width)/2;
		// 	this._msgTF.y = (this._bg.height - this._msgTF.height)/2;
		// }
		
		public show(...args):void{
			super.show();
			this.alpha = 1;
			this._msgTF.text = args[0]+"";
			this._msgTF.x = (this._bg.width - this._msgTF.width)/2;
			this._msgTF.y = (this._bg.height - this._msgTF.height)/2;
		}
		
		public close():void{
			Laya.Pool.recover("XTip", this);
			super.close();
		}
		
		//
		public createUI():void{
			this._bg = new Laya.Image();
			this._bg.sizeGrid = "26,25,20,22,0";
			this.addChild(this._bg);
			//this._bg.skin = "common\/item_bg0.png";
			if(!this._bg.texture){
				this._bg.graphics.drawRect(0,0,300,140,"#66ccff")
			}
			this._bg.size(300, 140);
			
			this._msgTF = new Laya.Label();
			this._msgTF.fontSize = 18;
			this.addChild(this._msgTF);
			this._msgTF.width = 260;
			this._msgTF.wordWrap = true;
			this._msgTF.color = "#ffffff"
			this._msgTF.align = "center";
		}
	}
}
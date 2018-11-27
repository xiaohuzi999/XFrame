/**
* name 
*/
module xframe{
	export class XAlert extends XMWindow{
		/**关联UI*/
		private _btnYes:Laya.Button;
		private _btnNo:Laya.Button;
		private _btnClose:Laya.Button;
		private _tfMsg:Laya.HTMLDivElement;
		
		/**确定回调*/
		private _yesHandler:Handler;
		/**取消回调*/
		private _noHandler:Handler;
		/**原始确定按钮x坐标*/
		private _oriYesPos:number;
		/**原始取消按钮x坐标*/
		private _oriNoPos:number;
		
		/**确定按钮默认label-静态常量*/
		public static LABEL_YES_DEFAULT:string = "YES";
		/**取消按钮默认label-静态常量*/
		public static LABEL_NO_DEFAULT:string = "NO";

		constructor(){
			super();
			this._autoDispose = false;
		}
		
		/**
		 * 显示警告
		 * @param message 消息
		 * @param yesHandler yes回调 
		 * @param noHandler 取消按钮回调
		 * @param showYesBtn 是否显示确定按钮
		 * @param showNoBtn 是否显示取消按钮
		 * @param yesBtnLabel “确定”按钮标签
		 * @param noBtnLabel “取消”按钮标签
		 */
		public static showAlert(message:string,  yesHandler:Handler=null,noHandler:Handler=null,showYesBtn:boolean = true,showNoBtn:boolean = true,yesBtnLabel:string = null, noBtnLabel:string = null):void
		{
			ModuleManager.showModule(XAlert, message,yesHandler,noHandler,showYesBtn,showNoBtn,yesBtnLabel,noBtnLabel);
		}
		
		public createUI():void{
			//==============================================================
			//根据需要换UI====================================================
			//==============================================================
			this._view = new XXAlertUI();
			this.addChild(this._view);
			//==============================================================
			//END===========================================================
			//==============================================================
			
			this._btnYes = this._view["btnYes"];
			this._btnNo = this._view["btnNo"];
			this._btnClose = this._view["btnClose"];
			this._tfMsg = this._view["tfMsg"];
			//
			this._oriYesPos = this._btnYes.x;
			this._oriNoPos = this._btnNo.x;
		}
		
		/**加事件*/
		protected initEvent():void
		{
			this._view.on(Laya.Event.CLICK, this, this.onClick);
		}
		
		/**删除事件*/
		protected removeEvent():void
		{
			this._view.off(Laya.Event.CLICK, this, this.onClick);
		}
		
		private onClick(event:Laya.Event):void{
			switch(event.target){
				case this._btnYes:
					this._yesHandler && this._yesHandler.run();
					this.close();
					break;
				case this._btnNo:
					this._noHandler && this._noHandler.run();
					this.close();
					break;
				case this._btnClose:
					this.close();
					break;
			}
		}
		
		/**
		 * 显示警告
		 * @param message 消息
		 * @param yesHandler yes回调 
		 * @param noHandler 取消按钮回调
		 * @param showYesBtn 是否显示确定按钮
		 * @param showNoBtn 是否显示取消按钮
		 * @param yesBtnLabel “确定”按钮标签
		 * @param noBtnLabel “取消”按钮标签
		 */
		private showAlert(message:string, yesHandler:Handler=null,noHandler:Handler=null,showYesBtn:boolean = true,showNoBtn:boolean = true,yesBtnLabel:string = null, noBtnLabel:string = null):void
		{
			this._yesHandler = yesHandler;
			this._noHandler = noHandler;
			
			if(yesBtnLabel == null || yesBtnLabel == ""){
				yesBtnLabel = XAlert.LABEL_YES_DEFAULT;
			}
			if(noBtnLabel == null || noBtnLabel == ""){
				noBtnLabel = XAlert.LABEL_NO_DEFAULT;
			}
			this._tfMsg.innerHTML = message+"";
			this._tfMsg.y = (this._btnYes.y - this._tfMsg.contextHeight ) * 0.5;
			var btnNum:number = 0;
			if(showYesBtn){
				btnNum++;
				this._btnYes.visible = true;
				this._btnYes.label = yesBtnLabel;
			}else{
				this._btnYes.visible = false;
			}
			if(showNoBtn){
				this._btnNo.label = noBtnLabel;
				this._btnNo.visible = true;
				btnNum++;
			}else{
				this._btnNo.visible = false;
			}
			var btn:Laya.Button;
			if(btnNum == 1){
				this._btnYes.visible ? btn=this._btnYes : btn=this._btnNo;
				btn.x = (this._view.width - btn.width)/2;
			}else if(btnNum == 2){
				this._btnYes.x = this._oriYesPos;
				this._btnNo.x = this._oriNoPos;
			}
		}
		
		/**覆盖show*/
		public show(...args):void{
			super.show();
			this.showAlert.apply(this, args);
			
			AniUtil.popIn(this);
		}
		
		/**覆盖关闭*/
		public close():void{
			AniUtil.popOut(this, Handler.create(this, this.onClose), 150,200);
		}
		
		//
		private onClose():void{
			this._yesHandler && this._yesHandler.recover();
			this._noHandler && this._noHandler.recover();
			this._yesHandler = this._noHandler = null;
			super.close();
		}
	}



	//默认UI
	class XXAlertUI extends Laya.Component{
		/***/
		public btnYes:Laya.Button;
		public btnNo:Laya.Button;
		public tfMsg:Laya.HTMLDivElement;
		
		constructor(){
			super();
			var bg:Laya.Image = new Laya.Image();
			bg.size(500, 320);
			bg.graphics.drawRect(0,0, 500, 320, "#66ccff");
			this.addChild(bg);
			
			this.tfMsg = new Laya.HTMLDivElement();
			this.tfMsg.width = 460;
			this.addChild(this.tfMsg);
			this.tfMsg.pos(20, 72);

			this.tfMsg.style.fontFamily = "微软雅黑";
			this.tfMsg.style.fontSize = 20;
			this.tfMsg.style.color = "#ffffff";
			this.tfMsg.style.align = "center";
			
			this.btnYes = new Laya.Button("", "Yes");
			bg = new Laya.Image();
			bg.graphics.drawRect(0,0,100, 50, "#ff6600");
			this.btnYes.size(100, 50);
			this.btnYes.addChildAt(bg, 0);
			this.addChild(this.btnYes);
			this.btnYes.pos(130,220);
			
			this.btnNo = new Laya.Button("", "No");
			bg = new Laya.Image();
			bg.graphics.drawRect(0,0,100, 50, "#ff6600");
			this.btnNo.addChildAt(bg, 0);
			this.btnNo.size(100, 50);
			this.addChild(this.btnNo);
			this.btnNo.pos(260,220);
			
			this.btnYes.mouseEnabled = this.btnNo.mouseEnabled = true;
		}
	}
}
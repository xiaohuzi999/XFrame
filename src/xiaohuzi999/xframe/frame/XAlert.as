package xiaohuzi999.xframe.frame
{
	import laya.events.Event;
	import laya.html.dom.HTMLDivElement;
	import laya.ui.Button;
	import laya.utils.Handler;
	
	import xiaohuzi999.xframe.utils.AniUtil;

	/**
	 * 警告类，使用方法:
	 * XAlert.showAlert("JustDoIt");
	 * @author xiaohuzi999@163.com
	 */
	public class XAlert extends XDialog
	{
		/**关联UI*/
		private var _yesBtn:Button;
		private var _noBtn:Button;
		private var _closeBtn:Button;
		private var _msgTF:HTMLDivElement;
		
		/**确定回调*/
		private var _yesHandler:Handler;
		/**取消回调*/
		private var _noHandler:Handler;
		/**原始确定按钮x坐标*/
		private var _oriYesPos:Number;
		/**原始取消按钮x坐标*/
		private var _oriNoPos:Number;
		
		/**确定按钮默认label-静态常量*/
		public static const DEFAULT_YES_LABEL:String = "YES";
		/**取消按钮默认label-静态常量*/
		public static const DEFAULT_NO_LABEL:String = "NO";
		
		public function XAlert()
		{
			super();
		}
		
		/**
		 * 显示警告
		 * @param message 消息
		 * @param title 标题
		 * @param yesHandler yes回调 
		 * @param noHandler 取消按钮回调
		 * @param showYesBtn 是否显示确定按钮
		 * @param showNoBtn 是否显示取消按钮
		 * @param yesBtnLabel “确定”按钮标签
		 * @param noBtnLabel “取消”按钮标签
		 */
		public static function showAlert(message:String,  yesHandler:Handler=null,noHandler:Handler=null,showYesBtn:Boolean = true,showNoBtn:Boolean = true,yesBtnLabel:String = null, noBtnLabel:String = null):void
		{
			ModuleManager.showModule(XAlert, message,yesHandler,noHandler,showYesBtn,showNoBtn,yesBtnLabel,noBtnLabel);
		}
		
		override public function createUI():void{
			//==============================================================
			//根据需要换UI====================================================
			//==============================================================
			_view = new XXAlertUI();
			this.addChild(_view);
			//==============================================================
			//END===========================================================
			//==============================================================
			
			_yesBtn = _view["yesBtn"];
			_noBtn = _view["noBtn"];
			_closeBtn = _view["closeBtn"];
			_msgTF = _view["msgTF"];
			//
			this._oriYesPos = _yesBtn.x;
			this._oriNoPos = _noBtn.x;
			
			_msgTF.style.fontFamily = "微软雅黑";
			_msgTF.style.fontSize = 20;
			_msgTF.style.color = "#ffffff";
			_msgTF.style.align = "center";
		}
		
		/**加事件*/
		override protected function addEvent():void
		{
			this._view.on(Event.CLICK, this, this.onClick);
		}
		
		/**删除事件*/
		override protected function removeEvent():void
		{
			this._view.off(Event.CLICK, this, this.onClick);
		}
		
		private function onClick(event:Event):void{
			trace(event.target);
			switch(event.target){
				case _yesBtn:
					this._yesHandler && _yesHandler.run();
					this.close();
					break;
				case _noBtn:
					this._noHandler && _noHandler.run();
					this.close();
					break;
				case _closeBtn:
					this.close();
					break;
			}
		}
		
		public function showAlert(message:String, yesHandler:Handler=null,noHandler:Handler=null,showYesBtn:Boolean = true,showNoBtn:Boolean = true,yesBtnLabel:String = null, noBtnLabel:String = null):void
		{
			_yesHandler = yesHandler;
			_noHandler = noHandler;
			
			if(yesBtnLabel == null || yesBtnLabel == ""){
				yesBtnLabel = DEFAULT_YES_LABEL;
			}
			if(noBtnLabel == null || noBtnLabel == ""){
				noBtnLabel = DEFAULT_NO_LABEL;
			}
			trace("message---------------------------->>>");
			_msgTF.innerHTML = message;
			_msgTF.y = (_yesBtn.y - _msgTF.contextHeight ) * 0.5;
				
			var btnNum:int = 0;
			if(showYesBtn){
				btnNum++;
				_yesBtn.visible = true;
				_yesBtn.label = yesBtnLabel;
			}else{
				_yesBtn.visible = false;
			}
			if(showNoBtn){
				_noBtn.label = noBtnLabel;
				_noBtn.visible = true;
				btnNum++;
			}else{
				_noBtn.visible = false;
			}
			var btn:Button;
			if(btnNum == 1){
				_yesBtn.visible ? btn=_yesBtn : btn=_noBtn;
				btn.x = (this._view.width - btn.width)/2;
			}else if(btnNum == 2){
				_yesBtn.x = _oriYesPos;
				_noBtn.x = _oriNoPos;
			}
		}
		
		/**覆盖show*/
		override public function show(...args):void{
			super.show();
			this.showAlert.apply(this, args[0]);
			
			AniUtil.popIn(this);
		}
		
		/**覆盖关闭*/
		override public function close():void{
			AniUtil.popOut(this, onClose, 150,200, this);
		}
		
		private function onClose():void{
			_yesHandler && _yesHandler.recover();
			_noHandler && _noHandler.recover();
			super.close();
		}
	}
}


import laya.html.dom.HTMLDivElement;
import laya.ui.Button;
import laya.ui.Component;
import laya.ui.Image;

class XXAlertUI extends Component{
	/***/
	public var yesBtn:Button;
	public var noBtn:Button;
	public var msgTF:HTMLDivElement;
	public function XXAlertUI(){
		init();
	}
	
	private function init():void{
		var bg:Image = new Image();
		bg.size(500, 320);
		bg.graphics.drawRect(0,0, 500, 320, "#66ccff");
		this.addChild(bg);
		
		msgTF = new HTMLDivElement();
		msgTF.width = 460;
		this.addChild(msgTF);
		msgTF.pos(20, 72);
		
		yesBtn = new Button("", "Yes");
		bg = new Image();
		bg.graphics.drawRect(0,0,100, 50, "#ff6600");
		yesBtn.size(100, 50);
		yesBtn.addChildAt(bg, 0);
		this.addChild(yesBtn);
		yesBtn.pos(130,220);
		
		noBtn = new Button("", "No");
		bg = new Image();
		bg.graphics.drawRect(0,0,100, 50, "#ff6600");
		noBtn.addChildAt(bg, 0);
		noBtn.size(100, 50);
		this.addChild(noBtn);
		noBtn.pos(260,220);
		
		yesBtn.mouseEnabled = noBtn.mouseEnabled = true;
	}
}
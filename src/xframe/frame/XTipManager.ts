/**
* name 
*/
module xframe{
	export class XTipManager{
		/** */
		private static _curTip:IXWindow;
		/**
		 * tip 数据字典
		 */
		private static _dic:Laya.Dictionary = new Laya.Dictionary();
		
		/**
		 * 给一个对象注册TIP,当TIP显示时，会调用TIP对象的show()方法，并传入需要解析的数据，形如show(data);
		 * 注意当模块进入休眠状体（close）时，最好调用removeTip回收掉！！
		 * @param target 目标
		 * @param data tip对象的数据
		 * @param tipType tip类型,(注意是类型，不是实例)
		 * */
		public static addTip(target:Laya.Sprite, data:any, tipType:any = null):void{
			if(!tipType){
				tipType = XToolTip;
			}
			this._dic.set(target, {data:data,type:tipType});
			target.on(Laya.Event.CLICK, this, this.onShowTip);
		}
		
		/**
		 * 移除TIP
		 * @param target 注册过TIP的对象;
		 * */
		public static removeTip(target:Laya.Sprite):void{
			if(target && this._dic.get(target)){
				target.off(Laya.Event.CLICK, this, this.onShowTip);
				this._dic.remove(target);
			}
		}
		
		/**
		 * 主动显示一个tip
		 * @param data 数据
		 * @param type Tip类型 (注意是类型，不是实例)
		 * @param setPos 是否需要设定位置
		 * @param target TIP目标对象;
		 * */
		public static showTip(data:any, type:any = null, setPos:Boolean=true, target:Laya.Sprite=null):void{
			if(!type){
				type = XToolTip;
			}
			if(data){
				this.setCurTip(ModuleManager.showModule(type, data, target))
				//this._curTip = ModuleManager.showModule(type, data);
				setPos && this.showToStage(<Laya.Sprite>this._curTip);
			}else{
				this.hideTip();
			}
		}
		
		/**隐藏TIP,*/
		public static hideTip():void{
			if(this._curTip && (<Laya.Sprite>this._curTip).displayedInStage){
				this._curTip.close();
			}
		}

		/** */
		public static get curTip():Laya.Sprite{
			return (<Laya.Sprite>this._curTip);
		}

		private static setCurTip(tip:any):void{
			if(this._curTip && this._curTip != tip){
				this._curTip.close();
			}
			this._curTip = tip
		}
		
		/**
		 * @private
		 */
		private static showToStage(dis:Laya.Sprite, offX:number = 10, offY:number =10):void {
			var rec:Laya.Rectangle = dis.getBounds();
			dis.x = Laya.stage.mouseX + offX;
			dis.y = Laya.stage.mouseY + offY;
			if (dis.x + rec.width > Laya.stage.width) {
				dis.x -= rec.width + offX;
			}
			if (dis.y + rec.height > Laya.stage.height) {
				dis.y -= rec.height + offY;
			}
		}
		
		//
		private static onShowTip(e:Laya.Event):void{
			var data:{data,type} = this._dic.get(e.currentTarget);
			this.showTip(data.data, data.type, true,e.currentTarget);
		}
	}
}
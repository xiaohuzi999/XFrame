/**
* name 
*/
module xframe{
	export class RES{
		/**
		 * 资源配置格式
		 * {
		 * "groupName":["atlas/comp.json","xxx.png","yyy.jpg"]
		 * }
		 * */
		/**resConfig总配置 */
		private static _resCfg:{modules:any};
		//模块配置
		private static _moduleCfg:any;
		/**未打包资源配置*/
		private static _unpackCfg:any[] = [];
		/**引用计数列表*/
		private static _quoteDic:Object = {};
		/**资源路径头*/
		private static URL_PRE:string = "res/"
		/**图集路径头*/
		private static URL_ATLAS:string = "atlas/"

		constructor(){

		}
		
		/**
		 * 初始化
		 * @param resUrl		模块配置
		 * @param uiUrl			UI配置
		 * @param unpackUrl		未打包资源配置
		 * @param cb 			回调
		 */
		public static init(resUrl:string, uiUrl:string, unpackUrl:string, cb:Handler):void{
			var arr:string[] = [];
			resUrl && arr.push(resUrl);
			uiUrl && arr.push(uiUrl);
			unpackUrl && arr.push(unpackUrl);
			if(arr.length){
				Laya.loader.load(arr, Handler.create(null, ()=>{
					this._resCfg = Laya.loader.getRes(resUrl) || {};
					this._moduleCfg = this._resCfg.modules;
					unpackUrl && (this._unpackCfg = this.getRes(unpackUrl));
					uiUrl && (View.uiMap = Laya.loader.getRes(uiUrl));

					cb.run();
				}));
			}else{
				cb.run();
			}
		}
		
		/**
		 * 加载RES指定资源。
		 * @param	group 资源组, RES.json配置的名字,一般使用模块
		 * @param	complete 结束回调，如果加载失败，则返回 null 。
		 * @param	progress 进度回调，回调参数为当前文件加载的进度信息(0-1)。
		 * @param	type 资源类型。
		 * @param	priority 优先级，0-4，五个优先级，0优先级最高，默认为1。
		 * @param	cache 是否缓存加载结果。
		 */
		public static load(group:string, complete:Handler=null, progress:Handler=null,type:string=null, priority:number=1, cache:boolean=true):void{
			var urlArr:string[] = this.getUrlList(group, true);	
			if(urlArr==null || urlArr.length<1){
				complete.run();
			}else{
				Laya.loader.load(urlArr,Handler.create(null,this.loadItemComplete,[complete]),Handler.create(null, this.onLoadProgress,[group,progress], false),type,priority,cache, group);
			}
		}	
		//资源组加载完成
		private static loadItemComplete(handler:Handler):void{
			handler && handler.run();
		}
		
		//资源组加载中
		private static onLoadProgress(name:string,proHandler:Handler,progress:Number):void
		{
			proHandler && proHandler.runWith(progress);
			trace("RES::onLoadProgress->"+name +"  progress:  "+progress);
		}
		
		/**
		 * 获取资源，地址可以是配置res.json里面的配置
		 * @param url
		 */
		public static getRes(url:string):any{
			if(url.indexOf(this.URL_PRE) == -1){
				url = this.URL_PRE+url;
			}
			return Loader.getRes(url);
		}
		
		/**
		 * 按组卸载资源,供框架底层调用
		 * @param group 组名，对应类名（潜规则!）
		 * */
		public static unloadGroup(group:string):void{
			var urlArr:any[] = this.getUrlList(group);
			for(var i in urlArr){
				this.unload(urlArr[i].url);
			}
		}
		
		/**
		 * 卸载资源
		 * @param url 资源地址
		 * @param unpackOnly 是否作为未打包资源处理
		 * */
		public static unload(url:string, unpackOnly:Boolean = false):void{
			if(unpackOnly){
				if(this._unpackCfg.indexOf(url) != -1){
					this.delQuote(url);
				}
			}else{
				this.delQuote(url);
			}
		}
		
		/**
		 * 增加未打包资源引用
		 * @param view 界面视图
		 * */
		public static addUnpackQuote(view:View):void{
			for(var i in view._childs){
				var skin:string  = (view._childs[i] && view._childs[i].skin);
				if(skin && this._unpackCfg.indexOf(skin) != -1){
					this.addQuote(skin);
				}
			}
		}
		
		/**
		 * 删除未打包资源引用
		 * @param view 界面视图
		 * */
		public static delUnpackQuote(view:View):void{
			for(var i in view._childs){
				var skin:string  = (view._childs[i] && view._childs[i].skin);
				if(skin && this._unpackCfg.indexOf(skin) != -1){
					this.delQuote(skin);
				}
			}
		}
		
		/**增加引用计数--*/
		private static addQuote(url:string):void{
			if(this._quoteDic[url]){
				this._quoteDic[url] = this._quoteDic[url]+1;
			}else{
				this._quoteDic[url] = 1;
			}
		}
		
		/**删除引用计数*/
		private static delQuote(url:string):void{
			if(this._quoteDic[url]){
				this._quoteDic[url] -= 1;
				if(this._quoteDic[url] <= 0 ){
					Loader.clearRes(url);
					delete this._quoteDic[url];
				}
			}
		}
		
		/**根据组名获取资源列表
		 * @param group 组名，潜规则由类名担当
		 * @param quote 使用需要建立引用。
		 * */
		private static getUrlList(group:string, quote:Boolean = false):any[]{
			var arr:any[] = this._moduleCfg[group];
			if(arr){
				for(var i in arr){
					if(arr[i] instanceof String){
						arr[i] ={url:this.URL_PRE+arr[i], type: this.getTypeFromUrl(arr[i]), size: 1, priority: 1};
					}
					//建立引用计数=====================================================
					if(quote){
						this.addQuote(arr[i].url);
					}
				}
			}
			return arr;
		}
		
		/**
		 * 获取指定资源地址的数据类型,潜规则。
		 * @param	url 资源地址。
		 * @return 数据类型。
		 */
		private static getTypeFromUrl(url:string):string {
			var tmp:string[] = (url+"").split(".");
			var type:string = tmp[tmp.length-1];
			if (type) {
				type = Loader.typeMap[type.toLowerCase()];
				if(type== Loader.JSON && url.indexOf(this.URL_ATLAS) > -1){
					type = Loader.ATLAS;
				}
				return type;
			}
			trace("RES::Unkown file suffix", url);
			return Loader.TEXT;
		}
	}
}
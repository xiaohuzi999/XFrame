package xiaohuzi999.xframe.frame
{	
	import laya.net.Loader;
	import laya.net.URL;
	import laya.ui.View;
	import laya.utils.Handler;

	/**
	 * RES
	 * author:huhaiming
	 * RES.as 2017-9-4 下午2:48:42
	 * version 1.0
	 * 需要处理引用计数。。。
	 */
	public class RES
	{
		/**
		 * 资源配置格式
		 * {
		 * "groupName":["atlas/comp.json","xxx","yyy"]
		 * }
		 * */
		private static var _configData:Object;
		/**未打包资源配置*/
		private static var _unpackData:Array;
		/**引用计数列表*/
		private static var _quoteDic:Object = {};
		/***/
		private static var PRE_URL:String = "res/"
		/***/
		private static var ATLAS_URL:String = "atlas/"
		/**未打包资源路径*/
		private static var _unpack_path:String;
		public function RES()
		{
			
		}
		
		/**外部配置资源*/
		public static function init(con:Object, unpackCon:Array, unpackPath:String):void{
			_configData = con;
			_unpackData = (unpackCon || []);
			_unpack_path = unpackPath;
			URL.customFormat = customFormat;
		}
		
		/**
		 * 加载GameResource指定资源。
		 * @param	group 资源组, GameResource.json配置的名字
		 * @param	complete 结束回调，如果加载失败，则返回 null 。
		 * @param	progress 进度回调，回调参数为当前文件加载的进度信息(0-1)。
		 * @param	type 资源类型。
		 * @param	priority 优先级，0-4，五个优先级，0优先级最高，默认为1。
		 * @param	cache 是否缓存加载结果。
		 * @return 此 LoaderManager 对象。
		 */
		public static function load(group:String, complete:Handler=null, type:String=null, priority:int=1, cache:Boolean=true, showLoading:Boolean = true):void{
			var urlArr:Array = getUrlList(group, true);	
			if(urlArr==null || urlArr.length<1){
				complete.run();
			}else{
				Laya.loader.load(urlArr,Handler.create(null,loadItemComplete,[complete,showLoading]),Handler.create(null, onLoadProgress,[group], false),type,priority,cache, group);
			}
		}	
		
		private static function loadItemComplete(value:Handler,showLoading:Boolean=true):void{
			value && value.run();
		}
		
		private static function onLoadProgress(name:String,progress:Number):void
		{
			//trace("ModuleManager--->onLoadProgress : "+name +"  progress:  "+progress);
		}
		
		/**
		 * 按组卸载资源
		 * @param group 组名，对应类名（潜规则!）
		 * */
		public static function unloadGroup(group:String):void{
			var urlArr:Array = getUrlList(group);
			for(var i:String in urlArr){
				unload(urlArr[i].url);
			}
		}
		
		/**
		 * 卸载资源
		 * @param url 资源地址
		 * @param unpackOnly 是否作为未打包资源处理
		 * */
		public static function unload(url:String, unpackOnly:Boolean = false):void{
			if(unpackOnly){
				if(_unpackData.indexOf(url) != -1){
					delQuote(url);
				}
			}else{
				delQuote(url);
			}
		}
		
		/**
		 * 增加未打包资源引用
		 * @param view 界面视图
		 * */
		public static function addUnpackQuote(view:View):void{
			for(var i:String in view._childs){
				var skin:String  = (view._childs[i] && view._childs[i].skin);
				if(skin && _unpackData.indexOf(skin) != -1){
					addQuote(skin);
				}
			}
		}
		
		/**
		 * 删除未打包资源引用
		 * @param view 界面视图
		 * */
		public static function delUnpackQuote(view:View):void{
			for(var i:String in view._childs){
				var skin:String  = (view._childs[i] && view._childs[i].skin);
				if(skin && _unpackData.indexOf(skin) != -1){
					delQuote(skin);
				}
			}
		}
		
		/***/
		private static function customFormat(url:String, basePath:String):String{
			if(_unpackData.indexOf(url) != -1){
				return _unpack_path+url;
			}
			return url;
		}
		
		/**增加引用计数--*/
		private static function addQuote(url:String):void{
			if(_quoteDic[url]){
				_quoteDic[url] = _quoteDic[url]+1;
			}else{
				_quoteDic[url] = 1;
			}
		}
		
		/**删除引用计数*/
		private static function delQuote(url:String):void{
			if(_quoteDic[url]){
				_quoteDic[url] -= 1;
				if(_quoteDic[url] <= 0 ){
					Loader.clearRes(url);
					delete _quoteDic[url];
				}
			}
		}
		
		/**根据组名获取资源列表
		 * @param group 组名，潜规则由类名担当
		 * @param quote 使用需要建立引用。
		 * */
		private static function getUrlList(group:String, quote:Boolean = false):Array{
			var arr:Array = _configData[group];
			if(arr){
				for(var i:String in arr){
					if(arr[i] is String){
						arr[i] ={url:PRE_URL+arr[i], type: getTypeFromUrl(arr[i]), size: 1, priority: 1};
					}
					//建立引用计数=====================================================
					if(quote){
						addQuote(arr[i].url);
					}
				}
			}
			return arr;
		}
		
		/**
		 * 获取指定资源地址的数据类型。
		 * @param	url 资源地址。
		 * @return 数据类型。
		 */
		private static var _extReg:RegExp =/*[STATIC SAFE]*/ /\.(\w+)\??/g;
		private static function getTypeFromUrl(url:String):String {
			_extReg.lastIndex = url.lastIndexOf(".");
			var result:Array = _extReg.exec(url);
			if (result && result.length > 1) {
				var type:String = Loader.typeMap[result[1].toLowerCase()];
				if(url.indexOf(ATLAS_URL) > -1 && type== Loader.JSON){
					type = Loader.ATLAS;
				}
				return type;
			}
			trace("Not recognize the resources suffix", url);
			return "text";
		}
	}
}
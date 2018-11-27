/**
* name 
*/
import HttpRequest = Laya.HttpRequest;
module xframe{
	export class HttpCmd{
		/**host*/
		public static httpRoot:string = "http://127.0.0.1/amfphp/Amfphp/?contentType=application/json";

		/**
		 * 发送http请求
		 * @param handler 请求回调；
		 * @param srvArgs 参数；
		*/
		public static callServer(handler:Handler, srvArgs:any):void{
			var xhr:HttpRequest = Laya.Pool.getItem("HttpRequest");
			if(!xhr){
				xhr = new HttpRequest();
			}
			xhr.http.timeout = 10000;//设置超时时间；
			xhr.once(Laya.Event.COMPLETE,null,completeHandler);
			xhr.once(Laya.Event.ERROR,null,errorHandler);

			//数据拼接
			xhr.send(HttpCmd.httpRoot,JSON.stringify(srvArgs),"post","json");
			
			function completeHandler(data:Object):void{
				handler && handler.runWith(data)
				recover();
			}

			function errorHandler(data:Object,e:Event):void{
				//需要一些特殊的处理
				handler && handler.runWith(data)
				recover();
			}
			
			function recover():void{
				xhr.off(Laya.Event.COMPLETE,null,completeHandler);
				xhr.off(Laya.Event.ERROR,null,errorHandler);
				Laya.Pool.recover("HttpRequest", xhr)
			}
		}
	}
}
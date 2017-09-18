package xiaohuzi999.xframe.net.socket
{
	
	import laya.events.Event;
	import laya.net.Socket;
	import laya.utils.Byte;
	
	import xiaohuzi999.xframe.frame.XEvent;

	/**
	 * XSocket 长链接 
	 * @author zhangmeng
	 * 
	 */	
	public class XSocket
	{
		/**单例*/
		private static var _instance:XSocket;
		/***/
		private var _socket:Socket;
		/**数据*/
		private var _messageByt:Byte;
		/**包装工具*/
		private var _packer:MsgPackTool;
		/**消息队列*/
		private var msgAr:Array = [];
		/**主机ip*/
		public var host:String = "10.8.189.14";  //褚继伟
		/**端口 */		
		public var port:int = 9011;
		public function XSocket()
		{
			init();
		}
		
		/**
		 * 链接服务器
		 * @param host
		 * @param port
		 * */
		public function connect(host:String, port:int):void{
			this.host = host;
			this.port = port;
			_socket.connect(host,port);
		}
		
		/**
		 * 向后端发送数据 
		 * @param _commandId
		 * @param value
		 */	
		public function sendData(_commandId:uint,value:Array):void{
			if(!_socket.connected)  //服务器未正常连接 ，请求数据等连接后再发出
			{
				msgAr.push([_commandId,value]);
				return ;
			}
			
			var arr:Array=new Array();
			arr.push(_commandId);
			if(value!=null){
				arr=arr.concat(value);
			}
			var byte:Byte=_packer.EncodeByt(arr);
			trace("send data:",arr);
			this._socket.send(byte.buffer);
		}
		
		private function init():void{
			_messageByt = new Byte();
			_packer = new MsgPackTool();
			_socket = new Socket();
			_socket.endian=Socket.BIG_ENDIAN;
			_socket.on(Event.OPEN,this,socketConnetHandler);
			_socket.on(Event.CLOSE,this,socketCloseHandler);
			_socket.on(Event.MESSAGE,this,socketMsgHandler);
			_socket.on(Event.ERROR,this,socketErrorHandler);
		}
		
		
		/**
		 * socket链接成功 
		 * @param e
		 */		
		private function socketConnetHandler(e:*=null):void{
			trace("socket  connet  succese!");
			while(msgAr.length){
				var m:Array = msgAr.shift();
				sendData(m[0],m[1]);
			}
		}
		/**
		 * socket关闭 
		 * @param e
		 * 
		 */		
		private function socketCloseHandler(e:*=null):void{
			trace("socket  connet  close!");
		}
		/**
		 * 收到socket数据 
		 * @param msg
		 */		
		private function socketMsgHandler(msg:*=null):void{
			_messageByt.clear();
			_messageByt.writeArrayBuffer(msg);
			var msg:Object = _packer.parseNetData(_messageByt);
			XEvent.instance.event(msg[0], msg);
			trace("socket message back: id:",msg[0]," data:",msg)
		}
		/**
		 * socket发生错误 
		 * @param e
		 */		
		private function socketErrorHandler(e:*=null):void{
			trace("socket  connet  error!");
		}
		
		/***/
		public static function get instance():XSocket{
			if(!_instance){
				_instance=new XSocket();
			}
			return _instance;
		}
	}
}


import laya.utils.Byte;
class MsgPackTool
{
	public function MsgPackTool()
	{
	}
	
	/**
	 * 对象写入二进制 
	 * @param value
	 * @return 
	 */		
	public function EncodeByt(value:Object):Byte{
		var data:Uint8Array=new Uint8Array(__JS__("encodeByt(value)"));
		var byt:Byte=new Byte(data.buffer);
		return byt;
	}
	
	/**
	 * 二进制读取对象
	 * @param value
	 * @return 
	 */		
	public function DecodeByt(value:Byte):Object{
		var buff:Uint8Array=new Uint8Array(value.buffer);
		var obj:Array=__JS__("decodeByt(buff)");
		return obj;	
	}
	
	/**
	 * 解析socket缓存二进制数据 
	 */		
	public function parseNetData(bytDataBuff:Byte):Object{
		bytDataBuff.pos=0;
		var decodeByt:Byte=new Byte();
		decodeByt.writeArrayBuffer(bytDataBuff.buffer, bytDataBuff.pos, bytDataBuff.bytesAvailable);
		decodeByt.pos=0;
		return DecodeByt(decodeByt);
	}
}
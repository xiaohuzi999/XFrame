package game.net.pack
{
	import game.global.GameSetting;
	
	import laya.resource.IDispose;
	import laya.utils.Byte;

	/**
	 * 游戏内解析包数据管理器 
	 * @author zhangmeng
	 * 
	 */	
	public class MsgBodyAnaly implements IDispose
	{
		
		private static var _instance:MsgBodyAnaly;
		public static function get instance():MsgBodyAnaly{
			if(!_instance){
				_instance=new MsgBodyAnaly();
			}
			return _instance;
		}
		
		public var analyData:Object;
		/**
		 *游戏cookie 
		 */		
		public var cookie:String="####1.0.0#0";
		
		private var encryptKey:String="FFIYD#^3LB954JB90fzj*(d)sO7";
		//当前的发送消息序列号
		private var _curSendIndex:int=-1;
		
		public function MsgBodyAnaly()
		{
		}
		//解析cookie
		public function parseCookie(_time:String,_roleID:String,_account:String,_version:String="1.0.0"):void{
			var _key:String=encryptKey+_roleID+_time;
			var _md5:String=__JS__("MD5Compress(_key)");
			var _encryptData:String=_md5+"#"+_time+"#"+_roleID+"#"+_account+"#"+_version+"#"+_curSendIndex+"#1"+"#"+GameSetting.Login_UDID;
//			var _encryptData:String=_md5+"#"+_time+"#"+_roleID+"#"+_account+"#"+_version+"#"+_curSendIndex+"#1";
			cookie=_encryptData;
		}
		/**
		 * 客户端封包 (注意数组发送格式如:[协议数据1,协议数据2,....,[[数组子项数据,数组子项数据],[数组子项数据,数组子项数据].....]])
		 * @return 
		 */		
		public function analyClient(commandId:int,_data:Array):Byte{
			var _write:MessageWrite=new MessageWrite();
			_write.writeString(cookie);
			_write.writeShort(commandId);
			var _arrData:Array=this.analyData[commandId];
			if(_arrData && _arrData.length>0){
				writeByt(_arrData,_data,_write);
			}
			return _write.writeByt;
		}
		//写入数据
		private function writeByt(value:Array,_data:Array,_write:MessageWrite):void{
			for(var a:* in value){
				var _itemData:*=_data[a];
				if(value[a].indexOf("7/")!=-1){
					_write.writeShort(_itemData.length);
					var _arrData:Array=this.analyData[String(value[a]).split("7/")[1]];
					if(_arrData){
						for(var xm:* in _itemData){
							writeByt(_arrData,_itemData[xm],_write);
						}
					}
				}else{
					if(value[a]=="1"){
						_write.writeInt(_itemData);
					}else if(value[a]=="2"){
						_write.writeShort(_itemData);
					}else if(value[a]=="3"){
						_write.writeString(_itemData);
					}else if(value[a]=="4" || value[a]=="5" || value[a]=="6"){
						_write.writeShort(_itemData.length);
						for(var n:* in _itemData){
							if(value[a]=="4"){
								_write.writeInt(_itemData[n]);
							}else if(value[a]=="5"){
								_write.writeShort(_itemData[n]);
							}else if(value[a]=="6"){
								_write.writeString(_itemData[n]);
							}
						}
					}
				}
			}
		}
		/**
		 * 解析后端的二进制数据 
		 * @param byt
		 * @return 
		 * 
		 */		
		public function analyServer(byt:Byte):Array{
			var _read:MessageReader=new MessageReader();
			var _msgID:int=_read.ReadShort(byt);
			var _arr:Array=[_msgID];
			var _dataArr:Array=this.analyData[_msgID];
			if(_dataArr && _dataArr.length>0){
				_arr=_arr.concat(this.readByt(_dataArr,byt,_read));
			}
			return _arr;
		}
		//解析后端发送的cookie数据
		public function analyCookie(value:String=""):void{
			var _arr:Array=value.split("#");
			var _time:String=_arr[0];
			var _roleID:String=_arr[1];
			var _accout:String=_arr[2];
			var _index:int=_arr[3];
			_curSendIndex=_index;
			_curSendIndex++;
			trace("游戏cookie:"+value)
			parseCookie(_time,_roleID,_accout);
		}
		/**
		 * 读取二进制数据 
		 * @param value
		 * @param _byt
		 * @param _read
		 * 
		 */ 		
		private function readByt(value:Array,_byt:Byte,_read:MessageReader):Array{
			var _arr:Array=[];
			for(var a:* in value){
				if(value[a].indexOf("7/")!=-1){
					var _len:int=_read.ReadShort(_byt);
					var _arrData:Array=this.analyData[String(value[a]).split("7/")[1]];
					var _dataArr:Array=[];
					if(_arrData && _len>0){
						for(var m:int=0;m<_len;m++){
							//var analyItemMsgId:int=_read.ReadShort(_byt);
							_dataArr.push(readByt(_arrData,_byt,_read));
						}
					}
					_arr.push(_dataArr);
				}else{
					if(value[a]=="1"){
						_arr.push(_read.ReadInt(_byt));
					}else if(value[a]=="2"){
						_arr.push(_read.ReadShort(_byt));
					}else if(value[a]=="3"){
						_arr.push(_read.ReadString(_byt));
					}else if(value[a]=="4" || value[a]=="5" || value[a]=="6"){
						var _itemLen:int=_read.ReadShort(_byt);
						var _itemArr:Array=[];
						for(var n:int=0;n<_itemLen;n++){
							if(value[a]=="4"){
								_itemArr.push(_read.ReadInt(_byt));
							}else if(value[a]=="5"){
								_itemArr.push(_read.ReadShort(_byt));
							}else if(value[a]=="6"){
								_itemArr.push(_read.ReadString(_byt));
							}
						}
						_arr.push(_itemArr);
					}
				}
			}
			return _arr;
		}
		
		public function dispose():void
		{
		}
	}
}
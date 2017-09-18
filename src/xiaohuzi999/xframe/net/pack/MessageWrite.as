package game.net.pack
{
	import game.global.GameInterface.IGameDispose;
	
	import laya.utils.Byte;

	/**
	 * 二进制写入入口文件 
	 * @author zhangmeng
	 * 
	 */	
	public class MessageWrite implements IGameDispose
	{
		
		public var writeByt:Byte;
		
		public function MessageWrite()
		{
			writeByt=new Byte();
		}
		
		public function writeByte():void{
		}
		/**
		 * 写入一个short类型数据 
		 * @param value
		 * 
		 */		
		public function writeShort(value:int):void{
			writeByt.writeByte(value >> 8);
			writeByt.writeByte(value);
			/*var _uint8Arr:Uint8Array=new Uint8Array(writeByt.buffer);
			_uint8Arr[writeByt.pos]=value>>8;
			_uint8Arr[writeByt.pos+1]=value;
			writeByt=new Byte(_uint8Arr.buffer);
			writeByt.pos+=2;*/
		}
		/**
		 * 写入一个int值 
		 * @param value
		 * 
		 */		
		public function writeInt(value:int):void{
			writeByt.writeByte(value >> 24);
			writeByt.writeByte(value >> 16);
			writeByt.writeByte(value >> 8);
			writeByt.writeByte(value);
			/*var _uint8Arr:Uint8Array=new Uint8Array(writeByt.buffer);
			_uint8Arr[writeByt.pos]=value >> 24;
			_uint8Arr[writeByt.pos+1]=value >> 16;
			_uint8Arr[writeByt.pos+1]=value >> 8;
			_uint8Arr[writeByt.pos+1]=value;
			writeByt=new Byte(_uint8Arr.buffer);
			writeByt.pos+=4;*/
		}
		/**
		 * 写入字符串 
		 * @param value
		 * 
		 */		
		public function writeString(value:String):void{
			var _len:int=value.length;
			if(_len==0){
				writeShort(0);
				return;
			}
			var _lenByt:Byte=new Byte();
			_lenByt.writeUTFBytes(value);
			writeShort(_lenByt.length);
			writeByt.writeUTFBytes(value);
		}
		
		public function dispose():void
		{
			
		}
	}
}
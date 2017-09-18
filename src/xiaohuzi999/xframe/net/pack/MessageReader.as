package game.net.pack
{
	import game.global.GameInterface.IGameDispose;
	
	import laya.utils.Byte;

	/**
	 * 二进制读取入口 
	 * @author zhangmeng
	 * 
	 */	
	public class MessageReader implements IGameDispose
	{
		public function MessageReader()
		{
			
		}
		//读取一个short类型数据
		public function ReadShort(value:Byte):int{
			var _array:Uint8Array=new Uint8Array(value.buffer);
			var _index1:int=_array[value.pos]<<8;
			var _index2:int=_array[value.pos+1];
			var _index3:int=_index1|_index2;
			value.pos+=2;
			return _index3;
		}
		/**
		 * 读取int值 
		 * @param value
		 * @return 
		 * 
		 */		
		public function ReadInt(value:Byte):int{
			var _array:Uint8Array=new Uint8Array(value.buffer);
			var _data:int=(_array[value.pos] << 24)
				| (_array[value.pos+1] << 16)
				| (_array[value.pos+2] << 8)
				| (_array[value.pos+3]);
			value.pos+=4;
			return _data;
		}
		/**
		 * 读取一个字节 
		 * @param value
		 * @return 
		 * 
		 */		
		public function ReadByte(value:Byte):int{
			return value.getByte();
		}
		/**
		 * 读取字符串 
		 * @param value
		 * @return 
		 * 
		 */		
		public function ReadString(value:Byte):String{
			var _short:int=ReadShort(value);
			if(_short==0){
				return "";
			}
			return value.getUTFBytes(_short);
		}
		
		/**
		 * 读取一段字节 
		 * @param value
		 * @param len
		 * @return 
		 * 
		 */		
		public function ReadBytes(value:Byte,len:int):Byte{
			var _buffer1:ArrayBuffer=value.buffer.slice(value.pos,len);
			var _byt:Byte=new Byte(_buffer1);
			return _byt;
		}
		
		public function dispose():void
		{
			
		}
	}
}
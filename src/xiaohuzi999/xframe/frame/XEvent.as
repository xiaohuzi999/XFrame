package xiaohuzi999.xframe.frame
{
	import laya.events.EventDispatcher;
	
	/**
	 * XEvent
	 * author:huhaiming
	 * XDispatcher.as 2017-9-4 下午12:24:27
	 * version 1.0
	 *
	 */
	public class XEvent extends EventDispatcher
	{
		/**事件-模块关闭*/
		public static const CLOSE:String = "close";
		/***/
		private static var _instance:XEvent;
		public function XEvent()
		{
			super();
		}
		
		/***/
		public static function get instance():XEvent{
			if(!_instance){
				_instance = new XEvent();
			}
			return _instance;
		}
	}
}
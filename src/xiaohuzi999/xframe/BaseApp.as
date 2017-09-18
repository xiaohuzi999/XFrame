package xiaohuzi999.xframe
{
	
	import xiaohuzi999.xframe.frame.XEvent;
	import xiaohuzi999.xframe.interfaces.IApp;
	import xiaohuzi999.xframe.net.socket.XSocket;
	
	/**
	 * BaseApp
	 * author:huhaiming
	 * BaseApp.as 2017-9-4 上午10:15:21
	 * version 1.0
	 *
	 */
	public class BaseApp implements IApp
	{
		public function BaseApp()
		{
		}
		
		public function start():void
		{
			/*XSocket.instance.connect(XSocket.instance.host, XSocket.instance.port);
			XSocket.instance.sendData(10100,['k999']);*/
			XFacade.instance.showModule(TestView);
		}
	}
}
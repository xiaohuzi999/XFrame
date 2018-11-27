/**
* name 
*/
class XEvent extends Laya.EventDispatcher{
	/**事件-关闭 */
	public static readonly CLOSE:string = "close";

	//单例
	private static _instance:XEvent;

	constructor(){
		super();
	}
	
	/**单例 */
	public static get instance():XEvent{
		if(!XEvent._instance){
			XEvent._instance = new XEvent();
		}
		return XEvent._instance;
	}
}

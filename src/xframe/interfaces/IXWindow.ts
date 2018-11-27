
/** */
interface IXWindow extends Laya.Sprite{
	/**
	 * 显示处理逻辑,每次打开界面会调用
	 * @param args 接受任意类型参数
	 */
	show(...args):void;
	
	/**关闭 */
	close():void;
		
	/**自适应方法,窗口大小变化时供底层调用,在UI需要自动布局是需要*/
	onStageResize():void;
	
	/**设置层级,层级定义在LayerManager中*/
	layer:number;
	
	/**设置对齐方式*/
	align:number;
	
	/**设置是否自动销毁*/
	autoDispose:boolean;
}

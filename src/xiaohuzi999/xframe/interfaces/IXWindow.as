package xiaohuzi999.xframe.interfaces
{
	public interface IXWindow
	{
		/**
		 * 显示处理逻辑,每次打开界面会调用
		 * @param args 接受任意类型参数
		 */
		function show(...args):void;
		
		/**关闭 */
		function close():void;
		
		/**销毁对象,供底层调用*/	
		function dispose():void;
			
		/**自适应方法,窗口大小变化时供底层调用,在UI需要自动布局是需要*/
		function onStageResize():void;
		
		/**设置层级,层级定义在LayerManager中*/
		function set layer(v:int):void;
		/**获取层级,层级定义在LayerManager中*/
		function get layer():int;
		
		/**设置对齐方式*/
		function set align(v:int):void
		/**获取对齐方式*/
		function get align():int;
		
		/**设置是否自动销毁*/
		function set autoDispose(b:Boolean):void;
		/**获取是否自动销毁*/
		function get autoDispose():Boolean;
	}
}
package xiaohuzi999.xframe.utils
{
	import laya.ui.Component;
	import laya.utils.Ease;
	import laya.utils.Handler;
	import laya.utils.Tween;

	/**
	 * AnimationUtil 简单动画包装类
	 * author:huhaiming
	 * AnimationUtil.as 2017-3-17 下午12:09:37
	 * version 1.0
	 *
	 */
	public class AniUtil
	{
		public function AniUtil()
		{
		}
		
		/**
		 * 动画效果-入场，从下到当前位置，alpha从0到1
		 * @param dis 动画对象
		 * @param time 动画时间
		 * @param distance 移动距离
		 */
		public static function flowIn(dis:Component, time:Number = 200, distance:Number = 200):void{
			//dis.alpha = 0;
			var tarY:Number = dis.y
			dis.y = dis.y + distance;
			Tween.clearTween(dis);
			Tween.to(dis, {alpha:1, y:tarY}, time);
		}
		
		/**
		 * 动画效果-出场，从当前位置往上，alpha从0到1
		 * @param dis 动画对象
		 * @param time 动画时间
		 * @param distance 移动距离
		 * @param funTarget 函数回调对象
		 */
		public static function flowOut(target:Component,callback:Function,time:Number = 150, distance:Number = 200,funTarget:*=null):void{
			var tarY:Number = target.y - distance
			//Tween.to(target, {alpha:0.5, y:tarY}, time, null,Handler.create(null, onflowOut,[target,callback, funTarget]));
			Tween.to(target, {alpha:0.5, y:tarY}, time, null,Handler.create(target, callback));
			
			function onflowOut(target:Component, callback:Function, funTarget:*=null):void{
				target.alpha = 1;
				callback.apply((funTarget || target), null);
			}
		}
		
		
		/**
		 * 动画效果-出场2，从当前位置往下，alpha从0到1
		 * @param dis 动画对象
		 * @param time 动画时间
		 * @param distance 移动距离
		 * @param funTarget 函数回调对象
		 */
		public static function flowBack(target:Component,callback:Function,time:Number = 150, distance:Number = 200,funTarget:*=null):void{
			var tarY:Number = target.y + distance
			Tween.to(target, {alpha:0, y:tarY}, time, null,Handler.create(null, onflowOut,[target,callback, funTarget]));
			
			function onflowOut(target:Component, callback:Function, funTarget:*=null):void{
				target.alpha = 1;
				callback.apply((funTarget || target), null);
			}
		}
		
		
		/**
		 * 动画效果-入场，弹出一个窗口,注意，只有没设置中心点或者中心点坐标为(0,0)可用
		 * @param dis 动画对象
		 * @param time 动画时间
		 * @param distance 移动距离
		 */
		public static function popIn(dis:Component, time:Number = 200, distance:Number = 200):void{
			Tween.clearTween(dis);
			dis.anchorX = 0.5;
			dis.anchorY = 0.5;
			dis.x += dis.width*0.5;
			dis.y += dis.height*0.5;
			dis.scale(0.5,0.5);
			
			Tween.to(dis,{scaleX:1,scaleY:1,ease:Ease.backOut},300,null,Handler.create(null, onPopIn));
			
			function onPopIn():void{
				dis.anchorX = 0;
				dis.anchorY = 0;
				dis.scaleX = dis.scaleY = 1;
				dis.x -= dis.width*0.5;
				dis.y -= dis.height*0.5;
			}
		}
		
		/**
		 * 动画效果-出场，从当前位置往上，alpha从1到0
		 * @param target 动画对象 && 回调对象，
		 * @param callback 回调函数
		 * @param time 动画时间
		 * @param distance 移动距离
		 * @param funTarget 函数回调对象
		 */
		public static function popOut(target:Component,callback:Function,time:Number = 150, distance:Number = 200,funTarget:*=null):void{
			Tween.clearTween(target);
			target.anchorX = 0.5;
			target.anchorY = 0.5;
			target.x += target.width*0.5;
			target.y += target.height*0.5;
			
			Tween.to(target, {scaleX:0.5, scaleY:0.5}, time, null,Handler.create(null, onPopOut));
			
			function onPopOut():void{
				target.anchorX = 0;
				target.anchorY = 0;
				target.scaleX = target.scaleY = 1;
				target.x -= target.width*0.5;
				target.y -= target.height*0.5;
				callback.apply(funTarget||target, null);
			}
		}
	}
}
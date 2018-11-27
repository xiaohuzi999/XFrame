/**
* name 
*/
module xframe{
	export class AniUtil{
		/**
		 * 动画效果-入场，从下到当前位置，alpha从0到1
		 * @param target 动画对象
		 * @param time 动画时间
		 * @param distance 移动距离
		 */
		public static  flowIn(target:Laya.Component, time:number = 200, distance:number = 200):void{
			Laya.Tween.from(target, {alpha:0.5, y:target.y + distance}, time);
		}
		
		/**
		 * 动画效果-出场，从当前位置往上，alpha从0到1
		 * @param target 动画对象
		 * @param callback 动画结束回调
		 * @param time 动画时间
		 * @param distance 移动距离
		 */
		public static flowOut(target:Laya.Component,callback:Handler, time:number = 150, distance:number = 200):void{
			Laya.Tween.to(target, {alpha:0, y:target.y - distance}, time, null,Handler.create(null, ()=>{
				target.alpha = 1;
				callback.run();
			}));
		}
		
		
		/**
		 * 动画效果-出场2，从当前位置往下，alpha从0到1
		 * @param target 动画对象
		 * @param callback 动画结束回调
		 * @param time 动画时间
		 * @param distance 移动距离
		 */
		public static flowBack(target:Laya.Component,callback:Handler,time:number = 150, distance:number = 200):void{
			Laya.Tween.to(target, {alpha:0, y:target.y + distance}, time, null,Handler.create(null, ()=>{
				target.alpha = 1;
				callback.run();
			}));
		}
		
		
		/**
		 * 动画效果-入场，弹出一个窗口,注意，只有没设置中心点或中心点坐标为(0,0)或中心坐标居中可用
		 * @param target 动画对象
		 * @param time 动画时间
		 * @param distance 移动距离
		 */
		public static popIn(target:Laya.Component, time:number = 200, distance:number = 200):void{
			Laya.Tween.clearTween(target);
			if(target.anchorX != 0.5){
				target.anchorX = target.anchorY = 0.5;
				target.x += target.width*0.5;
				target.y += target.height*0.5;
			}
			target.scale(0.5,0.5);
			
			Laya.Tween.to(target,{scaleX:1,scaleY:1,ease:Laya.Ease.backOut},300,null,Handler.create(null, ()=>{
				target.anchorX = target.anchorY = 0;
				target.scaleX = target.scaleY = 1;
				target.x -= target.width*0.5;
				target.y -= target.height*0.5;
			}));
		}
		
		/**
		 * 动画效果-出场，从当前位置往上，alpha从1到0
		 * @param target 动画对象
		 * @param callback 动画结束回调
		 * @param time 动画时间
		 * @param distance 移动距离
		 */
		public static popOut(target:Laya.Component,callback:Handler,time:number = 150, distance:number = 200):void{
			Laya.Tween.clearTween(target);
			target.anchorX = 0.5;
			target.anchorY = 0.5;
			target.x += target.width*0.5;
			target.y += target.height*0.5;
			
			Laya.Tween.to(target, {scaleX:0.5, scaleY:0.5}, time, null,Handler.create(null, ()=>{
				target.anchorX = 0;
				target.anchorY = 0;
				target.scaleX = target.scaleY = 1;
				target.x -= target.width*0.5;
				target.y -= target.height*0.5;
				callback.run();
			}));
		}
	}
}
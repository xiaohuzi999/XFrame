package xiaohuzi999.xframe.utils
{
	
	import laya.display.Animation;
	import laya.display.Graphics;
	import laya.display.Sprite;
	import laya.events.Event;
	import laya.filters.ColorFilter;
	import laya.maths.Point;
	import laya.utils.Handler;
	import laya.utils.Tween;

	/**
	 * XUtils
	 * author:huhaiming
	 * XUtils.as 2017-3-8 上午10:34:06
	 * version 1.0
	 *
	 */
	public class XUtils
	{	
		/**显示黑色滤镜*/
		public static var blackFilter:ColorFilter = new ColorFilter([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.78, 0]);
		/**显示黑色滤镜2,透明度不一样*/
		public static var blackFilter2:ColorFilter = new ColorFilter([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 0]);
		public function XUtils()
		{
		}
		
		
		/**
		 * 判定两个点是否相等
		 * @param p1 
		 * @param p2
		 * */
		public static function pointEquil(p1:Point, p2:Point):Boolean{
			return p1 && p2 && p1.x == p2.x && p1.y == p2.y;
		}
		
		/**判定一个对象是否有对象（主要是Object和数组）*/
		public static function isEmpty(obj:Object):Boolean{
			for(var i:String in obj){
				return false;
			}
			return true;
		}
		
		/**
		 * 文字跳动简单效果
		 */
		public static function showTxtEffect(txt:*, num:Number):void{
			var cur:Number = parseInt(txt.text);
			var del:Number = Math.floor((num - cur)/5)//5为显示步长，magic value
			var index:int = 0;
			Laya.timer.loop(60, null, onUpdate);
			
			function onUpdate():void{
				index ++;
				cur += del;
				if(index >= 5){
					cur = num;
					Laya.timer.clear(null, onUpdate);
				}
				txt.text = cur+"";
			}
		}
		
		/**颜色切换*/
		private static const COLORS:Array = ["#69ff4c","#FFFFFF"];
		public static function showTxtFlash(tf:*):void{
			var orColor:String = tf.color;
			tf.color = COLORS[0];
			Tween.to(tf,{},10,null, Handler.create(null, step1), 50);
			
			function step1():void{
				tf.color = COLORS[1];
				Tween.to(tf,{},10,null, Handler.create(null, step2), 50);
			}
			function step2():void{
				tf.color = COLORS[0];
				Tween.to(tf,{},10,null, Handler.create(null, step3), 50);
			}
			function step3():void{
				tf.color = COLORS[1];
				Tween.to(tf,{},10,null, Handler.create(null, step4), 50);
			}
			
			function step4():void{
				tf.color = COLORS[0];
				Tween.to(tf,{},10,null, Handler.create(null, step5), 50);
			}
			function step5():void{
				tf.color = COLORS[1];
				Tween.to(tf,{},10,null, Handler.create(null, finish), 50);
			}
			
			function finish():void{
				tf.color = orColor;
			}
		}
		
		/**
		 * 克隆一个简单value类型 Object
		 */
		public static function copyObj(targetObj:Object):Object{
			var tmp:Object = {};
			for(var i:String in targetObj){
				tmp[i] = targetObj[i]
			}
			return tmp;
		}
		
		/**
		 * 判断鼠标是否点中
		 * @param dis 目标对象
		 * */
		public static function checkHit(dis:Sprite):Boolean{
			return dis.visible && dis.mouseX > 0 && dis.mouseY > 0 && dis.mouseX <= dis.width && dis.mouseY <= dis.height;
		}
		
		
		/**
		 * 保留小数位
		 * @param num 需要转换的数字
		 * @param decimalNum 保留小数位
		 * */
		public static function toFixed(num:*, decimalNum:int = 1):String{
			if((num+"").indexOf(".") != -1){
				var str:String = parseFloat(num).toFixed(decimalNum);
				if(decimalNum == 1 && str.charAt(str.length-1) == "0"){
					str = parseInt(str)+"";
				}
				return str;
			}
			return num+"";
		}
		
		
		/**
		 * 动画自动回收
		 * 
		 */
		public static function autoRecyle(ani:Animation):void{
			ani.on(Event.COMPLETE, null, onComplete,[ani]);
			if(!ani.isPlaying){
				ani.play(1, false);
			}
			
			function onComplete(ani:Animation):void{
				ani.off(Event.COMPLETE, null, onComplete);
				ani.stop();
				ani.removeSelf();
			}
		}
		
		/**画椭圆*/
		public static function createEllipse(sp:Graphics,x,y,a,b, stepScale:int=1,color='#ffffff'):Array{
			var points:Array = [];
			var step:Number = (a > b) ? stepScale / a : stepScale / b
			
			//step是等于1除以长轴值a和b中的较大者
			
			//i每次循环增加1/step，表示度数的增加
			
			//这样可以使得每次循环所绘制的路径（弧线）接近1像素
			
			for (var i:int = 0; i < 2 * Math.PI; i += step)
				
			{
				
				//x²/a²+y²/b²=1 (a>b>0)
				
				//参数方程为x = a * cos(i), y = b * sin(i)，
				
				//参数为i，表示度数（弧度）
				
				//var point=new Point(x+a*Math.cos(i),y+b*Math.sin(i));
				
				//points.push(point);
				points.push(x+a*Math.cos(i) - a/2,y+b*Math.sin(i));
				
			}
			sp && sp.drawPoly(points.shift(),points.shift(),points,color);
			//trace("points---------------->>",points);
			return points;
		}
	}
}
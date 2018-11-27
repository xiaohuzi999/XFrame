/**
* name 
*/
module xframe{
	export function trace(...args):void{
		console.log.apply(null, args);
	}

	export class XUtils{
		constructor(){

		}

		/**
		 * 判定一个对象是否有对象（主要是Object和数组）
		 * @param obj 需要判定的对象
		 * @return Boolean
		 */
		public static isEmpty(obj:any):boolean{
			for(var i in obj){
				return false;
			}
			return true;
		}

		/**
		 * 删除数组某个元素
		 * @param src 原数组
		 * @param item 需要删除的数据;
		 */
		public static delArrItem(src:any[], item:any):void{
			let index = src.indexOf(item);
			if(index > -1){
				src.splice(index, 1);
			}
		}
		
		/**
		 * 数字跳动效果
		 * @param curNum 当前值
		 * @param targetNum 目标值
		 * @param updateHandler 数字更新Handler，相关函数接受一个数值型参数
		 * @param step 跳动多少次
		 */
		public static showTxtEffect(curNum:number, targetNum:number, updateHandler:Handler, step:number=5):void{
			var del:number = Math.floor((targetNum - curNum)/step)
			var index:number = 0;
			updateHandler.once = false;
			Laya.timer.loop(60, null, onUpdate);
			
			function onUpdate():void{
				index ++;
				curNum += del;
				if(index >= step){
					curNum = targetNum;
					Laya.timer.clear(null, onUpdate);
					updateHandler.runWith(curNum);
					updateHandler.recover();
				}else{
					updateHandler.runWith(curNum);
				}
			}
		}
		
		/**
		 * 克隆一个对象
		 * @param srcObj 需要克隆的对象
		 * @return 一个新对象;
		 */
		public static clone(srcObj:any[]|{}):any{
			if(srcObj instanceof Array){
				return [...srcObj];
			}
			return {...srcObj};
		}
		
		/**
		 * 判断鼠标是否点中
		 * @param dis 目标对象
		 * */
		public static checkHit(dis:Laya.Sprite):boolean{
			return dis.visible && dis.mouseX > 0 && dis.mouseY > 0 && dis.mouseX <= dis.width && dis.mouseY <= dis.height;
		}

		/**
		 * 数组随机排序
		 * @param arr 源数组
		 * @return 新数组
		 * 
		*/
		public static randomArr(arr:any[]):any[]
		{
			let outputArr:any[] = arr.slice();
			let i:number = outputArr.length;
			let temp:any;
			let indexA:number;
			let indexB:number;
			
			while (i)
			{
				indexA = i-1;
				indexB = Math.floor(Math.random() * i);
				i--;
				
				if (indexA == indexB) continue;
				temp = outputArr[indexA];
				outputArr[indexA] = outputArr[indexB];
				outputArr[indexB] = temp;
			}

			return outputArr;
		}

		/**随机从数组中取出一个值 */
		public static arrRandomValue(arr:any[]):any{
			if(arr){
				return arr[Math.floor(Math.random()*arr.length)];
			}
			return null;
		}
		
		
		/**
		 * 画椭圆
		 * @param sp 绘图Graphics
		 * @param x 起始点x
		 * @param y 起始点y
		 * @param a 长轴
		 * @param b 短轴
		 * @param stepScale 比例 
		 * @param color 填充颜色
		*/
		public static drawEllipse(sp:Laya.Graphics,x:number,y:number,a:number,b:number, stepScale:number=1,color='#ffffff'):any[]{
			var points:any[] = [];
			var step:number = (a > b) ? stepScale / a : stepScale / b
			
			//step是等于1除以长轴值a和b中的较大者
			
			//i每次循环增加1/step，表示度数的增加
			
			//这样可以使得每次循环所绘制的路径（弧线）接近1像素
			
			for (var i = 0; i < 2 * Math.PI; i += step)
				
			{
				
				//x²/a²+y²/b²=1 (a>b>0)
				
				//参数方程为x = a * cos(i), y = b * sin(i)，
				
				//参数为i，表示度数（弧度）
				
				//var point=new Point(x+a*Math.cos(i),y+b*Math.sin(i));
				
				//points.push(point);
				points.push(x+a*Math.cos(i) - a/2,y+b*Math.sin(i));
				
			}
			sp && sp.drawPoly(points.shift(),points.shift(),points,color);
			return points;
		}
	}
}
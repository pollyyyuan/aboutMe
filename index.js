//滑动对象
var Fullpage=(function(){
	function Fullpage(contain,dots){
		this.contain=contain;
		this.pageArr=this.contain.querySelectorAll('.page');
		this.dots=dots;
		this.lastIndex=0;
		this.pageHeight=this.contain.offsetHeight*0.8;
		console.log(this.pageHeight);
	}
	Fullpage.prototype={
		init:function(dom){
			var me=this;
			//页面的个数
			me.pageNum=me.pageArr.length;
			console.log(me.pageNum);
			me.main=new Main(me.contain.parentNode);
			me.initDot();
			//初始化方法
			me.initEvent();
		},
		//初始化dot点,创建节点
		initDot:function(){
			var me=this;
			if(me.pageNum)
			{	
				var str='';
				//根据页面个数创建节点
				for(var i=0;i<me.pageNum;i++)
				{
					str+='<span class="dot" data-index='+i+'></span>';
				}
				//节点加到页面上
				me.dots.innerHTML=str;
				//增加高亮效果
				me.dotArr=me.dots.querySelectorAll('.dot');
				me.dotArr[0].setAttribute('class','dot active');
			}
		},
		activeDot:function(){
			this.dots.querySelector('.active').setAttribute('class','dot');
			this.dotArr[this.lastIndex].setAttribute('class','dot active');
		},
		//绑定事件
		initEvent:function(){
			var me=this;
			// 节点点击事件
			for(var i=0;i<me.dotArr.length;i++){	
				me.dotArr[i].addEventListener('click',function(){
					//content
				});
			}
			var scrollFn=function(e){
			var delta,
   				e=e || window.event; 
   			if(e.wheelDelta){//IE/Opera/Chrome 
      			delta=e.wheelDelta>0?1:-1; 
   			}else if(e.detail){//Firefox 
      			delta=e.detail>0?1:-1; 
   			} 
   			var key=e.keyCode;
			console.log(key);
      		// 向上滚
   			if ((delta > 0||key==37||key==38)&&me.lastIndex>0) {
   				if(me.lastIndex==1){
   					me.main.bindUp();
     				me.dots.style.opacity=0;
      			}
      			me.lastIndex--;
      			console.log(me.lastIndex);
      			me.move(me.lastIndex);
      			me.activeDot();
   				} 
       			// 向下滚
   				else if ((delta < 0||key==39||key==40)&&me.lastIndex<me.pageNum-1) {
     				if(me.lastIndex==0){
     					me.main.bindDown();
     					me.dots.style.opacity=1;
     				}
     				me.lastIndex++;
     				console.log(me.lastIndex);
     				me.move(me.lastIndex);
     				me.activeDot();
   				}    
			}
			//滚轮事件
			if(document.addEventListener){ 
    			document.addEventListener('DOMMouseScroll',scrollFn,false); 
			}//W3C 
			window.onmousewheel=document.onmousewheel=scrollFn;
		},
		//页面移动动画
		move:function(index){
			console.log('move');
			this.contain.style.transform='translate(0,-'+index*this.pageHeight+'px)';	
		}
	}
	return Fullpage;
})();
var Main=(function(){
	function Main(contain){
		this.contain=contain;
		console.log(contain);
		this.logo=document.getElementById('logo');
	}
	Main.prototype={
		bindUp:function(){
			var me=this;
			me.contain.setAttribute('class','contain current');
			me.logo.setAttribute('class','logo down');
		},
		bindDown:function(){
			var me=this;
			me.contain.setAttribute('class','contain');
			me.logo.setAttribute('class','logo');

		}
	}
	return Main;
})()

//1.随机数函数
function rnd(n,m) {
	return parseInt(Math.random()*(m-n)+n);
};
//2.碰撞检测
function colltest(oDiv1,oDiv2) {
	var oDiv1L=oDiv1.offsetLeft;
	var oDiv1T=oDiv1.offsetTop;
	var oDiv1R=oDiv1L+oDiv1.offsetWidth;
	var oDiv1B=oDiv1T+oDiv1.offsetHeight;
	// document.title=oDiv1L+'|'+oDiv1T+'|'+oDiv1R+'|'+oDiv1B;
	var oDiv2L=oDiv2.offsetLeft;
	var oDiv2T=oDiv2.offsetTop;
	var oDiv2R=oDiv2L+oDiv2.offsetWidth;
	var oDiv2B=oDiv2T+oDiv2.offsetHeight;
	if (oDiv1L>=oDiv2R||oDiv1B<=oDiv2T||oDiv1R<=oDiv2L||oDiv1T>=oDiv2B) {
		return false;
	}else{
		return true;
	}
}
//3.obj自动移动
function autoMove(obj,dire,offset,met,ms) {
	clearInterval(clock);
	var clock=setInterval(function () {
		obj.style[dire] = obj[offset] + met + 'px';
	},ms)
}
//4.获取绝对距离
function getPos(obj) {
	var l=0;
	var t=0;
	while(obj){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return {left:l,top:t}
}
//5.获取非行间样式
function getStyle(obj,name){
	if(obj.currentStyle){
		return (obj.currentStyle[name]);
	}else{
		return (getComputedStyle(obj,false)[name]);
	}
}
//6.通过class获取元素
function getByClass(oParent,sClass){
	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);
	}else{
		var aEle = oParent.getElementsByTagName('*');
		var arr = [];
		for(var i = 0; i < aEle.length; i++){
			var tmp = aEle[i].className.split(' ');
			if(findInArr(sClass,tmp)){
				arr.push(aEle[i]);
			}
		}
		return arr;
	}
}
//7.设置样式
function setStyle(){
	// arguments
	var obj = arguments[0];
	if(arguments.length == 3){
		var name = arguments[1];
		var value = arguments[2];
		obj.style[name] = value;
	}else if(arguments.length == 2){
		var json = arguments[1];
		for(name in json){
			obj.style[name] = json[name];
		}
	}
}
//8.求和
function sum(){
	var res = 0;
	for(var i = 0; i < arguments.length; i++){
		res+=arguments[i];
	}
	return res;
}
//9.求字符串长度 type：1、gb2312   2、utf-8
function getByLen(str,type){
	var res = 0;
	for(var i = 0; i < str.length; i++){
		if(str.charCodeAt(i) >= '0x4e00' && str.charCodeAt(i) <= '0x9fa5'){
			if(type == 'utf-8'){
				res+=3;
			}else{
				res+=2;
			}
		}else{
			res+=1;
		}
	}
	return res;
}
//10.事件绑定
function addEvent(obj,sEv,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEv,fn,false);
	}else{
		obj.attachEvent('on'+sEv,fn);
	}
}
//11.事件解绑定
function removeEvent(obj,sEv,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(sEv,fn,false);
	}else{
		obj.detachEvent('on'+sEv,fn);
	}
}
//12.拖拽封装
function drag(obj){
	var z=1;
	obj.onmousedown = function(ev){
		var oEvent = ev || event;
		var disX = oEvent.clientX - obj.offsetLeft;
		var disY = oEvent.clientY - obj.offsetTop;
		obj.style.zIndex=z++;
		document.onmousemove = function(ev){
			var oEvent = ev || event;
			var l = oEvent.clientX - disX;
			var t = oEvent.clientY - disY;
			obj.style.left = l + 'px';
			obj.style.top = t + 'px';
		}
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
			obj.releaseCapture && obj.releaseCapture();
		}
		obj.setCapture && obj.setCapture();
		return false;
	}
}
//13.鼠标滚轮事件
function addWheel(obj,fn){
	function wheel(ev){
		var oEvent = ev || event;
		var bDown = true;
		bDown = oEvent.wheelDelta?oEvent.wheelDelta < 0:bDown = oEvent.detail > 0;
		fn && fn(bDown);
	}
	if(window.navigator.userAgent.indexOf('Firefox') != -1){
		obj.addEventListener('DOMMouseScroll',wheel,false);
	}else{
		addEvnet(obj,'mousewheel',wheel);
	}
}
//14.domReady
function domReady(fn){
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded',function(){
			fn && fn();
		},false);
	}else{
		document.attachEvent('onreadystatechange',function(){
			if(document.readyState == 'complete'){
				fn && fn();
			}
		})
	}
}
// 15.运动函数
function motion(obj,json,option) {
	option=option||{}
	option.ms=option.ms||1000;
	option.easing=option.easing||'uniform';
	//总次数
	var count=Math.floor(option.ms/30);
	//定义空json
	var start={};
	var dis={};
	for(var name in json){
		//初始位置
		start[name]= parseFloat(getStyle(obj,name));
		//总距离
		dis[name]=json[name]-start[name];
	}
	//次数，默认0;
	var n=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function () {
		n++;
		for(name in json){
			switch(option.easing){
				case 'uniform':
					var a=n/count;
					var cur= start[name]+dis[name]*a;
					break;
				case 'accele':
					var a=n/count;
					var cur= start[name]+dis[name]*(a*a);
					break;
				case 'slow':
					var a=1-n/count;
					var cur= start[name]+dis[name]*(1-a*a);
					break;
			}
			// var cur=start[name]+n*dis[name]/count;
			if (name=='opacity') {
				obj.style[name]=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}else{
				obj.style[name]=cur+'px';
			}
		}
		//判断，次数够了以后，定时器关闭；
		if (n>=count) {
			clearInterval(obj.timer);
			//定时器关闭后执行下面的函数
			option.fn && option.fn();
		}
	},30)
}
//16.findInArr
function findInArr(n,arr) {
    for (var i = 0; i < arr.length ; i++) {
        if (arr[i]==n) {
            return true;
        } ;
    };
    return false;
};
//17.补零
function toDou(n) {
    if (n<10) {
        return '0'+n;
    } else {
        return ''+n;
    }
}
//18.弧度转角度
function d2a(n){
    return n*180/Math.PI;
}
//19.角度转弧度
function a2d(n){
    return n/180*Math.PI;
}
//20.设置cookie
function setCookie(name,value,iDay) {
	if (iDay) {
		var oDate=new Date();
		oDate.setDate(oDate.getDate()+iDay);
		document.cookie=''+name+'='+value+';path=/;expires='+oDate;
	}else{
		document.cookie=''+name+'='+value+';path=/';
	}
}
//21.获取cookie
function getCookie(name){
	var strCookie=document.cookie;
	var arrCookie=strCookie.split("; ");
	for(var i=0;i<arrCookie.length;i++){
		var arr=arrCookie[i].split("=");
		if(arr[0]==name)return arr[1];
	}
	return "";
}



























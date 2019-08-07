//轮播图
var oul=document.querySelector("#banner ul")
var obtnl=document.querySelector(".btnl")
var obtnr=document.querySelector(".btnr")
var alis=document.querySelectorAll("#banner ul li")

var index=0;
var z=1;
var ltimer;

ltimer=setInterval(function(){
    if (index==alis.length-1) {
        index=0;
    }else{
        index++;
    }

    alis[index].style.zIndex=z++;
    alis[index].style.left="-2223px";
    move(alis[index],{left:0});
},3000)

oul.onmouseover=function(){
    clearInterval(ltimer);
}
oul.onmouseout=function(){
    clearInterval(ltimer);
    ltimer=setInterval(function(){
    if (index==alis.length-1) {
        index=0;
    }else{
        index++;
    }
    alis[index].style.zIndex=z++;
    alis[index].style.left="-2223px";
    move(alis[index],{left:0});
},3000)}

obtnr.onclick=function () {
    clearInterval(ltimer);
    if (index==alis.length-1) {
        index=0;
    }else{
        index++;
    }
    alis[index].style.zIndex=z++;
    alis[index].style.left="-2223px";
    move(alis[index],{left:0});
}

obtnl.onclick=function(){
    clearInterval(ltimer);
    if (index==0) {
        index=alis.length-1;
    }else{
        index--;
    }
    alis[index].style.zIndex=z++;

    alis[index].style.right="-2223px";
    move(alis[index],{right:0})
}


//楼层的显示隐藏
$(document).scroll(function(){ 
    //获取滚动条距离  
　　var distance = $(document).scrollTop();  
　　if(distance >= 632) {
　　　　$("#side").css("display","block")  
　　} else {
    　　$("#side").css("display","none")  
　　}
})
// 楼层效果
$("#side").children("li").click(function(){
	//获取点击的索引
	var index = $(this).index();
	//根据索引获取对应的楼层
	var iNowFloor = $(".floor").eq(index);
	//计算楼层距离顶部的位置
	var t = iNowFloor.offset().top;
	//将这个位置设置给滚动条
	$("html").stop().animate({
		scrollTop:t
	})
})


		
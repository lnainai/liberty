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
// 选项卡
var boxList = utils.getElementsByClass("box"); //getElementsByClass:通过元素的样式类名获取一组元素集合（兼容所有浏览器）
		for (var i = 0; i < boxList.length; i++) {
			selectTab(boxList[i]);
		}

		function selectTab(container, defaultIndex) {
        var tabFirst = utils.firstChild(container),  //ul
            oLis = utils.children(tabFirst),  //三个li
            divList = utils.children(container, "div"); //得到div的元素标签
        //使用时间委托来优化点击操作
        tabFirst.onclick = function (e) {
            e = e || window.event;
            e.target = e.target || e.srcElement;
            if (e.target.tagName.toLowerCase() === "li") { //说明当前点击的是li标签
                detailFn.call(e.target, oLis, divList);
            }
        };
        //让defaultIndex对应的页卡选中的样式
        defaultIndex = defaultIndex || 0;
        utils.addClass(oLis[defaultIndex], "select");
        utils.addClass(divList[defaultIndex], "select");
    }
    function detailFn(oLis, divList) {
        //保证this是当前点击的li
        var index = utils.index(this);
        utils.addClass(this, "select");
        for (var i = 0; i < divList.length; i++) {
            i === index ? utils.addClass(divList[i], "select") : (utils.removeClass(divList[i], "select"), utils.removeClass(oLis[i], "select"));
        }
    }
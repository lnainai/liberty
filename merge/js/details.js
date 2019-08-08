//获取商品详情
class GetDetail{
	constructor(){
		this.bimg=document.querySelector(".bigphoto")
		// this.bbimg=document.querySelector("b_photo")
		this.simg=document.querySelector(".smallphoto")
		this.bname=document.querySelector(".bookname")
		this.xjia=document.querySelector(".xjia")
		this.addcar=document.querySelector(".addcar")
		this.num=document.querySelector(".changenum")
		
        this.url="date/goods.json"

		this.init();
		
	}
	
	init(){
		var that = this;
        ajaxGet(this.url,function(res){
            that.res = JSON.parse(res);        //json数据
            // console.log(that.res);
            that.display()
        })
	}
	display(){
		for(var i=0;i<this.res.length;i++){            //遍历所有商品，找到点击的对应商品信息
			if(this.res[i].goodsId==localStorage.getItem("goods")){
				this.bimg.innerHTML=`<img class="zximg" src="${this.res[i].src}" alt="">`
				// console.log(this.bimg.innerHTML);
				// this.bbimg.innerHTML=`<img class="dimg" src="${this.res[i].src}" alt="">`
				// console.log(this.bbimg.innerHTML);
				this.simg.innerHTML=`<img src="${this.res[i].src}" alt="">`
				this.bname.innerHTML=`${this.res[i].name}`				
				this.xjia.innerHTML=`${this.res[i].price}`
			}
			this.addEvent();
		}

		$(function(){
			$(".zximg").click(function(){
				var that = $(this);              //将当前的img元素作为that传入函数
				imgShow("#outdiv", "#indiv", "#bigimg", that);
			});
		});
	}
	addEvent(){
		var that = this;
		this.addcar.onclick = function(){
			that.setData();
		}
	}
	setData(){
		this.id=localStorage.getItem("goods");                    //获取当前商品的id
		this.cargoods = localStorage.getItem("cargoods");           //购物车的本地存储
		if(this.cargoods){
			// 不是第一次 
			console.log(this.cargoods)
			this.cargoods = JSON.parse(this.cargoods)

			var onoff = true;
			// 之后存
			for(var i=0;i<this.cargoods.length;i++){
				// 老的
				if(this.cargoods[i].id == this.id){
					this.cargoods[i].num=parseInt(this.cargoods[i].num)+parseInt(this.num.value);
					onoff = false;
				}
			}
			// 新的
			if(onoff){
				this.cargoods.push({
					id:this.id,
					num: this.num.value
				})
			}
		}else{
			// 第一次存,直接存
			this.cargoods= [{
				id:this.id,
				num:this.num.value
			}];
		}
		localStorage.setItem("cargoods",JSON.stringify(this.cargoods))
	}
}
new GetDetail();

function imgShow(outerdiv, innerdiv, bigimg, _this){
	var src = _this.attr("src");                 //获取当前点击的img元素中的src属性
	$(bigimg).attr("src", src);                  //设置#bigimg元素的src属性
 
		/*获取当前点击图片的真实大小，并显示弹出层及大图*/
	$("<img/>").attr("src", src).load(function(){
		var windowW = $(window).width();                  //获取当前窗口宽度
		var windowH = $(window).height();                 //获取当前窗口高度
		var realWidth = this.width;                        //获取图片真实宽度
		var realHeight = this.height;                      //获取图片真实高度
		var imgWidth, imgHeight;
		var scale = 0.9;                                      //缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放
		
		if(realHeight>windowH*scale) {                            //判断图片高度
			imgHeight = windowH*scale;                          //如大于窗口高度，图片高度进行缩放
			imgWidth = imgHeight/realHeight*realWidth;              //等比例缩放宽度
			if(imgWidth>windowW*scale) {                          //如宽度扔大于窗口宽度
				imgWidth = windowW*scale;                              //再对宽度进行缩放
			}
		} else if(realWidth>windowW*scale) {                //如图片高度合适，判断图片宽度
			imgWidth = windowW*scale;                      //如大于窗口宽度，图片宽度进行缩放
						imgHeight = imgWidth/realWidth*realHeight;               //等比例缩放高度
		} else {                                           //如果图片真实高度和宽度都符合要求，高宽不变
			imgWidth = realWidth;
			imgHeight = realHeight;
		}
				$(bigimg).css("width",imgWidth);            //以最终的宽度对图片缩放
		
		var w = (windowW-imgWidth)/2;                       //计算图片与窗口左边距
		var h = (windowH-imgHeight)/2;                      //计算图片与窗口上边距
		$(innerdiv).css({"top":h, "left":w});               //设置#innerdiv的top和left属性
		$(outerdiv).fadeIn("fast");                         //淡入显示#outerdiv及.img
	});
	
	$(outerdiv).click(function(){                          //再次点击淡出消失弹出层
		$(this).fadeOut("fast");
	});
}


function Magnifier(){
	this.sBox = document.querySelector(".bigphoto");
	this.bBox = document.querySelector(".b_photo");
	this.bBox = document.querySelector(".b_photo");
	this.bImg = this.bBox.children[0];
	this.addEvent()
}
Magnifier.prototype.addEvent = function(){
	var that = this;
	this.sBox.onmouseenter = function(){
		that.show()
	}
	this.sBox.onmouseleave = function(){
		that.hide()	
	}
	this.sBox.onmousemove = function(eve){
		var e = eve || window.event
		that.move(e);
	}
}
Magnifier.prototype.show = function(){
	this.bBox.style.display = "block";
	if(!this.span){
		this.span = document.createElement("span");
//						(右边图片显示的尺寸	/	右边图片的总尺寸  = 显示的图片的比例) * 左边能显示的图片的总尺寸
		var w = this.bBox.offsetWidth / this.bImg.offsetWidth * this.sBox.offsetWidth;
		var h = this.bBox.offsetHeight / this.bImg.offsetHeight * this.sBox.offsetHeight;		
		this.span.style.cssText = `width:${w}px;height:${h}px;background:rgba(200,200,200,0.6);position:absolute;left:0;top:0;`;
		this.sBox.appendChild(this.span);
	}
	this.span.style.display = "block";
}
Magnifier.prototype.hide = function(){
	this.span.style.display = "none";
	this.bBox.style.display = "none";
}
Magnifier.prototype.move = function(e){
	var that=this
	var l = e.clientX - this.sBox.offsetLeft - that.span.offsetWidth/2;
	// console.log(e.clientX)
	var t = e.clientY - this.sBox.offsetTop - that.span.offsetHeight/2;
	// console.log(l,t);
//				span的边界限定
	if(l < 0) l=0;
	if(t < 0) t=0;
	if(l > this.sBox.offsetWidth - this.span.offsetWidth){
		l = this.sBox.offsetWidth - this.span.offsetWidth
	}
	if(t > this.sBox.offsetHeight - this.span.offsetHeight){
		t = this.sBox.offsetHeight - this.span.offsetHeight
	}
//				设置span的位置
	that.span.style.left = l + "px";
	that.span.style.top = t + "px";
	
//				计算span移动的比例
	var x = l / (this.sBox.offsetWidth - this.span.offsetWidth);
	var y = t / (this.sBox.offsetHeight - this.span.offsetHeight);
	
//				根据比例,计算右边大图要移动的距离，注意方向
	this.bImg.style.left = -x * (this.bImg.offsetWidth - this.bBox.offsetWidth) + "px";
	this.bImg.style.top = -y * (this.bImg.offsetHeight - this.bBox.offsetHeight) + "px";
}
new Magnifier;






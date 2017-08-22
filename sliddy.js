// JavaScript Document
/* author Vincent Qian */
function toucher(el,obj){
	this.el=el;
	this.obj=obj;
	this.startX=0;
	this.startY=0;
	this.endX=0;
	this.endY=0;
	this.init();
	//alert(this.el.id);
	//alert(this.obj.photonum);
	
}
toucher.prototype.init=function(){
	var self=this;
	this.el.addEventListener("touchstart",function(event){
												   event.preventDefault();
												   self.startX=event.touches[0].pageX;
												   self.startY=event.touches[0].pageY;
												   });
	this.el.addEventListener("touchmove",function(event){
												  event.preventDefault();
												  self.endX=event.touches[0].pageX;
												  self.endY=event.touches[0].pageY;
												  if(self.endX-self.startX>0){
													  self.startX=0;
													  self.startY=0;
													  self.endX=0;
													  self.endY=0;
													  self.obj.gotoPre();
													  self.obj.ifAutoPlay();
													  
												  }
												  if(self.endX-self.startX<0){
													  self.startX=0;
													  self.startY=0;
													  self.endX=0;
													  self.endY=0;
													  self.obj.gotoNext();
													  self.obj.ifAutoPlay();
													  
												  }
												  });

}
function sliddy(parent,photolist,autoplay){
	var autoplay=autoplay?autoplay:false;
	this.parent = document.getElementById(parent);
	this.photonum = photolist.length;
	this.autoplay=autoplay;
	this.innerwid=document.getElementById(parent).offsetWidth;
	this.touch=new toucher(this.parent,this);
	var inwidth=this.innerwid;
	var pnum = this.photonum;
	var now = 0;
	var canClick=1;
	var canAutomove=1;
	var target=1;
	var intv1,intv2;
	window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;
	console.log(window.requestAnimationFrame);
this.moveit=function(){
		var obj = document.getElementById("mover");
		var startp = now*-(inwidth);
		var endp = target*-(inwidth);
		var movestep = (inwidth)/100;
		if(target==pnum+1){
			obj.style.marginLeft="0px";
			now = 0;
			target = 1;
			
		}
		else{
			this.moveAction(obj,startp,endp,movestep);
			now = now+1;
			target = target+1;
			
			
		}
	
	
}
 this.moveAction=function(obj,startp,endp,movestep){
	if((endp-startp)>=inwidth){
					 if(startp>=endp){return true;}
					 else{
						 canClick=0;
						 var callback=function(){
							 if(startp>=endp){
								 canClick=1;
								 clearInterval(intv2);
								 return true;
							  }
							 if(startp+movestep>endp){startp=endp;}
							 else{startp=startp+movestep;}
							  obj.style.marginLeft = startp+"px";
							  requestAnimationFrame(callback);
						  }
						 if(window.requestAnimationFrame){intv2=requestAnimationFrame(callback);}
						 else{intv2 = setInterval(callback,1000/60);}
						 }
				 }
	 else if((startp-endp)>=inwidth){
					
					 if(startp<=endp){return true;}
					 else{
					 canClick=0;
					 var callback=function(){
						 if(startp<=endp){
							 canClick=1;
							 clearInterval(intv2);
							 return true;
						}
						 if(startp-movestep<endp){startp=endp;}
						 else{startp=startp-movestep;}
						    obj.style.marginLeft = startp+"px";
							requestAnimationFrame(callback);
						 }
						 if(window.requestAnimationFrame){intv2=requestAnimationFrame(callback);}
						 else{intv2 = setInterval(callback,1000/60);}
					 }
				 }
}
 this.domPrepare=function(){
	  var width = inwidth+"px";
		var widthnum = inwidth;
		this.parent.style.width = width;
		this.parent.style.position="relative";
		this.parent.style.overflow="hidden";
		var lunbodiv=document.createElement("div");
		lunbodiv.style.width =widthnum*(this.photonum+1)+"px";
		lunbodiv.style.height = this.parent.style.height;
		lunbodiv.setAttribute("id","mover");
		var preornext=document.createElement("div");
		preornext.style.position="absolute";
		preornext.style.width="100%";
		preornext.style.height="100%";
		preornext.top="0px";
		preornext.left="0px";
		preornext.setAttribute("id","preornext");
		preornext.style.display="none";
		preornext.style.background="rgba(0,0,0,0)";
		var pre=document.createElement("div");
		pre.setAttribute("id","lunbopre");
		pre.style.color="white";
		pre.style.height="60px";
		pre.style.width="60px";
		pre.style.position="absolute";
		pre.style.top="50%";
		pre.style.left="0px";
		pre.style.marginTop="-30px";
		pre.style.background="rgba(0,0,0,0.6)"
		pre.style.textAlign="center";
		pre.style.fontSize="3em";
		pre.innerText="<";
		pre.style.float="left";
		var next=document.createElement("div");
		next.setAttribute("id","lunbonext");
		next.style.color="white";
		next.style.height="60px";
		next.style.width="60px";
		next.style.position="absolute";
		next.style.top="50%";
		next.style.right="0px";
		next.style.marginTop="-30px";
		next.style.background="rgba(0,0,0,0.6)"
        next.style.textAlign="center";
		next.style.lineHeight="50px";
		next.style.fontSize="40px";
		next.innerText=">";
		next.style.float="right";
		preornext.appendChild(next);
		preornext.appendChild(pre);
		this.parent.appendChild(preornext);
		this.parent.appendChild(lunbodiv);
		for(i=0;i<this.photonum;i++){
			var img=document.createElement("img");
			img.src=photolist[i];
			img.style.width = this.parent.style.width;
			img.style.height = this.parent.style.height*1.5;
			img.style.float="left";
			lunbodiv.appendChild(img);
		}
		var imgEnd=document.createElement("img");
			imgEnd.src=photolist[0];
			imgEnd.style.width = this.parent.style.width;
			imgEnd.style.height = this.parent.style.height*1.5;
			imgEnd.style.float="left";
			lunbodiv.appendChild(imgEnd);
		var bottomcontrol = document.createElement("div");
		bottomcontrol.style.width = width;
		bottomcontrol.style.position = "absolute";
		bottomcontrol.style.height = "20px";
		bottomcontrol.style.bottom ="0px";
		bottomcontrol.style.zIndex ="100";
		bottomcontrol.style.background = "rgba(0,0,0,0.5)";
		this.parent.style.position ="relative";
	    this.parent.appendChild(bottomcontrol);
		var dotcontainer = document.createElement("div");
		dotcontainer.style.width ="100px";
		dotcontainer.style.height ="20px";
		dotcontainer.style.margin = "0 auto";
		dotcontainer.style.background = "rgba(0,0,0,0)";
		dotcontainer.setAttribute("id","dotcontainer");
		bottomcontrol.appendChild(dotcontainer);
		for(i=0;i<this.photonum;i++){
			var dot = document.createElement("div");
			dot.setAttribute("class","clickdot");
			dot.setAttribute("pnum",i);
			dot.style.width="10px";
			dot.style.height="10px";
			dot.style.float="left";
			dot.style.background="rgba(255,255,255,0.6)";
			if(i==0){dot.style.background="rgba(255,255,255,1)";}
			dot.style.marginLeft="8px";
			dot.style.marginTop="3px";
			dot.style.borderRadius="50%";
			dot.style.color="white";
			dot.style.fontSize="0px";
			dot.innerHTML=i;
			dotcontainer.appendChild(dot);
		}
  }
  this.ifAutoPlay=function(autoplay){
	      var dots = document.getElementById("dotcontainer").getElementsByTagName("div");
		  var self=this;
	      if(autoplay==true){
				          setTimeout(function(){
									clearInterval(intv1);
								    clearInterval(intv2);
									intv1 = setInterval(function(){
											                self.moveit();
														    for(j=0;j<dots.length;j++){dots[j].style.background="rgba(255,255,255,0.6)";}
														    if(dots[now]){dots[now].style.background="rgba(255,255,255,1)"}
															else{dots[0].style.background="rgba(255,255,255,1)"}
											            },5000);
				                      },5000);
			      

		}
  }
  this.gotoPre=function(){
	        var dots = document.getElementById("dotcontainer").getElementsByTagName("div");
	  		if(canClick==0){return false;}
			if(now<=0){return false;}
			clearInterval(intv1);
			clearInterval(intv2);
			target=now-1;
			var movestep3 = (inwidth)/8;
			this.moveAction(document.getElementById("mover"),now*(-(inwidth)),target*(-(inwidth)),movestep3);
			now=target;
			target=now+1;
			for(j=0;j<dots.length;j++){dots[j].style.background="rgba(255,255,255,0.6)";}
			dots[now].style.background="rgba(255,255,255,1)";
  }
  this.gotoNext=function(){
			var dots = document.getElementById("dotcontainer").getElementsByTagName("div");
	  	    if(canClick==0){return false;}
			if(target==pnum){return false;}
			clearInterval(intv1);
			clearInterval(intv2);
			target=now+1;
			var movestep3 = (inwidth)/8;
			this.moveAction(document.getElementById("mover"),now*(-(inwidth)),target*(-(inwidth)),movestep3);
			now=target;
			target=now+1;
			for(j=0;j<dots.length;j++){dots[j].style.background="rgba(255,255,255,0.6)";}
			dots[now].style.background="rgba(255,255,255,1)";
  }
  this.gotoWhich=function(which){
	    var dots = document.getElementById("dotcontainer").getElementsByTagName("div");
	  	if(canClick==0){return true;}
		clearInterval(intv1);
		clearInterval(intv2);
		target=which;
		var move_step=(inwidth)/8;
		this.moveAction(document.getElementById("mover"),now*(-(inwidth)),target*(-(inwidth)),move_step);
		now=which;
		target=which+1;
		for(j=0;j<dots.length;j++){dots[j].style.background="rgba(255,255,255,0.6)";}
		event.target.style.background="rgba(255,255,255,1)";
  }
  this.start=function(){
	    this.domPrepare();
		var self=this;
		var dots = document.getElementById("dotcontainer").getElementsByTagName("div");
	    this.ifAutoPlay(autoplay);
		window.onfocus=function(){
				clearInterval(intv2);
				clearInterval(intv1);
		    self.ifAutoPlay(autoplay);
		
		}
		window.onblur=function(){
			if(autoplay==true){
			    clearInterval(intv2);
			    clearInterval(intv1);
				document.getElementById("mover").style.marginLeft=now*-(inwidth)+"px";
				
			}
		
		}
		
		document.getElementById("dotcontainer").onclick=function(event){
	            if(event.target.getAttribute("class")=="clickdot"){
					var k = parseInt(event.target.getAttribute("pnum"));
					self.gotoWhich(k);
			        self.ifAutoPlay(autoplay);
					

				}
		}
		document.getElementById("mover").onmouseover=function(){document.getElementById("preornext").style.display="block";}
		document.getElementById("preornext").onmouseout=function(){document.getElementById("preornext").style.display="none";}
		document.getElementById("lunbopre").onclick=function(){
			self.gotoPre();
			self.ifAutoPlay(autoplay);
		}
		document.getElementById("lunbonext").onclick=function(){
			self.gotoNext();
			self.ifAutoPlay(autoplay);
			
	   }
		
	}
	
	
}

var num = 1;

function slide(){
	num++; if (num>3)num=1;
	var pic="<img src=\'images/slide"+num+".jpg\'/>";
	document.getElementById("slider").innerHTML=pic;
	
	setTimeout("slide()", 6000);
	setTimeout("hide()", 5500);
	$("#slider").fadeIn(500);
	}
	function hide(){
	$("#slider").fadeOut(500);
	
}

$(document).ready(function() {
     $(".spinner").spinner({
	 });

});

var sum=0;
	function count(x){
	var qty=parseInt(document.getElementById("inp"+x).value);
	if(qty>0){
	
	sum +=qty;
	document.getElementById("lgSum").innerHTML=("Total: "+sum+" large jars</br><span id='offerDetails'>Eligible for "+sum+" spheres 50% off and "+(sum*2)+" votives for free</span>");

		}
	}
	
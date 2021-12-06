//document.getElementById("rate").addEventListener("click", rate);
window.addEventListener('load',rate);
var globalusd=0;
var globalcou=0;
function rate() {
 //랜덤

 var coupon = new Array();

 coupon[0] = "images/coupon60.jpg";
 coupon[1] = "images/coupon70.jpg";
 coupon[2] = "images/coupon80.jpg";
 coupon[3] = "images/coupon90.jpg";
 var couponnum = Math.floor( Math.random() * 4 );
 document.getElementById("cou").innerHTML="내 쿠폰 <img src=" + coupon[couponnum] + ' border=0 width="80px"><br><br>';


var usd = 1000 + 10 * Math.floor(Math.random()*30);
var usd1=Math.round(usd*1.02*10)/10;
var usd2=Math.round(usd*0.98*10)/10;
var usd3=Math.round(usd*1.01*10)/10;
var usd4=Math.round(usd*0.99*10)/10;

ratetable.rows[2].cells[1].innerHTML = usd;
ratetable.rows[2].cells[2].innerHTML = usd1;
ratetable.rows[2].cells[3].innerHTML = usd2;
ratetable.rows[2].cells[4].innerHTML = usd3;
ratetable.rows[2].cells[5].innerHTML = usd4;
globalusd=usd;
globalcou=couponnum;
}

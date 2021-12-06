document.getElementById("ans").addEventListener("click", ans);
function ans(){
  var u=globalusd;
  var c=60+(globalcou*10);
  var d = Number(document.getElementById("d").value);
  var usd2=Math.round(u*0.98*10)/10;
  if (isNaN(d) || d<=0 ) {
      document.getElementById("answer").innerHTML = "범위에 맞는 수를 입력하세요.";
      return;
  }

  document.getElementById("answer").innerHTML=
  "현찰로 "+d+"달러를 팔고자 하는 것이므로 현찰 팔 때의 환율("+(usd2)+")을 적용하면 "+(usd2)+" * "+d+" = "+(usd2)*d+
  "원이다. <br>매매기준율을 적용했다면 "+u+" * "+d+" = "+(u*d)+"원이므로 그 차액인 수수료 "+((u*d)-(usd2*d))+"의 "+c+
  "%를 할인받아<br>"+((u*d)-(usd2*d))*(c/100)+" + "+(usd2)*d+" = "+(((u*d)-(usd2*d))*(c/100)+(usd2)*d)+"원을 받게 된다.";


}

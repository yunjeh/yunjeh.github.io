document.getElementById("ans").addEventListener("click", ans);
function ans() {
  var a = Number(document.getElementById("aa").value);
  var r = Number(document.getElementById("rr").value);
  var n = Number(document.getElementById("nn").value);

  if (a<=0 || n<2 || r<0 || r>=1) {
		document.getElementById("answer").innerHTML = "범위에 맞는 수를 입력하세요.";
		return;
	}
	else{
    var sum = a * ((1 + r)**n);

	document.getElementById("answer").innerHTML = a+" * (1 + "+r+")^"+n+" = "+sum+" = 약 "+Math.round(sum)+"원이다.";


  }
}

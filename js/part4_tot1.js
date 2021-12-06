document.getElementById("tot1").addEventListener("click", tot1);
function tot1(){
	//숫자로
	var a = Number(document.getElementById("a").value);
	var r = Number(document.getElementById("r").value);
	var n = Number(document.getElementById("n").value);

	// 표 채우기
	if (a<=0 || n<6 || r<0 || r>=1) {
		document.getElementById("tot").innerHTML = "범위에 맞는 수를 입력하세요.";
		return;
	}
	else{
		for(i=0;i<=4;i++){
			table.rows[i+1].cells[i].innerHTML = a;
		}

		for(j=0;j<=5;j++){
			table.rows[4].cells[j].innerHTML = "&nbsp;&nbsp;···&nbsp;&nbsp;";
		}
		table.rows[1].cells[5].innerHTML = a+"(1+"+r+")^"+n;
		table.rows[2].cells[5].innerHTML = a+"(1+"+r+")^"+(n-1);
		table.rows[3].cells[5].innerHTML = a+"(1+"+r+")^"+(n-2);
		table.rows[5].cells[5].innerHTML = a+"(1+"+r+")^1";

		document.getElementById("tot").innerHTML =
			a+"(1+"+r+")^1&nbsp;+&nbsp;···&nbsp;+&nbsp;"+a+"(1+"+r+")^"+(n-2)+"&nbsp;+&nbsp;"+a+"(1+"+r+")^"+(n-1)+"&nbsp;+&nbsp;"+a+"(1+"+r+")^"+n
			+"<br>=&nbsp;<b>첫째항이&nbsp;"+a+"(1+"+r+")이고 공비가 (1+"+r+")인 등비수열의 항&nbsp;"+n+"개의 합</b>"
			+"<br>=&nbsp;"+a+"(1&nbsp;+&nbsp;"+r+"){(1&nbsp;+&nbsp;"+r+")^"+n+"&nbsp;-&nbsp;1}&nbsp;/&nbsp;"+r+"&nbsp;<br>&nbsp;="+(a*(1+r)*(((1+r)**n)-1))/r
			+"<br></p><p style='font-family:맑은 고딕,나눔고딕;'>기시불일 때 원리합계는&nbsp;약&nbsp;"+Math.round((a*(1+r)*(((1+r)**n)-1))/r)+"원이다.";
	}
}

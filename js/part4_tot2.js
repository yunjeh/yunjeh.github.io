document.getElementById("tot2").addEventListener("click", tot2);
function tot2(){
	// 입력된 문자열을 숫자로 바꾸기
	var a2 = Number(document.getElementById("a").value);
	var r2 = Number(document.getElementById("r").value);
	var n2 = Number(document.getElementById("n").value);

	if (a2<=0 || n2<6 || r2<0 || r2>=1) {
		document.getElementById("tot").innerHTML = "범위에 맞는 수를 입력하세요.";
		return;
	}
	else{
		for(i=0;i<=4;i++){
			table.rows[i+1].cells[i].innerHTML = "<div align='right'>"+a2;
		}
		for(j=0;j<=5;j++){
			table.rows[4].cells[j].innerHTML = "&nbsp;&nbsp;···&nbsp;&nbsp;";
		}
		table.rows[1].cells[5].innerHTML = a2+"(1+"+r2+")^"+(n2-1);
		table.rows[2].cells[5].innerHTML = a2+"(1+"+r2+")^"+(n2-2);
		table.rows[3].cells[5].innerHTML = a2+"(1+"+r2+")^"+(n2-3);
		table.rows[5].cells[5].innerHTML = a2;

		document.getElementById("tot").innerHTML =
			a2+"&nbsp;+&nbsp;···&nbsp;+&nbsp;"+a2+"(1+"+r2+")^"+(n2-3)+"&nbsp;+&nbsp;"+a2+"(1+"+r2+")^"+(n2-2)+"&nbsp;+"+a2+"(1+"+r2+")^"+(n2-1)
			+"<br>=&nbsp;<b>첫째항이&nbsp;"+a2+"이고 공비가 (1+"+r2+")인 등비수열의 항&nbsp;"+n2+"개의 합</b>"
			+"<br>=&nbsp;"+a2+"{(1&nbsp;+&nbsp;"+r2+")^"+n2+"&nbsp;-&nbsp;1}&nbsp;/&nbsp;"+r2+"&nbsp;<br>&nbsp;="+(a2*(((1+r2)**n2)-1))/r2
			+"<br></p><p style='font-family:맑은 고딕,나눔고딕;'>기말불일 때 원리합계는&nbsp;약&nbsp;"+Math.round((a2*(((1+r2)**n2)-1))/r2)+"원이다.";
	}
}

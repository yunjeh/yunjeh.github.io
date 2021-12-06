document.getElementById("psum").addEventListener("click", psum);

function psum() {
//숫자로
  var kwh = Number(document.getElementById("kwh").value);
  var sum = 0;

       if (isNaN(kwh) || kwh<=0 ) {
			         document.getElementById("answer").innerHTML = "범위에 맞는 수를 입력하세요.";
			         return;
			 }

	  if (kwh > 400) {
	  sum = (200*93.3)+(200*187.9)+((kwh-400)*280.6);
	  document.getElementById("answer").innerHTML=
		"기본요금 7300원, 전력량요금 (200 * 93.3) + (200 * 187.9)+(("+kwh+" - 200) * 280.6) = "+sum+"원이므로 합계는 "+(7300+sum)+"원이다.";        }
    else if (kwh > 200) {
    sum = (200*93.3)+((kwh-200)*187.9);
    document.getElementById("answer").innerHTML=
		"기본요금 1600원, 전력량요금 (200 * 93.3) + (("+kwh+" - 200) * 187.9) = "+sum+"원이므로 합계는 "+(1600+sum)+"원이다.";        }
	   else{
		 sum = (kwh)*93.3;
		 document.getElementById("answer").innerHTML=
		"기본요금 910원, 전력량요금 "+kwh+" * 93.3 = "+sum+"원이므로 합계는 "+(910+sum)+"원이다.";        }
}

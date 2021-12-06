function ShowSliderValue(sli){
		var obValueView = document.getElementById("slider_value_view");
		obValueView.innerHTML = sli
		var eu=(((Math.sqrt(900-sli))*100*(5/8)) + ((Math.sqrt(100-sli+500))*100*(3/8)));
		document.getElementById("ans").innerHTML="보험료가 "+sli*10000+"원일 때, 보험에 가입하지 않은 경우 기대효용은  (√9000000 * (5/8)) + (√1000000 * (3/8)) = 2250 이다. "
		+"<br>보험을 가입한 경우 화재가 발생하지 않으면 9000000 - "+sli*10000+" = "+(900-sli)*10000+
		"<br>화재가 발생하면 1000000 - "+sli*10000+" + 5000000 = "+(100-sli+500)*10000+ " 이므로 기대효용은 <br>(√"
		+(900-sli)*10000+" * (5/8)) + (√"+(100-sli+500)*10000+" * (3/8)) = 약 "+Math.round(eu)+"이다.";
		if (eu>2500 ) {
	      document.getElementById("ans2").innerHTML = "2500 < "+Math.round(eu)+" 이므로 보험에 가입하는 것이 합리적인 선택이다.";
	  }
		else{
	      document.getElementById("ans2").innerHTML = "2500 > "+Math.round(eu)+" 이므로 보험에 가입하는 것은 합리적인 선택이 아니다.";
		}

}

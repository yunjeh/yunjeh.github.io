google.charts.load('current', {'packages':['corechart']});
//google.charts.setOnLoadCallback(drawChart);
document.getElementById("drawChart").addEventListener("click", drawChart);
function drawChart() {
  var a = Number(document.getElementById("a").value);
  var r = Number(document.getElementById("r").value);
  var n = Number(document.getElementById("n").value);
  var dat = new Array();

  if (a<=0 || n<2 || r<0 || r>=1) {
		document.getElementById("comment").innerHTML = "범위에 맞는 수를 입력하세요.";
		return;
	}
	else{

  for (var i = 0; i <= n; i++) {
    dat[i]=new Array(3);
    var ysimp = a * (1 + (r * i));
    var ycomp = a * ((1 + r)**i);
    dat[i][0]=i;
    dat[i][1]=ysimp;
    dat[i][2]=ycomp;
  }
  dat[0][0]='기간'; dat[0][1]='단리'; dat[0][2]='복리';
  var data = google.visualization.arrayToDataTable(dat);

  var options = {
    title: '단리, 복리에 따른 원리합계',
    curveType: 'function',
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
	document.getElementById("comment").innerHTML = "단리는 일차함수, 복리는 지수함수의 형태를 보임을 확인할 수 있다.";
  chart.draw(data, options);


}
}

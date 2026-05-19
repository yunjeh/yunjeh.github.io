/**
 * date2graph.js - GitHub Pages Jekyll Scatter Chart Engine
 * 가로축: 파일명 기반 타임스탬프 (X)
 * 세로축: 파일명 끝자리 자연수 (Y)
 */

function renderDataChart(chartData) {
  // 시간 순서대로 데이터 정렬
  chartData.sort((a, b) => new Date(a.x) - new Date(b.x));

  const ctx = document.getElementById('dataScatterChart').getContext('2d');
  
  new Chart(ctx, {
    type: 'scatter', // 점을 찍는 산점도 그래프
    data: {
      datasets: [{
        label: '업로드 데이터 추이',
        data: chartData,
        backgroundColor: '#007348', // 사용자 선호 다크 그린 컬러
        pointRadius: 6,
        pointHoverRadius: 8
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'time', // 가로축 시간축 설정
          time: {
            parser: "yyyy-MM-dd'T'HH:mm:ss",
            unit: 'hour',
            displayFormats: {
              hour: 'MM/dd HH:mm',
              day: 'yyyy-MM-dd'
            }
          },
          title: {
            display: true,
            text: '업로드 시각 (시간축)'
          },
          grid: {
            color: '#eef0f2'
          }
        },
        y: {
          title: {
            display: true,
            text: '데이터 값 (자연수축)'
          },
          beginAtZero: true,
          ticks: {
            stepSize: 1 // 정수(자연수) 단위 격자
          },
          grid: {
            color: '#eef0f2'
          }
        }
      }
    }
  });
}

/**
 * date2graph.js - GitHub Pages Jekyll Scatter Chart Engine
 */

function renderDataChart(chartData) {
  // 시간 순서대로 정렬 (안전하게 Date 객체 변환 후 비교)
  chartData.sort((a, b) => new Date(a.x) - new Date(b.x));

  const ctx = document.getElementById('dataScatterChart').getContext('2d');
  
  new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: '업로드 데이터 추이',
        data: chartData,
        backgroundColor: '#007348', // 다크 그린 컬러
        pointRadius: 6,
        pointHoverRadius: 8
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'time',
          time: {
            // 다양한 ISO 포맷을 유연하게 수용하도록 기본 파서 위임
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
            stepSize: 1
          },
          grid: {
            color: '#eef0f2'
          }
        }
      }
    }
  });
}

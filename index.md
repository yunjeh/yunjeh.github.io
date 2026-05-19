---
layout: home
---
<!-- 잔디가 그려질 자리 -->
<div id="overall-container"></div>
<script src="/assets/js/overall.js"></script>
<!-- Chart.js 라이브러리 로드 -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<div style="width: 100%; max-width: 800px; margin: 30px auto;">
  <canvas id="data2Chart"></canvas>
</div>

<script>
document.addEventListener("DOMContentLoaded", function() {
  // 1. Jekyll Liquid 문법으로 /data2/ 폴더의 파일 정보 수집
  const fileData = [
    {% for file in site.static_files %}
      {% if file.path contains '/data2/' and file.extname == '.md' %}
        {
          "name": "{{ file.name }}", // 파일명 (예: 2026...-123.md)
          "path": "{{ file.path }}"
        }{% unless forloop.last %},{% endunless %}
      {% endif %}
    {% endfor %}
  ];

  // 2. 데이터 가공 (파일명에서 마지막 정수 추출)
  const chartLabels = [];
  const chartValues = [];

  // 파일명 순서대로 정렬 (날짜 기반 파일명이므로 사전순 정렬이 곧 시간순)
  fileData.sort((a, b) => a.name.localeCompare(b.name));

  fileData.forEach(file => {
    // 정규표현식: 마지막 하이픈(-) 뒤의 숫자 뭉치를 추출
    const match = file.name.match(/-(\d+)\.md$/);
    if (match) {
      // X축에는 파일명 전체 또는 날짜 부분만 표시
      chartLabels.push(file.name.replace('.md', '')); 
      // Y축에는 추출한 마지막 정수값
      chartValues.push(parseInt(match[1]));
    }
  });

  // 3. 그래프 렌더링
  const ctx = document.getElementById('data2Chart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartLabels,
      datasets: [{
        label: '/data2/ 파일 데이터 분석',
        data: chartValues,
        borderColor: '#2ecc71', // 초록색 계열
        backgroundColor: 'rgba(46, 204, 113, 0.1)',
        borderWidth: 2,
        pointRadius: 4,
        tension: 0.2, // 선의 부드러움 정도
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true, position: 'top' },
        tooltip: { enabled: true }
      },
      scales: {
        x: { 
          display: true,
          title: { display: true, text: '파일명 (시간순)' },
          ticks: { maxRotation: 45, minRotation: 45 } // 라벨이 겹치지 않게 회전
        },
        y: { 
          beginAtZero: false,
          title: { display: true, text: '마지막 정수 값' }
        }
      }
    }
  });
});
</script>

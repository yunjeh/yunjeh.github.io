---
layout: home
---
<!-- 잔디가 그려질 자리 -->
<div id="overall-container"></div>
<script src="/assets/js/overall.js"></script>

<!-- 1. 라이브러리 로드 (순서 중요) -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<!-- 날짜 어댑터 라이브러리 (비례 축 필수 라이브러리) -->
<script src="https://cdn.jsdelivr.net/npm/date-fns@2.29.3/dist/date-fns.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns@2.0.0/dist/chartjs-adapter-date-fns.bundle.min.js"></script>
<script src="{{ '/assets/js/data2graph.js' | relative_url }}"></script>

<div style="width: 100%; height: 400px;">
  <canvas id="data2Canvas"></canvas>
</div>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    // Jekyll 데이터 추출
    const jekyllData = [
      {% for file in site.static_files %}
        {% if file.path contains '/_data2/' %}
          { "name": "{{ file.name }}" }{% unless forloop.last %},{% endunless %}
        {% endif %}
      {% endfor %}
    ];

    // [디버깅] 브라우저 콘솔(F12)에서 데이터 확인용
    console.log("1. Jekyll Raw Data:", jekyllData);

    if (jekyllData.length === 0) {
      console.error("에러: _data2 폴더에서 파일을 찾지 못했습니다. _config.yml 설정을 확인하세요.");
    } else {
      initData2Graph('data2Canvas', jekyllData);
    }
  });
</script>

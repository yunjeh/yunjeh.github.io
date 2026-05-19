---
layout: home
---
<!-- 잔디가 그려질 자리 -->
<div id="overall-container"></div>
<script src="/assets/js/overall.js"></script>

<!-- 그래프 영역 -->
<div class="graph-container" style="margin: 2rem 0;">
  <canvas id="data2Canvas"></canvas>
</div>

<!-- 외부 라이브러리 및 스크립트 로드 -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="{{ '/assets/js/data2graph.js' | relative_url }}"></script>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    // 1. Jekyll 빌드 타임에 파일 목록을 JSON 배열로 생성
    const dataFromJekyll = [
      {% for file in site.static_files %}
        {% if file.path contains '/data2/' %}
          { "name": "{{ file.name }}" }{% unless forloop.last %},{% endunless %}
        {% endif %}
      {% endfor %}
    ];

    // 2. 외부 함수 호출 (캔버스 ID와 데이터 전달)
    initData2Graph('data2Canvas', dataFromJekyll);
  });
</script>

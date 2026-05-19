---
layout: home
---
<!-- 잔디가 그려질 자리 -->
<div id="overall-container"></div>
<script src="/assets/js/overall.js"></script>



<!-- 그래프가 그려질 캔버스 -->
<div class="graph-container" style="position: relative; height:40vh; width:100%; margin-bottom: 2rem;">
  <canvas id="data2Canvas"></canvas>
</div>

<!-- 라이브러리 및 스크립트 로드 -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="{{ '/assets/js/data2graph.js' | relative_url }}"></script>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    // Jekyll site.static_files를 통해 /data2/ 폴더의 모든 파일 목록을 가져옴
    const dataFromJekyll = [
      {% for file in site.static_files %}
        {% if file.path contains '/_data2/' %}
          { "name": "{{ file.name }}" }{% unless forloop.last %},{% endunless %}
        {% endif %}
      {% endfor %}
    ];

    // 그래프 초기화 함수 호출
    initData2Graph('data2Canvas', dataFromJekyll);
  });
</script>

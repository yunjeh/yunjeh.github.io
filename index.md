---
layout: home
---
<!-- 잔디가 그려질 자리 -->
<div id="overall-container"></div>
<script src="/assets/js/overall.js"></script>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    // Jekyll이 _data2 폴더 내의 정적 파일들을 수집합니다.
    const dataFromJekyll = [
      {% for file in site.static_files %}
        {% if file.path contains '/_data2/' %}
          { "name": "{{ file.name }}" }{% unless forloop.last %},{% endunless %}
        {% endif %}
      {% endfor %}
    ];

    console.log("수집된 데이터:", dataFromJekyll); // 여기서 데이터가 나오는지 확인!

    // 데이터가 있을 때만 그래프 초기화
    if (dataFromJekyll.length > 0) {
        initData2Graph('data2Canvas', dataFromJekyll);
    } else {
        console.error("_data2 폴더에서 파일을 찾지 못했습니다. _config.yml의 include 설정을 확인하세요.");
    }
  });
</script>

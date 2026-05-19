---
layout: home
---
<!-- 잔디가 그려질 자리 -->
<div id="overall-container"></div>
<script src="/assets/js/overall.js"></script>



<!-- 1. 차트 캔버스 영역 -->
<div style="width: 100%; max-width: 800px; margin: 30px auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
  <canvas id="dataScatterChart"></canvas>
</div>

<!-- 2. 필수 외부 라이브러리 로드 (순서 엄수) -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns"></script>

<!-- 3. 분리한 내부 자바스크립트 파일 연동 -->
<script src="{{ '/date2graph.js' | relative_url }}"></script>

<!-- 4. 지킬 데이터를 자바스크립트로 넘겨 차트 실행 -->
<script>
  const rawData = [];

  {% for file in site.static_files %}
    {% if file.path contains '/_data2/' %}
      {% assign filename = file.name %}
      {% assign cleanName = filename | replace: ".md", "" %}
      {% assign parts = cleanName | split: "-" %}
      {% assign value = parts | last %}
      
      // 안전하게 자바스크립트 배열에 푸시
      rawData.push({
        x: "{{ parts[0] }}-{{ parts[1] }}-{{ parts[2] }}T{{ parts[3] }}:{{ parts[4] }}:{{ parts[5] }}",
        y: Number("{{ value }}")
      });
    {% endif %}
  {% endfor %}

  // 브라우저 개발자 도구(F12) 콘솔에서 데이터가 제대로 뽑혔는지 확인용 디버깅 코드
  console.log("추출된 총 데이터 개수:", rawData.length);
  console.log("데이터 상세 배열:", rawData);

  if (rawData.length > 0) {
    renderDataChart(rawData);
  } else {
    console.error("💡 _data2 폴더에서 추출된 파일이 없습니다. _config.yml의 include 설정을 확인하세요.");
  }
</script>

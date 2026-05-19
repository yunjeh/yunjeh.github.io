---
layout: home
---
<!-- 잔디가 그려질 자리 -->
<div id="overall-container"></div>
<script src="/assets/js/overall.js"></script>


<div style="width: 100%; max-width: 800px; margin: 30px auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
  <canvas id="dataScatterChart"></canvas>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns"></script>

<script src="{{ '/assets/js/date2graph.js' | relative_url }}"></script>
<script>
  const rawData = [
    {% for file in site.static_files %}
      {% if file.path contains '/_data2/' %}
        {% assign filename = file.name %}
        {% assign cleanName = filename | replace: ".md", "" %}
        {% assign parts = cleanName | split: "-" %}
        {% assign value = parts | last %}
        {
          x: '{{ parts[0] }}-{{ parts[1] }}-{{ parts[2] }}T{{ parts[3] }}:{{ parts[4] }}:{{ parts[5] }}',
          y: {{ value | plus: 0 }}
        },
      {% endif %}
    {% endfor %}
  ];

  // 외부 스크립트 파일(date2graph.js)에 선언된 함수 호출
  renderDataChart(rawData);
</script>

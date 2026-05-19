---
layout: home
---
<!-- 잔디가 그려질 자리 -->
<div id="overall-container"></div>
<script src="/assets/js/overall.js"></script>


{% comment %}
=====================================================================
[Step 1] _data2 폴더의 파일들을 순회하며 초(Second) 단위 타임스탬프 리스트 생성
=====================================================================
{% endcomment %}

{% assign time_list = "" %}
{% for file in site.static_files %}
  {% if file.path contains '/_data2/' %}
    {% assign filename = file.name | replace: ".md", "" %}
    {% assign parts = filename | split: "-" %}
    
    {% comment %} 날짜 문자열을 지킬 파서가 계산할 수 있도록 Unix 타임스탬프(초)로 변환하기 위한 포맷 준비 {% endcomment %}
    {% assign date_str = parts[0] | append: "-" | append: parts[1] | append: "-" | append: parts[2] | append: " " | append: parts[3] | append: ":" | append: parts[4] | append: ":" | append: parts[5] %}
    
    {% comment %} 지킬의 date: '%s' 필터를 사용하면 날짜가 순수한 '초 단위 정수'로 변환됩니다. {% endcomment %}
    {% assign current_seconds = date_str | date: '%s' | plus: 0 %}
    
    {% comment %} 문자열 쪼개기용 콤마(,)와 함께 리스트에 저장 {% endcomment %}
    {% assign time_list = time_list | append: current_seconds | append: "," %}
  {% endif %}
{% endfor %}

{% comment %} 콤마로 연결된 문자열을 배열로 변환하고 공백 제거 {% endcomment %}
{% assign time_array = time_list | split: "," %}

{% comment %}
=====================================================================
[Step 2] 가장 빠른 날짜(Min)와 가장 늦은 날짜(Max) 동적 추출
=====================================================================
{% endcomment %}
{% assign min_time = 9999999999 %}
{% assign max_time = 0 %}

{% for t in time_array %}
  {% assign t_num = t | plus: 0 %}
  {% if t_num > 0 %}
    {% if t_num < min_time %}{% assign min_time = t_num %}{% endif %}
    {% if t_num > max_time %}{% assign max_time = t_num %}{% endif %}
  {% endif %}
{% endfor %}

{% comment %} 전체 시간 분모 분할 구간 크기 계산 (Max - Min) {% endcomment %}
{% assign total_range = max_time | minus: min_time %}

{% comment %} 날짜 표기용 변수 변환 {% endcomment %}
{% assign min_date_display = min_time | date: "%Y-%m-%d %H:%M" %}
{% assign max_date_display = max_time | date: "%Y-%m-%d %H:%M" %}


<style>
  .chart-container {
    width: 100%;
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    font-family: sans-serif;
  }

  .grid-board {
    position: relative;
    width: 100%;
    height: 350px;
    border-left: 2px solid #333333;  /* Y축 */
    border-bottom: 2px solid #333333; /* X축 */
    background-image: 
      linear-gradient(to right, #eef0f2 1px, transparent 1px),
      linear-gradient(to top, #eef0f2 1px, transparent 1px);
    background-size: 10% 20%;
  }

  .graph-point {
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: #007348; /* 다크 그린 */
    border-radius: 50%;
    transform: translate(-50%, 50%);
    cursor: pointer;
    z-index: 10;
    transition: transform 0.2s;
  }

  .graph-point:hover {
    transform: translate(-50%, 50%) scale(1.5);
    background-color: #ff5722;
  }

  .graph-point::after {
    content: attr(data-info);
    position: absolute;
    bottom: 18px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.85);
    color: #fff;
    padding: 6px 10px;
    font-size: 11px;
    border-radius: 4px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }

  .graph-point:hover::after {
    opacity: 1;
  }

  .axis-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 12px;
    color: #444;
    font-weight: 500;
  }
  
  .y-axis-title {
    font-size: 12px;
    color: #666;
    margin-bottom: 5px;
    font-weight: bold;
  }
</style>

<div class="chart-container">
  <div class="y-axis-title">↑ 데이터 값 (자연수축)</div>
  
  <div class="grid-board">
    {% comment %}
    =====================================================================
    [Step 3] 실제 비례 수식을 통한 좌표 계산 및 점 찍기
    =====================================================================
    {% endcomment %}
    {% for file in site.static_files %}
      {% if file.path contains '/_data2/' %}
        {% assign filename = file.name | replace: ".md", "" %}
        {% assign parts = filename | split: "-" %}
        
        {% assign date_str = parts[0] | append: "-" | append: parts[1] | append: "-" | append: parts[2] | append: " " | append: parts[3] | append: ":" | append: parts[4] | append: ":" | append: parts[5] %}
        {% assign this_seconds = date_str | date: '%s' | plus: 0 %}
        
        {% comment %} 가로축 비례식 좌표 계산: ((현재시간 - 최소시간) / 전체범위) * 100 {% endcomment %}
        {% if total_range > 0 %}
          {% assign diff = this_seconds | minus: min_time %}
          {% assign x_percent = diff | multiplied_by: 100 | divided_by: total_range %}
        {% else %}
          {% assign x_percent = 50 %} {% comment %} 데이터가 1개밖에 없을 때는 정중앙 배치 {% endcomment %}
        {% endif %}
        
        {% comment %} 세로축 데이터 파싱 (자연수) {% endcomment %}
        {% assign y_value = parts | last | plus: 0 %}
        
        {% comment %} 
           [Y축 비율 가이드] 데이터 값 최대 상한선을 250 기준으로 비율화 (사용자 환경에 맞춤 가능)
           만약 최대값이 유동적이라면 100이나 1000 등 알맞은 값으로 분모를 수정하세요.
        {% endcomment %}
        {% assign y_percent = y_value | multiplied_by: 100 | divided_by: 250 %}

        <!-- 🟢 실시간 비례 계산된 데이터 도트 플롯 -->
        <div class="graph-point" 
             style="left: {{ x_percent }}%; bottom: {{ y_percent }}%;" 
             data-info="일시: {{ parts[0] }}-{{ parts[1] }}-{{ parts[2] }} {{ parts[3] }}:{{ parts[4] }} / 값: {{ y_value }}">
        </div>
      {% endif %}
    {% endfor %}
  </div>

  <!-- 양 끝단 가로축 라벨에 가장 빠른 날짜와 가장 늦은 날짜가 동적 표기됩니다. -->
  <div class="axis-labels">
    <span style="text-align: left;">◀ {{ min_date_display }}</span>
    <span style="color: #999;">(시간 비례 선형 축)</span>
    <span style="text-align: right;">{{ max_date_display }} ▶</span>
  </div>
</div>

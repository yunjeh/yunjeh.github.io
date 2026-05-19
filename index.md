---
layout: home
---
<!-- 잔디가 그려질 자리 -->
<div id="overall-container"></div>
<script src="/assets/js/overall.js"></script>



<style>
  /* 🧱 그래프 전체를 감싸는 컨테이너 */
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

  /* 📊 실제 점이 찍히는 격자판 영역 */
  .grid-board {
    position: relative;
    width: 100%;
    height: 350px; /* 그래프 세로 높이 */
    border-left: 2px solid #333333;  /* Y축 라인 */
    border-bottom: 2px solid #333333; /* X축 라인 */
    
    /* 모눈종이 같은 배경 격자 눈금 형성 (CSS 패턴) */
    background-image: 
      linear-gradient(to right, #eef0f2 1px, transparent 1px),
      linear-gradient(to top, #eef0f2 1px, transparent 1px);
    background-size: 10% 20%; /* 가로 10칸, 세로 5칸 기준 격자 */
  }

  /* 🟢 격자판 위에 찍힐 산점도 점(Dot) 디자인 */
  .graph-point {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #007348; /* 사용자가 선호하는 다크 그린 */
    border-radius: 50%;
    transform: translate(-50%, 50%); /* 중심점 정렬 */
    cursor: pointer;
    transition: transform 0.2s;
  }

  .graph-point:hover {
    transform: translate(-50%, 50%) scale(1.5);
    background-color: #ff5722; /* 마우스 올리면 오렌지색으로 강조 */
  }

  /* 💬 점에 마우스를 올렸을 때 나타나는 툴팁 박스 */
  .graph-point::after {
    content: attr(data-info);
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 4px 8px;
    font-size: 11px;
    border-radius: 4px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
  }

  .graph-point:hover::after {
    opacity: 1;
  }

  /* 🏷️ 축 이름 표시 스타일 */
  .axis-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    font-size: 12px;
    color: #666;
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
    {% comment %} [Step 1] _data2 폴더의 파일들을 순회하며 데이터 수집 및 최소/최대 시간 확보 구상 {% endcomment %}
    {% for file in site.static_files %}
      {% if file.path contains '/_data2/' %}
        {% assign filename = file.name | replace: ".md", "" %}
        {% assign parts = filename | split: "-" %}
        
        {% comment %} 시:분:초 정보를 숫자로 환산하여 하루 중 배치 비율 계산 (X축 맵핑용) {% endcomment %}
        {% assign hour = parts[3] | plus: 0 %}
        {% assign minute = parts[4] | plus: 0 %}
        {% assign second = parts[5] | plus: 0 %}
        
        {% comment %} 하루를 초 단위(총 86400초)로 환산하여 몇 % 위치에 배치할지 결정 {% endcomment %}
        {% assign total_seconds = hour | multiplied_by: 3600 | plus: target_minutes | plus: second %}
        {% assign minute_seconds = minute | multiplied_by: 60 %}
        {% assign current_seconds = total_seconds | plus: minute_seconds %}
        {% assign x_percent = current_seconds | multiplied_by: 100 | divided_by: 86400 %}
        
        {% comment %} 세로 Y축 계산: 자연수 데이터 (예: 입력한 값이 최대 1000 기준이라 가정 시 비율 조정 가능) {% endcomment %}
        {% assign y_value = parts | last | plus: 0 %}
        
        {% comment %} 예를 들어 상한선 최대치를 1000으로 잡고 백분율 변환 (사용자 환경에 맞춤 가능) {% endcomment %}
        {% if y_value > 100 %}
          {% assign y_percent = y_value | multiplied_by: 100 | divided_by: 1000 %}
        {% else %}
          {% assign y_percent = y_value %} {% comment %} 값 자체가 0~100 사이라면 그대로 %로 활용 {% endcomment %}
        {% endif %}

        <!-- 🟢 데이터 포인트 찍기 -->
        <div class="graph-point" 
             style="left: {{ x_percent }}%; bottom: {{ y_percent }}%;" 
             data-info="시간: {{ parts[3] }}:{{ parts[4] }} / 값: {{ y_value }}">
        </div>
      {% endif %}
    {% endfor %}
  </div>

  <div class="axis-labels">
    <span>00:00 (시작)</span>
    <span>06:00</span>
    <span>12:00 (정오)</span>
    <span>18:00</span>
    <span>24:00 (종료)</span>
  </div>
</div>

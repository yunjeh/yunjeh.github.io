---
layout: page
title: 5-Year Overall Rating
permalink: /rating/
---

<div class="rating-dashboard">
    <div id="years-container"></div>

    <div class="rating-legend">
        <span>Less</span>
        <div class="legend-cells">
            <div class="cell level-0"></div>
            <div class="cell level-1"></div>
            <div class="cell level-2"></div>
            <div class="cell level-3"></div>
            <div class="cell level-4"></div>
            <div class="cell level-5"></div>
        </div>
        <span>More (5.0)</span>
    </div>
</div>

<style>
.rating-dashboard { 
    max-width: 1000px; /* PC 너비를 조금 더 여유 있게 조정 */
    margin: 20px auto;
    overflow-x: auto;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
}

.year-section { 
    margin-bottom: 60px; 
    min-width: 900px; /* 내부 요소가 밀리지 않도록 고정 너비 확보 */
}

.year-title { 
    font-size: 20px; 
    font-weight: 600; 
    margin-bottom: 20px; 
    color: #24292f; 
}

/* 월 라벨 영역 */
.month-labels {
    display: block; /* 그리드 대신 블록으로 설정하여 절대 위치 자유도 향상 */
    margin-bottom: 8px;
    font-size: 11px;
    color: #57606a;
    height: 18px;
    position: relative;
}

.month-label {
    position: absolute;
    white-space: nowrap; /* 줄바꿈 절대 방지 */
    transform: translateX(-2px); /* 시각적 정렬 보정 */
}

.grid-wrapper {
    display: flex;
    align-items: flex-start;
}

/* 요일 라벨 */
.day-labels {
    display: grid;
    grid-template-rows: repeat(7, 14px);
    gap: 3px;
    margin-right: 12px;
    font-size: 10px;
    color: #57606a;
}

.day-labels div {
    height: 14px;
    display: flex;
    align-items: center;
}

/* 잔디 그리드 */
.rating-grid {
    display: grid;
    grid-template-columns: repeat(53, 14px);
    grid-template-rows: repeat(7, 14px);
    gap: 3px;
    grid-auto-flow: column; 
}

.cell {
    width: 14px;
    height: 14px;
    background-color: #ebedf0;
    border-radius: 2px;
}

.level-1 { background-color: #9be9a8; }
.level-2 { background-color: #40c463; }
.level-3 { background-color: #30a14e; }
.level-4 { background-color: #216e39; }
.level-5 { background-color: #1a4d29; }

.rating-legend { margin-top: 25px; display: flex; align-items: center; font-size: 12px; gap: 8px; color: #57606a; }
.legend-cells { display: flex; gap: 3px; }
</style>

<script src="{{ '/assets/js/rating-script.js' | relative_url }}"></script>

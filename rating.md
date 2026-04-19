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
    max-width: 850px; /* PC에서 충분한 너비 확보 */
    margin: 0 auto;
    overflow-x: auto; /* 모바일에서 넘칠 경우 스크롤 */
}

.year-section { margin-bottom: 50px; min-width: 750px; }
.year-title { font-size: 20px; font-weight: bold; margin-bottom: 15px; color: #24292f; }

.month-labels {
    display: grid;
    grid-template-columns: 30px repeat(53, 14px); /* 요일 라벨 공간 30px 추가 */
    gap: 3px;
    margin-bottom: 5px;
    font-size: 11px;
    color: #57606a;
}

.grid-wrapper {
    display: flex;
}

.day-labels { /* 요일 표시 (일, 화, 목) */
    display: grid;
    grid-template-rows: repeat(7, 14px);
    gap: 3px;
    margin-right: 8px;
    font-size: 10px;
    color: #57606a;
    padding-top: 1px;
}

.rating-grid {
    display: grid;
    /* 가로 53열, 세로 7행 고정 */
    grid-template-columns: repeat(53, 14px);
    grid-template-rows: repeat(7, 14px);
    gap: 3px;
    /* 핵심: 데이터를 위에서 아래로(세로) 먼저 채우도록 설정 */
    grid-auto-flow: column; 
}

.cell {
    width: 14px;
    height: 14px;
    background-color: #ebedf0; /* 빈 칸도 연한 회색으로 표시 */
    border-radius: 2px;
}

.level-0 { background-color: #ebedf0; }
.level-1 { background-color: #9be9a8; }
.level-2 { background-color: #40c463; }
.level-3 { background-color: #30a14e; }
.level-4 { background-color: #216e39; }
.level-5 { background-color: #1a4d29; }

.rating-legend { margin-top: 20px; display: flex; align-items: center; font-size: 12px; gap: 8px; }
.legend-cells { display: flex; gap: 3px; }
</style>

<script src="{{ '/assets/js/rating-script.js' | relative_url }}"></script>

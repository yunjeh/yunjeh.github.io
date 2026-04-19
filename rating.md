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
/* 대시보드 전체 컨테이너 */
.rating-dashboard { 
    max-width: 900px; 
    margin: 20px auto;
    overflow-x: auto; /* 모바일 대응 */
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
}

/* 연도별 섹션 */
.year-section { 
    margin-bottom: 40px; 
    min-width: 820px; 
}

.year-title { 
    font-size: 18px; 
    font-weight: 600; 
    margin-bottom: 12px; 
    color: #24292f; 
}

/* 월 라벨 스타일 (한 줄 유지) */
.month-labels {
    display: grid;
    /* 요일 라벨 폭(35px) + 53주(14px + gap) */
    grid-template-columns: 35px repeat(53, 14px);
    gap: 3px;
    margin-bottom: 5px;
    font-size: 11px;
    color: #57606a;
    height: 15px;
}

.month-label {
    white-space: nowrap; 
    grid-row: 1;
}

/* 그리드 레이아웃 */
.grid-wrapper {
    display: flex;
    align-items: flex-start;
}

/* 요일 라벨 (Sun-Sat 전체 표시) */
.day-labels {
    display: grid;
    grid-template-rows: repeat(7, 14px);
    gap: 3px;
    margin-right: 8px;
    font-size: 10px;
    color: #57606a;
    line-height: 14px;
}

.day-labels div {
    height: 14px;
    display: flex;
    align-items: center;
}

/* 잔디 그리드 (세로 방향 흐름) */
.rating-grid {
    display: grid;
    grid-template-columns: repeat(53, 14px);
    grid-template-rows: repeat(7, 14px);
    gap: 3px;
    grid-auto-flow: column; 
}

/* 기본 잔디 칸 */
.cell {
    width: 14px;
    height: 14px;
    background-color: #ebedf0;
    border-radius: 2px;
    transition: background-color 0.2s;
}

/* 점수별 레벨 색상 (짙은 녹색 테마) */
.level-0 { background-color: #ebedf0; }
.level-1 { background-color: #9be9a8; }
.level-2 { background-color: #40c463; }
.level-3 { background-color: #30a14e; }
.level-4 { background-color: #216e39; }
.level-5 { background-color: #1a4d29; }

/* 하단 범례 */
.rating-legend { 
    margin-top: 20px; 
    display: flex; 
    align-items: center; 
    font-size: 12px; 
    gap: 8px; 
    color: #57606a;
}
.legend-cells { display: flex; gap: 3px; }
</style>

<script src="{{ '/assets/js/rating-script.js' | relative_url }}"></script>

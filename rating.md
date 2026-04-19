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
/* 대시보드 전체 설정 */
.rating-dashboard { 
    max-width: 900px; 
    margin: 20px auto;
    overflow-x: auto; /* 모바일에서 가로 스크롤 허용 */
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
}

/* 연도별 섹션 */
.year-section { 
    margin-bottom: 50px; 
    min-width: 850px; /* PC에서 레이아웃 깨짐 방지 */
}

.year-title { 
    font-size: 20px; 
    font-weight: 600; 
    margin-bottom: 15px; 
    color: #24292f; 
}

/* 월 라벨 (PC 잘림 방지를 위해 절대 위치 및 줄바꿈 금지 적용) */
.month-labels {
    display: grid;
    grid-template-columns: 35px repeat(53, 14px);
    gap: 3px;
    margin-bottom: 8px;
    font-size: 11px;
    color: #57606a;
    height: 15px;
    position: relative;
}

.month-label {
    position: absolute;
    white-space: nowrap; /* PC에서 한 줄로 나오게 강제 */
    top: 0;
}

/* 요일 + 잔디 그리드 정렬 */
.grid-wrapper {
    display: flex;
    align-items: flex-start;
}

/* 요일 라벨 (Sun~Sat 전체 표시) */
.day-labels {
    display: grid;
    grid-template-rows: repeat(7, 14px);
    gap: 3px;
    margin-right: 10px;
    font-size: 10px;
    color: #57606a;
}

.day-labels div {
    height: 14px;
    display: flex;
    align-items: center;
}

/* 잔디 그리드 (세로 방향 흐름: 일요일부터 아래로 채움) */
.rating-grid {
    display: grid;
    grid-template-columns: repeat(53, 14px);
    grid-template-rows: repeat(7, 14px);
    gap: 3px;
    grid-auto-flow: column; 
}

/* 잔디 칸 기본 스타일 */
.cell {
    width: 14px;
    height: 14px;
    background-color: #ebedf0;
    border-radius: 2px;
    transition: background-color 0.2s;
}

/* 레벨별 색상 */
.level-0 { background-color: #ebedf0; }
.level-1 { background-color: #9be9a8; }
.level-2 { background-color: #40c463; }
.level-3 { background-color: #30a14e; }
.level-4 { background-color: #216e39; }
.level-5 { background-color: #1a4d29; }

/* 하단 범례 */
.rating-legend { 
    margin-top: 25px; 
    display: flex; 
    align-items: center; 
    font-size: 12px; 
    gap: 8px; 
    color: #57606a;
}
.legend-cells { display: flex; gap: 3px; }
</style>

<script src="{{ '/assets/js/rating-script.js' | relative_url }}"></script>

---
layout: page
title: Daily Overall Rating
permalink: /rating/
---

<div class="rating-dashboard">
    <div id="rating-grid-container" class="rating-grid"></div>
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
/* Rating 페이지 전용 스타일 */
.rating-grid {
    display: inline-grid;
    grid-template-columns: repeat(53, 12px);
    grid-template-rows: repeat(7, 12px);
    gap: 3px;
    margin-top: 20px;
}

.cell {
    width: 12px;
    height: 12px;
    background-color: transparent; /* 기본은 투명 */
    border: 1px solid #f0f0f0; /* 위치 가이드를 위한 아주 연한 테두리 */
    border-radius: 2px;
}

/* 점수별 짙기 (GitHub 녹색 스케일) */
.level-0 { background-color: transparent; }
.level-1 { background-color: #9be9a8; }
.level-2 { background-color: #40c463; }
.level-3 { background-color: #30a14e; }
.level-4 { background-color: #216e39; }
.level-5 { background-color: #1a4d29; } /* 가장 짙은 색 */

.rating-legend {
    margin-top: 15px;
    display: flex;
    align-items: center;
    font-size: 12px;
    gap: 8px;
}
.legend-cells { display: flex; gap: 3px; }
</style>

<script src="{{ '/assets/js/rating-script.js' | relative_url }}"></script>

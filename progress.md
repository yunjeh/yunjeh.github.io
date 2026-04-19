---
layout: page
title: Progress
permalink: /progress/
---

<style>
    .progress-container { 
        padding: 20px 0;

        max-width: 1000px;
        box-sizing: border-box;
        margin: 20px auto;
        overflow-x: auto;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    
    .progress-section { 
        margin-bottom: 60px; 

    min-width: 900px; 
    }
    
    .progress-title { 
        font-size: 1.1rem; 
        margin-bottom: 15px; 
        font-weight: bold; 
        color: #333; 
    }

    /* 핵심 수정: 가로 폭을 100%로 제한하여 스크롤 유도 */
    .scroll-container {
        width: 100%;
        overflow-x: auto;
        padding-bottom: 10px;
        -webkit-overflow-scrolling: touch;
        display: block; /* 블록 요소로 지정 */
    }

    .scroll-content {
        display: inline-block;
        min-width: 900px; /* 잔디밭의 대략적인 최소 너비 확보 */
        vertical-align: top;
    }

    .month-labels {
        position: relative;
        height: 20px;
        margin-left: 38px; 
        margin-bottom: 5px;
    }

    .month-label {
        position: absolute;
        font-size: 11px;
        color: #57606a;
        white-space: nowrap;
    }

    .grid-wrapper {
        display: flex;
        align-items: flex-start;
    }

    .day-labels {
        display: grid;
        grid-template-rows: repeat(7, 14px);
        gap: 3px;
        margin-right: 10px;
        font-size: 10px;
        color: #57606a;
        padding-top: 1px;
    }

    .day-labels div { height: 14px; line-height: 14px; }

    .rating-grid {
        display: grid;
        grid-template-columns: repeat(53, 14px);
        grid-template-rows: repeat(7, 14px);
        grid-auto-flow: column;
        gap: 3px;
    }

    .cell {
        width: 14px;
        height: 14px;
        background-color: #ebedf0;
        border-radius: 2px;
    }

    /* 색상 농도 */
    .level-1 { background-color: #9be9a8 !important; }
    .level-2 { background-color: #40c463 !important; }
    .level-3 { background-color: #30a14e !important; }
    .level-4 { background-color: #216e39 !important; }
    .level-5 { background-color: #1b4b29 !important; }
</style>

<div class="progress-container">
    </div>
    <div class="progress-legend">
        <span>Less</span>
        <div class="legend-cells">
            <div class="cell level-0"></div>
            <div class="cell level-1"></div>
            <div class="cell level-2"></div>
            <div class="cell level-3"></div>
            <div class="cell level-4"></div>
            <div class="cell level-5"></div>
        </div>
        <span>More</span>
    </div>
<script src="{{ '/assets/js/progress.js' | relative_url }}"></script>

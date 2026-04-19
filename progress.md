---
layout: default
title: Progress
permalink: /progress/
---

<style>
    .progress-container { padding: 20px 0; }
    .progress-section { margin-bottom: 60px; }
    .progress-title { font-size: 1.1rem; margin-bottom: 15px; font-weight: bold; color: #333; }

    /* 월 라벨과 잔디밭이 함께 스크롤되도록 감싸는 컨테이너 */
    .scroll-container {
        overflow-x: auto;
        padding-bottom: 10px;
        -webkit-overflow-scrolling: touch;
    }

    .scroll-content {
        display: inline-block;
        min-width: min-content;
        vertical-align: top;
    }

    /* 월 라벨: 요일 라벨 너비(38px)만큼 왼쪽 여백을 줌 */
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

    /* 점수별 농도 (rating.js와 동일한 5단계) */
    .level-1 { background-color: #9be9a8 !important; }
    .level-2 { background-color: #40c463 !important; }
    .level-3 { background-color: #30a14e !important; }
    .level-4 { background-color: #216e39 !important; }
    .level-5 { background-color: #1b4b29 !important; }
</style>

<div class="progress-container">
    </div>

<script src="{{ '/assets/js/progress.js' | relative_url }}"></script>

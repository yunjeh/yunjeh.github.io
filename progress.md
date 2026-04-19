---
layout: default
title: Progress
permalink: /progress/
---

<style>
    /* 전체 컨테이너 여백 */
    .progress-container {
        padding: 20px 0;
    }

    /* 각 섹션(Workout, Practice) 간격 */
    .progress-section {
        position: relative;
        margin-bottom: 60px; /* 월 라벨 공간 확보 */
    }

    .progress-title {
        font-size: 1.1rem;
        margin-bottom: 30px;
        font-weight: bold;
    }

    /* 월 라벨 레이어 (부모가 relative여야 함) */
    .month-labels {
        position: relative;
        height: 20px;
        margin-bottom: 5px;
        width: 100%;
    }

    .month-label {
        position: absolute;
        font-size: 11px;
        color: #57606a;
        white-space: nowrap;
    }

    /* 그리드와 요일 라벨 정렬 */
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
        padding-top: 1px; /* 그리드 셀과 수평 맞춤 */
    }

    .day-labels div {
        height: 14px;
        line-height: 14px;
    }

    /* 잔디 그리드 설정 */
    .rating-grid {
        display: grid;
        grid-template-columns: repeat(53, 14px);
        grid-template-rows: repeat(7, 14px);
        grid-auto-flow: column;
        gap: 3px;
    }

    /* 개별 셀 스타일 */
    .cell {
        width: 14px;
        height: 14px;
        background-color: #ebedf0;
        border-radius: 2px;
    }

    /* 점수별 색상 농도 */
    .level-1 { background-color: #9be9a8 !important; }
    .level-2 { background-color: #40c463 !important; }
    .level-3 { background-color: #30a14e !important; }
    .level-4 { background-color: #216e39 !important; }
    .level-5 { background-color: #1b4b29 !important; }

    /* 가로 스크롤 허용 (모바일 대응) */
    .grid-wrapper {
        overflow-x: auto;
        padding-bottom: 10px;
    }
</style>

<div class="progress-container">
    </div>

<script src="{{ '/assets/js/progress.js' | relative_url }}"></script>

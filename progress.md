---
layout: default
title: Progress
permalink: /progress/
---

<div class="progress-container">
    <section class="progress-section">
        <h3>Workout Progress (Current Year)</h3>
        <div class="grid-wrapper">
            <div id="workout-grid" class="grid"></div>
        </div>
    </section>

    <section class="progress-section">
        <h3>Practice Progress (Current Year)</h3>
        <div class="grid-wrapper">
            <div id="practice-grid" class="grid"></div>
        </div>
    </section>
</div>

<style>
    .progress-section { margin-bottom: 40px; }
    .progress-section h3 { font-size: 16px; color: #57606a; margin-bottom: 15px; }
    .grid-wrapper { overflow-x: auto; }
    .grid {
        display: inline-grid;
        grid-template-columns: repeat(53, 11px);
        grid-template-rows: repeat(7, 11px);
        gap: 3px;
    }
    .cell {
        width: 11px;
        height: 11px;
        background-color: #ebedf0;
        border-radius: 2px;
    }
    /* 점수별 농도 설정 */
    .level-1 { background-color: #9be9a8 !important; }
    .level-2 { background-color: #40c463 !important; }
    .level-3 { background-color: #30a14e !important; }
    .level-4 { background-color: #216e39 !important; }
</style>

<script src="{{ '/assets/js/progress.js' | relative_url }}"></script>

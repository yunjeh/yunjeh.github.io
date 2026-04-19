---
layout: page
title: 5-Year Overall Rating
permalink: /rating/
---

<div class="rating-dashboard">
    <div id="years-container">
        </div>

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
.year-section { margin-bottom: 40px; }
.year-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; color: #333; }

.month-labels {
    display: grid;
    grid-template-columns: repeat(53, 12px);
    gap: 3px;
    margin-bottom: 5px;
    font-size: 11px;
    color: #57606a;
}

.rating-grid {
    display: inline-grid;
    grid-template-columns: repeat(53, 12px);
    grid-template-rows: repeat(7, 12px);
    gap: 3px;
}

.cell {
    width: 12px;
    height: 12px;
    background-color: transparent;
    border: 1px solid #f0f0f0;
    border-radius: 2px;
}

.level-1 { background-color: #9be9a8; }
.level-2 { background-color: #40c463; }
.level-3 { background-color: #30a14e; }
.level-4 { background-color: #216e39; }
.level-5 { background-color: #1a4d29; }

.rating-legend { margin-top: 20px; display: flex; align-items: center; font-size: 12px; gap: 8px; }
.legend-cells { display: flex; gap: 3px; }
</style>

<script src="{{ '/assets/js/rating-script.js' | relative_url }}"></script>

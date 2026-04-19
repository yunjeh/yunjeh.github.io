---
layout: page
title: Activity Progress
permalink: /progress/
---

<style>
    .combined-container { padding: 20px 0; width: 100%; max-width: 100%; box-sizing: border-box; }
    .section-group { margin-bottom: 50px; border-bottom: 1px solid #eee; padding-bottom: 30px; }
    .section-title { font-size: 1.5rem; margin-bottom: 25px; font-weight: bold; color: #222; border-left: 5px solid #30a14e; padding-left: 15px; }
    .progress-section { margin-bottom: 40px; width: 100%; }
    .progress-title { font-size: 1.1rem; margin-bottom: 15px; font-weight: bold; color: #555; }

    .scroll-container { width: 100%; overflow-x: auto; padding-bottom: 15px; -webkit-overflow-scrolling: touch; }
    .scroll-content { display: inline-block; min-width: 900px; vertical-align: top; }

    .month-labels { position: relative; height: 20px; margin-left: 38px; margin-bottom: 5px; }
    .month-label { position: absolute; font-size: 11px; color: #57606a; white-space: nowrap; }

    .grid-wrapper { display: flex; align-items: flex-start; }
    .day-labels { display: grid; grid-template-rows: repeat(7, 14px); gap: 3px; margin-right: 10px; font-size: 10px; color: #57606a; padding-top: 1px; }
    .day-labels div { height: 14px; line-height: 14px; }

    .rating-grid { display: grid; grid-template-columns: repeat(53, 14px); grid-template-rows: repeat(7, 14px); grid-auto-flow: column; gap: 3px; }
    .cell { width: 14px; height: 14px; background-color: #ebedf0; border-radius: 2px; }

    .level-1 { background-color: #9be9a8 !important; }
    .level-2 { background-color: #40c463 !important; }
    .level-3 { background-color: #30a14e !important; }
    .level-4 { background-color: #216e39 !important; }
    .level-5 { background-color: #1b4b29 !important; }
</style>

<div class="combined-container">
    <div class="section-group">
        <h2 class="section-title">Overall Ratings</h2>
        <div id="overall-container"></div>
    </div>

    <div class="section-group">
        <h2 class="section-title">Specific Progress</h2>
        <div id="progress-container"></div>
    </div>
</div>

<script src="{{ '/assets/js/ratings.js' | relative_url }}"></script>
<script src="{{ '/assets/js/progress.js' | relative_url }}"></script>

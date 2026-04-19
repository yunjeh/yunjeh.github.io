if (typeof OWNER === 'undefined') var OWNER = 'yunjeh';
if (typeof REPO === 'undefined') var REPO = 'yunjeh.github.io';

async function initProgress() {
    const container = document.getElementById('progress-container');
    if (!container) return;

    const currentYear = new Date().getFullYear();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const types = [
        { key: 'workout', title: 'Workout (Daily)', idx: 6 },
        { key: 'practice', title: 'Practice (Daily)', idx: 7 }
    ];
    
    const allCells = { workout: {}, practice: {} };
    const latestData = { workout: {}, practice: {} };

    container.innerHTML = '';
    types.forEach(type => {
        const section = document.createElement('div');
        section.className = 'progress-section';
        section.innerHTML = `<div class="progress-title">${type.title}</div><div class="scroll-container"><div class="scroll-content"><div id="months-${type.key}-${currentYear}" class="month-labels"></div><div class="grid-wrapper"><div class="day-labels"><div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div></div><div id="grid-${type.key}-${currentYear}" class="rating-grid"></div></div></div></div>`;
        container.appendChild(section);
        const grid = document.getElementById(`grid-${type.key}-${currentYear}`);
        const monthLabels = document.getElementById(`months-${type.key}-${currentYear}`);
        const jan1 = new Date(currentYear, 0, 1, 12, 0, 0);
        const startCalendar = new Date(jan1);
        startCalendar.setDate(jan1.getDate() - jan1.getDay());
        let lastMonth = -1;
        for (let i = 0; i < 371; i++) {
            const d = new Date(startCalendar);
            d.setDate(startCalendar.getDate() + i);
            const y = d.getFullYear();
            const dateKey = `${y}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
            const cell = document.createElement('div');
            cell.className = 'cell';
            if (y === currentYear) {
                cell.setAttribute('data-date', dateKey);
                allCells[type.key][dateKey] = cell;
                if (d.getDay() === 0) {
                    const currentMonth = d.getMonth();
                    if (currentMonth !== lastMonth) {
                        const lbl = document.createElement('div');
                        lbl.className = 'month-label';
                        lbl.innerText = months[currentMonth];
                        lbl.style.left = `${Math.floor(i / 7) * 17}px`;
                        monthLabels.appendChild(lbl);
                        lastMonth = currentMonth;
                    }
                }
            } else { cell.style.visibility = "hidden"; }
            grid.appendChild(cell);
        }
    });

    try {
        const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/_ratings`);
        const files = await response.json();
        if (!Array.isArray(files)) return;

        // 파일명 순서대로 정렬 (시간순)
        files.sort((a, b) => a.name.localeCompare(b.name));

        files.forEach(file => {
            if (file.name === '.gitkeep' || !file.name.endsWith('.md')) return;
            const parts = file.name.replace('.md', '').split('-');
            if (parts.length >= 9 && parseInt(parts[0]) === currentYear) {
                const dateKey = `${parts[0]}.${parts[1]}.${parts[2]}`;
                types.forEach(t => {
                    const val = parseFloat(parts[t.idx]);
                    if (val > 0) {
                        // 같은 날짜면 나중에 나온 파일의 점수가 덮어씀 (최신 데이터 유지)
                        latestData[t.key][dateKey] = val;
                    }
                });
            }
        });

        types.forEach(t => {
            for (const date in latestData[t.key]) {
                const score = latestData[t.key][date];
                const target = allCells[t.key][date];
                if (target) {
                    let level = 1;
                    if (score > 1.0 && score <= 2.5) level = 2;
                    else if (score <= 3.5) level = 3;
                    else if (score <= 4.5) level = 4;
                    else if (score > 4.5) level = 5;
                    target.className = `cell level-${level}`;
                    target.title = `${date} (Latest: ${score})`;
                }
            }
        });
    } catch (e) { console.error(e); }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProgress);
} else {
    initProgress();
}

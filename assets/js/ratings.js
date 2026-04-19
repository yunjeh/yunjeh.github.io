const OWNER = 'yunjeh';
const REPO = 'yunjeh.github.io';

async function initRatings() {
    const container = document.getElementById('overall-container');
    if (!container) return;

    const currentYear = new Date().getFullYear();
    const years = [currentYear, currentYear - 1, currentYear - 2];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const allCells = {};
    const scoreData = {};

    years.forEach(year => {
        const section = document.createElement('div');
        section.className = 'progress-section';
        section.innerHTML = `<div class="progress-title">${year} Overall Status</div><div class="scroll-container"><div class="scroll-content"><div id="months-overall-${year}" class="month-labels"></div><div class="grid-wrapper"><div class="day-labels"><div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div></div><div id="grid-overall-${year}" class="rating-grid"></div></div></div></div>`;
        container.appendChild(section);
        const grid = document.getElementById(`grid-overall-${year}`);
        const monthLabels = document.getElementById(`months-overall-${year}`);
        const jan1 = new Date(year, 0, 1, 12, 0, 0);
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
            if (y === year) {
                cell.setAttribute('data-date', dateKey);
                allCells[dateKey] = cell;
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

        files.forEach(file => {
            if (file.name === '.gitkeep' || !file.name.endsWith('.md')) return;
            const parts = file.name.replace('.md', '').split('-');
            if (parts.length >= 9) {
                const dateKey = `${parts[0]}.${parts[1]}.${parts[2]}`;
                const overall = parseFloat(parts[8]);
                
                // 0이 아닌 경우에만 평균 계산에 포함
                if (overall > 0) {
                    if (!scoreData[dateKey]) scoreData[dateKey] = { total: 0, count: 0 };
                    scoreData[dateKey].total += overall;
                    scoreData[dateKey].count += 1;
                }
            }
        });

        for (const date in scoreData) {
            const avg = scoreData[date].total / scoreData[date].count;
            const target = allCells[date];
            if (target) {
                let level = 1;
                if (avg > 1.0 && avg <= 2.5) level = 2;
                else if (avg <= 3.5) level = 3;
                else if (avg <= 4.5) level = 4;
                else if (avg > 4.5) level = 5;
                target.className = `cell level-${level}`;
                target.title = `${date} (Avg: ${avg.toFixed(1)})`;
            }
        }
    } catch (e) { console.error(e); }
}
initRatings();

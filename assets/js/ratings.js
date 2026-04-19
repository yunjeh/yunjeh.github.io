if (typeof OWNER === 'undefined') var OWNER = 'yunjeh';
if (typeof REPO === 'undefined') var REPO = 'yunjeh.github.io';

async function initRatings() {
    const container = document.getElementById('overall-container');
    if (!container) return;

    const currentYear = new Date().getFullYear();
    const years = [currentYear, currentYear - 1, currentYear - 2];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const allCells = {};
    const latestData = {}; // 날짜별 마지막 점수를 저장할 객체

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

        // 파일명 정렬 (날짜/시간 순으로 오름차순 정렬하여 마지막 파일이 최신이 되게 함)
        files.sort((a, b) => a.name.localeCompare(b.name));

        files.forEach(file => {
            if (file.name === '.gitkeep' || !file.name.endsWith('.md')) return;
            const parts = file.name.replace('.md', '').split('-');
            if (parts.length >= 9) {
                const dateKey = `${parts[0]}.${parts[1]}.${parts[2]}`;
                const overall = parseFloat(parts[8]);
                
                // 0이 아니면 덮어쓰기 (마지막 파일이 결국 저장됨)
                if (overall > 0) {
                    latestData[dateKey] = overall;
                }
            }
        });

        for (const date in latestData) {
            const score = latestData[date];
            const target = allCells[date];
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
    } catch (e) { console.error(e); }
}
initRatings();

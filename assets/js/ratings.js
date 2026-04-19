const OWNER = 'yunjeh';
const REPO = 'yunjeh.github.io';

async function initRating() {
    const container = document.getElementById('years-container');
    if (!container) return;

    const currentYear = new Date().getFullYear();
    const years = [currentYear, currentYear - 1, currentYear - 2]; 
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const allCells = {};
    const scoreData = {}; 

    // UI 그리드 생성 로직 (기존과 동일)
    years.forEach(year => {
        const section = document.createElement('div');
        section.className = 'year-section';
        section.innerHTML = `<div class="year-title">${year}</div><div id="months-${year}" class="month-labels"></div><div class="grid-wrapper"><div class="day-labels"><div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div></div><div id="grid-${year}" class="rating-grid"></div></div>`;
        container.appendChild(section);
        const grid = document.getElementById(`grid-${year}`);
        const monthLabels = document.getElementById(`months-${year}`);
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
                        const leftOffset = 38 + (Math.floor(i / 7) * 17); 
                        lbl.style.left = `${leftOffset}px`;
                        monthLabels.appendChild(lbl);
                        lastMonth = currentMonth;
                    }
                }
            } else { cell.style.visibility = "hidden"; }
            grid.appendChild(cell);
        }
    });

    try {
        // _ratings 폴더의 파일 목록만 가져옴
        const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/_ratings`);
        const files = await response.json();
        if (!Array.isArray(files)) return;

        files.forEach(file => {
            if (file.name === '.gitkeep' || !file.name.endsWith('.md')) return;

            // 파일명 파싱: 2026-04-19-18-30-00-workout-practice-overall.md
            // '-'로 분리하면 [0]연, [1]월, [2]일, ..., [6]workout, [7]practice, [8]overall
            const parts = file.name.replace('.md', '').split('-');
            if (parts.length >= 9) {
                const dateKey = `${parts[0]}.${parts[1]}.${parts[2]}`;
                const overall = parseFloat(parts[8]);

                if (overall > 0) {
                    if (!scoreData[dateKey]) scoreData[dateKey] = { total: 0, count: 0 };
                    scoreData[dateKey].total += overall;
                    scoreData[dateKey].count += 1;
                }
            }
        });

        for (const date in scoreData) {
            const avgScore = scoreData[date].total / scoreData[date].count;
            const targetCell = allCells[date];
            if (targetCell) {
                let level = 0;
                if (avgScore <= 1.0) level = 1;
                else if (avgScore <= 2.5) level = 2;
                else if (avgScore <= 3.5) level = 3;
                else if (avgScore <= 4.5) level = 4;
                else level = 5;
                targetCell.className = `cell level-${level}`;
            }
        }
    } catch (e) { console.error(e); }
}
initRating();

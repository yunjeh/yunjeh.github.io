const OWNER = 'yunjeh';
const REPO = 'yunjeh.github.io';

async function initRating() {
    const container = document.getElementById('years-container');
    const currentYear = new Date().getFullYear();
    const years = [currentYear, currentYear-1, currentYear-2, currentYear-3, currentYear-4];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const allCells = {};
    const scoreData = {}; 

    // 1. 그리드 생성 로직
    years.forEach(year => {
        const section = document.createElement('div');
        section.className = 'year-section';
        section.innerHTML = `
            <div class="year-title">${year}</div>
            <div id="months-${year}" class="month-labels"><div></div></div>
            <div class="grid-wrapper">
                <div class="day-labels">
                    <div></div><div>Mon</div><div></div><div>Wed</div><div></div><div>Fri</div><div></div>
                </div>
                <div id="grid-${year}" class="rating-grid"></div>
            </div>
        `;
        container.appendChild(section);

        const grid = document.getElementById(`grid-${year}`);
        const monthLabels = document.getElementById(`months-${year}`);
        const firstDayOfYear = new Date(year, 0, 1);
        const startDay = new Date(firstDayOfYear);
        startDay.setDate(firstDayOfYear.getDate() - firstDayOfYear.getDay());

        let lastMonth = -1;
        for (let i = 0; i < 371; i++) {
            const d = new Date(startDay);
            d.setDate(startDay.getDate() + i);
            if (d.getFullYear() > year) break;

            const cell = document.createElement('div');
            cell.className = 'cell';
            const dateKey = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
            cell.setAttribute('data-date', dateKey);
            grid.appendChild(cell);
            allCells[dateKey] = cell;

            if (d.getDay() === 0) {
                const m = d.getMonth();
                if (m !== lastMonth && d.getFullYear() === year) {
                    const lbl = document.createElement('div');
                    lbl.innerText = months[m];
                    lbl.style.gridColumnStart = Math.floor(i / 7) + 2; 
                    monthLabels.appendChild(lbl);
                    lastMonth = m;
                }
            }
        }
    });

    // 2. 데이터 페치 및 0점 제외 필터링
    try {
        const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/_posts`);
        const files = await response.json();
        if (!Array.isArray(files)) return;

        await Promise.all(files.map(async (file) => {
            if (file.name === '.gitkeep') return;
            const res = await fetch(file.download_url);
            const text = await res.text();

            const overallMatch = text.match(/overall:\s*([\d.]+)/i);
            const dateMatch = text.match(/date:\s*["']?(\d{4})[./-](\d{2})[./-](\d{2})/i);

            if (overallMatch && dateMatch) {
                const score = parseFloat(overallMatch[1]);
                const pureDate = `${dateMatch[1]}.${dateMatch[2]}.${dateMatch[3]}`;
                
                // 0점보다 큰 경우에만 통계에 포함
                if (score > 0) {
                    if (!scoreData[pureDate]) {
                        scoreData[pureDate] = { total: 0, count: 0 };
                    }
                    scoreData[pureDate].total += score;
                    scoreData[pureDate].count += 1;
                }
            }
        }));

        // 3. 평균 산출 및 색칠
        for (const date in scoreData) {
            const avgScore = scoreData[date].total / scoreData[date].count;
            const targetCell = allCells[date];

            if (targetCell) {
                let level = 0;
                // 평균 점수에 따른 레벨 분류
                if (avgScore > 0 && avgScore <= 1.0) level = 1;
                else if (avgScore <= 2.5) level = 2;
                else if (avgScore <= 3.5) level = 3;
                else if (avgScore <= 4.5) level = 4;
                else if (avgScore >= 4.6) level = 5;

                targetCell.className = `cell level-${level}`;
                targetCell.title = `${date}: Avg ${avgScore.toFixed(1)} (${scoreData[date].count} active posts)`;
            }
        }
    } catch (e) { console.error(e); }
}

initRating();

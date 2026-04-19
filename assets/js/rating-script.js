const OWNER = 'yunjeh';
const REPO = 'yunjeh.github.io';

async function initRating() {
    const container = document.getElementById('years-container');
    const currentYear = new Date().getFullYear();
    const years = [currentYear, currentYear-1, currentYear-2, currentYear-3, currentYear-4];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const allCells = {};

    years.forEach(year => {
        const section = document.createElement('div');
        section.className = 'year-section';
        section.innerHTML = `
            <div class="year-title">${year}</div>
            <div id="months-${year}" class="month-labels"><div></div></div> <div class="grid-wrapper">
                <div class="day-labels">
                    <div></div><div>Mon</div><div></div><div>Wed</div><div></div><div>Fri</div><div></div>
                </div>
                <div id="grid-${year}" class="rating-grid"></div>
            </div>
        `;
        container.appendChild(section);

        const grid = document.getElementById(`grid-${year}`);
        const monthLabels = document.getElementById(`months-${year}`);

        // 해당 연도의 1월 1일 설정
        const firstDayOfYear = new Date(year, 0, 1);
        // 1월 1일이 속한 주의 일요일 찾기 (그리드 시작점)
        const startDay = new Date(firstDayOfYear);
        startDay.setDate(firstDayOfYear.getDate() - firstDayOfYear.getDay());

        let lastMonth = -1;
        // 1년은 약 53주 (7 * 53 = 371일)
        for (let i = 0; i < 371; i++) {
            const d = new Date(startDay);
            d.setDate(startDay.getDate() + i);
            
            // 다음 연도로 넘어가면 그만 그리기
            if (d.getFullYear() > year) break;

            const cell = document.createElement('div');
            cell.className = 'cell';
            
            // 날짜 키: "2026.04.19"
            const dateKey = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
            
            cell.setAttribute('data-date', dateKey);
            grid.appendChild(cell);
            allCells[dateKey] = cell;

            // 월 라벨 처리 (일요일이면서 월이 바뀌었을 때)
            if (d.getDay() === 0) {
                const m = d.getMonth();
                if (m !== lastMonth && d.getFullYear() === year) {
                    const lbl = document.createElement('div');
                    lbl.innerText = months[m];
                    // 요일 라벨 공간(1) + 현재 주차(column)
                    lbl.style.gridColumnStart = Math.floor(i / 7) + 2; 
                    monthLabels.appendChild(lbl);
                    lastMonth = m;
                }
            }
        }
    });

    // 데이터 페치 로직
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
                const targetCell = allCells[pureDate];
                if (targetCell) {
                    let level = 0;
                    if (score > 0 && score <= 1.0) level = 1;
                    else if (score <= 2.5) level = 2;
                    else if (score <= 3.5) level = 3;
                    else if (score <= 4.5) level = 4;
                    else if (score >= 4.6) level = 5;
                    targetCell.className = `cell level-${level}`;
                    targetCell.title = `${pureDate}: ${score}`;
                }
            }
        }));
    } catch (e) { console.error(e); }
}

initRating();

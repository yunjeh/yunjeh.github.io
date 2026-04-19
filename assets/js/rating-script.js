const OWNER = 'yunjeh';
const REPO = 'yunjeh.github.io';

async function initRating() {
    const container = document.getElementById('years-container');
    const currentYear = new Date().getFullYear();
    const years = [currentYear, currentYear-1, currentYear-2, currentYear-3, currentYear-4];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const allCells = {};
    const scoreData = {}; 

    years.forEach(year => {
        const section = document.createElement('div');
        section.className = 'year-section';
        section.innerHTML = `
            <div class="year-title">${year}</div>
            <div id="months-${year}" class="month-labels"><div></div></div>
            <div class="grid-wrapper">
                <div class="day-labels">
                    <div>Sun</div><div></div><div>Tue</div><div></div><div>Thu</div><div></div><div>Sat</div>
                </div>
                <div id="grid-${year}" class="rating-grid"></div>
            </div>
        `;
        container.appendChild(section);

        const grid = document.getElementById(`grid-${year}`);
        const monthLabels = document.getElementById(`months-${year}`);

        // 해당 연도의 1월 1일
        const firstDay = new Date(year, 0, 1);
        // 1월 1일이 일요일(0)이 아닐 경우, 그 주의 일요일로 거슬러 올라감
        const startCalendar = new Date(firstDay);
        startCalendar.setDate(firstDay.getDate() - firstDay.getDay());

        let lastMonth = -1;

        // 1년 53주(371일) 고정 루프
        for (let i = 0; i < 371; i++) {
            const d = new Date(startCalendar);
            d.setDate(startCalendar.getDate() + i);
            
            const cell = document.createElement('div');
            cell.className = 'cell';

            // 날짜 키 생성: "2026.04.19"
            const dateKey = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
            
            // 현재 처리 중인 연도와 일치할 때만 ID와 데이터를 부여 (연도 경계선 명확화)
            if (d.getFullYear() === year) {
                cell.setAttribute('data-date', dateKey);
                allCells[dateKey] = cell;
                
                // 월 라벨 (해당 연도의 날짜이고, 첫 번째 행(일요일)일 때만)
                if (d.getDay() === 0) {
                    const m = d.getMonth();
                    if (m !== lastMonth) {
                        const lbl = document.createElement('div');
                        lbl.innerText = months[m];
                        lbl.style.gridColumnStart = Math.floor(i / 7) + 2; 
                        monthLabels.appendChild(lbl);
                        lastMonth = m;
                    }
                }
            } else {
                // 해당 연도가 아니면 그냥 빈 칸(공간 채우기용)
                cell.style.opacity = "0.2"; 
            }

            grid.appendChild(cell);
        }
    });

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
                
                if (score > 0) {
                    if (!scoreData[pureDate]) {
                        scoreData[pureDate] = { total: 0, count: 0 };
                    }
                    scoreData[pureDate].total += score;
                    scoreData[pureDate].count += 1;
                }
            }
        }));

        for (const date in scoreData) {
            const avgScore = scoreData[date].total / scoreData[date].count;
            const targetCell = allCells[date];

            if (targetCell) {
                let level = 0;
                if (avgScore > 0 && avgScore <= 1.0) level = 1;
                else if (avgScore <= 2.5) level = 2;
                else if (avgScore <= 3.5) level = 3;
                else if (avgScore <= 4.5) level = 4;
                else if (avgScore >= 4.6) level = 5;

                targetCell.className = `cell level-${level}`;
                targetCell.title = `${date}: Avg ${avgScore.toFixed(1)} (${scoreData[date].count} posts)`;
            }
        }
    } catch (e) { console.error("Data Load Error:", e); }
}

initRating();

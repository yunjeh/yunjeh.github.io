const OWNER = 'yunjeh';
const REPO = 'yunjeh.github.io';

async function initRating() {
    const container = document.getElementById('years-container');
    if (!container) return;

    const currentYear = new Date().getFullYear();
    // 최근 5년치 생성
    const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const allCells = {};
    const scoreData = {}; 

    // 1. 연도별 그리드 구조 생성
    years.forEach(year => {
        const section = document.createElement('div');
        section.className = 'year-section';
        section.innerHTML = `
            <div class="year-title">${year}</div>
            <div id="months-${year}" class="month-labels"></div>
            <div class="grid-wrapper">
                <div class="day-labels">
                    <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
                </div>
                <div id="grid-${year}" class="rating-grid"></div>
            </div>
        `;
        container.appendChild(section);

        const grid = document.getElementById(`grid-${year}`);
        const monthLabels = document.getElementById(`months-${year}`);

        // 해당 연도의 1월 1일 기준 (오차 방지를 위해 정오로 설정)
        const jan1 = new Date(year, 0, 1, 12, 0, 0);
        // 1월 1일이 포함된 주의 일요일 찾기
        const startCalendar = new Date(jan1);
        startCalendar.setDate(jan1.getDate() - jan1.getDay());

        let lastMonth = -1;

        // 53주(371일) 고정 루프 생성
        for (let i = 0; i < 371; i++) {
            const d = new Date(startCalendar);
            d.setDate(startCalendar.getDate() + i);
            
            const cell = document.createElement('div');
            cell.className = 'cell';

            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const dateKey = `${y}.${m}.${day}`;
            
            if (y === year) {
                cell.setAttribute('data-date', dateKey);
                allCells[dateKey] = cell;
                
                // 일요일(맨 윗줄)일 때만 월 이름 체크
                if (d.getDay() === 0) {
                    const currentMonth = d.getMonth();
                    if (currentMonth !== lastMonth) {
                        const lbl = document.createElement('div');
                        lbl.className = 'month-label';
                        lbl.innerText = months[currentMonth];
                        
                        // PC 잘림 방지용 위치 계산: 요일너비(35px) + (주차 * (칸너비14 + 간격3))
                        const leftOffset = 35 + (Math.floor(i / 7) * 17); 
                        lbl.style.left = `${leftOffset}px`;
                        
                        monthLabels.appendChild(lbl);
                        lastMonth = currentMonth;
                    }
                }
            } else {
                // 해당 연도 날짜가 아니면 투명하게 숨김
                cell.style.visibility = "hidden"; 
            }
            grid.appendChild(cell);
        }
    });

    // 2. GitHub API 호출 및 점수 분석
    try {
        const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/_posts`);
        const files = await response.json();
        if (!Array.isArray(files)) return;

        await Promise.all(files.map(async (file) => {
            if (file.name === '.gitkeep' || !file.name.endsWith('.md')) return;
            
            try {
                const res = await fetch(file.download_url);
                const text = await res.text();
                const overallMatch = text.match(/overall:\s*([\d.]+)/i);
                const dateMatch = text.match(/date:\s*["']?(\d{4})[./-](\d{2})[./-](\d{2})/i);

                if (overallMatch && dateMatch) {
                    const score = parseFloat(overallMatch[1]);
                    const pureDate = `${dateMatch[1]}.${dateMatch[2]}.${dateMatch[3]}`;
                    
                    // 0점은 무시하고 0보다 클 때만 통계에 포함
                    if (score > 0) {
                        if (!scoreData[pureDate]) {
                            scoreData[pureDate] = { total: 0, count: 0 };
                        }
                        scoreData[pureDate].total += score;
                        scoreData[pureDate].count += 1;
                    }
                }
            } catch (err) { console.warn("Skip file:", file.name); }
        }));

        // 3. 최종 평균 점수로 잔디 색칠
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

const OWNER = 'yunjeh'; 
const REPO = 'yunjeh.github.io';

async function initProgress() {
    const container = document.querySelector('.progress-container');
    if (!container) return;

    const currentYear = new Date().getFullYear();
    const types = [
        { key: 'workout', title: 'Workout Progress' },
        { key: 'practice', title: 'Practice Progress' }
    ];
    
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const allCells = { workout: {}, practice: {} };
    const scoreData = { workout: {}, practice: {} };

    // 1. UI 구조 생성 (Workout과 Practice 각각 생성)
    types.forEach(type => {
        const section = document.createElement('div');
        section.className = 'progress-section';
        section.innerHTML = `
            <h3 class="progress-title">${type.title} (${currentYear})</h3>
            <div id="months-${type.key}" class="month-labels"></div>
            <div class="grid-wrapper">
                <div class="day-labels">
                    <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
                </div>
                <div id="grid-${type.key}" class="rating-grid"></div>
            </div>
        `;
        container.appendChild(section);

        const grid = document.getElementById(`grid-${type.key}`);
        const monthLabels = document.getElementById(`months-${type.key}`);

        // 해당 연도 1월 1일 기준 달력 시작일(일요일) 계산
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
                
                // 월 라벨 생성 로직
                if (d.getDay() === 0) {
                    const currentMonth = d.getMonth();
                    if (currentMonth !== lastMonth) {
                        const lbl = document.createElement('div');
                        lbl.className = 'month-label';
                        lbl.innerText = months[currentMonth];
                        
                        // 위치 계산: 요일 라벨 너비(38px) + (주차수 * (셀 14px + 갭 3px))
                        const leftOffset = 38 + (Math.floor(i / 7) * 17); 
                        lbl.style.left = `${leftOffset}px`;
                        
                        monthLabels.appendChild(lbl);
                        lastMonth = currentMonth;
                    }
                }
            } else {
                // 해당 연도가 아니면 투명하게 처리하여 공간만 차지
                cell.style.visibility = "hidden"; 
            }
            grid.appendChild(cell);
        }
    });

    try {
        const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/_posts`);
        const files = await response.json();
        if (!Array.isArray(files)) return;

        await Promise.all(files.map(async (file) => {
            if (file.name === '.gitkeep' || !file.name.endsWith('.md')) return;
            const res = await fetch(file.download_url);
            const text = await res.text();
            
            // 데이터 추출 (정규식)
            const workoutMatch = text.match(/workout:\s*([\d.]+)/i);
            const practiceMatch = text.match(/practice:\s*([\d.]+)/i);
            const dateMatch = text.match(/date:\s*["']?(\d{4})[./-](\d{2})[./-](\d{2})/i);

            if (dateMatch) {
                const yearOfPost = parseInt(dateMatch[1]);
                if (yearOfPost !== currentYear) return; // 올해 데이터만 처리

                const pureDate = `${dateMatch[1]}.${dateMatch[2]}.${dateMatch[3]}`;

                // Workout 데이터 누적
                if (workoutMatch) {
                    const val = parseFloat(workoutMatch[1]);
                    if (val > 0) {
                        if (!scoreData.workout[pureDate]) scoreData.workout[pureDate] = { total: 0, count: 0 };
                        scoreData.workout[pureDate].total += val;
                        scoreData.workout[pureDate].count += 1;
                    }
                }
                // Practice 데이터 누적
                if (practiceMatch) {
                    const val = parseFloat(practiceMatch[1]);
                    if (val > 0) {
                        if (!scoreData.practice[pureDate]) scoreData.practice[pureDate] = { total: 0, count: 0 };
                        scoreData.practice[pureDate].total += val;
                        scoreData.practice[pureDate].count += 1;
                    }
                }
            }
        }));

        // 셀 색칠하기
        ['workout', 'practice'].forEach(type => {
            for (const date in scoreData[type]) {
                const avgScore = scoreData[type][date].total / scoreData[type][date].count;
                const targetCell = allCells[type][date];
                if (targetCell) {
                    let level = 0;
                    if (avgScore > 0 && avgScore <= 1.0) level = 1;
                    else if (avgScore <= 2.5) level = 2;
                    else if (avgScore <= 3.5) level = 3;
                    else if (avgScore <= 4.5) level = 4;
                    else if (avgScore >= 4.6) level = 5;
                    targetCell.className = `cell level-${level}`;
                    targetCell.title = `${date}: ${avgScore.toFixed(1)}`;
                }
            }
        });
    } catch (e) { console.error(e); }
}

initProgress();

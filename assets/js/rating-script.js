const OWNER = 'yunjeh';
const REPO = 'yunjeh.github.io';

async function initRating() {
    const container = document.getElementById('years-container');
    if (!container) return;

    const currentYear = new Date().getFullYear();
    // 최근 5년치 연도 배열
    const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const allCells = {};
    const scoreData = {}; 

    console.log("잔디밭 빌드 시작...");

    // 1. 연도별 그리드 레이아웃 생성
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

        // 1월 1일 기준 설정 (시간 오차 방지를 위해 정오 기준)
        const jan1 = new Date(year, 0, 1, 12, 0, 0);
        // 1월 1일이 속한 주의 일요일로 시작점 이동
        const startCalendar = new Date(jan1);
        startCalendar.setDate(jan1.getDate() - jan1.getDay());

        let lastMonth = -1;

        // 53주(371일) 동안 그리드 칸 생성
        for (let i = 0; i < 371; i++) {
            const d = new Date(startCalendar);
            d.setDate(startCalendar.getDate() + i);
            
            const cell = document.createElement('div');
            cell.className = 'cell';

            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const dateKey = `${y}.${m}.${day}`;
            
            // 해당 연도에 속하는 날짜만 활성화
            if (y === year) {
                cell.setAttribute('data-date', dateKey);
                allCells[dateKey] = cell;
                
                // 월 이름 라벨 (일요일 행에서만 체크하여 열 상단에 배치)
                if (d.getDay() === 0) {
                    const currentMonth = d.getMonth();
                    if (currentMonth !== lastMonth) {
                        const lbl = document.createElement('div');
                        lbl.innerText = months[currentMonth];
                        // 요일라벨(1열) + 현재 주차(column)
                        lbl.style.gridColumnStart = Math.floor(i / 7) + 2; 
                        monthLabels.appendChild(lbl);
                        lastMonth = currentMonth;
                    }
                }
            } else {
                // 연초/연말의 다른 연도 날짜는 투명하게 숨김 (공간은 유지)
                cell.style.visibility = "hidden"; 
            }

            grid.appendChild(cell);
        }
    });

    // 2. GitHub API 데이터 호출 및 분석
    try {
        const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/_posts`);
        const files = await response.json();
        
        if (!Array.isArray(files)) {
            console.error("파일 목록을 불러오지 못했습니다.");
            return;
        }

        // 모든 포스트 내용을 병렬로 가져오기
        await Promise.all(files.map(async (file) => {
            if (file.name === '.gitkeep' || !file.name.endsWith('.md')) return;

            try {
                const res = await fetch(file.download_url);
                const text = await res.text();

                // 정규표현식으로 점수와 날짜 추출
                const overallMatch = text.match(/overall:\s*([\d.]+)/i);
                const dateMatch = text.match(/date:\s*["']?(\d{4})[./-](\d{2})[./-](\d{2})/i);

                if (overallMatch && dateMatch) {
                    const score = parseFloat(overallMatch[1]);
                    const pureDate = `${dateMatch[1]}.${dateMatch[2]}.${dateMatch[3]}`;
                    
                    // 0점보다 큰 점수만 평균 계산에 포함
                    if (score > 0) {
                        if (!scoreData[pureDate]) {
                            scoreData[pureDate] = { total: 0, count: 0 };
                        }
                        scoreData[pureDate].total += score;
                        scoreData[pureDate].count += 1;
                    }
                }
            } catch (err) {
                console.warn(`파일 분석 실패: ${file.name}`, err);
            }
        }));

        // 3. 계산된 평균 점수로 잔디 색칠
        for (const date in scoreData) {
            const avgScore = scoreData[date].total / scoreData[date].count;
            const targetCell = allCells[date];

            if (targetCell) {
                let level = 0;
                // 점수 구간별 레벨 설정 (5.0 만점 기준)
                if (avgScore > 0 && avgScore <= 1.0) level = 1;
                else if (avgScore <= 2.5) level = 2;
                else if (avgScore <= 3.5) level = 3;
                else if (avgScore <= 4.5) level = 4;
                else if (avgScore >= 4.6) level = 5;

                targetCell.className = `cell level-${level}`;
                // 툴팁: 날짜, 평균 점수, 참여 횟수 표시
                targetCell.title = `${date}: Avg ${avgScore.toFixed(1)} (${scoreData[date].count} posts)`;
            }
        }
        console.log("잔디밭 업데이트 완료!");
    } catch (e) {
        console.error("데이터 로드 중 치명적 에러:", e);
    }
}

// 스크립트 실행
initRating();

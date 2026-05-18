if (typeof OWNER === 'undefined') var OWNER = 'yunjeh';
if (typeof REPO === 'undefined') var REPO = 'yunjeh.github.io';

// 🎨 외부 CSS 파일 없이 JS 내부에서 직접 스타일을 주입합니다.
function injectStyles() {
    if (document.getElementById('overall-grass-styles')) return;

    const style = document.createElement('style');
    style.id = 'overall-grass-styles';
    style.innerHTML = `
        .progress-section {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
            margin-bottom: 30px;
            padding: 15px;
            background-color: #ffffff;
            border: 1px solid #e1e4e8;
            border-radius: 6px;
        }
        .progress-title {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 12px;
            color: #24292e;
        }
        .scroll-container {
            overflow-x: auto;
            width: 100%;
        }
        .scroll-content {
            min-width: 670px;
            position: relative;
            padding-top: 20px;
        }
        .month-labels {
            position: relative;
            height: 15px;
            font-size: 12px;
            color: #586069;
            margin-bottom: 4px;
        }
        .month-label {
            position: absolute;
        }
        .grid-wrapper {
            display: flex;
        }
        .day-labels {
            display: grid;
            grid-template-rows: repeat(7, 15px);
            grid-gap: 2px;
            font-size: 11px;
            color: #586069;
            margin-right: 8px;
            text-align: right;
            line-height: 15px;
        }
        .rating-grid {
            display: grid;
            grid-template-rows: repeat(7, 15px);
            grid-auto-flow: column;
            grid-auto-columns: 15px;
            grid-gap: 2px;
        }
        .cell {
            width: 15px;
            height: 15px;
            border-radius: 2px;
            background-color: #ebedf0;
            transition: background-color 0.2s ease;
        }
        /* 0 ~ 10단계 세분화 초록색 테마 */
        .cell.level-0  { background-color: #ebedf0; }
        .cell.level-1  { background-color: #e6f4ea; }
        .cell.level-2  { background-color: #cef0da; }
        .cell.level-3  { background-color: #b3e7c9; }
        .cell.level-4  { background-color: #98deb8; }
        .cell.level-5  { background-color: #7dd5a7; }
        .cell.level-6  { background-color: #62cc96; }
        .cell.level-7  { background-color: #47c385; }
        .cell.level-8  { background-color: #2bba74; }
        .cell.level-9  { background-color: #10b163; }
        .cell.level-10 { background-color: #00995c; }
    `;
    document.head.appendChild(style);
}

async function initUnifiedRatings() {
    const container = document.getElementById('overall-container');
    if (!container) return;

    // 스타일에 필요한 디자인 주입 실행
    injectStyles();

    const currentYear = new Date().getFullYear();
    const years = [currentYear]; // 올해 잔디밭만 생성
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const allCells = {};
    const latestData = {}; 

    // 1. 달력 그리드 HTML 구조 생성
    years.forEach(year => {
        const section = document.createElement('div');
        section.className = 'progress-section';
        section.innerHTML = `
            <div class="progress-title">${year} Overall Status</div>
            <div class="scroll-container">
                <div class="scroll-content">
                    <div id="months-overall-${year}" class="month-labels"></div>
                    <div class="grid-wrapper">
                        <div class="day-labels">
                            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
                        </div>
                        <div id="grid-overall-${year}" class="rating-grid"></div>
                    </div>
                </div>
            </div>
        `;
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
            cell.className = 'cell level-0'; 
            
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
            } else { 
                cell.style.visibility = "hidden"; 
            }
            grid.appendChild(cell);
        }
    });

    // 2. GitHub API 데이터 가져오기 및 단일 점수 파싱
    try {
        const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/_ratings`);
        const files = await response.json();
        if (!Array.isArray(files)) return;

        // 파일명 정렬 (날짜순 정렬 후 최신 파일이 뒤로 가도록 설정)
        files.sort((a, b) => a.name.localeCompare(b.name));

        files.forEach(file => {
            if (file.name === '.gitkeep' || !file.name.endsWith('.md')) return;
            
            // 파일명 분리 (예: "2026-05-18-7.md" -> ["2026", "05", "18", "7"])
            const parts = file.name.replace('.md', '').split('-');
            
            if (parts.length >= 4) {
                const dateKey = `${parts[0]}.${parts[1]}.${parts[2]}`;
                const score = parseFloat(parts[3]); // 날짜 바로 뒤에 오는 1개의 점수 추출
                
                if (!isNaN(score) && score >= 0) {
                    latestData[dateKey] = score;
                }
            }
        });

        // 3. 점수에 따라 0 ~ 10 레벨 클래스 동적 부여
        for (const date in latestData) {
            const score = latestData[date];
            const target = allCells[date];
            
            if (target) {
                let level = 0;
                
                if (score === 0) level = 0;
                else if (score <= 1.0) level = 1;
                else if (score <= 2.0) level = 2;
                else if (score <= 3.0) level = 3;
                else if (score <= 4.0) level = 4;
                else if (score <= 5.0) level = 5;
                else if (score <= 6.0) level = 6;
                else if (score <= 7.0) level = 7;
                else if (score <= 8.0) level = 8;
                else if (score <= 9.0) level = 9;
                else if (score > 9.0) level = 10;
                
                target.className = `cell level-${level}`;
                target.title = `${date} (Score: ${score})`;
            }
        }
    } catch (e) { 
        console.error(e); 
    }
}

// 스크립트 로드 시점 제어
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUnifiedRatings);
} else {
    initUnifiedRatings();
}

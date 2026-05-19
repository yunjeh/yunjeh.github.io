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
            min-width: 550px; /* 💡 칸이 줄어듦에 따라 최소 전체 너비도 최적화 */
            position: relative;
            padding-top: 24px;
        }
        .month-labels {
            position: relative;
            height: 18px;
            font-size: 11px;
            color: #586069;
            margin-bottom: 2px;
        }
        .month-label {
            position: absolute;
            white-space: nowrap;
        }
        .grid-wrapper {
            display: flex;
        }
        .rating-grid {
            display: grid;
            grid-template-rows: repeat(7, 9px); /* 💡 세로 9px로 축소 */
            grid-auto-flow: column;
            grid-auto-columns: 9px;            /* 💡 가로 9px로 축소 */
            grid-gap: 1px;                     /* 간격 1px */
        }
        .cell {
            width: 9px;                        /* 💡 셀 가로 크기 9px */
            height: 9px;                       /* 💡 셀 세로 크기 9px */
            border-radius: 1px;
            background-color: #ebedf0;
            transition: background-color 0.2s ease;
        }
        /* 0 ~ 10단계 노란색에서 진초록색으로 변하는 테마 */
        .cell.level-0  { background-color: #ebedf0 !important; }
        .cell.level-1  { background-color: #fef5d1 !important; }
        .cell.level-2  { background-color: #fbe69c !important; }
        .cell.level-3  { background-color: #e5df85 !important; }
        .cell.level-4  { background-color: #c0d875 !important; }
        .cell.level-5  { background-color: #9bcc6c !important; }
        .cell.level-6  { background-color: #74bf69 !important; }
        .cell.level-7  { background-color: #4cb168 !important; }
        .cell.level-8  { background-color: #21a167 !important; }
        .cell.level-9  { background-color: #008f61 !important; }
        .cell.level-10 { background-color: #007348 !important; }
    `;
    document.head.appendChild(style);
}

async function initUnifiedRatings() {
    const container = document.getElementById('overall-container');
    if (!container) return;

    injectStyles();

    const currentYear = new Date().getFullYear();
    const years = [currentYear];
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
                        // 💡 셀 너비(9px) + 간격(1px) = 총 10px 기준으로 월 라벨 위치를 정확히 정렬합니다.
                        lbl.style.left = `${Math.floor(i / 7) * 10}px`;
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

    // 2. GitHub API 데이터 가져오기
    try {
        const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/_overall`);
        
        if (!response.ok) {
            console.error(`GitHub API 호출 실패 (코드: ${response.status})`);
            return;
        }

        const files = await response.json();
        if (!Array.isArray(files)) return;

        files.sort((a, b) => a.name.localeCompare(b.name));

        files.forEach(file => {
            if (file.name === '.gitkeep' || !file.name.endsWith('.md')) return;
            
            const cleanName = file.name.substring(0, file.name.lastIndexOf('.md'));
            const parts = cleanName.split('-');
            
            if (parts.length >= 7) {
                const year = parts[0];
                const month = parts[1];
                const day = parts[2];
                const dateKey = `${year}.${month}.${day}`;
                
                const score = parseInt(parts[parts.length - 1], 10); 
                
                if (!isNaN(score) && score >= 0 && score <= 10) {
                    latestData[dateKey] = score;
                }
            }
        });

        // 3. 점수(0 ~ 10)에 따라 레벨 클래스 동적 부여
        for (const date in latestData) {
            const score = latestData[date];
            const target = allCells[date];
            
            if (target) {
                const level = Math.min(Math.max(score, 0), 10);
                target.className = `cell level-${level}`;
                target.title = `${date} (Latest Rating: ${score}/10)`;
            }
        }
    } catch (e) { 
        console.error("잔디밭 생성 중 오류 발생:", e); 
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUnifiedRatings);
} else {
    initUnifiedRatings();
}

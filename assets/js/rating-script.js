const OWNER = 'yunjeh';
const REPO = 'yunjeh.github.io';

async function initRating() {
    const container = document.getElementById('years-container');
    const currentYear = new Date().getFullYear();
    const years = [currentYear, currentYear-1, currentYear-2, currentYear-3, currentYear-4];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const allCells = {};

    // 1. 5년치 그리드 미리 생성
    years.forEach(year => {
        const section = document.createElement('div');
        section.className = 'year-section';
        section.innerHTML = `<div class="year-title">${year}</div>
                             <div id="months-${year}" class="month-labels"></div>
                             <div id="grid-${year}" class="rating-grid"></div>`;
        container.appendChild(section);

        const grid = document.getElementById(`grid-${year}`);
        const monthLabels = document.getElementById(`months-${year}`);

        // 해당 연도의 1월 1일부터 12월 31일까지 (혹은 현재날짜까지) 생성
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31);
        
        // 53주를 맞추기 위해 1월 1일이 속한 주의 일요일부터 시작하도록 계산
        const firstDay = new Date(startDate);
        firstDay.setDate(startDate.getDate() - startDate.getDay());

        let lastMonth = -1;
        for (let i = 0; i < 371; i++) { // 약 53주
            const d = new Date(firstDay);
            d.setDate(firstDay.getDate() + i);
            
            if (d.getFullYear() !== year && i > 360) break; // 연도가 넘어가면 중단

            const cell = document.createElement('div');
            cell.className = 'cell';
            const dateKey = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
            
            cell.setAttribute('data-date', dateKey);
            grid.appendChild(cell);
            allCells[dateKey] = cell;

            // 월 라벨 (새로운 열의 첫날일 때)
            if (i % 7 === 0) {
                const m = d.getMonth();
                if (m !== lastMonth) {
                    const lbl = document.createElement('div');
                    lbl.style.gridColumnStart = Math.floor(i / 7) + 1;
                    lbl.innerText = months[m];
                    monthLabels.appendChild(lbl);
                    lastMonth = m;
                }
            }
        }
    });

    // 2. 데이터 페치 및 색칠
    try {
        const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/_posts`);
        const files = await response.json();
        if (!Array.isArray(files)) return;

        for (const file of files) {
            if (file.name === '.gitkeep') continue;
            const res = await fetch(file.download_url);
            const text = await res.text();

            const overallMatch = text.match(/overall:\s*([\d.]+)/);
            const dateMatch = text.match(/date:\s*"((\d{4})\.(\d{2})\.(\d{2}))/);

            if (overallMatch && dateMatch) {
                const score = parseFloat(overallMatch[1]);
                const pureDate = dateMatch[1];
                const targetCell = allCells[pureDate];
                if (targetCell) {
                    let level = 0;
                    if (score > 0 && score <= 1.0) level = 1;
                    else if (score <= 2.5) level = 2;
                    else if (score <= 3.5) level = 3;
                    else if (score <= 4.5) level = 4;
                    else if (score > 4.5) level = 5;
                    targetCell.className = `cell level-${level}`;
                    targetCell.title = `${pureDate}: ${score}`;
                }
            }
        }
    } catch (e) { console.error("데이터 로드 중 오류:", e); }
}

initRating();

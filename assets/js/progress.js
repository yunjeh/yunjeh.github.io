const OWNER = 'yunjeh'; 
const REPO = 'yunjeh.github.io';

async function initProgress() {
    const workoutGrid = document.getElementById('workout-grid');
    const practiceGrid = document.getElementById('practice-grid');

    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 0, 1); // 올해 1월 1일
    
    // 1. 그리드 초기화 (올해 1월 1일부터 365~366일 생성)
    function createGrid(container) {
        for (let i = 0; i < 371; i++) { // 53주 분량
            const cell = document.createElement('div');
            cell.className = 'cell';
            const d = new Date(startDate);
            d.setDate(startDate.getDate() + i);
            
            // 올해 날짜만 표시
            if (d.getFullYear() === currentYear) {
                const dateKey = d.toISOString().split('T')[0].replace(/-/g, '.');
                cell.setAttribute('data-date', dateKey);
                container.appendChild(cell);
            }
        }
    }

    createGrid(workoutGrid);
    createGrid(practiceGrid);

    try {
        const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/_posts`);
        const files = await response.json();

        for (const file of files) {
            if (file.name === '.gitkeep') continue;

            const res = await fetch(file.download_url);
            const rawText = await res.text();

            // 데이터 파싱
            const dateMatch = rawText.match(/date: "(.*)"/);
            const workoutMatch = rawText.match(/workout: ([\d.]+)/);
            const practiceMatch = rawText.match(/practice: ([\d.]+)/);

            if (dateMatch) {
                const dateStr = dateMatch[1].split(' ')[0]; // "2026.04.19"
                if (!dateStr.startsWith(currentYear.toString())) continue;

                // Workout 잔디 칠하기
                if (workoutMatch) {
                    const val = parseFloat(workoutMatch[1]);
                    updateCell(workoutGrid, dateStr, val);
                }
                // Practice 잔디 칠하기
                if (practiceMatch) {
                    const val = parseFloat(practiceMatch[1]);
                    updateCell(practiceGrid, dateStr, val);
                }
            }
        }
    } catch (e) {
        console.error(e);
    }
}

function updateCell(container, date, value) {
    const cell = container.querySelector(`[data-date="${date}"]`);
    if (cell && value > 0) {
        // 점수에 따른 클래스 부여 (0.5~5.0 대응)
        let level = 1;
        if (value >= 4.5) level = 4;
        else if (value >= 3.0) level = 3;
        else if (value >= 1.5) level = 2;
        
        cell.classList.add(`level-${level}`);
    }
}

initProgress();

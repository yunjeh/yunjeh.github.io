const OWNER = 'your_id'; 
const REPO = 'your_repo'; 

async function initRating() {
    const grid = document.getElementById('rating-grid-container');
    const today = new Date();

    // 1. 1년치(371일) 빈 그리드 생성
    for (let i = 0; i < 371; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        const d = new Date();
        d.setDate(today.getDate() - (370 - i));
        const dateKey = d.toISOString().split('T')[0].replace(/-/g, '.');
        cell.setAttribute('data-date', dateKey);
        grid.appendChild(cell);
    }

    try {
        const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/_posts`);
        const files = await response.json();
        if (!Array.isArray(files)) return;

        for (const file of files) {
            if (file.name === '.gitkeep') continue;
            const res = await fetch(file.download_url);
            const text = await res.text();

            // 점수 및 날짜 파싱
            const overallMatch = text.match(/overall: ([\d.]+)/);
            const dateMatch = text.match(/date: "(.*)"/);

            if (overallMatch && dateMatch) {
                const score = parseFloat(overallMatch[1]);
                const pureDate = dateMatch[1].split(' ')[0]; // "2026.04.19"
                
                const targetCell = document.querySelector(`[data-date="${pureDate}"]`);
                if (targetCell) {
                    // 점수에 따른 레벨 결정 (5.0 기준)
                    let level = 0;
                    if (score > 0 && score <= 1.0) level = 1;
                    else if (score <= 2.5) level = 2;
                    else if (score <= 3.5) level = 3;
                    else if (score <= 4.5) level = 4;
                    else if (score > 4.5) level = 5;

                    targetCell.classList.add(`level-${level}`);
                    targetCell.title = `${pureDate}: ${score}`; // 마우스 올리면 점수 표시
                }
            }
        }
    } catch (e) {
        console.error("Rating 로드 실패:", e);
    }
}

initRating();

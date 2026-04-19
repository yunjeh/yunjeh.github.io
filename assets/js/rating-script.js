const OWNER = 'yunjeh'; 
const REPO = 'yunjeh.github.io'; // 리포지토리 이름을 정확히 입력하세요.

async function initRating() {
    const grid = document.getElementById('rating-grid-container');
    if (!grid) return;

    const today = new Date();
    const cells = {}; // 날짜별 셀을 저장할 객체

    // 1. 371일치 그리드 생성 (오늘이 맨 마지막)
    for (let i = 0; i < 371; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        
        const d = new Date();
        d.setDate(today.getDate() - (370 - i));
        
        // 날짜 형식을 "2026.04.19"로 통일 (앱 전송 형식과 일치)
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const dateKey = `${year}.${month}.${day}`;
        
        cell.setAttribute('data-date', dateKey);
        grid.appendChild(cell);
        cells[dateKey] = cell; // 빠른 참조를 위해 저장
    }

    try {
        // 2. GitHub API로 게시글 목록 가져오기
        const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/_posts`);
        const files = await response.json();
        
        if (!Array.isArray(files)) {
            console.error("파일 목록을 가져오지 못했습니다. 경로를 확인하세요.");
            return;
        }

        console.log(`${files.length}개의 파일을 찾았습니다. 분석을 시작합니다...`);

        for (const file of files) {
            if (file.name === '.gitkeep') continue;

            // 파일의 실제 내용 가져오기
            const res = await fetch(file.download_url);
            const text = await res.text();

            // 정규표현식으로 overall과 date 추출
            const overallMatch = text.match(/overall:\s*([\d.]+)/);
            const dateMatch = text.match(/date:\s*"((\d{4})\.(\d{2})\.(\d{2}))/);

            if (overallMatch && dateMatch) {
                const score = parseFloat(overallMatch[1]);
                const pureDate = dateMatch[1]; // "2026.04.19" 부분만 추출
                
                console.log(`발견: ${pureDate} - 점수: ${score}`);

                const targetCell = cells[pureDate];
                if (targetCell) {
                    let level = 0;
                    if (score > 0 && score <= 1.0) level = 1;
                    else if (score <= 2.5) level = 2;
                    else if (score <= 3.5) level = 3;
                    else if (score <= 4.5) level = 4;
                    else if (score > 4.5) level = 5;

                    // 기존 클래스 제거 후 새 레벨 추가
                    targetCell.className = `cell level-${level}`;
                    targetCell.title = `${pureDate}: ${score}`;
                }
            }
        }
    } catch (e) {
        console.error("데이터를 불러오는 중 오류 발생:", e);
    }
}

initRating();

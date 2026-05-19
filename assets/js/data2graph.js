function initData2Graph(canvasId, rawFiles) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    // 데이터 가공
    const processedData = rawFiles
        .map(file => {
            // 파일명 예시: 2026-05-19-11-41-00-123.md
            const dateMatch = file.name.match(/^(\d{4}-\d{2}-\d{2})/);
            const valueMatch = file.name.match(/-(\d+)\.md$/);
            
            if (dateMatch && valueMatch) {
                return {
                    x: dateMatch[1], // YYYY-MM-DD 문자열 (어댑터가 Date로 변환함)
                    y: parseInt(valueMatch[1])
                };
            }
            return null;
        })
        .filter(item => item !== null)
        .sort((a, b) => new Date(a.x) - new Date(b.x));

    console.log("2. 가공된 데이터:", processedData);

    if (processedData.length === 0) {
        console.warn("가공된 데이터가 없습니다. 파일명 형식을 확인하세요.");
        return;
    }

    new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: '데이터 추이',
                data: processedData,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'time', // 이 설정이 '기간 비례'를 만듭니다.
                    time: {
                        unit: 'day',
                        displayFormats: {
                            day: 'yyyy-MM-dd'
                        }
                    },
                    title: { display: true, text: '날짜' }
                },
                y: {
                    title: { display: true, text: '값' }
                }
            }
        }
    });
}

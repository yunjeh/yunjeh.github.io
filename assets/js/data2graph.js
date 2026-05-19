function initData2Graph(canvasId, rawFiles) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const processedData = rawFiles
        .map(file => {
            const dateMatch = file.name.match(/^(\d{4}-\d{2}-\d{2})/);
            const valueMatch = file.name.match(/-(\d+)\.md$/);
            
            if (dateMatch && valueMatch) {
                return {
                    // x축 데이터: 단순 문자열이 아닌 Date 객체로 변환
                    x: new Date(dateMatch[1]), 
                    // y축 데이터: 정수
                    y: parseInt(valueMatch[1])
                };
            }
            return null;
        })
        .filter(item => item !== null)
        .sort((a, b) => a.x - b.x); // 날짜순 정렬

    new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            datasets: [{
                label: 'Value over Time',
                data: processedData, // [{x: Date, y: 123}, ...] 형태
                borderColor: '#4a90e2',
                backgroundColor: 'rgba(74, 144, 226, 0.1)',
                fill: true,
                tension: 0.2
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time', // 시간 비례 축 설정
                    time: {
                        unit: 'day', // 표시 단위 (day, week, month 등)
                        displayFormats: {
                            day: 'yyyy-MM-dd'
                        }
                    },
                    title: { display: true, text: 'Date (Proportional)' }
                },
                y: {
                    title: { display: true, text: 'Value' }
                }
            }
        }
    });
}

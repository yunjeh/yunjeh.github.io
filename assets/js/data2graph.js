function initData2Graph(canvasId, rawFiles) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const processedData = rawFiles
        .map(file => {
            // 파일명 예시: 2026-05-19-11-41-00-123.md
            // match[1]: 날짜(YYYY-MM-DD), match[3]: 정수값
            const match = file.name.match(/^(\d{4}-\d{2}-\d{2})-(\d{2}-\d{2}-\d{2})-(\d+)\.md$/);
            
            if (match) {
                return {
                    // 날짜 부분만 사용하여 X축 위치 결정 (시각까지 포함하려면 match[1] + match[2] 사용)
                    x: new Date(match[1]), 
                    y: parseInt(match[3])
                };
            }
            return null;
        })
        .filter(item => item !== null)
        .sort((a, b) => a.x - b.x);

    new Chart(ctx, {
        type: 'scatter', // 선 없이 점만 찍기 위해 scatter 타입 사용
        data: {
            datasets: [{
                label: '데이터 지점',
                data: processedData,
                backgroundColor: 'rgba(255, 99, 132, 1)', // 점 색상
                pointRadius: 8,       // 점 크기
                pointHoverRadius: 10,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day', // 'day' 단위로 설정하여 일수 비례 레이아웃 구현
                        displayFormats: {
                            day: 'yyyy-MM-dd'
                        }
                    },
                    grid: {
                        display: true, // 격자 표시
                        color: 'rgba(200, 200, 200, 0.3)', // 격자 선 색상
                    },
                    title: { display: true, text: '날짜 (일수 비례)' }
                },
                y: {
                    grid: {
                        display: true,
                        color: 'rgba(200, 200, 200, 0.3)',
                    },
                    beginAtZero: true,
                    title: { display: true, text: '정수 값' }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => `날짜: ${context.parsed.x}, 값: ${context.parsed.y}`
                    }
                }
            }
        }
    });
}

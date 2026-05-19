/**
 * /data2/ 폴더의 파일명에서 날짜와 마지막 정수를 추출하여 차트를 생성합니다.
 */
function initData2Graph(canvasId, rawFiles) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    // 1. 데이터 파싱 및 정렬
    const processedData = rawFiles
        .filter(file => file.name.endsWith('.md'))
        .sort((a, b) => a.name.localeCompare(b.name)) // 파일명 순 정렬 (시간순)
        .map(file => {
            // 정규표현식 설명:
            // ^(\d{4}-\d{2}-\d{2}) : 시작부분의 날짜(YYYY-MM-DD) 캡처
            // .* : 중간 내용 무시
            // -(\d+)\.md$ : 끝부분의 하이픈 뒤 숫자 캡처
            const match = file.name.match(/^(\d{4}-\d{2}-\d{2}).*-(\d+)\.md$/);
            
            if (match) {
                return {
                    date: match[1],      // 가로축: YYYY-MM-DD
                    value: parseInt(match[2]) // 세로축: 마지막 정수
                };
            }
            return null;
        })
        .filter(item => item !== null);

    // 2. Chart.js 실행
    new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: processedData.map(d => d.date), // 가로축 (날짜)
            datasets: [{
                label: 'Post Value',
                data: processedData.map(d => d.value), // 세로축 (정수값)
                borderColor: '#4a90e2',
                backgroundColor: 'rgba(74, 144, 226, 0.1)',
                borderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
                tension: 0.3, // 선을 부드럽게
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: { display: true, text: 'Date' }
                },
                y: {
                    beginAtZero: false,
                    title: { display: true, text: 'Integer Value' }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return ` Value: ${context.parsed.y}`;
                        }
                    }
                }
            }
        }
    });
}

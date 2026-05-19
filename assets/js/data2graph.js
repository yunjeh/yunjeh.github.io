function initData2Graph(canvasId, rawFiles) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const processedData = rawFiles
        .map(file => {
            // 파일명 예시: 2026-05-19-11-41-00-123.md
            // 1그룹: 날짜(YYYY-MM-DD), 2그룹: 시각(HH-mm-ss), 3그룹: 마지막정수
            const match = file.name.match(/^(\d{4}-\d{2}-\d{2})-(\d{2}-\d{2}-\d{2})-(\d+)\.md$/);
            
            if (match) {
                // 시각의 하이픈(-)을 콜론(:)으로 바꿔서 표준 ISO 날짜 형식 생성
                const isoDateTime = `${match[1]}T${match[2].replace(/-/g, ':')}`;
                return {
                    x: new Date(isoDateTime), // X축: 정확한 시각 객체
                    y: parseInt(match[3])     // Y축: 마지막 정수
                };
            }
            return null;
        })
        .filter(item => item !== null)
        .sort((a, b) => a.x - b.x); // 시간순 정렬

    console.log("최종 가공 데이터(개수 확인):", processedData.length, processedData);

    new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: '데이터 추이',
                data: processedData,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                pointRadius: 6 // 점을 크게 해서 겹침 확인 용이하게
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        // 데이터가 적을 때는 'minute'이나 'hour' 단위로 표시
                        unit: 'hour', 
                        displayFormats: {
                            hour: 'yyyy-MM-dd HH:mm'
                        }
                    },
                    title: { display: true, text: '시간 (기간 비례)' }
                },
                y: {
                    title: { display: true, text: '값' }
                }
            }
        }
    });
}

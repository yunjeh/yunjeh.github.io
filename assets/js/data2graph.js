/**
 * /data2/ 폴더의 파일명 끝자리 숫자를 추출하여 차트를 생성합니다.
 */
function initData2Graph(canvasId, rawFiles) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    // 1. 데이터 가공: .md 파일만 필터링하고 마지막 정수 추출
    const processedData = rawFiles
        .filter(file => file.name.endsWith('.md'))
        .sort((a, b) => a.name.localeCompare(b.name)) // 시간순 정렬
        .map(file => {
            const match = file.name.match(/-(\d+)\.md$/);
            return {
                label: file.name.replace('.md', ''),
                value: match ? parseInt(match[1]) : null
            };
        })
        .filter(item => item.value !== null); // 유효한 숫자만 포함

    // 2. Chart.js 실행
    new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: processedData.map(d => d.label),
            datasets: [{
                label: 'Data2 Integer Value',
                data: processedData.map(d => d.value),
                borderColor: '#4a90e2',
                backgroundColor: 'rgba(74, 144, 226, 0.1)',
                borderWidth: 2,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { ticks: { display: false } }, // 파일명이 길면 x축 라벨 숨김 가능
                y: { beginAtZero: false }
            }
        }
    });
}

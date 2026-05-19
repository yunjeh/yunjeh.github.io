---
layout: home
---
<!-- 잔디가 그려질 자리 -->
<div id="overall-container"></div>
<script src="/assets/js/overall.js"></script>

<!-- 1. 그래프가 그려질 공간 (부모 div로 크기를 잡아주는 것이 좋습니다) -->
<div style="width: 100%; height: 400px; padding: 20px;">
    <canvas id="myDataGraph"></canvas>
</div>

<!-- 2. Chart.js 라이브러리 및 시간 축 처리를 위한 날짜 어댑터 로드 -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns"></script>

<!-- 3. 차트 실행 스크립트 -->
<script>
    // 이전에 작성한 함수를 여기에 넣습니다.
    function initData2Graph(canvasId, rawFiles) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        const processedData = rawFiles
            .map(file => {
                // 파일명 파싱: yyyy-mm-dd-hh-mm-ss-정수.md
                const match = file.name.match(/^(\d{4}-\d{2}-\d{2})-(\d{2}-\d{2}-\d{2})-(\d+)\.md$/);
                if (match) {
                    return {
                        x: new Date(match[1]), // 가로축: 날짜 (일수 비례)
                        y: parseInt(match[3])  // 세로축: 정수값
                    };
                }
                return null;
            })
            .filter(item => item !== null)
            .sort((a, b) => a.x - b.x);

        new Chart(ctx, {
            type: 'scatter', // 'line' 대신 'scatter'를 써야 점만 찍힙니다.
            data: {
                datasets: [{
                    label: '파일 데이터 지점',
                    data: processedData,
                    backgroundColor: 'rgba(54, 162, 235, 1)', // 점 색상 (파랑)
                    pointRadius: 6,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'time',
                        time: { 
                            unit: 'day',
                            displayFormats: { day: 'yyyy-MM-dd' }
                        },
                        grid: { color: 'rgba(0, 0, 0, 0.1)' }, // 격자선 선명하게
                        title: { display: true, text: '날짜' }
                    },
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0, 0, 0, 0.1)' }, // 세로 격자선
                        title: { display: true, text: '값' }
                    }
                }
            }
        });
    }

    // 4. 실제로 데이터를 넣어 실행하는 부분
    // (이 부분은 실제로 데이터를 가져오는 방식에 따라 수정이 필요합니다.)
    // 예시 데이터:
    const myFiles = [
        { name: "2026-05-10-10-00-00-50.md" },
        { name: "2026-05-15-12-00-00-80.md" },
        { name: "2026-05-19-11-41-00-123.md" }
    ];

    // 차트 초기화 함수 호출
    initData2Graph('myDataGraph', myFiles);
</script>

// 1. 색상 및 폰트 설정
const colors = ['#fff6a5', '#ffd6c9', '#d9f7c9', '#cfefff', '#f3d7ff'];
const fonts = [
    "'Gowun Dodum', sans-serif",
    "'Sunflower', sans-serif",
    "'Nanum Gothic', sans-serif",
    "'Noto Sans KR', sans-serif",
    "'Jua', sans-serif",
    "'Do Hyeon', sans-serif"
];

// 2. 페이지 로드 완료 시 정렬 실행
window.addEventListener('load', function() {
    layoutStickyNotes();
});

// 3. 화면 크기 변경 시 재정렬
window.addEventListener('resize', function() {
    layoutStickyNotes();
});

function layoutStickyNotes() {
    const wall = document.getElementById('wall');
    const stickyNotes = Array.from(document.querySelectorAll('.sticky-notes'));
    
    // 요소가 없으면 종료
    if (!wall || stickyNotes.length === 0) return;

    const padding = 25;
    const cardWidth = 200;
    const wallWidth = wall.clientWidth;
    
    // 열 개수 계산
    const cols = Math.max(1, Math.floor(wallWidth / (cardWidth + padding)));
    let colHeights = new Array(cols).fill(50);

    stickyNotes.forEach((item) => {
        // 스타일 적용
        item.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        const contentEl = item.querySelector('.content-body');
        if (contentEl) {
            contentEl.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
        }

        // 레이아웃 계산 (Masonry 정렬)
        let minHeight = Math.min(...colHeights);
        let col = colHeights.indexOf(minHeight);

        let left = padding + col * (cardWidth + padding);
        let top = minHeight;

        item.style.position = 'absolute';
        item.style.left = left + 'px';
        item.style.top = top + 'px';
        
        // 높이값 갱신
        colHeights[col] += item.offsetHeight + padding;
    });

    // 벽 높이 최종 조정
    wall.style.height = Math.max(...colHeights) + 50 + 'px';
}

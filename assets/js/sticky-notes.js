// window.onload를 사용하여 모든 요소가 그려진 후 실행되도록 보장
window.onload = function() {
    layoutStickyNotes();
};

function layoutStickyNotes() {
    const wall = document.getElementById('wall');
    const stickyNotes = Array.from(document.querySelectorAll('.sticky-notes'));
    
    // 요소가 화면에 없는 경우 방어 코드
    if (stickyNotes.length === 0) return;

    const padding = 25;
    const cardWidth = 200;
    const wallWidth = wall.clientWidth;
    
    // cols가 0이 되는 것을 방지
    const cols = Math.max(1, Math.floor(wallWidth / (cardWidth + padding)));
    let colHeights = new Array(cols).fill(50);

    stickyNotes.forEach((item) => {
        // 스타일 적용 (랜덤 색상/폰트)
        item.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        const contentEl = item.querySelector('.content-body');
        if (contentEl) {
            contentEl.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
        }

        // 높이값 읽기 (스크립트 실행 시점 중요)
        let minHeight = Math.min(...colHeights);
        let col = colHeights.indexOf(minHeight);

        let left = padding + col * (cardWidth + padding);
        let top = minHeight;

        item.style.position = 'absolute';
        item.style.left = left + 'px';
        item.style.top = top + 'px';
        
        colHeights[col] += item.offsetHeight + padding; // clientHeight 대신 offsetHeight 사용 권장
    });

    wall.style.height = Math.max(...colHeights) + 50 + 'px';
}

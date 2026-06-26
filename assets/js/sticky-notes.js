
    const wall = document.getElementById('wall');

    function layoutStickyNotes() {
        // 클래스명을 sticky-notes로 변경
        let stickyNotes = Array.from(document.querySelectorAll('.sticky-notes'));
        
        const padding = 20;
        const cardWidth = 220;
        const wallWidth = wall.clientWidth;
        
        // 열 개수 계산
        const cols = Math.floor(wallWidth / (cardWidth + padding)) || 1;
        let colHeights = new Array(cols).fill(50);

        stickyNotes.forEach((item) => {
            // 가장 낮은 높이를 가진 열을 찾아 배치 (겹침 방지)
            let minHeight = Math.min(...colHeights);
            let col = colHeights.indexOf(minHeight);

            let left = padding + col * (cardWidth + padding);
            let top = minHeight;

            item.style.position = 'absolute';
            item.style.left = left + 'px';
            item.style.top = top + 'px';
            
            // 높이 갱신
            colHeights[col] += item.clientHeight + padding;
        });

        wall.style.height = Math.max(...colHeights) + 50 + 'px';
    }

    window.addEventListener('DOMContentLoaded', layoutStickyNotes);
    window.addEventListener('resize', layoutStickyNotes);


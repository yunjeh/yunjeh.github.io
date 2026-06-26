// assets/js/home-sticky.js
document.addEventListener('DOMContentLoaded', () => {
  const allNotes = Array.from(document.querySelectorAll('.home-sticky'));
  
  // 실제 포스트잇의 대표적인 색상들
  const stickyColors = ['#FFEB3B', '#FFCC80', '#C8E6C9', '#B3E5FC', '#E1BEE7'];
  
  const selected = allNotes.sort(() => 0.5 - Math.random()).slice(0, 4);

  selected.forEach((note) => {
    note.style.display = 'flex';
    note.style.position = 'absolute';
    
    // 1. 실제 포스트잇 색상 적용
    note.style.backgroundColor = stickyColors[Math.floor(Math.random() * stickyColors.length)];
    
    // 2. 자유로운 각도 (-15도 ~ 15도)
    const rotate = (Math.random() * 30 - 15);
    
    // 3. 삐뚤빼뚤한 위치 랜덤 생성
    const randomTop = Math.random() * 50; 
    const randomRight = Math.random() * 100;
    
    note.style.transform = `rotate(${rotate}deg)`;
    note.style.top = randomTop + 'px';
    note.style.right = randomRight + 'px';
    note.style.zIndex = Math.floor(Math.random() * 10);
  });
});

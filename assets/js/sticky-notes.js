// assets/js/home-sticky.js
document.addEventListener('DOMContentLoaded', () => {
  const allNotes = Array.from(document.querySelectorAll('.home-sticky'));
  const stickyColors = ['#FFEB3B', '#FFCC80', '#C8E6C9', '#B3E5FC', '#E1BEE7'];
  
  const selected = allNotes.sort(() => 0.5 - Math.random()).slice(0, 4);

  selected.forEach((note) => {
    note.style.display = 'flex';
    note.style.position = 'absolute';
    
    // 배경색을 JS에서 직접 강제 주입
    const randomColor = stickyColors[Math.floor(Math.random() * stickyColors.length)];
    note.style.backgroundColor = randomColor;
    
    // 삐뚤빼뚤한 자유 배치
    const rotate = (Math.random() * 40 - 20); // -20 ~ 20도 회전
    const randomTop = Math.random() * 80;    // 0 ~ 80px 랜덤
    const randomRight = Math.random() * 150;  // 0 ~ 150px 랜덤 (간격 확보)
    
    note.style.transform = `rotate(${rotate}deg)`;
    note.style.top = randomTop + 'px';
    note.style.right = randomRight + 'px';
  });
});

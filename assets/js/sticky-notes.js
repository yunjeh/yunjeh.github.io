document.addEventListener('DOMContentLoaded', () => {
  const allNotes = Array.from(document.querySelectorAll('.home-sticky'));
  const colors = ['#fff6a5', '#ffd6c9', '#d9f7c9', '#cfefff', '#f3d7ff'];
  
  const selected = allNotes.sort(() => 0.5 - Math.random()).slice(0, 4);

  selected.forEach((note, index) => {
    note.style.display = 'flex';
    note.style.position = 'absolute';
    
    // 색상 적용
    note.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // 겹치지 않게 자연스러운 각도와 위치
    const rotate = (Math.random() * 20 - 10);
    note.style.transform = `rotate(${rotate}deg)`;
    
    // 위치를 더 넓게 배치 (헤더 영역을 벗어나지 않도록 조정)
    note.style.top = (20 + (index * 20)) + 'px'; 
    note.style.right = (5 + (index * 140)) + 'px';
    
    note.style.zIndex = 10;
  });
});

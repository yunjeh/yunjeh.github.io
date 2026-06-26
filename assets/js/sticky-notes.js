// assets/js/home-sticky.js
document.addEventListener('DOMContentLoaded', () => {
  const allNotes = Array.from(document.querySelectorAll('.home-sticky'));
  const colors = ['#fff6a5', '#ffd6c9', '#d9f7c9', '#cfefff', '#f3d7ff'];
  
  // 랜덤 4개 선택
  const selected = allNotes.sort(() => 0.5 - Math.random()).slice(0, 4);

  selected.forEach((note, index) => {
    note.style.display = 'flex';
    note.style.position = 'absolute';
    note.style.zIndex = '10';
    note.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    note.style.transform = `rotate(${(Math.random() - 10)}deg)`;
    
    // 위치 설정
    note.style.top = (Math.random() * 30) + 'px';
    note.style.right = (index * 130) + 'px';
    
    // 폰트 설정
    const content = note.querySelector('.content-body');
    if(content) content.style.fontFamily = "'Gowun Dodum', sans-serif";
  });
});

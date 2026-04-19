// ... (앞부분 동일)
        for (let i = 0; i < 371; i++) {
            const d = new Date(startDay);
            d.setDate(startDay.getDate() + i);
            
            const cell = document.createElement('div');
            cell.className = 'cell';

            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const dateKey = `${y}.${m}.${day}`;
            
            if (y === year) {
                cell.setAttribute('data-date', dateKey);
                allCells[dateKey] = cell;
                
                // 월 라벨 위치 계산 (일요일인 경우에만 해당 열에 월 이름 표시)
                if (d.getDay() === 0) {
                    const currentMonth = d.getMonth();
                    if (currentMonth !== lastMonth) {
                        const lbl = document.createElement('div');
                        lbl.innerText = months[currentMonth];
                        // 세로 흐름이므로 i/7이 곧 열(column) 번호가 됩니다.
                        lbl.style.gridColumnStart = Math.floor(i / 7) + 2; 
                        monthLabels.appendChild(lbl);
                        lastMonth = currentMonth;
                    }
                }
            } else {
                // 해당 연도가 아니면 투명하게 처리하거나 숨김
                cell.style.visibility = "hidden"; 
            }
            grid.appendChild(cell);
        }
// ... (뒷부분 동일)

<style>
/* ... 이전 스타일 유지 ... */

.month-labels {
    display: grid;
    grid-template-columns: 35px repeat(53, 14px); /* 요일 폭에 맞춰 35px로 조절 */
    gap: 3px;
    margin-bottom: 5px;
    font-size: 11px;
    color: #57606a;
    height: 15px; /* 높이 고정 */
}

.month-label {
    white-space: nowrap; /* 월 이름이 절대 밑으로 떨어지지 않게 함 */
    grid-row: 1;
}

.day-labels {
    display: grid;
    grid-template-rows: repeat(7, 14px); /* 7행 고정 */
    gap: 3px;
    margin-right: 8px;
    font-size: 10px;
    color: #57606a;
    line-height: 14px; /* 칸 높이와 일치시켜 중앙 정렬 */
}

.day-labels div {
    height: 14px;
    display: flex;
    align-items: center;
}
</style>

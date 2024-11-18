let currentMatchup = 0;
const matchups = [
    {
        option1: { img: './1image/mul.jpg', text: '옵션 1 설명' },
        option2: { img: 'image2.jpg', text: '옵션 2 설명' },
    },
    {
        option1: { img: 'image3.jpg', text: '옵션 3 설명' },
        option2: { img: 'image4.jpg', text: '옵션 4 설명' },
    },
    // 필요한 만큼 더 추가
];

function loadMatchup() {
    const matchup = matchups[currentMatchup];
    document.getElementById('option1').querySelector('img').src = matchup.option1.img;
    document.getElementById('option1').querySelector('p').innerText = matchup.option1.text;
    document.getElementById('option2').querySelector('img').src = matchup.option2.img;
    document.getElementById('option2').querySelector('p').innerText = matchup.option2.text;
}

document.querySelectorAll('.select-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const selectedOption = this.parentElement;
        selectedOption.style.border = '2px solid #4CAF50';
        document.querySelectorAll('.select-btn').forEach(button => {
            button.disabled = true;
        });
        document.getElementById('nextRound').classList.remove('hidden');
    });
});

document.getElementById('nextRound').addEventListener('click', function() {
    currentMatchup++;
    if (currentMatchup < matchups.length) {
        loadMatchup();
        this.classList.add('hidden');
        document.querySelectorAll('.option').forEach(option => {
            option.style.border = '2px solid #ddd';
        });
        document.querySelectorAll('.select-btn').forEach(button => {
            button.disabled = false;
        });
    } else {
        alert('게임이 종료되었습니다!');
    }
});

// 첫 번째 라운드 로드
loadMatchup();

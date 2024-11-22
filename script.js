// 초기 데이터 (16강)
let matchups = [
    { option1: { img: './과목 이미지/물리.jpg', text: '옵션 1 설명' }, option2: { img: './과목 이미지/수학.jpg', text: '옵션 2 설명' } },
    { option1: { img: './과목 이미지/영어.jpg', text: '옵션 3 설명' }, option2: { img: './과목 이미지/웹.jpg', text: '옵션 4 설명' } },
    { option1: { img: './과목 이미지/일본.jpg', text: '옵션 5 설명' }, option2: { img: './과목 이미지/컴시일.jpg', text: '옵션 6 설명' } },
    { option1: { img: './과목 이미지/자료.jpg', text: '옵션 7 설명' }, option2: { img: './과목 이미지/한국사.jpg', text: '옵션 8 설명' } },
    { option1: { img: './과목 이미지/정보.jpg', text: '옵션 9 설명' }, option2: { img: './과목 이미지/한문.jpg', text: '옵션 10 설명' } },
    { option1: { img: './과목 이미지/중국.jpg', text: '옵션 11 설명' }, option2: { img: 'image12.jpg', text: '옵션 12 설명' } },
    { option1: { img: './과목 이미지/진로.jpg', text: '옵션 13 설명' }, option2: { img: 'image14.jpg', text: '옵션 14 설명' } },
    { option1: { img: './과목 이미지/창체.jpg', text: '옵션 15 설명' }, option2: { img: 'image16.jpg', text: '옵션 16 설명' } },
];

let currentRound = 16; // 현재 라운드 (16강, 8강, ...)
let winners = []; // 각 라운드에서 선택된 옵션

// 라운드 타이틀 업데이트
function updateRoundTitle() {
    document.getElementById('round-title').innerText = `${currentRound}강`;
}

// 매치업 로드
function loadMatchups() {
    const container = document.getElementById('matchups-container');
    container.innerHTML = ''; // 기존 매치업 초기화

    matchups.forEach((matchup, index) => {
        // 옵션 1 생성
        const option1 = createOption(matchup.option1, index, 'option1');
        // 옵션 2 생성
        const option2 = createOption(matchup.option2, index, 'option2');

        // 매치업 그룹 생성
        const matchupGroup = document.createElement('div');
        matchupGroup.classList.add('matchup-group');
        matchupGroup.appendChild(option1);
        matchupGroup.appendChild(option2);

        container.appendChild(matchupGroup);
    });
}

// 옵션 생성
function createOption(option, matchupIndex, optionType) {
    const div = document.createElement('div');
    div.classList.add('matchup');
    div.dataset.matchupIndex = matchupIndex;
    div.dataset.optionType = optionType;

    div.innerHTML = `
        <img src="${option.img}" alt="${option.text}">
        <p>${option.text}</p>
    `;

    div.addEventListener('click', function () {
        selectWinner(this);
    });

    return div;
}

// 옵션 선택
function selectWinner(selectedOption) {
    const matchupIndex = selectedOption.dataset.matchupIndex;
    const optionType = selectedOption.dataset.optionType;

    // 기존 선택 해제
    document.querySelectorAll(`[data-matchup-index="${matchupIndex}"]`).forEach(option => {
        option.classList.remove('selected');
    });

    // 선택 표시
    selectedOption.classList.add('selected');

    // 승자 저장
    winners[matchupIndex] = matchups[matchupIndex][optionType];

    // 다음 라운드 버튼 활성화 여부
    const allSelected = winners.length === matchups.length && winners.every(w => w);
    document.getElementById('nextRound').classList.toggle('hidden', !allSelected);
}

// 다음 라운드로 진행
document.getElementById('nextRound').addEventListener('click', function () {
    if (currentRound === 2) {
        // 결승 이후 우승자 출력
        alert(`우승자는 "${winners[0].text}"입니다!`);
        return;
    }

    // 다음 라운드 설정
    currentRound /= 2;
    matchups = winners.reduce((acc, winner, index, array) => {
        if (index % 2 === 0) {
            acc.push({ option1: array[index], option2: array[index + 1] });
        }
        return acc;
    }, []);
    winners = [];

    // 라운드 업데이트
    updateRoundTitle();
    loadMatchups();
    this.classList.add('hidden');
});

// 초기화
updateRoundTitle();
loadMatchups();

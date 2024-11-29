function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 초기 데이터 (옵션들을 개별적으로 나열)
let options = [
    { img: './../PC게임 이미지/던전앤파이터.jpg', text: '던전앤파이터' },
    { img: './../PC게임 이미지/디아블로.jpg', text: '디아블로' },
    { img: './../PC게임 이미지/로블록스.jpg', text: '로블록스' },
    { img: './../PC게임 이미지/로스트아크.jpg', text: '로스트아크' },
    { img: './../PC게임 이미지/롤토체스.jpg', text: '롤토체스' },
    { img: './../PC게임 이미지/리그오브레전드.jpg', text: '리그오브레전드' },
    { img: './../PC게임 이미지/리니지.jpg', text: '리니지' },
    { img: './../PC게임 이미지/메이플스토리.jpg', text: '메이플스토리' },
    { img: './../PC게임 이미지/발로란트.jpg', text: '발로란트' },
    { img: './../PC게임 이미지/배그.jpg', text: '배틀그라운드' },
    { img: './../PC게임 이미지/서든어택.jpg', text: '서든어택' },
    { img: './../PC게임 이미지/스타.jpg', text: '스타크래프트' },
    { img: './../PC게임 이미지/오버워치.jpg', text: '오버워치' },
    { img: './../PC게임 이미지/이터널리턴.jpg', text: '이터널리턴' },
    { img: './../PC게임 이미지/피파온라인.jpg', text: '피파온라인' },
    { img: './../PC게임 이미지/카트라이더.jpg', text: '카트라이더 },
];

function updateRoundText() {
    const totalMatchups = matchups.length; // 총 매치업 수
    const remainingMatchups = Math.ceil(totalMatchups / 2); // 남은 매치업 수 (진행 중인 라운드의 매치업 수)
    
    // 라운드 이름을 매치업의 수에 따라 다르게 설정
    let roundText;
    if (totalMatchups === 8) {
        roundText = "16강";
    } else if (totalMatchups === 4) {
        roundText = "8강";
    } else if (totalMatchups === 2) {
        roundText = "4강";
    } else if (totalMatchups === 1) {
        roundText = "결승";
    }

    // 진행 상태 텍스트 추가
    const currentMatchup = currentMatchupIndex + 1; // 현재 진행 중인 매치업

    // 라운드 텍스트에 진행 상태 표시 (예: 16강 (1/8), 2/8, ...)
    document.getElementById('roundText').innerText = `현재 라운드: ${roundText} (${currentMatchup}/${totalMatchups})`;
}

// 매치업 생성 함수 (모든 옵션 섞고 두 개씩 묶기)
function createMatchups(options) {
    const shuffledOptions = shuffleArray([...options]); // 옵션 섞기
    const newMatchups = [];

    for (let i = 0; i < shuffledOptions.length; i += 2) {
        newMatchups.push({ option1: shuffledOptions[i], option2: shuffledOptions[i + 1] });
    }

    return newMatchups;
}

// 초기 매치업 생성
let matchups = createMatchups(options);

let currentMatchupIndex = 0; // 현재 진행 중인 매치업
let winners = []; // 각 라운드에서 선택된 승자

// 현재 매치업 로드
function loadMatchup() {
    const matchup = matchups[currentMatchupIndex];
    const option1 = document.getElementById('option1');
    const option2 = document.getElementById('option2');

    // 이미지와 텍스트 업데이트
    option1.querySelector('img').src = matchup.option1.img;
    option1.querySelector('p').innerText = matchup.option1.text;

    option2.querySelector('img').src = matchup.option2.img;
    option2.querySelector('p').innerText = matchup.option2.text;

    // 부전승인 경우 자동 선택 처리
    if (matchup.option1.text === '부전승입니다.') {
        option1.style.pointerEvents = 'none';
        setTimeout(() => autoSelectOption(option2), 1000); // 1초 딜레이 후 자동 선택
    } else if (matchup.option2.text === '부전승입니다.') {
        option2.style.pointerEvents = 'none';
        setTimeout(() => autoSelectOption(option1), 1000); // 1초 딜레이 후 자동 선택
    } else {
        // 클릭 활성화
        option1.style.pointerEvents = 'auto';
        option2.style.pointerEvents = 'auto';
    }

    updateRoundText(); // 라운드 텍스트 업데이트
}

// 자동 선택 및 애니메이션 효과
function autoSelectOption(optionElement) {
    optionElement.querySelector('img').classList.add('selected'); // 강조 효과 추가
    optionElement.style.pointerEvents = 'none'; // 클릭 비활성화

    // 선택된 옵션을 승자 목록에 추가
    const selectedOption = optionElement.id === 'option1' ? 'option1' : 'option2';
    winners.push(matchups[currentMatchupIndex][selectedOption]);

    // 0.3초 뒤 강조 효과 제거 및 다음 매치업으로 진행 (애니메이션 시간 줄임)
    setTimeout(() => {
        optionElement.querySelector('img').classList.remove('selected'); // 강조 효과 제거
        currentMatchupIndex++; // 매치업 인덱스 증가

        // 다음 매치업으로 넘어가기
        if (currentMatchupIndex < matchups.length) {
            loadMatchup();
        } else {
            // 라운드 종료 처리
            if (winners.length === 1) {
                // 최종 우승자가 결정되면 우승자 페이지로 이동
                localStorage.setItem("winnerText", winners[0].text);
                localStorage.setItem("winnerImage", winners[0].img);
                window.location.href = "winner.html";
            } else {
                // 다음 라운드 생성 및 초기화
                matchups = createMatchups(winners);
                winners = [];
                currentMatchupIndex = 0;
                loadMatchup();
            }
        }
    }, 700); // 강조 효과 지속 시간을 0.3초로 설정
}


// 이미지 클릭 이벤트 연결
document.querySelectorAll('.matchup img').forEach(img => {
    img.addEventListener('click', function () {
        const parent = this.parentElement; // 클릭된 이미지의 부모 요소 가져오기
        const selectedOption = parent.id === 'option1' ? 'option1' : 'option2';

        // 클릭된 이미지를 강조하는 효과 추가
        parent.querySelector('img').classList.add('selected'); // 강조 효과

        // 선택된 옵션을 승자 목록에 추가
        winners.push(matchups[currentMatchupIndex][selectedOption]);

        // 0.5초 후에 강조 효과를 제거하고, 그 후에 매치업을 로드합니다.
        setTimeout(() => {
            parent.querySelector('img').classList.remove('selected'); // 강조 효과 제거
            currentMatchupIndex++; // 매치업 인덱스 증가

            // 매치업 로드
            if (currentMatchupIndex < matchups.length) {
                loadMatchup(); // 다음 매치업 로드
            } else {
                // 라운드가 끝나면
                if (winners.length === 1) {
                    // 최종 우승자가 결정되면 우승자 정보를 localStorage에 저장
                    localStorage.setItem("winnerText", winners[0].text);
                    localStorage.setItem("winnerImage", winners[0].img);

                    // 우승자 페이지로 이동
                    window.location.href = "winner.html";
                } else {
                    // 라운드를 새로 시작하면서 매치업을 다시 생성
                    matchups = createMatchups(winners);
                    winners = [];
                    currentMatchupIndex = 0;
                    loadMatchup(); // 첫 번째 매치업 로드
                }
            }
        }, 700); // 0.7초 후에 다음 매치업으로 넘어감
    });
});

// 첫 번째 매치업 로드
loadMatchup();

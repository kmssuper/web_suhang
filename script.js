// 매치업 데이터를 셔플하는 함수
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 초기 데이터 (옵션들을 개별적으로 나열)
let options = [
    { img: './과목 이미지/물리.jpg', text: '물리' },
    { img: './과목 이미지/수학.jpg', text: '수학' },
    { img: './과목 이미지/영어.jpg', text: '영어' },
    { img: './과목 이미지/웹.jpg', text: '웹 프로그래밍 실무' },
    { img: './과목 이미지/일본.jpg', text: '일본어' },
    { img: './과목 이미지/컴시일.jpg', text: '컴퓨터 시스템 일반' },
    { img: './과목 이미지/자료.jpg', text: '자료구조' },
    { img: './과목 이미지/한국사.jpg', text: '한국사' },
    { img: './과목 이미지/정보.jpg', text: '정보' },
    { img: './과목 이미지/한문.jpg', text: '한문' },
    { img: './과목 이미지/중국.jpg', text: '중국어' },
    { img: './과목 이미지/문학.jpg', text: '문학' },
    { img: './과목 이미지/진로.png', text: '진로' },
    { img: './과목 이미지/부전승.png', text: '부전승입니다.' },
    { img: './과목 이미지/창체.png', text: '창체' },
    { img: './과목 이미지/부전승.png', text: '부전승입니다.' },
];

function updateRoundText() {
    const totalMatchups = matchups.length; // 총 매치업 수
    const remainingMatchups = Math.ceil(totalMatchups / 2); // 남은 매치업 수 (진행 중인 라운드의 매치업 수)

    // 라운드 이름을 매치업의 수에 따라 다르게 설정
    let roundText;
    if (totalMatchups === 16) {
        roundText = "16강";
    } else if (totalMatchups === 8) {
        roundText = "8강";
    } else if (totalMatchups === 4) {
        roundText = "4강";
    } else if (totalMatchups === 2) {
        roundText = "결승";
    }

    document.getElementById('roundText').innerText = `현재 라운드: ${roundText}`;
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
    document.getElementById('option1').querySelector('img').src = matchup.option1.img;
    document.getElementById('option1').querySelector('p').innerText = matchup.option1.text;

    document.getElementById('option2').querySelector('img').src = matchup.option2.img;
    document.getElementById('option2').querySelector('p').innerText = matchup.option2.text;
    
    // 부전승 이미지가 포함된 경우 클릭 비활성화 처리
    if (matchup.option1.text === '부전승입니다.') {
        option1.querySelector('img').classList.add('disabled'); // 부전승에 disabled 클래스를 추가하여 클릭을 막음
        option1.style.pointerEvents = 'none'; // 클릭을 비활성화
    } else {
        option1.querySelector('img').classList.remove('disabled');
        option1.style.pointerEvents = 'auto'; // 클릭 활성화
    }

    if (matchup.option2.text === '부전승입니다.') {
        option2.querySelector('img').classList.add('disabled');
        option2.style.pointerEvents = 'none'; // 클릭을 비활성화
    } else {
        option2.querySelector('img').classList.remove('disabled');
        option2.style.pointerEvents = 'auto'; // 클릭 활성화
    }
    updateRoundText(); // 라운드 텍스트 업데이트
}

// 이미지 클릭 이벤트 연결
document.querySelectorAll('.matchup img').forEach(img => {
    img.addEventListener('click', function () {
        const parent = this.parentElement; // 클릭된 이미지의 부모 요소 가져오기
        const selectedOption = parent.id === 'option1' ? 'option1' : 'option2';
        winners.push(matchups[currentMatchupIndex][selectedOption]);

        currentMatchupIndex++;

        if (currentMatchupIndex < matchups.length) {
            loadMatchup();
        } else {
            if (winners.length === 1) {
                // 최종 우승자가 결정되면 우승자 정보를 localStorage에 저장
                localStorage.setItem("winnerText", winners[0].text);
                localStorage.setItem("winnerImage", winners[0].img);
                
                // 우승자 페이지로 이동
                window.location.href = "winner.html";
            } else {
                matchups = createMatchups(winners);
                winners = [];
                currentMatchupIndex = 0;
                loadMatchup();
            }
        }
    });
});

// 첫 번째 매치업 로드
loadMatchup();

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
    { img: './과목 이미지/부전승.jpg', text: '부전승입니다.' },
    { img: './과목 이미지/진로.jpg', text: '진로' },
    { img: './과목 이미지/부전승.jpg', text: '부전승입니다.' },
    { img: './과목 이미지/창체.jpg', text: '창체' },
    { img: './과목 이미지/부전승.jpg', text: '부전승입니다.' },
];

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
}

// 선택 이벤트 핸들러
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
            // 다음 라운드로 넘어가기
            if (winners.length === 1) {
                alert(`우승자는 "${winners[0].text}"입니다!`);
            } else {
                matchups = createMatchups(winners); // 다음 라운드 매치업 생성
                winners = [];
                currentMatchupIndex = 0;
                loadMatchup();
            }
        }
    });
});

// 첫 번째 매치업 로드
loadMatchup();

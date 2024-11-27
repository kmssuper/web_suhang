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

function loadMatchup() {
    const matchup = matchups[currentMatchupIndex];

    // 매치업 UI 업데이트
    document.getElementById('option1').querySelector('img').src = matchup.option1.img;
    document.getElementById('option1').querySelector('p').innerText = matchup.option1.text;

    document.getElementById('option2').querySelector('img').src = matchup.option2.img;
    document.getElementById('option2').querySelector('p').innerText = matchup.option2.text;

    // 부전승 처리
    if (matchup.option1.text === '부전승입니다.' || matchup.option2.text === '부전승입니다.') {
        // 부전승인 항목 자동 선택
        const selectedOptionElement = matchup.option1.text === '부전승입니다.' 
            ? document.getElementById('option2') 
            : document.getElementById('option1');
        
        // 승자를 winners 배열에 추가
        const selectedOption = matchup.option1.text === '부전승입니다.' 
            ? matchup.option2 
            : matchup.option1;
        winners.push(selectedOption);

        // 강조 효과 추가
        selectedOptionElement.querySelector('img').classList.add('selected');

        // 일정 시간 대기 후 다음 매치업으로 이동
        setTimeout(() => {
            selectedOptionElement.querySelector('img').classList.remove('selected'); // 강조 효과 제거
            currentMatchupIndex++; // 다음 매치업으로 이동

            if (currentMatchupIndex < matchups.length) {
                loadMatchup(); // 다음 매치업 로드
            } else {
                if (winners.length === 1) {
                    // 최종 우승자 결정
                    localStorage.setItem("winnerText", winners[0].text);
                    localStorage.setItem("winnerImage", winners[0].img);
                    window.location.href = "winner.html";
                } else {
                    // 새 라운드 시작
                    matchups = createMatchups(winners);
                    winners = [];
                    currentMatchupIndex = 0;
                    loadMatchup(); // 첫 번째 매치업 로드
                }
            }
        }, 800); // 0.8초 대기 후 다음 단계 진행
        return; // 부전승 처리 후 함수 종료
    }

    // 부전승이 없는 경우 클릭 활성화
    document.getElementById('option1').style.pointerEvents = 'auto';
    document.getElementById('option2').style.pointerEvents = 'auto';

    // 부전승 이미지 처리
    if (matchup.option1.text === '부전승입니다.') {
        document.getElementById('option1').querySelector('img').classList.add('disabled');
        document.getElementById('option1').style.pointerEvents = 'none';
    } else {
        document.getElementById('option1').querySelector('img').classList.remove('disabled');
    }

    if (matchup.option2.text === '부전승입니다.') {
        document.getElementById('option2').querySelector('img').classList.add('disabled');
        document.getElementById('option2').style.pointerEvents = 'none';
    } else {
        document.getElementById('option2').querySelector('img').classList.remove('disabled');
    }

    updateRoundText(); // 라운드 텍스트 업데이트
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
        }, 500); // 0.5초 후에 다음 매치업으로 넘어감
    });
});

// 첫 번째 매치업 로드
loadMatchup();

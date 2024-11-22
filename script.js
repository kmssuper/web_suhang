// 매치업 데이터를 셔플하는 함수
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 초기 데이터 (16강)
let matchups = shuffleArray([
    { option1: { img: './과목 이미지/물리.jpg', text: '옵션 1 설명' }, option2: { img: './과목 이미지/수학.jpg', text: '옵션 2 설명' } },
    { option1: { img: './과목 이미지/영어.jpg', text: '옵션 3 설명' }, option2: { img: './과목 이미지/웹.jpg', text: '옵션 4 설명' } },
    { option1: { img: './과목 이미지/일본.jpg', text: '옵션 5 설명' }, option2: { img: './과목 이미지/컴시일.jpg', text: '옵션 6 설명' } },
    { option1: { img: './과목 이미지/자료.jpg', text: '옵션 7 설명' }, option2: { img: './과목 이미지/한국사.jpg', text: '옵션 8 설명' } },
    { option1: { img: './과목 이미지/정보.jpg', text: '옵션 9 설명' }, option2: { img: './과목 이미지/한문.jpg', text: '옵션 10 설명' } },
    { option1: { img: './과목 이미지/중국.jpg', text: '옵션 11 설명' }, option2: { img: 'image12.jpg', text: '옵션 12 설명' } },
    { option1: { img: './과목 이미지/진로.jpg', text: '옵션 13 설명' }, option2: { img: 'image14.jpg', text: '옵션 14 설명' } },
    { option1: { img: './과목 이미지/창체.jpg', text: '옵션 15 설명' }, option2: { img: 'image16.jpg', text: '옵션 16 설명' } },
]);

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
document.querySelectorAll('.select-btn').forEach(button => {
    button.addEventListener('click', function () {
        const selectedOption = this.parentElement.id === 'option1' ? 'option1' : 'option2';
        winners.push(matchups[currentMatchupIndex][selectedOption]);

        currentMatchupIndex++;

        if (currentMatchupIndex < matchups.length) {
            loadMatchup();
        } else {
            // 다음 라운드로 넘어가기
            if (winners.length === 1) {
                alert(`우승자는 "${winners[0].text}"입니다!`);
            } else {
                matchups = shuffleArray(
                    winners.reduce((newMatchups, winner, index, array) => {
                        if (index % 2 === 0) {
                            newMatchups.push({ option1: array[index], option2: array[index + 1] });
                        }
                        return newMatchups;
                    }, [])
                );
                winners = [];
                currentMatchupIndex = 0;
                loadMatchup();
            }
        }
    });
});

// 첫 번째 매치업 로드
loadMatchup();

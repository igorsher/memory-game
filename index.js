const cards = document.querySelectorAll('.memory-card');
const gameScore = document.querySelector('.game-score');

let firstCard;
let secondCard;
let hasFlippedCard = true;
let lockBoard = false;
let sumMoves = 0;
let gameEnd = false;
let counterStep = 0;

function changeCard() {
    result();
    if (lockBoard) return;
    if (this === firstCard) return;

this.classList.add('change');
    if (hasFlippedCard) {
    firstCard = this;
    hasFlippedCard = false;
    return;
    
}
secondCard = this;
/*console.log(firstCard);
console.log(secondCard);
console.log(hasFlippedCard);*/
checkCards();
resetCards();
}

function checkCards() {
    ++sumMoves;
    if (firstCard.dataset.dino === secondCard.dataset.dino){
        disableCards();
        console.log(sumMoves);
        gameScore.innerHTML = sumMoves;
        return;
    }
    unflipCards();
    console.log(sumMoves);
    gameScore.innerHTML = sumMoves;
    
}




function disableCards(){
    firstCard.removeEventListener('click', changeCard);
    secondCard.removeEventListener('click', changeCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() =>{
        firstCard.classList.remove('change');
        secondCard.classList.remove('change');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    hasFlippedCard = true;
    lockBoard = false;
    [firstCard, secondCard] = [null, null];
  }

  (function shuffle() {
       cards.forEach(item => {
         let randomPos = Math.floor(Math.random() * 16);
         item.style.order = randomPos;
       });
     })();

function resetCards() {
    let lengthOpen = [];
    cards.forEach(item => {       
 if (item.classList.contains('change')){
    lengthOpen.push( `${item}`);
}
if(lengthOpen.length >= 16){
   /* console.log('FINITO');*/
    finishCards();
}
})
}
 

function finishCards() {
    gameEnd = true;
    result();
    sumMoves = 0;
    gameScore.innerHTML = 0;
    setTimeout(() => {
       cards.forEach(item => {
          item.classList.remove('change') 
    })
}, 2000)
location.reload()
}
        
let reset = document.querySelector('.reset');
reset.addEventListener('click', finishCards);

function result() {
    if (gameEnd) {
        resultGame(counterStep)
    } else {
        counterStep++
    }
}

function resultGame(counterStep) {
    let containerResult = document.querySelector('.newClass');
    let result = document.createElement('div');
    result.classList.add('result');
    result.innerText = `ходы: ${counterStep / 2}`;

    let temp = localStorage.getItem('result');
    resultScore = JSON.parse(temp) || []
	resultScore.push(counterStep);

    containerResult.append(result);
    localStorage.setItem( 'result', JSON.stringify(resultScore))
    /*localStorage.clear();*/
}



(function tempResult() {
	let score = localStorage.getItem('result')
	score = JSON.parse(score)
	score = new Set(score)
	score = Array.from(score)
	score = score.sort((a, b) => a - b)
	return resultScore = score;
})();


function showResult(arr) {
	let showMemory = document.querySelector('.result-game')
	arr.forEach((item, index) => {
		if (index < 10) {
			let temps = document.createElement('div')
			temps.innerText = ` ${index+1}  место, результат:  ${Math.floor(item/2)} `
			showMemory.append(temps)
		}
	})
}

showResult(resultScore)

cards.forEach(item => item.addEventListener('click', changeCard))
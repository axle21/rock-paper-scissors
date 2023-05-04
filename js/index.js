//variable
const buttons = document.querySelectorAll('button');
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');
const moves = ['rock', 'paper', 'scissors'];
let playerScore, computerScore;

// the logic where computer learn to adapt from user strategy
const getComputerMove = () => {
    const lastPlayerMove = localStorage.getItem('lastPlayerMove');
    if (lastPlayerMove) {
        const winningMoves = {
            rock: 'paper',
            paper: 'scissors',
            scissors: 'rock'
          };
          const lastPlayerWinningMove = winningMoves[lastPlayerMove];
          const possibleMoves = [lastPlayerWinningMove, lastPlayerMove, ...moves];
          const randomIndex = Math.floor(Math.random() * possibleMoves.length);
          return possibleMoves[randomIndex];
    }
    return moves[Math.floor(Math.random() * moves.length)];
}

const displayMove = (playerMove, computerMove) => {
    const playerMoveDisplay = document.getElementById('userPick');
    const computerMoveDisplay = document.getElementById('computerPick');
    playerMoveDisplay.src = `assets/${playerMove}.png`;
    computerMoveDisplay.src = `assets/${computerMove}.png`;;
}

const playerMove = (pickedWeapon) => {
    const computerMove = getComputerMove();
    localStorage.setItem('lastPlayerMove', pickedWeapon);

    let weapons = document.querySelector(".weapons");
    weapons.style.display = "none";

    let contest = document.querySelector(".contest");
    contest.style.display = "flex";

    const decision = document.querySelector('.decision h1');

    if (pickedWeapon === computerMove) {
        displayMove(pickedWeapon, computerMove);
        setDecision("TIE");
        decision.style.color = "white"
    } else if (
        (pickedWeapon === 'rock' && computerMove === 'scissors') ||
        (pickedWeapon === 'paper' && computerMove === 'rock') ||
        (pickedWeapon === 'scissors' && computerMove === 'paper')
    ) {
        playerScore++;
        setDecision("You Win!")
        displayMove(pickedWeapon, computerMove);
        decision.style.color = "green"
    } else {
        computerScore++;
        setDecision("You Lose!")
        displayMove(pickedWeapon, computerMove);
        decision.style.color = "red"
    }
    updateScore();
    localStorage.setItem('playerScore', playerScore);
    localStorage.setItem('computerScore', computerScore);
}


const updateScore = () => {
    playerScoreDisplay.innerHTML = playerScore;
    computerScoreDisplay.innerHTML = computerScore;
}

const setDecision = (decision) => {
    document.querySelector(".decision h1").innerText = decision;
}

const restartGame = () => {
    let contest = document.querySelector(".contest");
    contest.style.display = "none";

    let hands = document.querySelector(".weapons");
    hands.style.display = "flex";
}

const resetGame = () => {
    localStorage.clear();
    playerScore = 0;
    computerScore = 0;
    updateScore();
    displayMove('', '');
    restartGame()
}

playerScore = parseInt(localStorage.getItem('playerScore')) || 0;
computerScore = parseInt(localStorage.getItem('computerScore')) || 0;

updateScore();
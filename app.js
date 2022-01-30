

const restartButton = document.getElementById('restart');
const cells = document.querySelectorAll('.cell');
const textBox = document.getElementById('text-box');
const canvas = document.getElementById('myCanvas');


let turnCount = 1;

//--------------------------------GAMEBOARD--------------------------------------------

const gameboard = {
    board: ['', '', '', '', '', '', '', '', '' ]
}

function renderGameboard() {

    if (gameMode == 'singlePlayerMode'){
        for (let i = 0; i < 9; i++) {
            const gridCell = document.getElementById(`${i+1}-ai`);
            gridCell.textContent = gameboard.board[i];
        }   
    }else if (gameMode == 'multiPlayerMode'){
        for (let i = 0; i < 9; i++) {
            const gridCell = document.getElementById(`${i+1}`);
            gridCell.textContent = gameboard.board[i];
        }   
    }

 
}

//--------------------------------PLAYERS---------------------------------------------

function createPlayer(name) {
    return {
        name: name
    }
}

// ----------------------------- CLICKING/HOVERING ON A CELL ----------------------------------

cells.forEach((cell) => {

    cell.addEventListener('mouseenter', function cellEnter() {
        if(cell.textContent === ''){
            if ((turnCount % 2) == 1) {
                cell.style.color = 'lightgrey';
                cell.textContent = 'X';
            }else {
                cell.style.color = 'lightgrey';
                cell.textContent = 'O';
            }
        }
    })

    cell.addEventListener('mouseleave', function cellLeave() {
        if(cell.style.color === 'lightgrey') {
            cell.textContent = '';
            cell.style.color = 'black';
        }
    })

    cell.addEventListener('click', function handleClick(){

        let firstPlayerInput = document.getElementById('firstPlayerName').value;
        let secondPlayerInput = document.getElementById('secondPlayerName').value;
        let firstPlayer = createPlayer(firstPlayerInput);
        let secondPlayer = createPlayer(secondPlayerInput);

        if ((turnCount % 2) == 1) {
            cell.style.color = 'black';
            gameboard.board[cell.id-1] = 'X';
            renderGameboard();
            cell.style.pointerEvents = 'none';          
            turnCount++;
            textBox.textContent = `${secondPlayer.name}` + `\'s turn!`;
        }else {
            cell.style.color = 'black';
            gameboard.board[cell.id-1] = 'O';
            renderGameboard();
            cell.style.pointerEvents = 'none'; 
            turnCount++;
            textBox.textContent = `${firstPlayer.name}` + `\'s turn!`;
        }

        let result = checkForWin();
        if (result !== undefined) {
            let winnerMark = extractMark(result);
            let combo = extractCombo(result);
            if (winnerMark === 'X'){
                textBox.textContent = `${firstPlayer.name}` +  ` wins!`;
                canvas.style.display = 'block';
                drawLine(combo);
                restartButton.style.display = 'block';
            }else if (winnerMark === 'O') {
                textBox.textContent = `${secondPlayer.name}` +  ` wins!`;
                canvas.style.display = 'block';
                drawLine(combo);
                restartButton.style.display = 'block';
            } 
        }else if((result === undefined) && (turnCount == 10)) {
            textBox.textContent = `Draw!`;
            restartButton.style.display = 'block';
        }

    });
});


// -------------------------- RESTART GAME ---------------------------------------
restartButton.addEventListener('click', restartGame);

function restartGame() {
    if( gameMode == 'multiPlayerMode') {
        cells.forEach((cell) => {
            cell.textContent = '';
            cell.style.pointerEvents = 'auto';
        })
        turnCount = 1;
        gameboard.board = ['', '', '', '', '', '', '', '', '' ];
        textBox.textContent = 'Let\'s play Tic-Tac-Toe!';
        restartButton.style.display = 'none';
        let canvasRestart = 'clear';
        drawLine(canvasRestart);
        canvas.style.display = 'none';   
    }else if (gameMode == 'singlePlayerMode'){
        cellsAI.forEach((cell) => {
            cell.textContent = '';
            cell.style.pointerEvents = 'auto';
        })
        turnCount = 1;
        gameboard.board = ['', '', '', '', '', '', '', '', '' ];
        textBoxAI.textContent = 'Let\'s play Tic-Tac-Toe!';
        restartButton.style.display = 'none';
        let canvasRestart = 'clear';
        drawLine(canvasRestart);
        canvasAI.style.display = 'none';   
    } 
};

// -------------------------- CHECK FOR WINNER -----------------------------------
function checkForWin() {
    const winningCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    
    let firstSymbol = '';
    let secondSymbol = '';
    let thirdSymbol = '';
    let firstPlayerWins = false;
    let secondPlayerWins = false;
    let result = '';

    for (let i = 0; i < winningCombos.length; i++) {

        for( let j = 0; j < 3; j++){
            switch (j) {
                case 0:
                    firstSymbol = gameboard.board[winningCombos[i][j]];
                case 1:
                    secondSymbol = gameboard.board[winningCombos[i][j]];
                case 2:
                    thirdSymbol = gameboard.board[winningCombos[i][j]];
            }
        }

        if ((firstSymbol == 'X') && (secondSymbol == 'X') && (thirdSymbol == 'X')) {
            firstPlayerWins = true;
            result = `X${i}`;
            return result;
        }else if ((firstSymbol == 'O') && (secondSymbol == 'O') && (thirdSymbol == 'O')) {
            secondPlayerWins = true;
            result = `O${i}`;
            return result;
        }
    }
};

// -------------------------- DRAW LINE OVER WINNING COMBO -------------------------

function drawLine(combo) {

    if (gameMode == 'multiPlayerMode') {
        let ctx = canvas.getContext('2d');
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.strokeStyle = 'limegreen';

        switch (combo) {
            case '0':
                ctx.moveTo(0,50);
                ctx.lineTo(300,50);
                ctx.stroke();
                break;
            case '1':
                ctx.moveTo(0,150);
                ctx.lineTo(300,150);
                ctx.stroke();
                break;
            case '2':
                ctx.moveTo(0,250);
                ctx.lineTo(300,250);
                ctx.stroke();
                break;
            case '3':
                ctx.moveTo(50,0);
                ctx.lineTo(50,300);
                ctx.stroke();
                break;
            case '4':
                ctx.moveTo(150,0);
                ctx.lineTo(150,300);
                ctx.stroke();
                break;
            case '5':
                ctx.moveTo(250,0);
                ctx.lineTo(250,300);
                ctx.stroke();
                break;
            case '6':
                ctx.moveTo(0,0);
                ctx.lineTo(300,300);
                ctx.stroke();
                break;
            case '7':
                ctx.moveTo(300,0);
                ctx.lineTo(0,300);
                ctx.stroke();
                break; 
            case 'clear':
                ctx.clearRect(0,0,300,300);
                break;
        }
    }else if (gameMode == 'singlePlayerMode') {
        let ctx = canvasAI.getContext('2d');
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.strokeStyle = 'limegreen';

        switch (combo) {
            case '0':
                ctx.moveTo(0,50);
                ctx.lineTo(300,50);
                ctx.stroke();
                break;
            case '1':
                ctx.moveTo(0,150);
                ctx.lineTo(300,150);
                ctx.stroke();
                break;
            case '2':
                ctx.moveTo(0,250);
                ctx.lineTo(300,250);
                ctx.stroke();
                break;
            case '3':
                ctx.moveTo(50,0);
                ctx.lineTo(50,300);
                ctx.stroke();
                break;
            case '4':
                ctx.moveTo(150,0);
                ctx.lineTo(150,300);
                ctx.stroke();
                break;
            case '5':
                ctx.moveTo(250,0);
                ctx.lineTo(250,300);
                ctx.stroke();
                break;
            case '6':
                ctx.moveTo(0,0);
                ctx.lineTo(300,300);
                ctx.stroke();
                break;
            case '7':
                ctx.moveTo(300,0);
                ctx.lineTo(0,300);
                ctx.stroke();
                break; 
            case 'clear':
                ctx.clearRect(0,0,300,300);
                break;
        }
    }
}
    

function extractMark(result){
    return result.slice(0,1);
}

function extractCombo(result){
    return result.slice(1);
}


// --------------------------------------- MAIN MENU ----------------------------------------------------

const mainMenuWindow = document.querySelector('.main-menu');
const mainMenuButton = document.getElementById('main-menu-button');
const singlePlayerWindow = document.querySelector('.singleplayer');
const multiPlayerWindow = document.querySelector('.multiplayer')
const confirmButton = document.getElementById('confirm-button');
const singlePlayerButton = document.getElementById('singleplayer-button');
const multiplayerButton = document.getElementById('multiplayer-button');
const playerNameInputWindow = document.getElementById('playerNamesInput');
const difficultyOptionsWindow = document.getElementById('difficultyOptions');
let gameMode = '';


mainMenuButton.addEventListener('click', ()=> {
    restartGame();
    multiplayerButton.style.border = '1px solid black';
    singlePlayerButton.style.border = '1px solid black';
    singlePlayerWindow.style.display = 'none';
    difficultyOptionsWindow.style.display = 'none';
    multiPlayerWindow.style.display = 'none';
    playerNameInputWindow.style.display = 'none';
    mainMenuWindow.style.display = 'flex';
});

singlePlayerButton.addEventListener('click', ()=> {
    difficultyOptionsWindow.style.display = 'block';
    singlePlayerButton.style.border = '2px solid limegreen';
    multiplayerButton.style.border = '1px solid black';
    playerNameInputWindow.style.display = 'none';
    gameMode = 'singlePlayerMode';
});

multiplayerButton.addEventListener('click', () => {
    playerNameInputWindow.style.display = 'block';
    singlePlayerButton.style.border = '1px solid black';
    multiplayerButton.style.border = '2px solid limegreen';
    difficultyOptionsWindow.style.display = 'none';
    gameMode = 'multiPlayerMode';
});

confirmButton.addEventListener('click', () => {    
    if (gameMode === 'singlePlayerMode'){
        mainMenuWindow.style.display = 'none';
        singlePlayerWindow.style.display = 'flex';
    }else if(gameMode === 'multiPlayerMode'){
        mainMenuWindow.style.display = 'none';
        multiPlayerWindow.style.display = 'flex';
    }
});


// -------------------------------- SINGLE PLAYER MODE --------------------------------

const cellsAI = document.querySelectorAll('.cell-ai');
const textBoxAI = document.getElementById('text-box-ai');
const canvasAI = document.getElementById('myCanvas-ai');

cellsAI.forEach((cell) => {

    cell.addEventListener('mouseenter', function cellEnter() {
        if(cell.textContent === ''){
            if ((turnCount % 2) == 1) {
                cell.style.color = 'lightgrey';
                cell.textContent = 'X';
            }else {
                cell.style.color = 'lightgrey';
                cell.textContent = 'O';
            }
        }
    })

    cell.addEventListener('mouseleave', function cellLeave() {
        if(cell.style.color === 'lightgrey') {
            cell.textContent = '';
            cell.style.color = 'black';
        }
    })

    cell.addEventListener('click', function handleClick(){

        if ((turnCount % 2) == 1) {
            cell.style.color = 'black';
            let cellIndex = cell.id.slice(0,1);
            gameboard.board[cellIndex-1] = 'X';
            renderGameboard();
            cell.style.pointerEvents = 'none';          
            turnCount++;
        }
        if ((turnCount % 2) == 0 && (turnCount < 10)) {
            cellIndex = computerPlay();
            let cellAI = document.getElementById(`${cellIndex + 1}-ai`);
            cellAI.style.color = 'black';
            gameboard.board[cellIndex] = 'O';
            renderGameboard();
            turnCount++;
        }

        let result = checkForWin();
        if (result !== undefined) {
            let winnerMark = extractMark(result);
            let combo = extractCombo(result);
            if (winnerMark === 'X'){
                textBoxAI.textContent = `You win!`;
                canvasAI.style.display = 'block';
                drawLine(combo);
                restartButton.style.display = 'block';
            }else if (winnerMark === 'O') {
                textBoxAI.textContent = `You lose!`;
                canvasAI.style.display = 'block';
                drawLine(combo);
                restartButton.style.display = 'block';
            } 
        }else if((result === undefined) && (turnCount == 10)) {
            textBoxAI.textContent = `Draw!`;
            restartButton.style.display = 'block';
        }
    });
});

function computerPlay() {
    let computerChoicesArray = [];
    let currentBoard = gameboard.board;
    for ( let i = 0; i < gameboard.board.length ; i ++) {
        if(gameboard.board[i] == ''){
            computerChoicesArray.push(i);
        }
    }
    let randomChoice = Math.floor(Math.random() * computerChoicesArray.length);
    let compChoice = computerChoicesArray[randomChoice];    
    return compChoice;
}

// Notes:
// - Remove clickability on O square in single-player
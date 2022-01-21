

const restartButton = document.getElementById('restart');
const cells = document.querySelectorAll('.cell');
const textBox = document.getElementById('text-box');
let canvas = document.getElementById('myCanvas');

let turnCount = 1;

//--------------------------------GAMEBOARD--------------------------------------------

const gameboard = {
    board: ['', '', '', '', '', '', '', '', '' ]
}

function renderGameboard() {
    for (let i = 0; i < 9; i++) {
        const gridCell = document.getElementById(`${i+1}`);
        gridCell.textContent = gameboard.board[i];
    }    
}

//--------------------------------PLAYERS---------------------------------------------


function createPlayer(name) {
    return {
        name: name
    }
}

let firstPlayerPrompt = 'First Player';
let secondPlayerPrompt = 'Second Player';
// let firstPlayerPrompt = prompt("First player\'s name:");
 let firstPlayer = createPlayer(firstPlayerPrompt);
// let secondPlayerPrompt = prompt("Second player\'s name:");
 let secondPlayer = createPlayer(secondPlayerPrompt);



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
        if ((turnCount % 2) == 1) {
            cell.style.color = 'black';
            gameboard.board[cell.id-1] = 'X';
            renderGameboard();
            cell.style.pointerEvents = 'none';          
            turnCount++;
            textBox.textContent = 'Second Player\'s turn O'
        }else {
            cell.style.color = 'black';
            gameboard.board[cell.id-1] = 'O';
            renderGameboard();
            cell.style.pointerEvents = 'none'; 
            turnCount++;
            textBox.textContent = 'First Player\'s turn X'
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
    cells.forEach((cell) => {
        cell.textContent = '';
        cell.style.pointerEvents = 'auto';
    })
    turnCount = 1;
    gameboard.board = ['', '', '', '', '', '', '', '', '' ];
    textBox.textContent = 'First Player\'s turn X';
    restartButton.style.display = 'none';
    let canvasRestart = 'clear';
    drawLine(canvasRestart);
    canvas.style.display = 'none';
    
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

}

function extractMark(result){
    return result.slice(0,1);
}

function extractCombo(result){
    return result.slice(1);
}



// Notes:
// - Fix draw issue at end game (done)
// - Remove clickability after someone wins (done)
// - Have restart button appear after someone wins (done)
// - Have a line appear over winning combo (done)
// - Fix hovering effect (done)
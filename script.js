let canvasWidth = 640;
let canvasHeight = 640;

let ballX = canvasWidth / 2;
let ballY = canvasHeight / 2;
let ballSpeed = 2;
let ballDirection = -1;
let ballSize = 10;
let ballDegree = 1;

let playerSpeed = 10;
let player2Speed = 10;
let playerWidth = 10;
let playerHeight = 70;


function setup() {
    createCanvas(canvasWidth, canvasHeight);
}

function draw() {
    background(51);
    player1();
    playerAI();
    ball();
    ballCollision();
    ball();
    noStroke();
}

function player1() {
    playerX = 80;
    playerY = ((canvasHeight - playerHeight) / 2) - playerSpeed;

    if (keyIsDown(DOWN_ARROW)) {
        playerSpeed -= 10;
        if (playerY + playerHeight >= canvasHeight) {
            playerSpeed += 10;
        }
    } else if (keyIsDown(UP_ARROW)) {
        playerSpeed += 10;
        if (playerY <= 0) {
            playerSpeed -= 10;
        }
    }
    rect(playerX, playerY, playerWidth, playerHeight);
}

function playerAI() {
    player2X = 560;
    player2Y = ((canvasHeight - playerHeight) / 2) - player2Speed;

    if (ballY > 0) {
        if (ballY >= player2Y) {
            player2Speed -= 4.90;
        } else if (ballY <= player2Y) {
            player2Speed += 7.55;
        }
    }
    
    rect(player2X, player2Y, playerWidth, playerHeight);
}

function ball() {
    ballX = ballX + ballSpeed * ballDirection;
    ballY -= ballDegree;
    ellipse(ballX, ballY, ballSize, ballSize);
}

function ballCollision() {
    //Player 1 collision
    if (ballX < playerX + playerWidth && ballY > playerY && ballY < playerY + playerHeight) {
        ballDirection *= -1;
        ballY += 1;
    }

    //Player 2 collision
    if (ballX > player2X - playerWidth && ballY > player2Y && ballY < player2Y + playerHeight) {
        ballDirection *= -1;
        ballY += 1;
    } 

    //Edge collision
    if (ballY <= 0) {
        console.log('edge');
        ballDegree = -ballDegree;
    } else if (ballY >= canvasHeight) {
        ballDegree = -ballDegree;
    }

    if (ballX <= playerX - 10 || ballX >= player2X + 10) {
        console.log('end');
    }
}

function resetGame() {
    ballX = canvasWidth / 2;
    ballY = canvasHeight / 2;
}
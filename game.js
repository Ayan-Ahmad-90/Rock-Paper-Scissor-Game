const choices = document.querySelectorAll(".choice");
const resetbtn = document.querySelector("#reset-btn");
const userScoreDisplay = document.querySelector("#user-score");
const compScoreDisplay = document.querySelector("#comp-score");
const newgamebtn = document.querySelector("#new-game");
const msg = document.querySelector(".msg");

let user_score = 0;
let comp_score = 0;
let gameactive = true;
let roundCount = 0;
const maxRounds = 5;

const options = ["Rock", "Paper", "scissor"];

function getCompChoice() {
    const comp = Math.floor(Math.random() * 3);
    return options[comp];
}

function playSound(type) {
    const win = document.getElementById("win-sound");
    const lose = document.getElementById("lose-sound");
    const draw = document.getElementById("draw-sound");

    if (type === "win") {
        win.currentTime = 0;
        win.play();
    } else if (type === "lose") {
        lose.currentTime = 0;
        lose.play();
    } else if (type === "draw") {
        draw.currentTime = 0;
        draw.play();
    }
}

function playFinalResultSound() {
    const finalWin = document.getElementById("final-win-sound");
    const finalLose = document.getElementById("final-lose-sound");
    const finaltie = document.getElementById("final-tie-sound");
    if(user_score === comp_score){
        finaltie.currentTime = 0;
        finaltie.play();
    }
    if (user_score > comp_score) {
        finalWin.currentTime = 0;
        finalWin.play();
    } else if (user_score < comp_score) {
        finalLose.currentTime = 0;
        finalLose.play();
    }
}

function playTouchSound() {
    const touchSound = document.getElementById("touch-sound");
    if (touchSound) {
        touchSound.currentTime = 0;
        touchSound.play();
    }
}


function playGame(userChoice) {
    if (!gameactive) return;

    const compChoice = getCompChoice();
    roundCount++;

    if (userChoice === compChoice) {
        msg.innerText = `Round ${roundCount}: It's a Draw! Both chose ${userChoice}`;
        msg.style.color = "yellow";
        playSound("draw");
    } else if (
        userChoice === "Rock" && compChoice === "Scissor" ||
        userChoice === "Paper" && compChoice === "Rock" ||
        userChoice === "Scissor" && compChoice === "Paper"
    ) {
        user_score++;
        msg.innerText = `Round ${roundCount}: You Win! ${userChoice} beats ${compChoice}`;
        msg.style.color = "green";
        userScoreDisplay.innerText = user_score;
        playSound("win");
    } else {
        comp_score++;
        msg.innerText = `Round ${roundCount}: You Lose! ${compChoice} beats ${userChoice}`;
        msg.style.color = "red";
        compScoreDisplay.innerText = comp_score;
        playSound("lose");
    }

    if (roundCount === maxRounds) {
        gameactive = false;
        setTimeout(() => {
            if (user_score > comp_score) {
                msg.innerText = `🏆 You won the game!${user_score}`;
                msg.style.color = "green";
            } else if (comp_score > user_score) {
                msg.innerText =    `you loss! ,💻 Computer wins the game! ${comp_score} & you ${user_score}`;
                msg.style.color = "red";
            } else {
                msg.innerText = `😐 It's a tie game! user${user_score} & comp${comp_score}`;
                msg.style.color = "orange";
            }
            playFinalResultSound();
        }, 500);
    }
}

choices.forEach(choice => {
    choice.addEventListener("click", () => {
        if (gameactive) {
            const userChoice = choice.id;

            // Add glow animation
            choice.classList.add("glow");
            setTimeout(() => {
                choice.classList.remove("glow");
            }, 300);

            playGame(userChoice);
        }
    });
});

resetbtn.addEventListener("click", () => {
    playTouchSound();
    user_score = 0;
    comp_score = 0;
    roundCount = 0;
    userScoreDisplay.innerText = "0";
    compScoreDisplay.innerText = "0";
    msg.innerText = "Pick Your Move";
    msg.style.color = "orange";
    gameactive = true;
});

newgamebtn.addEventListener("click", () => {
    playTouchSound();
    user_score = 0;
    comp_score = 0;
    roundCount = 0;
    userScoreDisplay.innerText = "0";
    compScoreDisplay.innerText = "0";
    msg.innerText = "New Game Started, Pick Your Move!";
    msg.style.color = "palevioletred";
    gameactive = true;
});

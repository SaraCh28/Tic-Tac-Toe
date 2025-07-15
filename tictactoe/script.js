console.log("Tic Tac Toe Game Loaded");

let music = new Audio("music.mp3");
let turnSound = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");

let turns = "X";
let win = false;

// Function to change turn
const changeturn = () => {
    return turns === "X" ? "0" : "X";
};

// Function to check for a win
const checkwin = () => {
    let boxtexts = document.getElementsByClassName("boxtext");
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135]
    ];

    wins.forEach(e => {
        if (
            boxtexts[e[0]].innerText === boxtexts[e[1]].innerText &&
            boxtexts[e[1]].innerText === boxtexts[e[2]].innerText &&
            boxtexts[e[0]].innerText !== ""
        ) {
            document.querySelector(".info").innerText = boxtexts[e[0]].innerText + " Won";
            win = true;
            music.play();

             document.querySelector(".imgbox").getElementsByTagName("img")[0].style.display = "block";
            document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "200px";
            // // Optional winning line effect (if you have it in HTML/CSS)
            // const line = document.querySelector(".line");
            // if (line) {
            //     line.style.width = "20vw";
            // }
            document.querySelector(".line").style.width = "20vw";
            document.querySelector(".line").style.transform= `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            gameover.play();
        }
    });
};

// Game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener("click", () => {
        if (boxtext.innerText === "" && !win) {
            boxtext.innerText = turns;
            turnSound.play();
            checkwin();
            if (!win) {
                turns = changeturn();
                document.querySelector(".info").innerText = "Turn for " + turns;
            }
        }
    });
});

// Reset button logic
document.querySelector(".reset").addEventListener("click", () => {
    let boxtexts = document.querySelectorAll(".boxtext");
    boxtexts.forEach(element => {
        element.innerText = "";
    });

    turns = "X";
    win = false;

    // Reset image
    document.querySelectorAll(".imgbox img").forEach(img => {
        img.style.display = "none";
        img.style.width = "0";
    });

    // Reset winning line if used
    const line = document.querySelector(".line");
    if (line) {
        line.style.width = "0vw";
    }
      // Reset audio
    music.pause();
    music.currentTime = 0;
    turnSound.pause();
    turnSound.currentTime = 0;
    gameover.pause();
    gameover.currentTime = 0;


    document.querySelector(".info").innerText = "Turn for " + turns;
});

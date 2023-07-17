const options = {
    aroma: "Pleasing smell",
    pepper: "Salt's partner",
    halt: "put a stop to",
    jump: "Rise suddenly",
    shuffle: "Mix cards up",
    combine: "Add; mix",
    chaos: "Total disorder",
    labyrinth: "Maze",
    disturb: "Interrupt; upset",
    shift: "Move; Period of word",
    machine: "Device or appliance"
};

const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
const words = Object.keys(options);
let randomWord = "", randomHint = "";
let winCount = 0, lossCount = 0;

const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

// Blocked buttons
const blocker = () => {
    let lettersButtons = document.querySelectorAll(".letters");

    stopGame();
};

startBtn.addEventListener("click", () => {
    controls.classList.add("hide");
    init();
});

const stopGame = () => {
    controls.classList.remove("hide");
};

const generateWord = () => {
    letterContainer.classList.remove("hide");
    userInpSection.innerText = "";
    randomWord = words[generateRandomValue(words)];
    randomHint = options[randomWord];
    hintRef.innerHTML = `<div id="wordHint"><span>Hint: </span>${randomHint}</div>`;

    let displayItem = "";
    randomWord.split("").forEach((value) => {
        displayItem += '<span class="inputSpace">_ </span>';
    });

    // Display each element as span
    userInpSection.innerHTML = displayItem;
    userInpSection.innerHTML += `<div id="chanceCount">Chances Left: ${lossCount}</div>`;
};

const init = () => {
    winCount = 0;
    lossCount = 5;
    randomWord = "";
    word.innerText = "";
    randomHint = "";
    message.innerText = "";
    userInpSection.innerHTML = "";
    letterContainer.classList.add("hide");
    letterContainer.innerHTML = "";
    generateWord();

    // create letter buttons
    for(let i = 65; i < 91; i++){
        let button = document.createElement("button");
        button.classList.add("letters");

        // Number to ASCII[A - Z]
        button.innerText = String.fromCharCode(i);

        // Character button onclick
        button.addEventListener("click", () => {
            message.innerText = `Correct Letter`;
            message.style.color = "#080000";

            let charArray = randomWord.toUpperCase().split("");
            let inputSpace = document.getElementsByClassName("inputSpace");

            // If array contains clicked value replace the matched Dash with letter
            if(charArray.includes(button.innerText)){
                charArray.forEach((char, index) => {
                    if(char === button.innerText){
                        button.classList.add("correct");

                        // Replace Dash with letter
                        inputSpace[index].innerText = char;

                        winCount += 1;

                        if(winCount == charArray.length){
                            resultText.innerHTML = "You Won";
                            startBtn.innerText = "Restart";

                            // Block all buttons
                            blocker();
                        }
                    }
                });
            }
            else{
                // loss count
                button.classList.add("incorrect");
                lossCount -= 1;
                document.getElementById("chanceCount").innerText = `Chances Left: ${lossCount}`;
                message.innerText = `Incorrect Letter`;
                message.style.color = "#ff0000";

                if(lossCount == 0){
                    word.innerHTML = `The word was: <span>${randomWord}</span>`;
                    resultText.innerHTML = "Game Over";
                    blocker();
                }
            }

            // Disable clicked button
            button.disabled = true;
        })

        letterContainer.appendChild(button);
    }
};

window.onload = () => {
    init();
};
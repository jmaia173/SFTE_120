let timer;
let timeRemaining = 600;
const colors = ['red', 'green', 'blue', 'yellow'];

const riddlePool = [
    { question: "What has keys but can't open locks?", answer: "piano" },
    { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", answer: "m" },
    { question: "I am tall when I am young, and I am short when I am old. What am I?", answer: "candle" },
    { question: "What can travel around the world while staying in the corner?", answer: "stamp" },
    { question: "The more you take, the more you leave behind. What are they?", answer: "footsteps" },
    { question: "What gets wetter the more it dries?", answer: "towel" },
    { question: "What begins with T, ends with T, and has T in it?", answer: "teapot" },
    { question: "What can you catch but not throw?", answer: "cold" },
    { question: "What has a head, a tail, but no body?", answer: "coin" },
    { question: "I speak without a mouth and hear without ears. What am I?", answer: "echo" },
    { question: "What is full of holes but still holds water?", answer: "sponge" },
    { question: "The more you take from me, the bigger I get. What am I?", answer: "hole" },
    { question: "What has many words but never speaks?", answer: "book" },
    { question: "goes up but never comes down?", answer: "age" },
];

const wordScramblePool = [
    { question: "Unscramble: rgeat", answer: "great" },
    { question: "Unscramble: tceosurpm", answer: "computers" },
    { question: "Unscramble: anlpte", answer: "planet" },
    { question: "Unscramble: lpepa", answer: "apple" },
    { question: "Unscramble: naabna", answer: "banana" },
    { question: "Unscramble: wtarlemone", answer: "watermelon" },
    { question: "Unscramble: egnaro", answer: "orange" },
    { question: "Unscramble: ybrerwsrta", answer: "strawberry" },
    { question: "Unscramble: hcrnuc", answer: "crunch" },
    { question: "Unscramble: gnihgtilf", answer: "flighting" },
    { question: "Unscramble: eelphnat", answer: "elephant" },
    { question: "Unscramble: ecfh", answer: "chef" }, 
    { question: "Unscramble: trouenc", answer: "counter" },
    { question: "Unscramble: ilpenc", answer: "pencil" }
];

function getRandomItems(array, count) {
    const arr = [...array]; 

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr.slice(0, count); 
}

let selectedRiddles = getRandomItems(riddlePool, 4);
let selectedScrambles = getRandomItems(wordScramblePool, 3);

const rooms = [
    {
        type: "riddle",
        code: generateCode(4),
        obstacles: selectedRiddles
    },
    {
        type: "scramble",
        code: generateCode(3),
        obstacles: selectedScrambles
    },
    {
        type: "pattern",
        code: generateCode(1),
        pattern: [],
    },
];

let currentRoomIndex = 0;
let currentRoom = rooms[currentRoomIndex];
let secretCode = currentRoom.code;
let currentDigit = 0;
let obstaclesSolved = 0;
let userPattern = [];
let patternToMatch = [];

function startTimer() {
    timer = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(timer);
            alert("Time's up! You failed to escape.");
        } else {
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;
            document.getElementById("timer").innerText = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            timeRemaining--;
        }
    }, 1000);
}

function generateCode(length) {
    let code = '';
    for (let i = 0; i < length; i++) {
        code += Math.floor(Math.random() * 10);
    }
    return code;
}

function goToNextRoom() {
    currentRoomIndex++;
    if (currentRoomIndex >= rooms.length) {
        document.getElementById("message").innerHTML = "<h2 class='escaped'>🎉 You've escaped all rooms! Congratulations!</h2>";

        confetti({
            particleCount: 100,
            spread: 60,
            origin: { y: 0.6 }
        });
        
        document.getElementById("obstacle-container").style.display = "none";
        document.getElementById("hintsContainer").style.display = "none";
        document.getElementById("codeInput").style.display = "none";
        document.querySelector(".btn").style.display = "none";
        document.getElementById("nextRoomBtn").style.display = "none";
        
        document.body.style.backgroundColor = "#27ae60"; 
    
        return;
    }

    currentRoom = rooms[currentRoomIndex];
    secretCode = currentRoom.code;
    obstaclesSolved = 0;
    currentDigit = 0;
    userPattern = [];

    document.getElementById("hintsContainer").innerHTML = "";
    document.getElementById("codeInput").value = "";
    document.getElementById("message").innerHTML = "The door is locked! Try to solve the obstacles.";
    document.getElementById("codeInput").disabled = true;
    document.querySelector(".btn").disabled = true;
    document.getElementById("nextRoomBtn").style.display = "none";
    document.body.style.backgroundColor = "#2c3e50";

    showObstacle();
}

function submitCode() {
    const codeEntered = document.getElementById("codeInput").value;
    if (codeEntered === secretCode) {
        document.getElementById("message").innerHTML = "<span class='escaped'>Room Complete! You're one step closer to escaping!</span>";
        document.body.style.backgroundColor = "#2ecc71";
        document.getElementById("nextRoomBtn").style.display = "inline-block";
        document.getElementById("codeInput").disabled = true;
        document.querySelector(".btn").disabled = true;
    } else {
        document.getElementById("message").innerHTML = "Wrong code! Try again.";
        document.body.style.backgroundColor = "#e74c3c";
    }
}

function revealDigit() {
    const codeDigit = secretCode[currentDigit];
    document.getElementById("hintsContainer").innerHTML += `<p>Digit ${currentDigit + 1}: ${codeDigit}</p>`;
    currentDigit++;
}

function showHints() {
    document.getElementById("hint").innerText = `You've unlocked all digits! Enter the code to escape.`;
    document.getElementById("obstacle-container").innerHTML = "";
    document.getElementById("codeInput").disabled = false;
    document.querySelector(".btn").disabled = false;
}

// ========== ROOM LOGIC ==========
function showObstacle() {
    const container = document.getElementById("obstacle-container");
    const hint = document.getElementById("hint");

    if (currentRoom.type === "riddle") {
        hint.innerText = "Solve the obstacle to unlock a digit!";
        container.innerHTML = `
            <p>${currentRoom.obstacles[obstaclesSolved].question}</p>
            <input type="text" id="obstacleAnswer" placeholder="Your answer...">
            <button class="btn" onclick="checkAnswer()">Submit Answer</button>`;
    } else if (currentRoom.type === "scramble") {
        hint.innerText = "Unscramble the word to unlock a digit!";
        const currentObstacle = currentRoom.obstacles[obstaclesSolved];
        container.innerHTML = `
            <p>${currentObstacle.question}</p>
            <input type="text" id="scrambleAnswer" placeholder="Your answer...">
            <button class="btn" onclick="checkScrambleAnswer()">Submit Answer</button>`;
    } else if (currentRoom.type === "pattern") {
        hint.innerText = "Repeat the color pattern to escape!";
        container.innerHTML = `<div id="color-buttons"></div>`;
        const buttonArea = document.getElementById("color-buttons");

        colors.forEach(color => {
            const btn = document.createElement("button");
            btn.className = "color-btn";
            btn.style.backgroundColor = color;
            btn.onclick = () => handleColorClick(color);
            buttonArea.appendChild(btn);
        });

        generateColorPattern();
        displayPattern();

        const replayBtn = document.createElement("button");
        replayBtn.innerText = "Replay Pattern";
        replayBtn.className = "btn";
        replayBtn.onclick = displayPattern;
        container.appendChild(replayBtn);
    } 
}

// ========== CHECK FUNCTIONS ==========
function checkAnswer() {
    const answer = document.getElementById("obstacleAnswer").value.toLowerCase();
    const currentObstacle = currentRoom.obstacles[obstaclesSolved];

    if (answer === currentObstacle.answer) {
        alert("Correct! You've unlocked a digit.");
        revealDigit();
        obstaclesSolved++;
        obstaclesSolved < currentRoom.obstacles.length ? showObstacle() : showHints();
    } else {
        alert("Incorrect answer, try again!");
    }
}

function checkScrambleAnswer() {
    const answer = document.getElementById("scrambleAnswer").value.toLowerCase();
    const currentObstacle = currentRoom.obstacles[obstaclesSolved];

    if (answer === currentObstacle.answer) {
        alert("Correct! You've unlocked a digit.");
        revealDigit();
        obstaclesSolved++;
        obstaclesSolved < currentRoom.obstacles.length ? showObstacle() : showHints();
    } else {
        alert("Incorrect answer, try again!");
    }
}

function generateColorPattern() {
    patternToMatch = [];
    for (let i = 0; i < 4; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        patternToMatch.push(color);
    }
    currentRoom.pattern = patternToMatch;
}

function displayPattern() {
    let index = 0;
    const interval = setInterval(() => {
        document.body.style.backgroundColor = patternToMatch[index];
        index++;
        if (index >= patternToMatch.length) {
            clearInterval(interval);
            setTimeout(() => {
                document.body.style.backgroundColor = "#2c3e50";
            }, 500);
        }
    }, 600);
}

function handleColorClick(color) {
    userPattern.push(color);
    if (userPattern.length === patternToMatch.length) {
        if (JSON.stringify(userPattern) === JSON.stringify(patternToMatch)) {
            alert("Correct pattern! You've unlocked the digit.");
            revealDigit();
            showHints();
        } else {
            alert("Wrong pattern! Try again.");
        }
        userPattern = [];
    }
}

function resetGame() {
    clearInterval(timer);
    timeRemaining = 600;
    document.getElementById("timer").innerText = "10:00";

    selectedRiddles = getRandomItems(riddlePool, 4);
    selectedScrambles = getRandomItems(wordScramblePool, 3);

    rooms[0].code = generateCode(4);
    rooms[0].obstacles = selectedRiddles;
    rooms[1].code = generateCode(3);
    rooms[1].obstacles = selectedScrambles;
    rooms[2].code = generateCode(1);
    rooms[2].pattern = [];

    currentRoomIndex = 0;
    currentRoom = rooms[currentRoomIndex];
    secretCode = currentRoom.code;
    currentDigit = 0;
    obstaclesSolved = 0;
    userPattern = [];
    patternToMatch = [];

    document.body.style.backgroundColor = "lightblue";
    document.getElementById("hintsContainer").innerHTML = "";
    document.getElementById("obstacle-container").innerHTML = "";
    document.getElementById("codeInput").value = "";
    document.getElementById("codeInput").disabled = true;
    document.querySelector(".btn").disabled = true;
    document.getElementById("message").innerHTML = "The door is locked! Try to solve the obstacles.";
    document.getElementById("nextRoomBtn").style.display = "none";

    document.getElementById("obstacle-container").style.display = "block";
    document.getElementById("hintsContainer").style.display = "block";
    document.getElementById("codeInput").style.display = "inline-block";
    document.querySelector(".btn").style.display = "inline-block";

    showObstacle();
    startTimer();
}

startTimer();
showObstacle();

function generateCode(length) {
    let code = '';
    for (let i = 0; i < length; i++) {
        code += Math.floor(Math.random() * 10);
    }
    return code;
}

// Room Setup
const rooms = [
    {
        type: "riddle",
        code: generateCode(4),
        obstacles: [
            { question: "What has keys but can't open locks?", answer: "piano" },
            { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", answer: "m" },
            { question: "I am tall when I am young, and I am short when I am old. What am I?", answer: "candle" },
            { question: "What can travel around the world while staying in the corner?", answer: "stamp" }
        ]
    },
    {
        type: "scramble",
        code: generateCode(3),
        obstacles: [
            { question: "Unscramble: 'rgeat'", answer: "great" },
            { question: "Unscramble: 'tceosurpm'", answer: "computers" },
            { question: "Unscramble: 'anlpte'", answer: "planet" }
        ]
    },
    {
        type: "pattern",
        code: generateCode(1),  // Only one correct pattern match needed
        pattern: [],  // Will be generated
    }
];

let currentRoomIndex = 0;
let currentRoom = rooms[currentRoomIndex];
let currentDigit = 0;
let obstaclesSolved = 0;
let secretCode = currentRoom.code;

const colors = ['red', 'green', 'blue', 'yellow'];
let userPattern = [];
let patternToMatch = [];

function showObstacle() {
    const container = document.getElementById("obstacle-container");
    const hint = document.getElementById("hint");

    if (currentRoom.type === "pattern") {
        hint.innerText = "Repeat the color pattern to escape!";
        container.innerHTML = '<div id="color-buttons"></div>';
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

    } else if (obstaclesSolved < currentRoom.obstacles.length) {
        const { question } = currentRoom.obstacles[obstaclesSolved];
        hint.innerText = "Solve to unlock a digit!";
        container.innerHTML = `
            <p>${question}</p>
            <input type="text" id="obstacleAnswer" placeholder="Your answer...">
            <button class="btn" onclick="checkAnswer()">Submit Answer</button>
        `;
    } else {
        showHints();
    }
}

function checkAnswer() {
    const answer = document.getElementById("obstacleAnswer").value.toLowerCase();
    const currentObstacle = currentRoom.obstacles[obstaclesSolved];

    if (answer === currentObstacle.answer) {
        alert("Correct! You've unlocked a digit.");
        revealDigit();
        obstaclesSolved++;
        showObstacle();
    } else {
        alert("Incorrect answer, try again!");
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

function goToNextRoom() {
    currentRoomIndex++;

    if (currentRoomIndex >= rooms.length) {
        document.querySelector(".room").innerHTML = `
            <h2>🎉 Final Escape!</h2>
            <p>You've escaped all rooms! Congratulations!</p>
        `;
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
    document.getElementById("hint").innerText = "Solve the obstacle to unlock a digit!";
    document.getElementById("codeInput").disabled = true;
    document.querySelector(".btn").disabled = true;
    document.getElementById("nextRoomBtn").style.display = "none";
    document.body.style.backgroundColor = "#f4f4f4";

    showObstacle();
}

// ========== Color Pattern Logic ==========
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
            userPattern = [];
            displayPattern();
        }
    }
}

// Start the game
showObstacle();

// Enter key handler
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const answerInput = document.getElementById("obstacleAnswer");
        if (answerInput && document.activeElement === answerInput) checkAnswer();

        const codeInput = document.getElementById("codeInput");
        if (codeInput && document.activeElement === codeInput) submitCode();
    }
});
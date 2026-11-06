let turn = 1; // 1 = O (Player 1), 2 = X (Player 2)
let gameOver = false;

const buttons = [
    [document.getElementById("btn11"), document.getElementById("btn12"), document.getElementById("btn13")],
    [document.getElementById("btn21"), document.getElementById("btn22"), document.getElementById("btn23")],
    [document.getElementById("btn31"), document.getElementById("btn32"), document.getElementById("btn33")]
];

const allButtons = buttons.flat();
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset-btn");

// Attach click listeners
allButtons.forEach(btn => {
    btn.addEventListener("click", () => handleCellClick(btn));
});

resetBtn.addEventListener("click", resetGame);

function handleCellClick(btn) {
    if (btn.innerText !== "" || gameOver) return;

    if (turn === 1) {
        btn.innerText = "O";
        btn.style.color = "#4caf50";
        turn = 2;
        statusText.innerText = "Player 2's Turn (X)";
    } else {
        btn.innerText = "X";
        btn.style.color = "#f44336";
        turn = 1;
        statusText.innerText = "Player 1's Turn (O)";
    }

    checkWinner();
}

function checkWinner() {
    const winningCombinations = [
        // Rows
        [buttons[0][0], buttons[0][1], buttons[0][2]],
        [buttons[1][0], buttons[1][1], buttons[1][2]],
        [buttons[2][0], buttons[2][1], buttons[2][2]],
        // Columns
        [buttons[0][0], buttons[1][0], buttons[2][0]],
        [buttons[0][1], buttons[1][1], buttons[2][1]],
        [buttons[0][2], buttons[1][2], buttons[2][2]],
        // Diagonals
        [buttons[0][0], buttons[1][1], buttons[2][2]],
        [buttons[0][2], buttons[1][1], buttons[2][0]]
    ];

    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (a.innerText !== "" && a.innerText === b.innerText && b.innerText === c.innerText) {
            gameOver = true;
            const winner = a.innerText === "O" ? "Player 1 (O)" : "Player 2 (X)";
            const highlightColor = a.innerText === "O" ? "#2e7d32" : "#c62828";

            combo.forEach(btn => btn.style.backgroundColor = highlightColor);
            statusText.innerText = `${winner} Wins!`;
            return;
        }
    }

    // Check for Draw
    const isDraw = allButtons.every(btn => btn.innerText !== "");
    if (isDraw && !gameOver) {
        gameOver = true;
        statusText.innerText = "It's a Draw!";
    }
}

function resetGame() {
    turn = 1;
    gameOver = false;
    statusText.innerText = "Player 1's Turn (O)";
    
    allButtons.forEach(btn => {
        btn.innerText = "";
        btn.style.backgroundColor = "#333333";
    });
}
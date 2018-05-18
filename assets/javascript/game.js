// Create an array of words

var wordList =
    ["SPRINGFIELD", "HOMER", "KRUSTY", "BART", "BORT", "SKINNER", "SMITHERS", "LISA", "MAGGIE", "BLINKY",
        "MARGE", "MILLHOUSE", "DOH", "ISOTOPES", "WIGGUM", "NELSON", "FLANDERS", "QUIMBY", "KRABAPPEL", "FRINK"
    ];

// Declare variables

const guessesAllowed = 8;
var usedLetters = [];
var currentWordIndex;
var currentWord = [];
var guessesRemaining = 0;       
var gameOver = false;
var totalWins = 0;

// Add sound

var keySound = new Audio('./assets/sounds/typewriter-key.wav');
var winSound = new Audio('./assets/sounds/you-win.wav');
var loseSound = new Audio('./assets/sounds/you-lose.wav');

// Set up the game, pick a new word

function resetGame() {
    guessesRemaining = guessesAllowed;
    currentWordIndex = Math.floor(Math.random() * (wordList.length));
    usedLetters = [];
    currentWord = [];

    for (var i = 0; i < wordList[currentWordIndex].length; i++) {
        currentWord.push("_");
    }   

    // document.getElementById("pressKeyToStart").style.cssText= "display: none";
    document.getElementById("you-lose").style.cssText = "display: none";
    document.getElementById("you-win").style.cssText = "display: none";

    updateDisplay();
};

// Update stats

function updateDisplay() {

    document.getElementById("totalWins").innerText = totalWins;
    var currentWordText = "";
    for (var i = 0; i < currentWord.length; i++) {
        currentWordText += currentWord[i];
    }

    document.getElementById("currentWord").innerText = currentWordText;
    document.getElementById("guessesRemaining").innerText = guessesRemaining;
    document.getElementById("usedLetters").innerText = usedLetters;
};

// Check if a guessed letter is in the word

function evaluateGuess(letter) {
    var positions = [];
    for (var i = 0; i < wordList[currentWordIndex].length; i++) {
        if(wordList[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }
        if (positions.length <= 0) {
        guessesRemaining--;
        } 
        else {
        for(var i = 0; i < positions.length; i++) {
            currentWord[positions[i]] = letter;
        }
    }
};

// See if player has won

function checkWin() {
    if(currentWord.indexOf("_") === -1) {
        document.getElementById("you-win").style.cssText = "display: block";
        document.getElementById("pressKeyToStart").style.cssText= "display: block";
        totalWins++;
        winSound.play();
        gameOver = true;
    }
};

// See if player has lost

function checkLoss() {
    if(guessesRemaining <= 0) {
        loseSound.play();
        document.getElementById("you-lose").style.cssText = "display: block";
        document.getElementById("pressKeyToStart").style.cssText = "display:block";
        gameOver = true;
    }
}

// Note guessed letters

function makeGuess(letter) {
    if (guessesRemaining > 0) {
        if (usedLetters.indexOf(letter) === -1) {
            usedLetters.push(letter);
            evaluateGuess(letter);
        }
    }  
};

// Event listener
document.onkeydown = function(event) {
    if(gameOver) {
        resetGame();
        gameOver = false;
    } else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            keySound.play();
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
};
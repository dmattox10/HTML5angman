const wordElement = document.getElementById('word');
const wrongGuessesElement = document.getElementById('wrongGuesses');
const messageElement = document.getElementById('message');
const button = document.getElementById('button');
const reset = document.getElementById('reset');
const guess = document.getElementById('guess');
const hangman = document.getElementById('hangman').getContext('2d');

let word = '';
let correctGuesses = [];
let wrongGuesses = 0;
let guessedWord = [];

button.addEventListener('click', () => {
    checkGuess();   
})

reset.addEventListener('click', () => {
    clearCanvas();
    wrongGuesses = 0;
    correctGuesses = [];
    guessedWord = [];
    word = '';
    messageElement.innerText = '';
    wrongGuessesElement.innerText = wrongGuesses;
    guess.value = '';
    fetchWord();
})

const checkGuess = () => {
    let letter = guess.value;
    if (letter.length !== 1) {
        messageElement.innerText = 'Please enter a single letter';
        return;
    }
    if (correctGuesses.includes(letter) || guessedWord.includes(letter)) {
        messageElement.innerText = 'You already guessed that letter';
        return;
    }
    if (word.includes(letter)) {
        correctGuesses.push(letter);
        messageElement.innerText = 'Correct guess!';
        updateWord();
    } else {
        wrongGuesses++;
        messageElement.innerText = 'Incorrect guess!';
        wrongGuessesElement.innerText = wrongGuesses;
        drawHangman();
    }
}

const updateWord = () => {
    guessedWord = word.split('').map(letter => {
        if (correctGuesses.includes(letter)) {
            return letter;
        } else {
            return '_';
        }
    })
    renderWord();
    if (!guessedWord.includes('_')) {
        messageElement.innerText = 'You win!';
    }
}

const drawHangman = () => {
    hangman.beginPath();
    if (wrongGuesses === 1) {
        hangman.moveTo(50, 350);
        hangman.lineTo(150,
            350);
        hangman.stroke();
    } else if (wrongGuesses === 2) {
        hangman.moveTo(100, 350);
        hangman.lineTo(100, 50);
        hangman.stroke();
    }
    else if (wrongGuesses === 3) {
        hangman.moveTo(100, 50);
        hangman.lineTo(200,
            50);
        hangman.stroke();
    }
    else if (wrongGuesses === 4) {
        hangman.moveTo(200, 50);
        hangman.lineTo(200,
            100);
        hangman.stroke();
    }
    else if (wrongGuesses === 5) {
        hangman.beginPath();
        hangman.arc(200, 125, 25, 0, Math.PI * 2);
        hangman.stroke();
    }
    else if (wrongGuesses === 6) {
        hangman.moveTo(200, 150);
        hangman.lineTo(200,
            250);
        hangman.stroke();
    }
    else if (wrongGuesses === 7) {
        hangman.moveTo(200, 250);
        hangman.lineTo(250,
            300);
        hangman.stroke();
    }
    else if (wrongGuesses === 8) {
        hangman.moveTo(200, 250);
        hangman.lineTo(150,
            300);
        hangman.stroke();
    }
    else if (wrongGuesses === 9) {
        hangman.moveTo(200, 200);
        hangman.lineTo(250,
            150);
        hangman.stroke();
    }
    else if (wrongGuesses === 10) {
        hangman.moveTo(200, 200);
        hangman.lineTo(150,
            150);
        hangman.stroke();
    }
}

const renderWord = () => {
    wordElement.innerText = guessedWord.join(' ');
}

const setupGame = (randomWord) => {
    word = randomWord;
    let guessedWord = word.split('').map(() => '_');

    renderWord();

}

const clearCanvas = () => {
    hangman.clearRect(0, 0, 800, 400);
}

const init = async () => {
    fetch('https://random-word-api.herokuapp.com/word')
        .then(response => response.json())
        .then(data => setupGame(data[0]));
}

init();
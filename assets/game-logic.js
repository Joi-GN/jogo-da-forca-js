// variables
let words = ['teclado', 'abacaxi', 'copo', 'caneta', 'bolo', 'quadrado', 'adesivo', 'marcador', 'doce', 'folha', 'floresta', 'banco', 'cabelo', 'vermelho', 'desafio', 'porta', 'tinta', 'roupa', 'planeta', 'cadeira', 'chave', 'pipoca', 'pedra', 'amarelo', 'vento', 'sombra', 'morango', 'louco', 'sorvete', 'susto', 'cobra', 'estudo', 'canela', 'rede', 'nuvem', 'caixa', 'dinheiro', 'produto', 'prego', 'perfume', 'arroz', 'oceano'];
let chosenWord;
let correctWord = "";
let letters = [];
let tries = 10;
let gameOver = false;

function pickRandomWord() {
    chosenWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    drawLines();
    return chosenWord;
}

function checkLetter(letter) {
    if (!gameOver) {
        if (!letters.includes(letter)) {
            letters.push(letter);
            if (chosenWord.includes(letter)) {
                for (let i = 0; i < chosenWord.length; i++) {
                    if (chosenWord[i] === letter) {
                        drawCorrectLetter(i);
                        addCorrectLetter(i);
                    }
                }
                checkGameOver();
                disableKey(letter, "correct");
            } else {
                tries--;
                drawHangman();
                checkGameOver();
                disableKey(letter, "incorrect");
            }
        }
    }
}

function checkGameOver() {
    if (tries == 0) {
        // gameover
        showEndGameText("lose", "Fim de Jogo! Você perdeu!");
        gameOver = true;
    }
    if (correctWord.length === chosenWord.length) {
        // gamewin
        showEndGameText("win", "Parabéns! Você venceu!");
        gameOver = true;
    }
}

function addCorrectLetter(i) {
    correctWord += chosenWord[i].toUpperCase();
}

function disableKey(key, status) {
    //Add respective class to visually disable key
    const keysButtons = document.querySelectorAll('.letter');
    for (let i = 0; i < keysButtons.length; i++) {
        if (keysButtons[i].textContent === key) {
            keysButtons[i].classList.add(status);
            break;
        }
    }
}

function addListeners() {
    //Adds event listeners to keyboard
    window.addEventListener('keydown', (e) => {
        let letter = e.key.toUpperCase();
        // validation if it's a letter
        if (keys.toString().includes(letter)) {
            checkLetter(letter);
        }
    });

    //Adds events listeners to virtual keyboard
    const keysButtons = document.querySelectorAll('.letter');
    keysButtons.forEach(key => key.addEventListener('click', () => {
        let letter = key.textContent;
        checkLetter(letter);
    }));
}
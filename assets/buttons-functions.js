// elements
const playBtn = document.getElementById('play-btn');
const addBtn = document.getElementById('add-btn');
const addWordBtn = document.getElementById('add-word-btn');
const cancelBtn = document.getElementById('cancel-btn');
const giveUpBtn = document.getElementById('give-up-btn');

// events listeners
playBtn.addEventListener('click', createGameBoard);
addBtn.addEventListener('click', toggleAddSection);
addWordBtn.addEventListener('click', addNewWord);
cancelBtn.addEventListener('click', toggleAddSection);
giveUpBtn.addEventListener('click', giveUpGame);

function createGameBoard() {
    if (gameOver) keyboard.innerHTML = '';
    resetGame();
    resizeCanvas();
    createVirtualKeyboard();
    addListeners();
    pickRandomWord();
    rearrangeButtons();
}

function resetGame() {
    deleteEndGameText();
    gameOver = false;
    correctWord = "";
    letters = [];
    tries = 10;
}

function toggleAddSection() {
    const addSection = document.getElementById('add-section');
    addSection.classList.toggle('hide');
    playBtn.classList.toggle('hide');
    addBtn.classList.toggle('hide');
}

function addNewWord() {
    const input = document.getElementById('new-word');
    // validation if length is valid
    if (input.value.length >= 4 &&
        input.value.length <= 8) {
        words.push(input.value);
        input.value = '';
        createGameBoard();
        toggleAddSection();
        addBtn.classList.add('hide');
    } else notifyInvalidWordInput();
}

function notifyInvalidWordInput() {
    const notice = document.getElementById('notice');
    notice.classList.add('invalid');
    setTimeout(() => {
        notice.classList.remove('invalid');
    }, 2000);
}

function giveUpGame() {
    const body = document.getElementsByTagName("body")[0];
    const btnContainer = document.querySelectorAll(".buttons-container")[1];
    body.classList.add("initial");
    btnContainer.classList.add("initial");
    addBtn.classList.remove("hide");
    giveUpBtn.classList.add("hide");
    canvas.width = 0;
    canvas.height = 0;
    keyboard.innerHTML = '';
    resetGame();
}
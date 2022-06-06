// elements
const canvas = document.querySelector('canvas');
const pencil = canvas.getContext("2d");
const keyboard = document.getElementById('keyboard');
const textStatus = document.getElementById("game-status");
// variables
const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

function resizeCanvas() {
    if (window.innerWidth > 1366) {
        canvas.width = 1200;
        canvas.height = 500;
    } else if (window.innerWidth > 800 && window.innerWidth <= 1366) {
        canvas.width = 800;
        canvas.height = 300;
    } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight / 1.8;
    }
    pencil.lineWidth = 5;
    pencil.lineCap = "round";
    pencil.lineJoin = "round";
    pencil.strokeStyle = "#dcdcdc";
}

function drawHangman() {
    switch (tries) {
        case 9:
            pencil.beginPath();
            pencil.moveTo((canvas.width / 3) + canvas.width / 3, canvas.height / 2);
            pencil.lineTo(canvas.width / 3, canvas.height / 2);
            pencil.stroke();
            break;
        case 8:
            pencil.moveTo(canvas.width / 2.5, canvas.height / 2);
            pencil.lineTo(canvas.width / 2.5, canvas.height / 10);
            pencil.stroke();
            break;
        case 7:
            pencil.lineTo(canvas.width / 1.8, canvas.height / 10);
            pencil.stroke();
            break;
        case 6:
            pencil.lineTo(canvas.width / 1.8, canvas.height / 6);
            pencil.stroke();
            break;
        case 5:
            pencil.beginPath();
            pencil.arc(canvas.width / 1.8, canvas.height / 4.5, 15, 0, 2 * Math.PI);
            pencil.stroke();
            break;
        case 4:
            pencil.moveTo(canvas.width / 1.8, canvas.height / 3.5)
            pencil.lineTo(canvas.width / 1.8, canvas.height / 2.5);
            pencil.stroke();
            break;
        case 3:
            pencil.moveTo(canvas.width / 1.8, canvas.height / 3.3);
            pencil.lineTo(canvas.width / 1.7, canvas.height / 3)
            pencil.stroke();
            break;
        case 2:
            pencil.moveTo(canvas.width / 1.8, canvas.height / 3.3);
            pencil.lineTo(canvas.width / 1.9, canvas.height / 3)
            pencil.stroke();
            break;
        case 1:
            pencil.moveTo(canvas.width / 1.8, canvas.height / 2.5);
            pencil.lineTo(canvas.width / 1.7, canvas.height / 2.2)
            pencil.stroke();
            break;
        case 0:
            pencil.moveTo(canvas.width / 1.8, canvas.height / 2.5);
            pencil.lineTo(canvas.width / 1.9, canvas.height / 2.2)
            pencil.stroke();
            pencil.closePath();
            break;
    }
}

function drawLines() {
    let axis = (canvas.width / 2) / chosenWord.length;
    let xPosition = (canvas.width / 2) - ((chosenWord.length / 2) * axis) + 15;
    let lineWidth = axis / 1.5;
    pencil.beginPath();
    for (let i = 0; i < chosenWord.length; i++) {
        pencil.moveTo(xPosition + (axis * i), canvas.height - 20);
        pencil.lineTo(xPosition + lineWidth + (axis * i), canvas.height - 20);
    }
    pencil.stroke();
    pencil.closePath();
}

function drawCorrectLetter(i) {
    pencil.fillStyle = "#dcdcdc";
    pencil.font = "bold 2rem Poppins";
    let axis = (canvas.width / 2) / chosenWord.length;
    let xPosition = (canvas.width / 2.1) - ((chosenWord.length / 2.6) * axis);
    pencil.fillText(chosenWord[i], xPosition + (axis * i), canvas.height - 30);
    pencil.stroke();
}

function showEndGameText(status, text) {
    textStatus.classList.add(status);
    textStatus.textContent = text;
}

function deleteEndGameText() {
    textStatus.classList.remove('win');
    textStatus.classList.remove('lose');
    textStatus.textContent = "";
}

function createVirtualKeyboard() {
    if (keyboard.innerHTML === '') {
        for (let i = 0; i < keys.length; i++) {
            let row = document.createElement('div');
            keyboard.appendChild(row);
            for (let j = 0; j < keys[i].length; j++) {
                let button = document.createElement('button');
                row.appendChild(button);
                button.classList.add('letter');
                button.textContent = keys[i][j];
            }
        }
    }
}

function rearrangeButtons() {
    const body = document.getElementsByTagName("body")[0];
    const btnContainer = document.querySelectorAll(".buttons-container")[1];
    body.classList.remove("initial");
    btnContainer.classList.remove("initial");
    addBtn.classList.add("hide");
    giveUpBtn.classList.remove("hide");
}
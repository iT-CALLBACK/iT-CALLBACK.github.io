const houseContainer = document.getElementById('houseContainer');
let score = 0;
let timer = 300;
let timerInterval;

const tasks = [
    {
        description: "Давайте начнем с фундамента дома. Введите следующий код:",
        code: `<div id="foundation" class="foundation"></div>`,
        check: () => document.getElementById('foundation') !== null,
        errorMessage: "Фундамент не найден! Убедитесь, что вы добавили элемент с id 'foundation'."
    },
    {
        description: "Теперь добавим стены. Введите следующий код:",
        code: `<div id="walls" class="walls"></div>`,
        check: () => document.getElementById('walls') !== null,
        errorMessage: "Стены не найдены! Убедитесь, что вы добавили элемент с id 'walls'."
    },
    {
        description: "Теперь добавим крышу. Введите следующий код:",
        code: `<div id="roof" class="roof">IT-CALLBACK</div>`,
        check: () => document.getElementById('roof') !== null,
        errorMessage: "Крыша не найдена! Убедитесь, что вы добавили элемент с id 'roof'."
    }
];

let currentTaskIndex = 0;

function loadTask(taskIndex) {
    const task = tasks[taskIndex];
    document.getElementById('taskDescription').innerText = task.description;
    document.getElementById('taskCode').innerText = task.code;
    editor.setValue("");
}

function runCode() {
    const code = editor.getValue();
    try {
        houseContainer.innerHTML += code;
        if (tasks[currentTaskIndex].check()) {
            score += 10;
            updateScore();
            showResult("✔", "green");
            nextTask();
        } else {
            showResult("✖", "red");
            alert(tasks[currentTaskIndex].errorMessage);
        }
    } catch (e) {
        alert('Ошибка в вашем коде: ' + e.message);
    }
}

function nextTask() {
    if (currentTaskIndex < tasks.length - 1) {
        currentTaskIndex++;
        loadTask(currentTaskIndex);
    } else {
        alert('Поздравляем! Вы завершили все задания.');
    }
}

function updateScore() {
    document.getElementById('score').innerText = score;
}

function updateTimer() {
    document.getElementById('timer').innerText = timer;
    if (timer <= 0) {
        clearInterval(timerInterval);
        alert('Время вышло! Игра окончена.');
    }
    timer--;
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function showResult(symbol, color) {
    const resultMessage = document.getElementById('resultMessage');
    resultMessage.innerText = symbol;
    resultMessage.style.color = color;
    resultMessage.style.display = 'inline';
    setTimeout(() => {
        resultMessage.style.display = 'none';
    }, 2000);
}

document.getElementById('runCodeButton').addEventListener('click', runCode);

// Инициализация редактора
const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/html");

// Начальная загрузка задания
loadTask(currentTaskIndex);
startTimer();

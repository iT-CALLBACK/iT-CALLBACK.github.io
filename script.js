<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Build Your House</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/codemirror.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/theme/material.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/addon/hint/show-hint.min.css">
    <style>
        body {
            background: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
            background-size: 200% 200%;
            animation: gradientAnimation 10s ease infinite;
            color: #333;
            font-family: 'Helvetica Neue', Arial, sans-serif;
        }

        @keyframes gradientAnimation {
            0% {
                background-position: 0% 50%;
            }

            50% {
                background-position: 100% 50%;
            }

            100% {
                background-position: 0% 50%;
            }
        }

        h1 {
            font-weight: 300;
            margin-top: 50px;
            color: #333;
        }

        .container {
            max-width: 800px;
        }

        .task-list {
            margin-top: 20px;
        }

        .task {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            padding: 10px;
            border-radius: 10px;
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .task .status {
            margin-right: 10px;
            font-size: 1.5rem;
        }

        .task.completed .status {
            color: #28a745;
        }

        .task.completed .status:before {
            content: '✔️';
        }

        .task.not-completed .status {
            color: #dc3545;
        }

        .task.not-completed .status:before {
            content: '❌';
        }

        .code-area {
            display: block;
            margin-top: 20px;
        }

        .code-editor {
            width: 100%;
            margin-bottom: 20px;
        }

        .CodeMirror {
            height: 200px;
            border-radius: 10px;
            border: 1px solid #ddd;
            padding: 10px;
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .preview {
            border: 1px solid #ddd;
            border-radius: 10px;
            height: 400px;
            margin-top: 20px;
            position: relative;
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .instruction {
            margin-top: 20px;
            padding: 20px;
            border-radius: 10px;
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .hint {
            display: none;
            margin-top: 10px;
            padding: 10px;
            border-radius: 10px;
            background-color: #f1f3f5;
        }

        .foundation {
            background-color: #8B4513;
            height: 20px;
            width: 100%;
            position: absolute;
            bottom: 0;
        }

        .walls {
            background-color: #D3D3D3;
            height: 200px;
            width: 200px;
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            border: 2px solid #000;
        }

        .roof {
            width: 0;
            height: 0;
            border-left: 110px solid transparent;
            border-right: 110px solid transparent;
            border-bottom: 100px solid #A52A2A;
            position: absolute;
            top: 55px;
            left: 50%;
            transform: translateX(-50%);
        }

        .door {
            width: 60px;
            height: 100px;
            background-color: #A52A2A;
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            border: 2px solid #000;
        }

        .doorknob {
            width: 10px;
            height: 10px;
            background-color: #DAA520;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 80%;
            transform: translate(-50%, -50%);
        }
    </style>
</head>

<body>
    <div class="container">
        <h1 class="text-center">Создай свой дом</h1>
        <div id="instructions" class="instruction">
            <h2>Шаг 1: Создать фундамент</h2>
            <p>Напишите HTML и CSS код для фундамента. Используйте элемент
                <code>&lt;div class="foundation"&gt;&lt;/div&gt;</code>.
            </p>
            <p>CSS должен содержать правила для:</p>
            <ul>
                <li>Ширина: 100%</li>
                <li>Высота: 20px</li>
                <li>Цвет фона: коричневый (#8B4513)</li>
                <li>Позиционирование: absolute</li>
                <li>Нижний отступ: 0</li>
            </ul>
            <button class="btn btn-secondary" onclick="showHint(1)">Показать помощь</button>
            <button class="btn btn-secondary" onclick="hideHint(1)" style="display:none;">Скрыть помощь</button>
            <pre id="hint1" class="hint"><code>.foundation {
    width: 100%;
    height: 20px;
    background-color: #8B4513;
    position: absolute;
    bottom: 0;
}</code></pre>
        </div>
        <div class="task-list">
            <div class="task not-completed" data-task="foundation">
                <div class="status"></div>
                <div>Создать фундамент</div>
            </div>
            <div class="task not-completed" data-task="walls">
                <div class="status"></div>
                <div>Построить стены</div>
            </div>
            <div class="task not-completed" data-task="roof">
                <div class="status"></div>
                <div>Построить крышу</div>
            </div>
            <div class="task not-completed" data-task="door">
                <div class="status"></div>
                <div>Установить дверь</div>
            </div>
            <div class="task not-completed" data-task="doorknob">
                <div class="status"></div>
                <div>Добавить дверную ручку</div>
            </div>
        </div>
        <div class="code-area">
            <div class="code-editor">
                <h5>HTML код</h5>
                <textarea id="htmlCode" class="form-control" placeholder="Введите HTML код здесь"></textarea>
            </div>
            <div class="code-editor">
                <h5>CSS код</h5>
                <textarea id="cssCode" class="form-control" placeholder="Введите CSS код здесь"></textarea>
            </div>
        </div>
        <div class="preview">
            <iframe id="previewFrame" style="width: 100%; height: 100%;"></iframe>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/codemirror.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/mode/htmlmixed/htmlmixed.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/mode/css/css.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/addon/edit/closetag.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/addon/edit/closebrackets.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/addon/hint/show-hint.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/addon/hint/html-hint.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/addon/hint/css-hint.min.js"></script>
    <script>
        let currentStep = 1;

        const htmlEditor = CodeMirror.fromTextArea(document.getElementById('htmlCode'), {
            mode: 'htmlmixed',
            theme: 'material',
            lineNumbers: true,
            autoCloseTags: true,
            autoCloseBrackets: true,
            extraKeys: { "Ctrl-Space": "autocomplete" },
        });

        const cssEditor = CodeMirror.fromTextArea(document.getElementById('cssCode'), {
            mode: 'css',
            theme: 'material',
            lineNumbers: true,
            autoCloseTags: true,
            autoCloseBrackets: true,
            extraKeys: { "Ctrl-Space": "autocomplete" },
        });

        htmlEditor.on('change', updatePreview);
        cssEditor.on('change', updatePreview);

        function updatePreview() {
            const htmlCode = htmlEditor.getValue();
            const cssCode = "<style>" + cssEditor.getValue() + "</style>";
            const previewFrame = document.getElementById('previewFrame');
            const preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
            preview.open();
            preview.write(htmlCode + cssCode);
            preview.close();

            checkTasksCompletion();
        }

        function checkTasksCompletion() {
            const tasks = [
                { name: 'foundation', htmlCondition: /class="foundation"/, cssCondition: /\.foundation\s*\{[^}]*background-color:\s*#8B4513[^}]*\}/ },
                { name: 'walls', htmlCondition: /class="walls"/, cssCondition: /\.walls\s*\{[^}]*background-color:\s*#D3D3D3[^}]*border:\s*2px\s*solid\s*#000[^}]*\}/ },
                { name: 'roof', htmlCondition: /class="roof"/, cssCondition: /\.roof\s*\{[^}]*border-bottom:\s*100px\s*solid\s*#A52A2A[^}]*\}/ },
                { name: 'door', htmlCondition: /class="door"/, cssCondition: /\.door\s*\{[^}]*background-color:\s*#A52A2A[^}]*border:\s*2px\s*solid\s*#000[^}]*\}/ },
                { name: 'doorknob', htmlCondition: /class="doorknob"/, cssCondition: /\.doorknob\s*\{[^}]*background-color:\s*#DAA520[^}]*border-radius:\s*50%[^}]*\}/ }
            ];

            let completed = true;
            tasks.forEach((task, index) => {
                const htmlCode = htmlEditor.getValue();
                const cssCode = cssEditor.getValue();
                const taskElement = document.querySelector(`.task[data-task="${task.name}"]`);
                if (task.htmlCondition.test(htmlCode) && task.cssCondition.test(cssCode)) {
                    if (taskElement.classList.contains('not-completed')) {
                        taskElement.classList.remove('not-completed');
                        taskElement.classList.add('completed');
                    }
                } else {
                    completed = false;
                    if (taskElement.classList.contains('completed')) {
                        taskElement.classList.remove('completed');
                        taskElement.classList.add('not-completed');
                    }
                }

                if (completed && index + 1 === currentStep) {
                    nextStep();
                }
            });
        }

        function nextStep() {
            currentStep++;
            const instructions = document.getElementById('instructions');
            switch (currentStep) {
                case 2:
                    instructions.innerHTML = `
                        <h2>Шаг 2: Построить стены</h2>
                        <p>Напишите HTML код для стен. Используйте элемент <code>&lt;div class="walls"&gt;&lt;/div&gt;</code>.</p>
                        <p>CSS должен содержать правила для:</p>
                        <ul>
                            <li>Ширина: 200px</li>
                            <li>Высота: 200px</li>
                            <li>Цвет фона: светло-серый</li>
                            <li>Позиционирование: absolute</li>
                            <li>Нижний отступ: 20px</li>
                            <li>Левый отступ: 50%</li>
                            <li>Трансформация: translateX(-50%)</li>
                            <li>Граница: 2px solid #000</li>
                        </ul>
                        <button class="btn btn-secondary" onclick="showHint(2)">Показать помощь</button>
                        <button class="btn btn-secondary" onclick="hideHint(2)" style="display:none;">Скрыть помощь</button>
                        <pre id="hint2" class="hint"><code>.walls {
    width: 200px;
    height: 200px;
    background-color: #D3D3D3;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    border: 2px solid #000;
}</code></pre>
                    `;
                    break;
                case 3:
                    instructions.innerHTML = `
                        <h2>Шаг 3: Построить крышу</h2>
                        <p>Напишите HTML код для крыши. Используйте элемент <code>&lt;div class="roof"&gt;&lt;/div&gt;</code>.</p>
                        <p>CSS должен содержать правила для:</p>
                        <ul>
                            <li>Ширина: 0</li>
                            <li>Высота: 0</li>
                            <li>Левая граница: 110px solid transparent</li>
                            <li>Правая граница: 110px solid transparent</li>
                            <li>Нижняя граница: 100px solid #A52A2A</li>
                            <li>Позиционирование: absolute</li>
                            <li>Верхний отступ: 50px</li>
                            <li>Левый отступ: 50%</li>
                            <li>Трансформация: translateX(-50%)</li>
                        </ul>
                        <button class="btn btn-secondary" onclick="showHint(3)">Показать помощь</button>
                        <button class="btn btn-secondary" onclick="hideHint(3)" style="display:none;">Скрыть помощь</button>
                        <pre id="hint3" class="hint"><code>.roof {
    width: 0;
    height: 0;
    border-left: 110px solid transparent;
    border-right: 110px solid transparent;
    border-bottom: 100px solid #A52A2A;
    position: absolute;
    top: 55px;
    left: 50%;
    transform: translateX(-50%);
}</code></pre>
                    `;
                    break;
                case 4:
                    instructions.innerHTML = `
                        <h2>Шаг 4: Установить дверь</h2>
                        <p>Напишите HTML код для двери. Используйте элемент <code>&lt;div class="door"&gt;&lt;/div&gt;</code>.</p>
                        <p>CSS должен содержать правила для:</p>
                        <ul>
                            <li>Ширина: 60px</li>
                            <li>Высота: 100px</li>
                            <li>Цвет фона: темно-коричневый</li>
                            <li>Позиционирование: absolute</li>
                            <li>Нижний отступ: 20px</li>
                            <li>Левый отступ: 50%</li>
                            <li>Трансформация: translateX(-50%)</li>
                            <li>Граница: 2px solid #000</li>
                        </ul>
                        <button class="btn btn-secondary" onclick="showHint(4)">Показать помощь</button>
                        <button class="btn btn-secondary" onclick="hideHint(4)" style="display:none;">Скрыть помощь</button>
                        <pre id="hint4" class="hint"><code>.door {
    width: 60px;
    height: 100px;
    background-color: #A52A2A;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    border: 2px solid #000;
}</code></pre>
                    `;
                    break;
                case 5:
                    instructions.innerHTML = `
                        <h2>Шаг 5: Добавить дверную ручку</h2>
                        <p>Напишите HTML код для дверной ручки. Используйте элемент <code>&lt;div class="doorknob"&gt;&lt;/div&gt;</code>, вложенный внутри элемента двери.</p>
                        <p>CSS должен содержать правила для:</p>
                        <ul>
                            <li>Ширина: 10px</li>
                            <li>Высота: 10px</li>
                            <li>Цвет фона: золотой</li>
                            <li>Форма: круглая (border-radius: 50%)</li>
                            <li>Позиционирование: абсолютное внутри двери</li>
                            <li>Верхний отступ: 50%</li>
                            <li>Левый отступ: 80%</li>
                            <li>Трансформация: translate(-50%, -50%)</li>
                        </ul>
                        <button class="btn btn-secondary" onclick="showHint(5)">Показать помощь</button>
                        <button class="btn btn-secondary" onclick="hideHint(5)" style="display:none;">Скрыть помощь</button>
                        <pre id="hint5" class="hint"><code>.doorknob {
    width: 10px;
    height: 10px;
    background-color: #DAA520;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 80%;
    transform: translate(-50%, -50%);
}</code></pre>
                    `;
                    break;
                case 6:
                    instructions.innerHTML = `
                        <h2>Поздравляем!</h2>
                        <p>Вы успешно построили дом!</p>
                    `;
                    break;
                default:
                    break;
            }
        }

        function showHint(step) {
            document.getElementById(`hint${step}`).style.display = 'block';
            document.querySelector(`button[onclick="showHint(${step})"]`).style.display = 'none';
            document.querySelector(`button[onclick="hideHint(${step})"]`).style.display = 'inline-block';
        }

        function hideHint(step) {
            document.getElementById(`hint${step}`).style.display = 'none';
            document.querySelector(`button[onclick="showHint(${step})"]`).style.display = 'inline-block';
            document.querySelector(`button[onclick="hideHint(${step})"]`).style.display = 'none';
        }
    </script>
</body>

</html>

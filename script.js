const questions = [
    {
        question: "Qual é a capital da França?",
        answers: [
            { text: "Paris", correct: true },
            { text: "Londres", correct: false },
            { text: "Berlim", correct: false },
            { text: "Madrid", correct: false }
        ]
    },
    {
        question: "Qual é o maior planeta do Sistema Solar?",
        answers: [
            { text: "Júpiter", correct: true },
            { text: "Saturno", correct: false },
            { text: "Marte", correct: false },
            { text: "Terra", correct: false }
        ]
    }
    // Adicione mais perguntas aqui
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');

let currentQuestionIndex = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    nextButton.innerHTML = "Próxima";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === 'true';
    if (isCorrect) {
        selectedButton.style.backgroundColor = 'green';
    } else {
        selectedButton.style.backgroundColor = 'red';
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct) {
            button.style.backgroundColor = 'green';
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerHTML = `Você completou o quiz!`;
    nextButton.innerHTML = 'Reiniciar';
    nextButton.style.display = 'block';
    nextButton.addEventListener('click', startQuiz);
}

startQuiz();
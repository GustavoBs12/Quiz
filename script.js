const questions = [
    {
        question: "Qual é a função do elemento header em HTML?",
        answers: [
            { text: "Define o rodapé da página", correct: false },
            { text: "Inclui links de navegação", correct: false },
            { text: "Define o cabeçalho da página ou de uma seção", correct: true },
            { text: "Adiciona scripts de JavaScript", correct: false }
        ]
    },
    {
        question: "Qual das seguintes propriedades CSS é usada para alterar a cor do fundo de um elemento?",
        answers: [
            { text: "color", correct: false },
            { text: "background-color", correct: true },
            { text: "font-color", correct: false },
            { text: "border-color", correct: false }
        ]
    },
    {question: "O que o método addEventListener() faz em JavaScript?",
        answers: [
            { text: "Adiciona uma classe a um elemento", correct: false },
            { text: "Adiciona um ouvinte de eventos a um elemento", correct: true },
            { text: "Adiciona um atributo a um elemento", correct: false },
            { text: "Adiciona um novo elemento ao DOM", correct: false }
        ]
    },
        
       { question: "Qual das seguintes linguagens é usada principalmente para estilizar páginas web?",
        answers: [
            { text: "HTML", correct: false },
            { text: "JavaScript", correct: false },
            { text: "CSS", correct: true},
            { text: "Python", correct: false }
        ]
    },

        {question: "Em qual tag HTML você coloca o código JavaScript?",
        answers: [
            { text: "<style>", correct: false },
            { text: "<body>", correct: false},
            { text: "head>", correct: false },
            { text: "<script>", correct: true }
        ]
    },
         {question: "Qual unidade de medida CSS é relativa ao tamanho da fonte do elemento pai? ",
        answers: [
            {text: "px", correct: false},
            {text: "em", correct: true},
            {text: "rem" , correct: false},
            {text: "%", correct: false}
        ]
        
     },
     {question: "Qual método JavaScript é usado para selecionar um elemento HTML pelo seu ID?",
        answers: [
            {text: "getElementByTagName()" , correct: false},
            {text: "getElementByClassName()" , correct: false},
            {text: "getElementById()" , correct: true},
            {text: "querySelector()" , correct: false}
        ]

     }

    
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
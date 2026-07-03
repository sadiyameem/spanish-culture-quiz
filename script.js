const questions = [
    {
        question: "What currency was used in the country before the euro?",
        answers: [
            {text: "Peseta", correct: true},
            {text: "Euro", correct: false},
            {text: "USD", correct: false},
            {text: "AUD", correct: false},
        ]
    },

    {
        question: "Which country is larger: Spain, France or Germany?",
        answers: [
            {text: "Germany", correct: false},
            {text: "Spain", correct: false},
            {text: "France", correct: true},
            {text: "Greece", correct: false},
        ]
    },

    {
        question: "When was the World Cup held in Spain?",
        answers: [
            {text: "1980", correct: false},
            {text: "1981", correct: false},
            {text: "1982", correct: true},
            {text: "1983", correct: false},
        ]
    },

    {
        question: "What is the oldest building in Spain?",
        answers: [
            {text: "Naveta des Tudons", correct: true},
            {text: "Alhambra", correct: false},
            {text: "Burgos Cathedral", correct: false},
            {text: "Mosque of Cordoba", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
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
    },

    {
        question: "In what year did Columbus arrive in America?",
        answers: [
            {text: "Thursday, October 11, 1492", correct: false},
            {text: "Friday, October 12, 1492", correct: true},
            {text: "Wednesday, October 10, 1492", correct: false},
            {text: "Tuesday, October 9, 1492", correct: false},
        ]
    },

    {
        question: "Where was Pablo Picasso born?",
        answers: [
            {text: "Malaga, on October 22, 1881.", correct: false},
            {text: "Malaga, on October 23, 1881.", correct: false},
            {text: "Malaga, on October 24, 1881.", correct: false},
            {text: "Malaga, on October 25, 1881.", correct: true},
        ]
    },

    {
        question: "Which countries were Spanish colonies in Africa?",
        answers: [
            {text: "Sudan", correct: false},
            {text: "Nigeria", correct: false},
            {text: "Equatorial Guinea", correct: true},
            {text: "Benin", correct: false},
        ]
    },

    {
        question: "How many World Cups did Spain win?",
        answers: [
            {text: "1", correct: true},
            {text: "2", correct: false},
            {text: "3", correct: false},
            {text: "100", correct: false},
        ]
    },

    {
        question: "How many properties are World Heritage Sites?",
        answers: [
            {text: "10", correct: false},
            {text: "5", correct: false},
            {text: "50", correct: true},
            {text: "0", correct: false},
        ]
    },

    {
        question: "What is the longest river?",
        answers: [
            {text: "The Tagus River, with a length of 1007 kilometers", correct: true},
            {text: "The Nile River, with a length of 6,690 kilometer", correct: false},
            {text: "The Amazon River, with a length of 6,387 kilometer", correct: false},
            {text: "Mississippi River, with a length of 6,270 kilometer", correct: false},
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
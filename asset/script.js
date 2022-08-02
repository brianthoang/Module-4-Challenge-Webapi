
var startButton = document.getElementById('start-button');
var startQuizEl = document.getElementById('start-quiz');
var questionEl = document.getElementById('questionaire');
var scoreScreen = document.querySelector('#score-screen');
var endQuizEl = document.getElementById('end-quiz')
var timerEl = document.querySelector('.timer-count');
var scoreEl = document.querySelector('.score');



// Event listener for the Start Quiz button.
startButton.addEventListener('click', startQuiz);

// Function to start the quiz. Adds the Hide id to the start menu and removes hide id to the quiz section to reveal the test questions
function startQuiz() {
    startQuizEl.classList.add('hide');
    questionEl.classList.remove('hide');
    showQuestion();
    startTimer();
}

// Timer function.  Starts timer and ends quiz when timer is <=0
var timerCount = 50;
var timeInterval;
var timer;

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerEl.textContent = timerCount;
        if (timerCount <= 0) {
            endQuiz();
        }
    }, 1000);
}

// Variables for the test questions and options 
var promptEl = document.querySelector('.prompt');
var choiceOne = document.querySelector('.choice-1');
var choiceTwo = document.querySelector('.choice-2');
var choiceThree = document.querySelector('.choice-3');
var choiceFour = document.querySelector('.choice-4');
var quizNumber = 0;

// Function to display the test questions and options 
function showQuestion() {
    var currentQuestion = quiz[quizNumber];
    if (quizNumber == quiz.length) {
        endQuiz();
    } else {
        promptEl.innerHTML = currentQuestion.prompt;
        choiceOne.innerHTML = currentQuestion.choices[0];
        choiceTwo.innerHTML = currentQuestion.choices[1];
        choiceThree.innerHTML = currentQuestion.choices[2];
        choiceFour.innerHTML = currentQuestion.choices[3];  
    }
}

// Event listener when the user picks an option
choiceOne.addEventListener("click", renderAnswer);
choiceTwo.addEventListener("click", renderAnswer);
choiceThree.addEventListener("click", renderAnswer);
choiceFour.addEventListener("click", renderAnswer);

// Function when picking an answer and if the user chooses the incorrect answer, 5 secs is deducted from the timer
function renderAnswer (event) {
    var selectedChoice = event.target;
    if (selectedChoice.textContent === quiz[quizNumber].answer) {
        quizNumber++;
        showQuestion();
    } else {
        timerCount -= 5;
        quizNumber++;
        showQuestion();
    }
}


// End quiz function.  Hides quiz section and shows user input section.
function endQuiz() {
    questionEl.classList.add('hide');
    endQuizEl.classList.remove('hide');
    scoreEl.textContent = timerCount;
    clearInterval(timer);
}


// Saving score into local storage
var nameInput = document.querySelector('#name');
var submitBtn = document.querySelector('#submit-button');
var userScoreEl = document.querySelector('.score');
submitBtn.addEventListener('click', saveScore);
var highScores = [];
var userInfo;

function saveScore(event) {
    event.preventDefault();
    endQuizEl.classList.add('hide');
    scoreScreen.classList.remove('hide');

    var userInfo = {
        userScore: timerCount,
        userName: nameInput.value
    };

    highScores.push(userInfo);
    localStorage.setItem('userInfo', JSON.stringify(highScores));
    viewHighScore();
}


// Highscore screen.
var savedNameEl = document.querySelector('#savedName');

function viewHighScore() {

    savedNameEl.innerHTML = "";
    
    var highScoreList = JSON.parse(localStorage.getItem('userInfo')) || [];

    for (var i = 0; i < highScoreList.length; i++) {
        var list = document.createElement('li');
        list.innerHTML = highScoreList[i].userName + " - " + highScoreList[i].userScore;
        savedNameEl.appendChild(list);
    }
}


// Back and clear score buttons
var backButton = document.querySelector('.back-button');
backButton.addEventListener('click', backToTop);

function backToTop() {
    startQuizEl.classList.remove('hide');
    scoreScreen.classList.add('hide');
    quizNumber = 0;
    timerCount = 75;
}

var clearScoreButton = document.querySelector('.clear-score');
clearScoreButton.addEventListener('click', clearScore)

function clearScore() {
    window.localStorage.clear();
    savedNameEl.textContent = "";
}

var viewScore = document.querySelector('.view-score');
viewScore.addEventListener('click', viewHighScoreList);

function viewHighScoreList() {
    startQuizEl.classList.add('hide');
    scoreScreen.classList.remove('hide');
}


// Array of prompts and answers for the quiz.
var quiz = [
    {
        prompt: 'Which of the following is correct about features of JavaScript?',
        choices: [
            'Javascript is a lightweight, interpreted programming language',
            'Javascript is designed for creating network-centric applications', 
            'Javascript is complementary to and integrated with Java', 
            'All of the above'
        ],
        answer: 'All of the above'  
    },
    {
        prompt: 'Which of the following is true about cookie handling in JavaScript?',
        choices: [
            'Manipulates cookies using the cookie property of the Document object', 
            'Can read, create, modify, and delete the cookie(s) that apply to the current web page', 
            'Both of the above', 
            'None of the above'
        ],
        answer: 'Both of the above'
    },
    {
        prompt: 'Which of the following type of variable is visible only within a function where it is defined?',
        choices: [
            'global variable', 
            'local vaariable', 
            'Both of the above', 
            'None of the above'
        ],
        answer: 'local variable'
    },
    {
        prompt: "Which of the following function of String object returns the character at the specified index?",
        choices: [
            'charAt()', 
            'charCodeAt()', 
            'concat()', 
            'index()'
        ],
        answer: "charAt()"
    },
    {
        prompt: "Which of the following function of String object extracts a section of a string and returns a new string?",
        choices: [
            'slice()', 
            'split()', 
            'replace()', 
            'search()'
        ],
        answer: 'slice()'
    }
]

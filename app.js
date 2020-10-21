const store = {
  questions: [
    {
      question: "How many members were in Kill Bill's Deadly Viper Assassination Squad?",
      answers: ["nine", "ten", "six", "seventeen"],
      correctAnswer: "six"
    },

    {
      question: "Who snapped the Infinity Gaunlet at the end of Avengers: Infinity War?",
      answers: ["Thanos", "Ironman", "Hulk", "Spider-man"],
      correctAnswer: "Thanos"
    },

    {
      question: "When was the first Rambo movie released?",
      answers: ["1940", "1973", "1768", "1982"],
      correctAnswer: "1982"
    },

    {
      question: " How many movies make up the Fast & Furious franchise so far?",
      answers: ["nine", "ten", "seven", "twenty four"],
      correctAnswer: "nine"
    },

    {
      question: "who played ryan in saving private ryan answer?",
      answers: ["Matt Damon", "Tom Hardy", "Tom Hanks", "Paul Rudd"],
      correctAnswer: "Matt Damon"
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
};

function renderStartPage() {
  let startPage =
    `<div class="content">
      <h2>Here you GO!!</h2>
      <p>Are You Ready?</p>
      <button id="start">Get Started</button> 
    </div>`;
  return startPage;
}
// quiz start page should render

function handleStartQuiz() {
  $(`main`).on(`click`, `#start`, function () {
    store.quizStarted = true;
    render();
  })
}

// you should be able to start the quiz by pressing a start button



function questionPage() {

  if (store.questionNumber === store.questions.length) {
    return renderFinalPage();
  }

  let currentQuestion = store.questions[store.questionNumber];

  let questionPage = `
    <div class="content">
      <h2>${currentQuestion.question}</h2>
      <form>
        <input type="radio" id="answer" name="answer" value="${currentQuestion.answers[0]}" required>
        <label>${currentQuestion.answers[0]}</label><br>

        <input type="radio" id="answer" name="answer" value="${currentQuestion.answers[1]}" required>
        <label>${currentQuestion.answers[1]}</label><br>

        <input type="radio" id="answer" name="answer" value="${currentQuestion.answers[2]}" required>
        <label>${currentQuestion.answers[2]}</label><br>

        <input type="radio" id="answer" name="answer" value="${currentQuestion.answers[3]}" required>
        <label>${currentQuestion.answers[3]}</label><br>

        <button id="submit">Submit</button>
      </form>
    </div>
    `;

  return questionPage;
}
//you should be shown a question with a list of answers
//users should be able to select an answer
function handleAnswerSubmit() {
  $("main").on("submit", "form", function (evt) {
    evt.preventDefault();

    let answer = $(`input[name='answer']:checked`).val();
    let currentCorrectAnswer = store.questions[store.questionNumber].correctAnswer;

    if (answer === currentCorrectAnswer) {
      $("main").html(renderCorrectAnswerPage())
    } else {
      $("main").html(renderIncorrectAnswerPage())
    }
    store.questionNumber++;
  })
  render();
}
//app should verify whether answer is correct
function renderCorrectAnswerPage() {
  let correctAnswerPage = `<div class="content">
  <h2>Correct</h2> <form> <button id="next-question">Next Question</button> </form> </div>`
  return correctAnswerPage;
}

function renderIncorrectAnswerPage() {
  let incorrectAnswerPage = `<div class="content">
  <h2>Sorry Bud</h2> <p>The correct answer was ${store.questions[store.questionNumber].correctAnswer} better luck next time!</p> <form> <button id="next-question">Next Question</button> </form> </div>`
  return incorrectAnswerPage;
}

function handleNextQuestion() {
  $(`main`).on(`click`, `#next-question`, function (e) {
    e.preventDefault();
    $("main").html(store.questions[store.questionNumber])
    render();
  })
}

function renderFinalPage() {
  let finalPage = `<div class="content">
  <h2>Fin</h2> <p>Your final score is ${store.score}/5... hope you are proud of yourself</p>
   <button id="restart">Restart</button> </div>`
  return finalPage;
}

function handleFinalPage() {
  $(`main`).on(`click`, `#restart`, function () {
    store.quizStarted = false;
    store.questionNumber = 0;
    store.score = 0;
    render();
  })
}


//when correct, user will be taken to a correct answer page with the correct answer highlighted green, and 1 will be added to total number correct

//when incorrect, user will be taken to a incorrect answer page with the correct answer highlighted green and the chosen answer highlighted red

//user should be able to proceed to next question with a next question button

//once quiz is complete user will be displayed a final page stating that the quiz is over and will also display final score 

//A button to restart the quiz will be displayed on final page

function render() {
  if (store.quizStarted === false) {
    $('main').html(renderStartPage());
  } else if (store.quizStarted) {
    $('main').html(questionPage());
  }
}

function main() {
  render();
  handleStartQuiz();
  handleAnswerSubmit();
  handleNextQuestion();
  handleFinalPage();
}


$(main);
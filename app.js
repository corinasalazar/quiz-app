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

// quiz start page should render
function renderStartPage() {
  let startPage =
    `<div class="content">
      <h2>Here you GO!!</h2>
      <p>Are You Ready?</p>
      <button id="start">Get Started</button> 
    </div>`;
  return startPage;
}

// moves us to the first quiz page after button press
function handleStartQuiz() {
  $(`main`).on(`click`, `#start`, function () {
    store.quizStarted = true;
    render();
  })
}

// lays out the question page template
function questionPage() {
  if (store.questionNumber === store.questions.length) {
    return renderFinalPage();
  }

  let currentQuestion = store.questions[store.questionNumber];
  let questionPage = `
    <div class="content">
      <h2>Question ${store.questionNumber+1}: ${currentQuestion.question}</h2>
      <p>Your score: ${store.score}/5</p>
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

// waits for user to hit submit button, renders to correct or incorrect page
function handleAnswerSubmit() {
  $("main").on("submit", "form", function (evt) {
    evt.preventDefault();

    let answer = $(`input[name='answer']:checked`).val();
    let currentCorrectAnswer = store.questions[store.questionNumber].correctAnswer;

    if (answer === currentCorrectAnswer) {
      store.score++;
      $("main").html(renderCorrectAnswerPage());
    } else {
      $("main").html(renderIncorrectAnswerPage())
    }
    store.questionNumber++;
  })
  render();
}

// lays out template for correct answer
function renderCorrectAnswerPage() {
  let correctAnswerPage = `<div class="content">
  <h2>Correct!!</h2> 
  <p>Your score: ${store.score}/5</p>
  <form> <button id="next-question">Next Question</button> </form> </div>`
  return correctAnswerPage;
}

// lays out template for incorrect answer
function renderIncorrectAnswerPage() {
  let incorrectAnswerPage = `<div class="content">
  <h2>Sorry Bud</h2> <p>The correct answer was ${store.questions[store.questionNumber].correctAnswer}. Better luck next time!</p> <p>Your score: ${store.score}/5</p><form> <button id="next-question">Next Question</button> </form> </div>`
  return incorrectAnswerPage;
}

// handles to move from correct/incorrect pages back to question pages
function handleNextQuestion() {
  $(`main`).on(`click`, `#next-question`, function (e) {
    e.preventDefault();
    $("main").html(store.questions[store.questionNumber])
    render();
  });
}

// lays out template for the final score page
function renderFinalPage() {
  let finalPage = `<div class="content">
  <h2>Fin</h2> <img src="images/end-quiz.gif" alt="Cars driving, split off at fork" /><p>Your final score is ${store.score}/5... hope you are proud of yourself</p>
   <button id="restart">Restart</button> </div>`
  return finalPage;
}

// waits for a button click to take you back to the start of the quiz
function handleFinalPage() {
  $(`main`).on(`click`, `#restart`, function () {
    store.quizStarted = false;
    store.questionNumber = 0;
    store.score = 0;
    render();
  });
}


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
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
  let currentQuestion = store.questions[store.questionNumber];

  let questionPage = `
    <div class="content">
      <h2>${currentQuestion.question}</h2>
      <form>
        <input type="radio" id="answer" name="answer" value="${currentQuestion.answers[0]}">
        <label>${currentQuestion.answers[0]}</label><br>

        <input type="radio" id="answer" name="answer" value="${currentQuestion.answers[1]}">
        <label>${currentQuestion.answers[1]}</label><br>

        <input type="radio" id="answer" name="answer" value="${currentQuestion.answers[2]}">
        <label>${currentQuestion.answers[2]}</label><br>

        <input type="radio" id="answer" name="answer" value="${currentQuestion.answers[3]}">
        <label>${currentQuestion.answers[3]}</label><br>

        <button type="submit">Submit</button>
      </form>
    </div>
    `;

  return questionPage;
}
//you should be shown a question with a list of answers

function handleAnswerSubmit() {
  $("main").on("submit", "form", function (evt) {
    evt.preventDefault();
    store.questionNumber++;
    let answer = $(`input[name='answer']:checked`).val();
    if (answer === store.questions[])
      render();

  })

}

//users should be able to select an answer
function answerPage(){
  if(answer === store.questions.correctAnswer)
}


//app should verify whether answer is correct

//when correct, user will be taken to a correct answer page with the correct answer highlighted green, and 1 will be added to total number correct

//when incorrect, user will be taken to a incorrect answer page with the correct answer highlighted green and the chosen answer highlighted red

//user should be able to proceed to next question with a next question button

//once quiz is complete user will be displayed a final page stating that the quiz is over and will also display final score 

//A button to restart the quiz will be displayed on final page

function render() {
  console.log
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

}


$(main);
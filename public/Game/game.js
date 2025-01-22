// Reference top the question

// This is the new stuff Jenny added:
const readUsers = () => {
  const usersJSON = localStorage.getItem("users");
    return usersJSON ? JSON.parse(usersJSON) : []; // Return parsed users or an empty array
};


const writeUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users)); // Save the users array as JSON
};


const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
console.log(choices);

const TimerDisplay = document.querySelector(".time-duration");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0; // what question you are on
let availableQuestions = [];  // empty array for remaining questions
let timer = null; // declare timer variable
const QUIZ_TIME_LIMIT = 15; // 15 seconds limit for each question
let currentTime = QUIZ_TIME_LIMIT;

// Timer reset function
const resetTimer = () => {
  clearInterval(timer);
  currentTime = QUIZ_TIME_LIMIT;
  TimerDisplay.textContent = `${currentTime}s`;

}


// Timer start function
const startTimer = () => {
  timer = setInterval(() => {
  currentTime--;
  TimerDisplay.textContent = `${currentTime}s`;

if (currentTime <= 0) {
  clearInterval(timer);
  acceptingAnswers = false; 
  getNewQuestion(); // Move to the next question
}
}, 1000);
}

// Updated questionarie, being fetched from OpenTrivia API 
let questions = [];
// Fetch the JSON questions
fetch(
  `https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple`
)
  .then((res) => {
    return res.json();
  })
  .then((openTriviaQuestions) => {
    questions = openTriviaQuestions.results.map((openTriviaQuestions) => {
        const buildQuestion = {
          question: openTriviaQuestions.question,
        };

        const answerOptions = [...openTriviaQuestions.incorrect_answers];
        buildQuestion.answer = Math.floor(Math.random() * 4) + 1;
        answerOptions.splice(
          buildQuestion.answer - 1,
          0,
          openTriviaQuestions.correct_answer
        );  

        answerOptions.forEach((choice, index) => {
          buildQuestion[`choice` + (index + 1)] = choice;
        });

        return buildQuestion;
    });
    startGame();
  })
  .catch((err) => {
    console.error(err);
  });

// CONSTANTS
const QUESTION_CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
      questionCounter = 0;
      score = 0;
      availableQuestions = [...questions];
      console.log(availableQuestions);
      startTimer();
      getNewQuestion();
};

getNewQuestion = () => { // function to reload a new question
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
    //return alert(`Game over! Your score: ${score}`);
  
    // This is the new stuff Jenny added:
    let name = prompt("Your quiz is over, please enter your name to get your score:");
    let users = readUsers();


    if (name !== null && name.trim() !== "") {
      const currentUser = {
        name: name.trim(),
         score: score, 
      };

      //Save current user to localStorage
      localStorage.setItem("currentUser", JSON.stringify(currentUser));


      //Add current user to the leaderboard
      users.push(currentUser);
      writeUsers(users);


       alert("Your score has been saved!");
    } else {
      alert("No name entered. Score not saved.");
    }
    window.location.replace("/Results/results.html");
  };
      
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
      
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);  // Get a random number for the newQuestion
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;
        
    resetTimer(); // Reset the timer
    startTimer(); // Start the timer

        // Grab out choices and iterate 
  choices.forEach((choice) => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
    // const letter = choice.dataset["letter"];
    // choice.innerText = `${currentQuestion[letter]}`;
  });

  // Remove the current question from the available questions
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;

};

// Add event listeners to the choices

document.querySelectorAll('.choice-container').forEach(choiceContainer => {
  choiceContainer.addEventListener('click', (e) => {
    
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    clearInterval(timer); // Stop the timer once an answer is selected

    const selectedAnswer = choiceContainer.querySelector('.choice-text').dataset['number'];  // select the whole answer container 

    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
      increaseScore(QUESTION_CORRECT_BONUS);  // increase score
    }

    // Apply the corresponding class to style the choice
    choiceContainer.classList.add(classToApply);
    
    // Delay before loading the next question
    const handleNextQuestion = () => {
        // Clear the interval for the timer if applicable
      clearInterval(timer); 
      choiceContainer.classList.remove(classToApply);
      document.querySelectorAll('.choice-container').forEach(container => {
        container.classList.remove("correct", "incorrect");
      });
      getNewQuestion();
      };

      setTimeout(handleNextQuestion, 1000);
  });
});

increaseScore = num => {
  score += num;
  scoreText.innerText = score;
};

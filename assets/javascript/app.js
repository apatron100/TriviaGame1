          $(document).ready(function() {


function initialScreen() {
  startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Comienza el juego</a></p>";
  $(".mainArea").html(startScreen);
}

initialScreen();



$("body").on("click", ".start-button", function(event){
  event.preventDefault();  
  clickSound.play();
  generateHTML();

  timerWrapper();

}); 

$("body").on("click", ".answer", function(event){
  
  clickSound.play();
  selectedAnswer = $(this).text();
  if(selectedAnswer === correctAnswers[questionCounter]) {
    

    clearInterval(theClock);
    generateWin();
  }
  else {
    //alerta("respuesta equivocada!");
    clearInterval(theClock);
    generateLoss();
  }
}); 

$("body").on("click", ".reset-button", function(event){
  clickSound.play();
  resetGame();
}); 

});  

function generateLossDueToTimeOut() {
  unansweredTally++;
  gameHTML = "<p class='text-center timer-p'>Tiempo remanente: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Se termino tu tiempo!  La respuesta correcta era: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
  $(".mainArea").html(gameHTML);
  setTimeout(wait, 4000);  
}

function generateWin() {
  correctTally++;
  gameHTML = "<p class='text-center timer-p'>Tiempo Remanente: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>La respuesta correcta es: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
  $(".mainArea").html(gameHTML);
  setTimeout(wait, 4000);  
}

function generateLoss() {
  incorrectTally++;
  gameHTML = "<p class='text-center timer-p'>Tiempo remanente: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'> Falso!, la respuesta correcta es: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
  $(".mainArea").html(gameHTML);
  setTimeout(wait, 4000); 
}

function generateHTML() {
  gameHTML = "<p class='text-center timer-p'>Tiempo remanente: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
  $(".mainArea").html(gameHTML);
}

function wait() {
  if (questionCounter < 7) {
  questionCounter++;
  generateHTML();
  counter = 30;
  timerWrapper();
  }
  else {
    finalScreen();
  }
}

function timerWrapper() {
  theClock = setInterval(thirtySeconds, 1000);
  function thirtySeconds() {
    if (counter === 0) {
      clearInterval(theClock);
      generateLossDueToTimeOut();
    }
    if (counter > 0) {
      counter--;
    }
    $(".timer").html(counter);
  }
}

function finalScreen() {
  gameHTML = "<p class='text-center timer-p'>Tiempo remanente: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'> Fin del juego, aqui tu score!" + "</p>" + "<p class='summary-correct'>Respuestas Correctas: " + correctTally + "</p>" + "<p>Respuestas Incorrectas: " + incorrectTally + "</p>" + "<p>Sin contestar: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Juega de nuevo!</a></p>";
  $(".mainArea").html(gameHTML);
}

function resetGame() {
  questionCounter = 0;
  correctTally = 0;
  incorrectTally = 0;
  unansweredTally = 0;
  counter = 30;
  generateHTML();
  timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["Cual es la capital de Alemania?", "Cual es la capital de Mexico?", "Cual es la capital de Venezuela ?", "Cual es la capital de Inglaterra?", "Cual es la capital de Rusia?", "Cual es la capital de Brasil?", "Cual es la capital de Colombia?", "Cual es la capital de la India?"];
var answerArray = [["Berlin", "Munich", "Frankfurt", "Bonn"], ["Guadalajara","Ciudad de Mexico","Culiacan","Oaxaca"], ["Maracaibo", "Valencia", "Caracas", "Maturin"], ["Manchester","Bristol","Londres","Liverpool"], ["Kiev", "San Petesburgo", "Minks", "Moscow"], ["Brasilia","Rio de Janeiro","Belo Horizonte","Manaos"], ["Medellin", "Bogota", "Cartagena", "Cali"], ["Mumbai","Hyderabad","Bangalore","New Delhi"]];
var imageArray = ["<img class='center-block img-right' src='img/GER.png.cf.jpg'>", "<img class='center-block img-right' src='img/mexico.jpg'>", "<img class='center-block img-right' src='img/Venezuela.png'>", "<img class='center-block img-right' src='img/England.jpg'>", "<img class='center-block img-right' src='img/rusia.png'>", "<img class='center-block img-right' src='img/Brasil.png'>", "<img class='center-block img-right' src='img/colombia.png'>", "<img class='center-block img-right' src='img/india.png'>"];
var correctAnswers = ["A. Berlin", "B. Ciudad de Mexico", "C. Caracas", "C. Londres", "D. Moscow", "A. Brasilia", "B. Bogota", "D. New Delhi"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("sound/button-click.mp3");

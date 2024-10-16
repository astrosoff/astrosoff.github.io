const hint = document.getElementById("hint");
const noOfGuessesRef = document.getElementById("no-of-guesses");
const guessedNumsRef = document.getElementById("guessed-nums");
const restartButton = document.getElementById("restart");
const game = document.getElementById("game");
const guessInput = document.getElementById("guess");
const checkButton = document.getElementById("check-btn");

// Define buttons
const numButtons = document.querySelectorAll('.numpad button');

let answer, noOfGuesses, guessedNumsArr;

const play = () => {
  const userGuess = Number(guessInput.value); // Convert input to a number
  if (userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
    alert("Inserire un numero valido tra 1 e 100.");
    return;
  }
  guessedNumsArr.push(userGuess);
  noOfGuesses += 1;

  if (userGuess !== answer) {
    hint.innerHTML = userGuess < answer 
      ? "Troppo basso. Ritenta!" 
      : "Troppo alto. Ritenta!";
    
    noOfGuessesRef.innerHTML = `<span>N. di tentativi:</span> ${noOfGuesses}`;
    guessedNumsRef.innerHTML = `<span>Numeri provati: </span>${guessedNumsArr.join(", ")}`;
    hint.classList.remove("error");
    setTimeout(() => {
      hint.classList.add("error");
    }, 10);
  } else {
    hint.innerHTML = `Congratulazioni!<br>Il numero segreto era <span>${answer}</span>.<br>L'hai indovinato con <span>${noOfGuesses} </span>tentativi.`;
    hint.classList.add("success");
		numberpad.style.display = "none";
    game.style.display = "none";
    restartButton.style.display = "block";
  }

  guessInput.value = ""; // Clear input after guess
};

const init = () => {
  console.log("Game Started");
  answer = Math.floor(Math.random() * 100) + 1;
  console.log(answer);
  noOfGuesses = 0;
  guessedNumsArr = [];
  noOfGuessesRef.innerHTML = "N. di tentativi: 0";
  guessedNumsRef.innerHTML = "Numeri provati: Nessuno";
  guessInput.value = ""; // Clear input field on init
  hint.classList.remove("success", "error");
};

// Function to add number from the numpad to the input field
const addToInput = (number) => {
  guessInput.value += number; // Append number to the input field
};

// Add event listeners to numpad buttons for fast input
numButtons.forEach(button => {
  button.addEventListener('touchstart', () => {
    event.preventDefault();
    if (button.id === 'clear-btn') {
      guessInput.value = ''; // Clear input field instantly
    } else {
      guessInput.value += button.innerText; // Append number to input field instantly
    }
  });
});

// When button press is released
numButtons.forEach(button => {
  button.addEventListener('touchend', (event) => {
    event.preventDefault();
    button.style.backgroundColor = "#a9a9a9"; // Reset to original color after release
  });
});

guessInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") { // Updated to use event.key for readability
    event.preventDefault();
    play();
  }
});

restartButton.addEventListener("touchstart", () => {
  game.style.display = "grid";
  restartButton.style.display = "none";
  hint.innerHTML = "";
  hint.classList.remove("success", "error");
  numberpad.style.display = "flex";
  init();
});

checkButton.addEventListener("click", play);
window.addEventListener("load", init);
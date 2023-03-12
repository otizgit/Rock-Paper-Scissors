// MODAL FUNCTIONALITY:
const rulesBox = document.querySelector(".rules-box");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const overlay = document.querySelector(".overlay");

rulesBox.addEventListener("click", openModal);
close.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

function openModal() {
  modal.classList.add("show-modal");
  overlay.classList.add("show-overlay");
}
function closeModal() {
  modal.classList.remove("show-modal");
  overlay.classList.remove("show-overlay");
}

// MAIN GAME FUNCTIONALITY:
const totalChoices = [
  {
    choice: "scissors",
    img: "./images/icon-scissors.svg",
    boxShadow: "hsl(39, 89%, 40%)",
    gradient: "hsl(39, 89%, 49%), hsl(40, 84%, 53%)",
  },
  {
    choice: "paper",
    img: "./images/icon-paper.svg",
    boxShadow: "hsl(230, 89%, 52%)",
    gradient: "hsl(230, 89%, 62%), hsl(230, 89%, 65%)",
  },
  {
    choice: "rock",
    img: "./images/icon-rock.svg",
    boxShadow: "hsl(349, 71%, 42%)",
    gradient: "hsl(349, 71%, 52%), hsl(349, 70%, 56%)",
  },
  {
    choice: "lizard",
    img: "./images/icon-lizard.svg",
    boxShadow: "hsl(261, 73%, 44%)",
    gradient: "hsl(261, 73%, 60%), hsl(261, 72%, 63%)",
  },
  {
    choice: "spock",
    img: "./images/icon-spock.svg",
    boxShadow: "hsl(189, 59%, 33%)",
    gradient: "hsl(189, 59%, 53%), hsl(189, 58%, 57%)",
  },
];

const gameContent = document.querySelector(".game-content");
const computerChoiceContainer = document.querySelector(
  ".computer-choice-container"
);
const userChoiceContainer = document.querySelector(".user-choice-container");
const choicesContainer = document.querySelectorAll(".choices-container");
const pentagon = document.querySelector(".pentagon");
const houseTitle = document.querySelector(".house-title");
const userTitle = document.querySelector(".user-title");
const resultContainer = document.querySelector(".result-container");
const resultDisplay = document.querySelector(".result");
const resultImg = document.querySelector(".result-img");

const resetBtn = document.querySelector(".reset");
const playAgain = document.querySelector(".play-again");

const choicesBox = document.querySelector(".choices-box");

const userChoiceBox = document.querySelector(".user-choice-box");
const houseChoiceBox = document.querySelector(".house-choice-box");

const choiceLoad = document.querySelectorAll(".choice-load");

const userScore = document.querySelector(".user-score");
const houseScore = document.querySelector(".house-score");

let userChoice;
let computerChoice;
let result;

gameContent.addEventListener("click", function (e) {
  let target = e.target.id;
  if (target) {
    choicesContainer.forEach(function (choice) {
      choice.classList.add("rest-choices");
      pentagon.classList.add("rest-choices");
      choicesBox.classList.add("show-choices-box");

      choiceLoad.forEach(function (choice) {
        choice.classList.remove("remove-choice-load");
      });

      userTitle.classList.remove("remove-user-title");
    });
    userChoice = e.target.id;
    totalChoices.forEach(function (totalChoice) {
      if (userChoice === totalChoice.choice) {
        userChoiceContainer.classList.add("scale-choice");
        const userChoiceImg = userChoiceContainer.querySelector("img");
        userChoiceImg.src = totalChoice.img;
        userChoiceContainer.style.setProperty(
          "--computerBackground",
          totalChoice.gradient
        );
        userChoiceContainer.style.setProperty(
          "--boxShadow",
          totalChoice.boxShadow
        );
      }
    });

    generateComputerChoice();

    moveChoices();

    getResult();
  }
});

function moveChoices() {
  userChoiceBox.classList.add("slide-user-choice");
  houseChoiceBox.classList.add("slide-house-choice");
}

function generateComputerChoice() {
  const computerImg = computerChoiceContainer.querySelector("img");
  const randomNumber = Math.floor(Math.random() * totalChoices.length);
  let element = totalChoices[randomNumber];
  computerImg.src = element.img;
  computerChoiceContainer.style.setProperty(
    "--computerBackground",
    element.gradient
  );
  computerChoiceContainer.style.setProperty("--boxShadow", element.boxShadow);
  computerChoiceContainer.classList.add("scale-house-choice");

  houseTitle.classList.add("load-title");

  computerChoice = choicesContainer[randomNumber].id;
}

function getResult() {
  resultContainer.classList.add("show-result-container");
  if (userChoice === computerChoice) {
    draw();
  } else if (userChoice === "scissors" && computerChoice === "paper") {
    win();
  } else if (userChoice === "scissors" && computerChoice === "rock") {
    lose();
  } else if (userChoice === "scissors" && computerChoice === "lizard") {
    win();
  } else if (userChoice === "scissors" && computerChoice === "spock") {
    lose();
  } else if (userChoice === "paper" && computerChoice === "rock") {
    win();
  } else if (userChoice === "paper" && computerChoice === "scissors") {
    lose();
  } else if (userChoice === "paper" && computerChoice === "lizard") {
    lose();
  } else if (userChoice === "paper" && computerChoice === "spock") {
    win();
  } else if (userChoice === "rock" && computerChoice === "scissors") {
    win();
  } else if (userChoice === "rock" && computerChoice === "paper") {
    lose();
  } else if (userChoice === "rock" && computerChoice === "lizard") {
    win();
  } else if (userChoice === "rock" && computerChoice === "spock") {
    lose();
  } else if (userChoice === "lizard" && computerChoice === "scissors") {
    lose();
  } else if (userChoice === "lizard" && computerChoice === "paper") {
    win();
  } else if (userChoice === "lizard" && computerChoice === "rock") {
    lose();
  } else if (userChoice === "lizard" && computerChoice === "spock") {
    win();
  } else if (userChoice === "spock" && computerChoice === "scissors") {
    win();
  } else if (userChoice === "spock" && computerChoice === "paper") {
    win();
  } else if (userChoice === "spock" && computerChoice === "rock") {
    win();
  } else {
    lose();
  }
}

function win() {
  updateUserScore();

  resultImg.src = "./images/smiling-face.png";
  resultDisplay.innerText = "YOU WIN!";
}

function lose() {
  updateHouseScore();

  resultImg.src = "./images/pensive-face.png";
  resultDisplay.innerText = "YOU LOSE!";
}

function draw() {
  updateHouseScore();
  updateUserScore();

  resultImg.src = "./images/neutral-face.png";
  resultDisplay.innerText = "IT'S A TIE!";
}

playAgain.addEventListener("click", function () {
  userChoiceContainer.classList.remove("scale-choice");
  computerChoiceContainer.classList.remove("scale-house-choice");

  userChoiceBox.classList.remove("slide-user-choice");
  houseChoiceBox.classList.remove("slide-house-choice");

  choiceLoad.forEach(function (choice) {
    choice.classList.add("remove-choice-load");
  });

  houseTitle.classList.remove("load-title");
  userTitle.classList.add("remove-user-title");

  pentagon.classList.remove("rest-choices");

  choicesContainer.forEach(function (choice) {
    choice.classList.remove("rest-choices");
    choice.classList.remove("rest-choices");
    choice.classList.remove("players-choice");
  });

  resultContainer.classList.remove("show-result-container");
});

resetBtn.addEventListener("click", function () {
  userScore.innerText = "0";
  localStorage.setItem("user-score", userScore.innerText);

  houseScore.innerText = "0"
  localStorage.setItem("house-score", houseScore.innerText)
});

function updateUserScore() {
  setTimeout(() => {
    userScore.innerText = parseInt(userScore.innerText) + 1;
    localStorage.setItem("user-score", userScore.innerText);
  }, 2800);
}

userScore.innerText = localStorage.getItem("user-score");

function updateHouseScore() {
  setTimeout(() => {
    houseScore.innerText = parseInt(houseScore.innerText) + 1;
    localStorage.setItem("house-score", houseScore.innerText);
  }, 2800);
}

houseScore.innerText = localStorage.getItem("house-score");

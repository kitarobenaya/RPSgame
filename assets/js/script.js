const player_Images = document.querySelectorAll(".player-image");
const imgComp = document.querySelector(".computer-image");
const compCapt = document.querySelector(".computer-caption-image");
const info = document.querySelector("section.info");
const scorePlayer = document.querySelector("div.score.player");
const scoreComp = document.querySelector("div.score.computer");

function getComputerChoice() {
  const choice = ["gajah", "orang", "semut"];
  const randomChoice = Math.round(Math.random() * (choice.length - 1));
  return choice[randomChoice];
}

function getTheWinner(playerChoice, computerChoice) {
  if (playerChoice == computerChoice) return "Seri!";
  if (playerChoice == "gajah")
    return computerChoice == "orang" ? "Menang!" : "Kalah!";
  if (playerChoice == "semut")
    return computerChoice == "gajah" ? "Menang!" : "Kalah!";
  if (playerChoice == "orang")
    return computerChoice == "semut" ? "Menang!" : "Kalah!";
}

function imageRoll() {
  const gambar = ["gajah", "orang", "semut"];
  let i = 0;
  const interval = setInterval(() => {
    imgComp.setAttribute("src", `assets/images/${gambar[i++]}.png`);
    if(i == gambar.length) return i = 0;
    setTimeout(() => {
      clearInterval(interval);
    }, 900)
  }, 100);
}

player_Images.forEach((img) => {
  img.addEventListener("click", function () {
    const playerChoice = this.dataset.choice;
    imageRoll();
    const computerChoice = getComputerChoice();
    console.log(computerChoice);
    setTimeout(() => {
      imgComp.setAttribute("src", `assets/images/${computerChoice}.png`);
      compCapt.innerHTML = computerChoice;
      info.innerHTML = getTheWinner(playerChoice, computerChoice);
      if (info.innerHTML == "Menang!") {
        scorePlayer.innerHTML = parseInt(scorePlayer.innerHTML) + 1;
      } else if (info.innerHTML == "Kalah!") {
        scoreComp.innerHTML = parseInt(scoreComp.innerHTML) + 1;
      }
    }, 1000)
  });
});

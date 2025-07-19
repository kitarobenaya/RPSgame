const player_Images = document.querySelectorAll(".player-image");
const imgComp = document.querySelector(".computer-image");
const compCapt = document.querySelector(".computer-caption-image");
const info = document.querySelector("section.info");
const bgInfo = document.querySelector("div.bg-info");
const scorePlayer = document.querySelector("div.score.player");
const scoreComp = document.querySelector("div.score.computer");
let lastUserChoice = null;
let boolflag = true;

function htmlString(gamNamComp, gamNamPl) {
  return `
  <div class="img-player-wrap showcomputer">
  <figcaption>computer</figcaption>
    <img
      src="assets/images/${gamNamComp}.png"
      alt="gambar ${gamNamComp}"
      class="player-image"
      aria-label="gambar ${gamNamComp}"
    />
    <figcaption aria-label="${gamNamComp} adalah pilihan computer">${gamNamComp}</figcaption>
  </div>

  <span>VS</span>

  <div class="img-player-wrap showplayer">
  <figcaption>kamu</figcaption>
    <img
      src="assets/images/${gamNamPl}.png"
      alt="gambar ${gamNamPl}"
      class="player-image"
      aria-label="gambar ${gamNamPl}"
    />
    <figcaption aria-label="${gamNamPl} adalah pilihan kamu">${gamNamPl}</figcaption>
  </div>
</section>
  `;
}

function getComputerChoice() {
  const random = Math.random();

  if (!lastUserChoice || random < 0.3) {
    const choices = ["batu", "gunting", "kertas"];
    return choices[Math.floor(random * choices.length)];
  }

  if (lastUserChoice === "batu") return "kertas";
  if (lastUserChoice === "gunting") return "batu";
  if (lastUserChoice === "kertas") return "gunting";
}

function getTheWinner(playerChoice, computerChoice) {
  if (playerChoice == computerChoice) return "Seri!";
  if (playerChoice == "batu")
    return computerChoice == "gunting" ? "Menang!" : "Kalah!";
  if (playerChoice == "kertas")
    return computerChoice == "batu" ? "Menang!" : "Kalah!";
  if (playerChoice == "gunting")
    return computerChoice == "kertas" ? "Menang!" : "Kalah!";
}

function imageRoll() {
  const gambar = ["batu", "kertas", "gunting"];
  let i = 0;
  const interval = setInterval(() => {
    imgComp.setAttribute("src", `assets/images/${gambar[i++]}.png`);
    if (i == gambar.length) return (i = 0);
    setTimeout(() => {
      clearInterval(interval);
    }, 900);
  }, 100);
}

player_Images.forEach((img) => {
  img.addEventListener("click", function () {
    if (boolflag == true) {
      boolflag = false;
      const playerChoice = this.dataset.choice;
      imageRoll();
      const computerChoice = getComputerChoice();
      console.log(computerChoice);
      setTimeout(() => {
        imgComp.setAttribute("src", `assets/images/${computerChoice}.png`);
        compCapt.innerHTML = computerChoice;
        lastUserChoice = playerChoice;

        // animation start
        setTimeout(() => {
          info.classList.add("showinfo");
          bgInfo.style.opacity = "1";
          bgInfo.style.zIndex = "2";

          setTimeout(() => {
            info.innerHTML = htmlString(computerChoice, playerChoice);
          }, 500);

          setTimeout(() => {
            const imgPlayerWrap = document.querySelectorAll(
              "section.info .img-player-wrap"
            );
            const spanEl = document.querySelector("section.info span");
            imgPlayerWrap[0].classList.remove("showcomputer");
            imgPlayerWrap[1].classList.remove("showplayer");
            spanEl.classList.add("hidespan");
            imgPlayerWrap[0].classList.add("hidecomputer");
            imgPlayerWrap[1].classList.add("hideplayer");
          }, 2500);

          setTimeout(() => {
            const spanEl = document.querySelector("section.info span");
            spanEl.classList.remove("hidespan");
            spanEl.classList.add("showspan");
            spanEl.innerHTML =
              "Kamu " + getTheWinner(playerChoice, computerChoice);
          }, 3100);

          setTimeout(() => {
            const spanEl = document.querySelector("section.info span");
            if (spanEl.innerHTML == "Kamu Menang!") {
              scorePlayer.innerHTML = parseInt(scorePlayer.innerHTML) + 1;
            } else if (spanEl.innerHTML == "Kamu Kalah!") {
              scoreComp.innerHTML = parseInt(scoreComp.innerHTML) + 1;
            }

            const imgPlayerWrap = document.querySelectorAll(
              "section.info .img-player-wrap"
            );
            imgPlayerWrap[0].classList.remove("hidecomputer");
            imgPlayerWrap[1].classList.remove("hideplayer");

            info.classList.remove("showinfo");

            info.classList.add("hideinfo");
            bgInfo.style.opacity = "0";
            bgInfo.style.zIndex = "0";
            info.innerHTML = "<span>VS</span>";
          }, 5100);

          setTimeout(() => {
            info.classList.remove("hideinfo");
            boolflag = true;
          }, 5550);
        }, 200);
        // animation end
      }, 1000);
    }
  });
});

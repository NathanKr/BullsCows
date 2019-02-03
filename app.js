const bcGame = require("./BullCowGame");
const readline = require("readline");

let MAX_GUESS_NUMBER = 15,
  WORD_LENGTH = 4;

const PrintIntro = () => {
  console.log("                     (__)      (__)");
  console.log("                     (oo)      (oo)");
  console.log("               /------\\/        \\/ --------\\");
  console.log("              / |     ||        ||_______|  \\");
  console.log("             *  ||W---||        ||      ||   *");
  console.log("                ^^    ^^        ^^      ^^");

  console.log("Welcome to Bulls and Cows , a fun word game");
  console.log(`can you guess the ${WORD_LENGTH} letters word i think about ?`);
  console.log(`you have ${MAX_GUESS_NUMBER}  tries`);
};

const PrintNonValidGuessError = status => {
  strErr = "";

  switch (status) {
    case "Ok":
      // -- nothing to print
      break;

    default:
      strErr = status;
      break;
  }

  if (strErr.length > 0) {
    console.log(`Error : ${strErr}`);
  }
};

// --- return promise
const GetGuess = async () => {
  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question("enter your guess : ", guess => {
      resolve(guess);
      rl.close();
    });
  });
};

// --- async 
const PlayGame = async () => {
  let strGuess, status, count;
  bcGame.Reset();

  while (bcGame.GetCurrentTry() < bcGame.GetMaxTries() && !bcGame.IsGameWon()) {
    do {
      strGuess = await GetGuess();
        status = bcGame.CheckGuessValid(strGuess);
        PrintNonValidGuessError(status);
    } while (status != "Ok");

    count = bcGame.SubmitValidGuess(strGuess);

    console.log(`Try : ${bcGame.GetCurrentTry()}  of  ${bcGame.GetMaxTries()}`);
    console.log(`Bulls : ${count.bulls}`);
    console.log(`Cows : ${count.cows}`);
  }

  console.log(bcGame.IsGameWon() ? "YOU WIN" : "YOU LOSE");
};

const AskToPlayAgain = () => {
  return false;
};

let bPlayAgain;

bcGame.BullCowGame(MAX_GUESS_NUMBER, WORD_LENGTH);

do {
  PrintIntro();
  PlayGame();
  bPlayAgain = AskToPlayAgain();
} while (bPlayAgain);

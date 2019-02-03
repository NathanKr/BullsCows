let m_nMaxTries, m_nWorldLength, m_strHiddenWord, m_nCurrentTry, m_bGameWon;

const makeGuess = len => {
  let text = "";
  let possible = "abcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < len; i++) {
    let c = possible.charAt(Math.floor(Math.random() * possible.length));
    possible.replace(c, ""); // -- remove from possible
    text += c;
  }

  console.log(`home : ${text}`);

  return text;
};

const clear = () => {
  m_strHiddenWord = makeGuess(m_nWorldLength);
  m_nCurrentTry = 0;
  m_bGameWon = false;
};

const BullCowGame = (nMaxTries, nWorldLength) => {
  m_nMaxTries = nMaxTries;
  m_nWorldLength = nWorldLength;
  clear();
};

const Reset = () => {
  clear();
};

const GetMaxTries = () => {
  return m_nMaxTries;
};

const GetCurrentTry = () => {
  return m_nCurrentTry;
};

const IsGameWon = () => {
  return m_bGameWon;
};

const isAllLower = strGuess => {
  bIsAllLOwer = true;
  for (let i = 0; i < strGuess.length; i++) {
    if (!(strGuess[i] >= "a" && strGuess[i] <= "z")) {
      bIsAllLOwer = false;
      break;
    }
  }
  return bIsAllLOwer;
};

const isUnique = (c, strGuess) => {
  let nCount = 0;
  for (let i = 0; i < strGuess.length; i++) {
    if (c == strGuess[i]) {
      nCount++;
      if (nCount > 1) {
        return false;
      }
    }
  }

  return true;
};

const isAllUnique = strGuess => {
  for (let i = 0; i < strGuess.length; i++) {
    if (!isUnique(strGuess[i], strGuess)) {
      return false;
    }
  }

  return true;
};

const SubmitValidGuess = strGuess => {
  let count = { cows: 0, bulls: 0 };
  m_nCurrentTry++;

  for (let i = 0; i < m_strHiddenWord.length; i++) {
    if (m_strHiddenWord[i] == strGuess[i]) {
      count.bulls++;
    } else {
      let found = m_strHiddenWord.indexOf(strGuess[i]);
      if (found >= 0 && found < m_strHiddenWord.length) {
        count.cows++;
      }
    }
  }

  m_bGameWon = count.bulls == m_strHiddenWord.length;

  return count;
};

const CheckGuessValid = strGuess => {
  status = "Ok";

  if (strGuess.length != m_strHiddenWord.length) {
    status = "Wrong Number of Letters";
  } else if (!isAllLower(strGuess)) {
    status = "Only Lowercase Letters are Allowed";
  } else if (!isAllUnique(strGuess)) {
    status = "Letter is not Unique";
  }

  return status;
};

module.exports = {
  SubmitValidGuess,
  GetMaxTries,
  GetCurrentTry,
  IsGameWon,
  BullCowGame,
  Reset,
  CheckGuessValid
};

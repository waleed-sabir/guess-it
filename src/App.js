import "./App.css";

import { useState } from "react";

let randomNumber = Math.floor(Math.random() * 20);

function App() {
  const [number, setNumber] = useState("?");
  const [inputNum, setInputNum] = useState("");
  const [startGuess, setStartGuess] = useState("Start Guessing...");
  const [score, setScore] = useState(20);
  const [highScore, setHighScore] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("#3e1f47");
  const [disableState, setDisableState] = useState(false);

  const handleNumChange = (e) => {
    setInputNum(+e.target.value);
  };

  const handleGuessClick = () => {
    console.log(randomNumber);
    console.log(inputNum, typeof inputNum);
    if (!inputNum) {
      setStartGuess("Please enter a number");
    } else if (inputNum < randomNumber) {
      setStartGuess("Too Low");
      setScore(score - 1);
    } else if (inputNum > randomNumber) {
      setStartGuess("Too High");
      setScore(score - 1);
    }
    if (inputNum === randomNumber) {
      setNumber(inputNum);
      setStartGuess("Hooray!! You guessed it right.");
      setHighScore(score);
      setBackgroundColor("#3a5a40");
      setDisableState(true);
    }
  };

  const handleRefreshClick = () => {
    randomNumber = Math.floor(Math.random() * 20);
    console.log("Game refreshed");
    setScore(20);
    setInputNum("");
    setStartGuess("Start Guessing...");
    setNumber("?");
    setBackgroundColor("#3e1f47");
    setDisableState(false);
  };

  return (
    <div className="App">
      <header>
        <h1
          className="header-title"
          style={{
            backgroundColor: backgroundColor,
          }}
        >
          Guess it!
        </h1>
        <div className="number">
          <p className="actual-number">{number}</p>
        </div>
        <p className="between">Guess a number between 1 and 20</p>
      </header>
      <main
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        <div className="number-input">
          <label>
            <input
              disabled={disableState}
              type="number"
              min={1}
              max={20}
              value={inputNum}
              onChange={handleNumChange}
            />
          </label>
          <div className="buttons">
            <button
              className="btn btn-check"
              onClick={handleGuessClick}
              disabled={disableState}
            >
              Guess!
            </button>
            <button className="btn btn-refresh" onClick={handleRefreshClick}>
              Refresh
            </button>
          </div>
        </div>
        <div className="scoring">
          <h2 className="start">{startGuess}</h2>
          <p className="score">Score: {score}</p>
          <p className="high-score">High Score: {highScore}</p>
        </div>
      </main>
    </div>
  );
}

export default App;

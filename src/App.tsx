import { useEffect, useState } from "react";
import "./App.css";

let steps: Array<string> = new Array(9).fill("");
const winnerArrCheck = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const App = () => {
  const [step, setStep] = useState("x");
  const [disable, setDisable] = useState(false);
  const [winner, setWinner] = useState("");
  const [wins, setWins] = useState(0);
  const [loses, setLoses] = useState(0);
  const [ties, setTies] = useState(0);

  const checkWinner = (symbol: string): boolean => {
    return winnerArrCheck.some((combo) =>
      combo.every((index) => steps[index] === symbol)
    );
  };
  useEffect(() => {
    if (checkWinner("x")) {
      setWinner("You");
      setDisable(true);
    }
    if (checkWinner("o")) {
      setWinner("Robot");
      setDisable(true);
    }
    if (
      steps.every((value) => value == "x" || value == "o") &&
      !checkWinner("x") &&
      !checkWinner("o")
    ) {
      setWinner("Tie");
      setDisable(true);
    }
  }, [step]);

  const robotStep = (): void => {
    setTimeout(() => {
      for (let i = 0; i < 8; i++) {
        const step = Math.floor(Math.random() * 8);
        if (!steps[step]) {
          setStep("x");
          setDisable(false);
          steps[step] = "o";
          break;
        }
      }
    }, 1000);
  };

  const handleReset = () => {
    setStep("x");
    setDisable(false);
    if (winner === "Robot") {
      setLoses(loses + 1);
    }
    if (winner === "You") {
      setWins(wins + 1);
    }
    if (winner === "Tie") {
      setTies(ties + 1);
    }
    setWinner("");
    steps = new Array(9).fill("");
  };

  const handleStep = (ind: number): void => {
    steps[ind] = step;
    setStep("o");
    setDisable(true);
    robotStep();
  };
  return (
    <div className='game'>
      <div className='counts'>
        <h1 className='counts_h'>
          Count wins
          <br />
          {wins}
        </h1>
        <h1 className='counts_h'>
          Count loses
          <br />
          {loses}
        </h1>
        <h1 className='counts_h'>
          Count ties
          <br />
          {ties}
        </h1>
      </div>
      {!winner && step == "x" ? <h2>Your Step</h2> : <h2>Robot Step</h2>}
      {!winner ? (
        step == "x" ? (
          <div className='header'>
            Step <p className='x'>x</p>
          </div>
        ) : (
          <div className='header'>
            Step <p className='o'>o</p>
          </div>
        )
      ) : (
        <div className='header'>
          {winner !== "Tie" ? <p>{winner} won!</p> : winner}
        </div>
      )}
      <div className='boxes'>
        {steps.map((value, index) => (
          <div key={index}>
            <button
              className={value}
              onClick={() => handleStep(index)}
              disabled={disable || value ? true : false}
            >
              {value}
            </button>
          </div>
        ))}
      </div>
      {winner && (
        <button className='reset' onClick={handleReset}>
          Reset game
        </button>
      )}
    </div>
  );
};

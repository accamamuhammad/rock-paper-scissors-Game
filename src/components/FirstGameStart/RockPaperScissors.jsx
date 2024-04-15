import React, { useState } from "react";
import rpsCSS from "./RockPaperScissors.module.css";

const RockPaperScissors = () => {
  const [score, setScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWinner, setCurrentWinner] = useState("");
  const [playersChoice, setPlayersChoice] = useState("");
  const [computersChoice, setComputersChoice] = useState("");
  const [winnerTextColor, setWinnerTextColor] = useState(null);
  const [toggleCheckAnswer, setToggleCheckAnswer] = useState(false);
  const [preloaderStatus, setPreloaderStatus] = useState(false);

  const StartNewGame = () => {
    setToggleCheckAnswer(!toggleCheckAnswer);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClick = (playerChoice) => {
    setPreloaderStatus(true);
    setTimeout(() => {
      setPreloaderStatus(false);
    }, 3000);
    setPlayersChoice(playerChoice);
    setToggleCheckAnswer(!toggleCheckAnswer);
    const newComputerAnswer = Math.floor(Math.random() * 3) + 1;
    let newComputersChoice = "";
    if (newComputerAnswer === 1) {
      newComputersChoice = "paper";
    } else if (newComputerAnswer === 2) {
      newComputersChoice = "scissors";
    } else if (newComputerAnswer === 3) {
      newComputersChoice = "rock";
    }
    setComputersChoice(newComputersChoice);

    // Determine the winner and update score
    if (playerChoice === newComputersChoice) {
      setCurrentWinner("TIE");
    } else if (
      (playerChoice === "rock" && newComputersChoice === "scissors") ||
      (playerChoice === "scissors" && newComputersChoice === "paper") ||
      (playerChoice === "paper" && newComputersChoice === "rock")
    ) {
      setCurrentWinner("YOU WIN");
      setWinnerTextColor(true);
      setScore(score + 1); // Increment score if player wins
    } else {
      setCurrentWinner("YOU LOSE");
      setWinnerTextColor(false);
      if (score === 0) {
        setScore(0);
      } else {
        setScore(score - 1);
      }
    }
  };

  return (
    <section className={rpsCSS.Wrapper}>
      <div
        className={preloaderStatus ? rpsCSS.preloaderOn : rpsCSS.preloaderOff}
      >
        <h1>🤖Computer choosing</h1>
      </div>
      <div className={rpsCSS.ScoreDisplay}>
        <img src="/images/logo.svg" alt="logo" />
        <div>
          <p>score</p>
          <h1>{score}</h1>
        </div>
      </div>
      {/* Game Starts */}
      <div
        className={`${rpsCSS.TheGame} ${
          toggleCheckAnswer ? rpsCSS.checking : rpsCSS.reseting
        }`}
      >
        <div className={rpsCSS.paper} onClick={() => handleClick("paper")}>
          <img src="/images/icon-paper.svg" alt="paper" />
        </div>
        <div className={rpsCSS.rod}></div>
        <div
          className={rpsCSS.scissors}
          onClick={() => handleClick("scissors")}
        >
          <img src="/images/icon-scissors.svg" alt="scissors" />
        </div>
        <div className={rpsCSS.rod}></div>
        <div className={rpsCSS.rock} onClick={() => handleClick("rock")}>
          <img src="/images/icon-rock.svg" alt="rock" />
        </div>
        <div className={rpsCSS.rod}></div>
      </div>
      {/* Result Section */}
      <div
        className={`${rpsCSS.resultWrapper} ${
          toggleCheckAnswer ? rpsCSS.reseting : rpsCSS.checking
        }`}
      >
        <div className={rpsCSS.playerBox}>
          <h3>you picked</h3>
          <div
            className={`${
              toggleCheckAnswer ? rpsCSS[playersChoice] : rpsCSS.default
            }`}
          >
            <img
              src={`/images/icon-${playersChoice}.svg`}
              alt="playersChoice"
            />
          </div>
        </div>
        <div>
          <h1>{currentWinner}</h1>
          <button
            className={`${
              winnerTextColor ? rpsCSS.blueColor : rpsCSS.redColor
            }`}
            onClick={() => StartNewGame()}
          >
            Play again
          </button>
        </div>
        <div className={rpsCSS.computerBox}>
          <h3>The house picked</h3>
          <div
            className={`${
              toggleCheckAnswer ? rpsCSS[computersChoice] : rpsCSS.default
            }`}
          >
            <img
              src={`/images/icon-${computersChoice}.svg`}
              alt="computersChoice"
            />
          </div>
        </div>
      </div>
      {/* Rules Button */}
      <button onClick={openModal} className={rpsCSS.rulesBtn}>
        rules
      </button>
      {isModalOpen && (
        <dialog open>
          <h1>Rules</h1>
          <img src="/images/image-rules.svg" alt="Rules" />
          <button onClick={closeModal}>x</button>
        </dialog>
      )}
    </section>
  );
};

export default RockPaperScissors;

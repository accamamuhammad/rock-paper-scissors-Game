import React, { useState } from "react";
import rpsCSS from "./RockPaperScissors.module.css";
import Logo from "../../../public/images/logo.svg";
import ScissorsIcon from "../../../public/images/icon-scissors.svg";
import RockIcon from "../../../public/images/icon-rock.svg";
import PaperIcon from "../../../public/images/icon-paper.svg";

const RockPaperScissors = () => {
  const [score, setScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWinner, setCurrentWinner] = useState("");
  const [playersChoice, setPlayersChoice] = useState("");
  const [computersChoice, setComputersChoice] = useState("");
  const [winnerTextColor, setWinnerTextColor] = useState(null);
  const [toggleCheckAnswer, setToggleCheckAnswer] = useState(false);
  const [preloaderStatus, setPreloaderStatus] = useState(false);

  const StartNewGame = () => setToggleCheckAnswer(!toggleCheckAnswer);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClick = (playerChoice) => {
    setPreloaderStatus(true);
    setTimeout(() => setPreloaderStatus(false), 3000);

    setPlayersChoice(playerChoice);
    setToggleCheckAnswer(!toggleCheckAnswer);

    const newComputerAnswer = Math.floor(Math.random() * 3) + 1;
    const newComputersChoice =
      newComputerAnswer === 1
        ? "paper"
        : newComputerAnswer === 2
        ? "scissors"
        : "rock";

    setComputersChoice(newComputersChoice);

    if (playerChoice === newComputersChoice) {
      setCurrentWinner("TIE");
    } else if (
      (playerChoice === "rock" && newComputersChoice === "scissors") ||
      (playerChoice === "scissors" && newComputersChoice === "paper") ||
      (playerChoice === "paper" && newComputersChoice === "rock")
    ) {
      setCurrentWinner("YOU WIN");
      setWinnerTextColor(true);
      setScore(score + 1);
    } else {
      setCurrentWinner("YOU LOSE");
      setWinnerTextColor(false);
      setScore(score > 0 ? score - 1 : 0);
    }
  };

  return (
    <div className={rpsCSS.Wrapper}>
      {/* Preloader */}
      {preloaderStatus && (
        <section className={rpsCSS.preloaderOn}>
          <h1>🤖 Computer choosing…</h1>
        </section>
      )}

      {/* Scoreboard */}
      <header className={rpsCSS.ScoreDisplay}>
        <img src={Logo} alt="Rock Paper Scissors game logo" />
        <div>
          <p>Score</p>
          <h1>{score}</h1>
        </div>
      </header>

      {/* Game Choices */}
      <section
        className={`${rpsCSS.TheGame} ${
          toggleCheckAnswer ? rpsCSS.checking : rpsCSS.reseting
        }`}
      >
        <button
          className={rpsCSS.paper}
          onClick={() => handleClick("paper")}
          aria-label="Choose paper"
        >
          <img src={PaperIcon} alt="Paper" />
        </button>

        <button
          className={rpsCSS.scissors}
          onClick={() => handleClick("scissors")}
          aria-label="Choose scissors"
        >
          <img src={ScissorsIcon} alt="Scissors" />
        </button>

        <button
          className={rpsCSS.rock}
          onClick={() => handleClick("rock")}
          aria-label="Choose rock"
        >
          <img src={RockIcon} alt="Rock" />
        </button>
      </section>

      {/* Result Section */}
      <section
        className={`${rpsCSS.resultWrapper} ${
          toggleCheckAnswer ? rpsCSS.reseting : rpsCSS.checking
        }`}
      >
        <article className={rpsCSS.playerBox}>
          <h3>You picked</h3>
          <div
            className={`${
              toggleCheckAnswer ? rpsCSS[playersChoice] : rpsCSS.default
            }`}
          >
            {playersChoice && (
              <img
                src={`/public/images/icon-${playersChoice}.svg`}
                alt={`You chose ${playersChoice}`}
              />
            )}
          </div>
        </article>

        <article>
          <h1>{currentWinner}</h1>
          <button
            className={winnerTextColor ? rpsCSS.blueColor : rpsCSS.redColor}
            onClick={StartNewGame}
          >
            Play again
          </button>
        </article>

        <article className={rpsCSS.computerBox}>
          <h3>The house picked</h3>
          <div
            className={`${
              toggleCheckAnswer ? rpsCSS[computersChoice] : rpsCSS.default
            }`}
          >
            {computersChoice && (
              <img
                src={`/public/images/icon-${computersChoice}.svg`}
                alt={`Computer chose ${computersChoice}`}
              />
            )}
          </div>
        </article>
      </section>

      {/* Rules Modal */}
      <footer>
        <button onClick={openModal} className={rpsCSS.rulesBtn}>
          Rules
        </button>
      </footer>

      {isModalOpen && (
        <dialog open aria-labelledby="rules-title">
          <h1 id="rules-title">Rules</h1>
          <img src="/public/images/image-rules.svg" alt="Game rules" />
          <button onClick={closeModal} aria-label="Close rules">
            ×
          </button>
        </dialog>
      )}
    </div>
  );
};

export default RockPaperScissors;

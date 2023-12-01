import React from "react";
import { useEffect, useState } from "react";
import { Button, Image, Modal } from "react-bootstrap";
import "../Board.css";
import axios from "axios";

import OneGuessBoard from "../Components/OneGuessBoard";
import MastermindHeader from "../Components/MastermindHeader";
import Instruction from "../Components/Instruction";

// Component of the entire game board, the level of a round of game
function Board({ onHandleChange, onGamePageChange, userId }) {
  // Pick a color from color box, and set the currentColor that you want to guess
  const [currentColor, setCurrentColor] = useState("#a3a3a3");
  const colors = ["red", "blue", "green", "yellow", "orange", "purple"];
  function handleColorPick(color) {
    setCurrentColor(color);
  }
  let dislayColor;
  currentColor == "#a3a3a3"
    ? (dislayColor = "You haven't selected yet")
    : (dislayColor = currentColor);

  // Current Active Row (the n chance in which the player is in, can't skip)
  const [currentActiveRow, setCurrentActiveRow] = useState(9);
  function handleSubmit() {
    setCurrentActiveRow(currentActiveRow - 1);
    console.log(colorSequence);
  }

  // Generate a random color sequence (eg: YYRB)
  const [colorSequence, setColorSequence] = useState([]);

  function generateSequence() {
    const sequence = [];
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      sequence.push(colors[randomIndex]);
    }
    setColorSequence(sequence);
    console.log(colorSequence);
  }

  // At the beginning, generate a color sequence
  useEffect(() => {
    generateSequence();
    // console.log(colorSequence);
  }, []);

  const [isReset, setIsReset] = useState(false);

  // When clicking "Play Again", reset the game
  function playAgain() {
    generateSequence(); //generate a new color sequence
    setCurrentColor("#a3a3a3"); //put the selected color to the initial one
    setIsReset(!isReset); //filp isReset so that in OneGuessBoard all the colors filled could be cleared
    setCurrentActiveRow(9); //Roll the game back to the first guess
    setIsWin(false);
  }

  // Win or Lose State
  const [isWin, setIsWin] = useState(false);

  function handleWin() {
    setIsWin(true);
  }

  // Current score
  let score = 10 + currentActiveRow * 10;

  // Current date
  const [currentDate, setCurrentDate] = useState(new Date());

  // Depend on Win, Lose, or in progress, the components to be displayed on the page are different
  let status;
  let instruction;
  if (isWin) {
    status = <p>YOU WIN!</p>;
    instruction = <Image src="smileface.png" roundedCircle />;
  } else if (currentActiveRow < 0) {
    status = <p>YOU LOST!</p>;
    instruction = <Image src="sadface.png" roundedCircle />;
  } else {
    status = <p>You have {currentActiveRow + 1} chances left.</p>;
    instruction = <Instruction />;
  }

  // Pop-up window (Modal) control
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    if (isWin || currentActiveRow < 0) {
      handleShow();
    }
  }, [isWin, currentActiveRow]);

  const handleSaveGame = async () => {
    // Implement save game logic here
    await setCurrentDate(new Date());
    let date = currentDate.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "America/Los_Angeles", // Set the time to be PST
    });
    console.log(date);
    const postData = {
      userId,
      score,
      date,
    };
    try {
      const response = await axios.post(
        "https://mastermind-backend-tiansi.wl.r.appspot.com/game/saveRecord",
        postData
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
    console.log("Game record saved!");
    handleClose();
  };

  return (
    <div className="board-container">
      <MastermindHeader
        onHandleUpdate={onHandleChange}
        onPageUpdate={onGamePageChange}
      />
      <div className="board">
        {/* use bootstrap grid system */}
        <div className="row mt-3">
          {/* Board Area */}
          <div className="col-md-4">
            {Array(10)
              .fill(null)
              .map((row, index) => {
                return (
                  <OneGuessBoard
                    key={index}
                    selectColor={currentColor}
                    isActive={() => index === currentActiveRow}
                    phrase={colorSequence}
                    onRowSubmit={handleSubmit}
                    isReset={isReset}
                    onWin={handleWin}
                  />
                );
              })}
          </div>

          {/* Instruction Area */}
          <div className="col-md-4">
            <div className="instruction-part">{instruction}</div>
            <div className="prompt">{status}</div>
          </div>

          {/* Color Pick Area */}
          <div className="col-md-4">
            <div className="color-pick-section">
              <h2>Choose a Color:</h2>
              <div className="color-pick-box">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    className="color-pick-button"
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorPick(color)}
                  ></button>
                ))}
              </div>
              <p className="select">Selected Color: {dislayColor}</p>
            </div>
          </div>
        </div>

        <div className="play-again">
          <Button className="play-again-button" size="lg" onClick={playAgain}>
            Play Again
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        {/* Remove Modal.Header if you don't want the title */}
        <Modal.Body>
          <p>Your score is {score}</p>
          <p>Do you want to save this game record?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleSaveGame}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Board;

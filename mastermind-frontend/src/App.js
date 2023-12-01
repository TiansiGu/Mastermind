import React from "react";
import { useState } from "react";

import Board from "./Pages/Board";
import StartPage from "./Pages/StartPage";
import GameRecord from "./Pages/GameRecord";
import LoginForm from "./Components/LoginForm";

// Component of the entire game board, the level of a round of game
function App() {
  const [handle, setHandle] = useState("");
  const handleHandle = (name) => {
    setHandle(name);
  };

  const [playerId, setPlayerId] = useState("");
  const handlePlayerId = (id) => {
    setPlayerId(id);
  };

  const [inGame, setInGame] = useState(true);
  const handleInGame = () => {
    setInGame(!inGame);
  };

  return (
    <>
      {/* <LoginForm LoginEvent={HandleLogin} /> */}
      {handle ? (
        inGame ? (
          <Board
            onHandleChange={handleHandle}
            onGamePageChange={handleInGame}
            userId={playerId}
          />
        ) : (
          <GameRecord onGamePageChange={handleInGame} userId={playerId} />
        )
      ) : (
        <StartPage
          onHandleChange={handleHandle}
          onUserIdChange={handlePlayerId}
        />
      )}
    </>
  );
}

export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Board from "./Pages/Board";
import StartPage from "./Pages/StartPage";
import GameRecord from "./Pages/GameRecord";
import Market from "./Pages/Market";

// Component of the entire game board, the level of a round of game
function App() {
  const [handle, setHandle] = useState("");
  const handleHandle = (name) => {
    setHandle(name);
  };

  const [playerId, setPlayerId] = useState("");
  const handlePlayerId = (id) => {
    setPlayerId(id);
    localStorage.setItem("playerId", id);
  };

  const [inGame, setInGame] = useState(true);
  const handleInGame = () => {
    setInGame(!inGame);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <StartPage
              onHandleChange={handleHandle}
              onUserIdChange={handlePlayerId}
            />
          }
        />
        <Route
          path="/play"
          element={
            <Board
              onHandleChange={handleHandle}
              onGamePageChange={handleInGame}
              currentId={playerId}
            />
          }
        />
        <Route
          path="/record"
          element={
            <GameRecord onGamePageChange={handleInGame} currentId={playerId} />
          }
        />
        <Route path="/market" element={<Market currentId={playerId} />} />
      </Routes>
    </Router>

    // <>
    //   {handle ? (
    //     inGame ? (
    //       <Board
    //         onHandleChange={handleHandle}
    //         onGamePageChange={handleInGame}
    //         userId={playerId}
    //       />
    //     ) : (
    //       <GameRecord onGamePageChange={handleInGame} userId={playerId} />
    //     )
    //   ) : (
    //     <StartPage
    //       onHandleChange={handleHandle}
    //       onUserIdChange={handlePlayerId}
    //     />
    //   )}
    // </>
  );
}

export default App;

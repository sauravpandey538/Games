import React from "react";
import TicTacToe from "./TicTacToe";
import GameList from "./GameList";
import Snake from "./Snake";
import { Box, Flex } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<GameList />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/snake" element={<Snake />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

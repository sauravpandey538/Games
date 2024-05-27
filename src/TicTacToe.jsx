import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  ChakraProvider,
  Grid,
  GridItem,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import Home from "./Home";

function TicTacToe() {
  const [value, setValue] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [playerOrderIndex, setPlayerOrderIndex] = useState([]);
  const [winner, setWinner] = useState(null);
  const [winnerLine, setWinnerLine] = useState([]);

  const controls = useAnimation();

  const handleClick = (index) => {
    if (value[index] === null && !winner) {
      const newValue = [...value];
      newValue[index] = player;
      setValue(newValue);

      const newIndex = [...playerOrderIndex];
      newIndex.push(index);
      setPlayerOrderIndex(newIndex);

      if (newIndex.length > 7) {
        const indexToRemove = newIndex.shift(); // Remove the first element
        newValue[indexToRemove] = null;
        setValue(newValue);
      }

      setPlayer(player === "X" ? "O" : "X");
    }
  };

  useEffect(() => {
    const checkWinner = (squares) => {
      const winPossibilities = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let line of winPossibilities) {
        const [a, b, c] = line;
        if (
          squares[a] &&
          squares[a] === squares[b] &&
          squares[a] === squares[c]
        ) {
          setWinnerLine(line);
          return squares[a];
        }
      }
      return null;
    };

    setWinner(checkWinner(value));
  }, [value]);

  useEffect(() => {
    if (winnerLine.length > 0) {
      controls.start({
        scale: [1.2, 1, 1.2],
        transition: { duration: 0.9, repeat: Infinity },
      });
    } else {
      controls.start({ opacity: 1 });
    }
  }, [winnerLine, controls]);

  const resetGame = () => {
    setValue(Array(9).fill(null));
    setPlayer("X");
    setPlayerOrderIndex([]);
    setWinner(null);
    setWinnerLine([]);
    controls.stop();
  };

  return (
    <ChakraProvider>
      <Box textAlign="center" fontSize="xl" p={5} position="relative">
        <Home />
        <Text fontSize="2xl" fontWeight="bold" color={"gray.700"}>
          Tic-Tac-Toe
        </Text>
        <Grid
          templateColumns="repeat(3, 1fr)"
          gap={2}
          maxWidth="200px"
          margin="0 auto"
          position="relative"
        >
          {value.map((cell, index) => (
            <motion.div
              key={index}
              animate={controls}
              initial={{ scale: 1, zIndex: 0 }}
              style={{ width: "60px", height: "60px" }}
            >
              <GridItem
                w="60px"
                h="60px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="1px solid black"
                fontSize="2xl"
                fontWeight={700}
                onClick={() => handleClick(index)}
                cursor="pointer"
                borderRadius={"10px"}
                bg={
                  cell === "X"
                    ? "teal.100"
                    : cell === "O"
                    ? "orange.100"
                    : "white"
                }
              >
                <Text>{cell}</Text>
              </GridItem>
            </motion.div>
          ))}
        </Grid>
        {winner ? (
          <motion.div animate={{ scale: 1.3 }}>
            <Text
              fontSize="xl"
              mt={4}
              w={"100%"}
              px={"15px"}
              color={"gray.700"}
            >
              "{winner}" won the game.
            </Text>
          </motion.div>
        ) : (
          <Text fontSize="xl" mt={4}>
            Next Player: {player}
          </Text>
        )}
        <Button mt={4} onClick={resetGame}>
          Reset Game
        </Button>
      </Box>
    </ChakraProvider>
  );
}

export default TicTacToe;

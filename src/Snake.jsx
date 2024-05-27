import React, { useState, useEffect, useRef } from "react";
import {
  ChakraProvider,
  Box,
  Button,
  Grid,
  Text,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Home from "./Home";
const BOARD_SIZE = 15;
const INITIAL_SNAKE = [{ x: 1, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };

function Snake() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(generateFood);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const boardRef = useRef(null);

  useEffect(() => {
    if (gameOver) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [direction, gameOver]);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [snake, direction, gameOver]);

  function moveSnake() {
    const newSnake = [...snake];
    const head = {
      x: newSnake[0].x + direction.x,
      y: newSnake[0].y + direction.y,
    };

    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= BOARD_SIZE ||
      head.y >= BOARD_SIZE
    ) {
      setGameOver(true);
      return;
    }

    for (let segment of newSnake) {
      if (head.x === segment.x && head.y === segment.y) {
        setGameOver(true);
        return;
      }
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setFood(generateFood);
      setScore(score + 1);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }

  function generateFood() {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
      if (
        !snake.some(
          (segment) => segment.x === newFood.x && segment.y === newFood.y
        )
      ) {
        break;
      }
    }
    return newFood;
  }

  return (
    <ChakraProvider>
      <Box textAlign="center" fontSize="xl" p={5}>
        <Home />

        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Snake Game
        </Text>
        <Text fontSize="lg" mb={4}>
          Score: {score}
        </Text>
        {gameOver ? (
          <Box>
            <Text fontSize="xl" color="red.500">
              Game Over
            </Text>
            <Button mt={4} onClick={() => window.location.reload()}>
              Restart
            </Button>
          </Box>
        ) : (
          <>
            <Grid
              ref={boardRef}
              templateColumns={`repeat(${BOARD_SIZE}, 20px)`}
              templateRows={`repeat(${BOARD_SIZE}, 20px)`}
              gap={1}
              justifyContent="center"
              margin="0 auto"
            >
              {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, i) => {
                const x = i % BOARD_SIZE;
                const y = Math.floor(i / BOARD_SIZE);
                const isSnake = snake.some(
                  (segment) => segment.x === x && segment.y === y
                );
                const isFood = food.x === x && food.y === y;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Box
                      w="20px"
                      h="20px"
                      bg={
                        isSnake ? "green.500" : isFood ? "red.500" : "gray.200"
                      }
                      borderRadius={isFood ? "50%" : "none"}
                    />
                  </motion.div>
                );
              })}
            </Grid>
            <Stack
              direction="row"
              justify="center"
              mt={4}
              spacing={4}
              alignItems={"center"}
            >
              <Button
                onClick={() =>
                  direction.x === 0 && setDirection({ x: -1, y: 0 })
                }
              >
                Left
              </Button>

              <VStack>
                <Button
                  onClick={() =>
                    direction.y === 0 && setDirection({ x: 0, y: -1 })
                  }
                >
                  Up
                </Button>
                <Button
                  onClick={() =>
                    direction.y === 0 && setDirection({ x: 0, y: 1 })
                  }
                >
                  Down
                </Button>
              </VStack>
              <Button
                onClick={() =>
                  direction.x === 0 && setDirection({ x: 1, y: 0 })
                }
              >
                Right
              </Button>
            </Stack>
          </>
        )}
        {!gameOver && (
          <Text mt={4} fontSize="lg">
            Use Arrow Keys or Buttons to Move
          </Text>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default Snake;

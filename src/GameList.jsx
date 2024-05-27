import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Home from "./Home";

function GameList() {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"100vw"}
      h={"100vh"}
    >
      <Flex
        direction="column"
        gap="4"
        shadow={"md"}
        minH={"70vh"}
        minW={"80vw"}
      >
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Link to={"/tictactoe"}>
            <Text
              fontSize={"25px"}
              letterSpacing={4}
              borderBottom={"2px solid gray"}
            >
              GameHub
            </Text>
          </Link>
        </Box>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Link to={"/tictactoe"}>
            <Text>TicTacToe</Text>
          </Link>
        </Box>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Link to={"/snake"}>
            <Text>Snake</Text>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}

export default GameList;

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { IoIosHome } from "react-icons/io";

function Home() {
  return (
    <Link to="/">
      <Button leftIcon={<IoIosHome />}>Home</Button>
    </Link>
  );
}

export default Home;

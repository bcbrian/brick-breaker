import React from "react";
import "./styles.css";

import GameProvider from "./state/context";

import GameContainer from "./components/GameContainer";

export default function App() {
  return (
    <GameProvider>
      <GameContainer />
    </GameProvider>
  );
}

import React, { useContext } from "react";

import "./Score.css";
import { GameContext } from "../../state/context";

export default function Score() {
  const { state } = useContext(GameContext);
  return <div className="score">Score: {state.score}</div>;
}

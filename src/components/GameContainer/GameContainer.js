import React, { useContext } from "react";

import Paddle from "../Paddle";
import Ball from "../Ball";
import Brick from "../Brick";

import { GameContext } from "../../state/context";
import { DIMENSIONS } from "../../utils/constants";

export default function GameContainer() {
  const { state } = useContext(GameContext);

  return (
    <div
      className="container"
      style={{
        width: DIMENSIONS.DEFAULT.WIDTH,
        height: DIMENSIONS.DEFAULT.HEIGHT
      }}
    >
      {state.bricks.map(brick => (
        <Brick {...brick} />
      ))}

      <Paddle paddleX={state.paddle.x} />
      <Ball pos={state.ball} />
    </div>
  );
}

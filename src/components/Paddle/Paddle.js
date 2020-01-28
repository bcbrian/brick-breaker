import React from "react";
import "./Paddle.css";
import { DIMENSIONS } from "../../utils/constants";

export default function Paddle({ paddleX }) {
  return (
    <div
      className="paddle"
      style={{
        left: `${paddleX}px`,
        width: DIMENSIONS.DEFAULT.PADDLE.WIDTH,
        height: DIMENSIONS.DEFAULT.PADDLE.HEIGHT,
        top:
          DIMENSIONS.DEFAULT.HEIGHT -
          (DIMENSIONS.DEFAULT.PADDLE.HEIGHT + DIMENSIONS.DEFAULT.BALL.HEIGHT)
      }}
    />
  );
}

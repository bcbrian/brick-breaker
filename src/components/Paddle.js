import React from "react";
import "./Paddle.css";

export default function Paddle({ paddleX }) {
  return (
    <div
      className="paddle"
      style={{
        left: `${paddleX}px`
        // transform: `translateX(calc(-50% + ${paddleX}px))`
      }}
    />
  );
}

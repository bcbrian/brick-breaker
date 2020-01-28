import React, { useEffect, useState } from "react";
import "./Ball.css";
import { DIMENSIONS } from "../../utils/constants";

export default function Ball({ pos }) {
  return (
    <div
      className="ball"
      style={{
        width: DIMENSIONS.DEFAULT.BALL.WIDTH,
        height: DIMENSIONS.DEFAULT.BALL.HEIGHT,
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transition: pos.isMoving && "top 0.05s ease 0s, left 0.05s ease 0s"
      }}
    />
  );
}

import React from "react";

import "./Brick.css";
import { DIMENSIONS } from "../../utils/constants";

export default function Brick({ type, x, y }) {
  return (
    <div
      className={`brick brick-${type}`}
      style={{
        width: DIMENSIONS.DEFAULT.BRICK.WIDTH,
        height: DIMENSIONS.DEFAULT.BRICK.HEIGHT,
        top: y,
        left: x
      }}
    />
  );
}

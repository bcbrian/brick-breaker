import React, { useEffect, useState } from "react";
import "./Paddle.css";

export default function Paddle() {
  const [paddleX, setPaddleX] = useState(0);
  function handleMouse(e) {
    let boundedX;
    const offset = (window.innerWidth - 300) / 2;
    if (e.x - offset < 0) {
      boundedX = 0;
    } else if (e.x - offset > 200) {
      boundedX = 200;
    } else {
      boundedX = e.x - offset;
    }
    setPaddleX(boundedX);
  }
  useEffect(() => {
    window.addEventListener("mousemove", handleMouse);
  }, []);
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

import React, { useEffect } from "react";
import "./Paddle.css";

export default function Paddle() {
  function handleMouse(e) {
    console.log(e.target, e.x, e.y, e.movementX, e.movementY);
  }
  useEffect(() => {
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);
  return <div className="paddle" />;
}

import React, { useEffect, useReducer } from "react";
import "./styles.css";
import Paddle from "./components/Paddle";
import Ball from "./components/Ball";

const initialState = {
  paddle: {
    x: 0
  },
  ball: {
    x: 0,
    y: 0,
    dx: 5,
    dy: 5
  }
};

function reducer(state, action) {
  switch (action.type) {
    case "MOVE_PADDLE":
      return { ...state, paddle: action.payload };
    case "MOVE_BALL":
      return { ...state, ball: action.payload };
    default:
      throw new Error();
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const handle = setTimeout(() => {
      let dx = state.ball.dx;
      let dy = state.ball.dy;
      if (
        state.ball.x + state.ball.dx > 300 - 20 ||
        state.ball.x + state.ball.dx < 0
      ) {
        dx = -dx;
      }
      if (
        state.ball.y + state.ball.dy > 400 - 20 ||
        state.ball.y + state.ball.dy < 0
      ) {
        dy = -dy;
      }
      if (
        state.ball.y + state.ball.dy > 340 &&
        state.ball.x + state.ball.dx < state.paddle.x + 100 &&
        state.ball.x + state.ball.dx > state.paddle.x
      ) {
        dy = -dy;
        // 5x5 x/pi = m/100 => m*pi/100 = x
        // I have x and its hypot = sqrt(2(5^2)) = sqrt(2)*5
        // dy = 5 sqrt(2) sin (m*pi/100)
        // dx = 5 sqrt(2) sin (pi/2 - m*pi/100)
        // m = state.paddle.x + 100 - state.ball.x + state.ball.dx
        // Math.sin(radians)
        let m = state.paddle.x + 100 - state.ball.x + state.ball.dx;
        let opp = 1;
        if (m > 50) {
          m = 100 - m;
          opp = -1;
        }
        const newDy = 5 * Math.sqrt(2) * Math.sin((m * Math.PI) / 100);
        const newDx =
          opp * 5 * Math.sqrt(2) * Math.sin(Math.PI / 2 - (m * Math.PI) / 100);
        console.log(m, newDy, newDx);
        dy = -newDy;
        dx = newDx;
      }
      dispatch({
        type: "MOVE_BALL",
        payload: {
          dx,
          dy,
          x: state.ball.x + state.ball.dx,
          y: state.ball.y + state.ball.dy
        }
      });
    }, 50);
    return () => clearTimeout(handle);
  }, [state.ball]);

  return (
    <div className="container">
      <Paddle paddleX={state.paddle.x} dispatch={dispatch} />
      <Ball pos={state.ball} />
    </div>
  );
}

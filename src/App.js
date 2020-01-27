import React, { useReducer, useEffect } from "react";
import "./styles.css";
import Paddle from "./components/Paddle";
import Ball from "./components/Ball";
import Brick from "./components/Brick";

const initialState = {
  paddle: {
    x: 0
  },
  ball: {
    x: 50,
    y: 50,
    dx: 5,
    dy: 5
  },
  bricks: [
    {
      top: 0,
      left: 0
    },
    {
      top: 0,
      left: 100
    },
    {
      top: 0,
      left: 200
    }
  ]
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
    dispatch({
      type: "MOVE_PADDLE",
      payload: {
        x: boundedX
      }
    });
  }
  useEffect(() => {
    window.addEventListener("mousemove", handleMouse);
  }, []);

  function willCollide(rect1, rect2) {
    let x = false;
    let y = false;
    let xCurr = false;
    let yCurr = false;
    let collided = false;

    const rect1XNext = rect1.x + rect1.dx;
    const rect1YNext = rect1.y + rect1.dy;

    if (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x) {
      xCurr = true;
    }
    if (rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y) {
      yCurr = true;
    }
    if (
      yCurr &&
      rect1XNext < rect2.x + rect2.width &&
      rect1XNext + rect1.width > rect2.x
    ) {
      x = true;
    }
    if (
      xCurr &&
      rect1YNext < rect2.y + rect2.height &&
      rect1YNext + rect1.height > rect2.y
    ) {
      y = true;
    }
    if (
      rect1XNext < rect2.x + rect2.width &&
      rect1XNext + rect1.width > rect2.x &&
      rect1YNext < rect2.y + rect2.height &&
      rect1YNext + rect1.height > rect2.y
    ) {
      collided = true;
    }
    return { x, y, collided };
  }

  useEffect(() => {
    const handle = setTimeout(() => {
      let x = state.ball.x;
      let y = state.ball.y;
      let dx = state.ball.dx;
      let dy = state.ball.dy;

      let paddleX = state.paddle.x;

      // if (y > 370) {
      //   return dispatch({
      //     type: "MOVE_BALL",
      //     payload: {
      //       dx: 5,
      //       dy: 5,
      //       x: 0,
      //       y: 0
      //     }
      //   });
      // }

      const ball = {
        x,
        dx,
        y,
        dy,
        width: 20,
        height: 20
      };

      const walls = [
        // left
        {
          x: -100,
          y: 0,
          width: 100,
          height: 400
        },
        // right
        {
          x: 300,
          y: 0,
          width: 100,
          height: 400
        },
        // top
        {
          x: 0,
          y: -100,
          width: 300,
          height: 100
        },
        // bottom
        {
          x: 0,
          y: 400,
          width: 300,
          height: 100
        }
      ];

      const wallCollisions = walls.map(wall => {
        return willCollide(ball, wall);
      });

      if (wallCollisions[0].collided || wallCollisions[1].collided) {
        dx = -dx;
      }

      if (wallCollisions[2].collided || wallCollisions[3].collided) {
        dy = -dy;
      }

      const obstacleCols = [
        {
          left: paddleX,
          top: 355
        },
        ...state.bricks
      ].map(ob => {
        return willCollide(ball, {
          width: 100,
          height: 25,
          x: ob.left,
          y: ob.top
        });
      });

      if (obstacleCols.some(obc => obc.y)) {
        dy = -dy;
      }
      if (obstacleCols.some(obc => obc.x)) {
        dx = -dx;
      }

      return dispatch({
        type: "MOVE_BALL",
        payload: {
          dx,
          dy,
          x: x + dx,
          y: y + dy
        }
      });
    }, 50);
    return () => clearTimeout(handle);
  }, [state.ball]);

  return (
    <div className="container">
      {state.bricks.map(brick => (
        <Brick style={brick} />
      ))}

      <Paddle paddleX={state.paddle.x} />
      <Ball pos={state.ball} />
    </div>
  );
}

import { useEffect } from "react";
import willCollide from "../utils/willCollide";
import { DIMENSIONS } from "../utils/constants";

export default function useGameLoop(state, dispatch, actions) {
  useEffect(() => {
    const handle = setTimeout(() => {
      let x = state.ball.x;
      let y = state.ball.y;
      let dx = state.ball.dx;
      let dy = state.ball.dy;
      let isMoving = state.ball.isMoving;

      let paddleX = state.paddle.x;

      if (state.lives < 0) {
        dispatch({ type: actions.GAME_OVER });
        return dispatch({
          type: actions.MOVE_BALL,
          payload: {
            isMoving: false,
            dx: dx,
            dy: dy,
            x:
              paddleX +
              DIMENSIONS.DEFAULT.PADDLE.WIDTH / 2 -
              DIMENSIONS.DEFAULT.BALL.WIDTH / 2,
            y:
              DIMENSIONS.DEFAULT.HEIGHT -
              (DIMENSIONS.DEFAULT.PADDLE.HEIGHT +
                2 * DIMENSIONS.DEFAULT.BALL.HEIGHT)
          }
        });
      }

      if (!isMoving) {
        return dispatch({
          type: actions.MOVE_BALL,
          payload: {
            dx: dx,
            dy: dy,
            x:
              paddleX +
              DIMENSIONS.DEFAULT.PADDLE.WIDTH / 2 -
              DIMENSIONS.DEFAULT.BALL.WIDTH / 2,
            y:
              DIMENSIONS.DEFAULT.HEIGHT -
              (DIMENSIONS.DEFAULT.PADDLE.HEIGHT +
                2 * DIMENSIONS.DEFAULT.BALL.HEIGHT)
          }
        });
      }

      const ball = {
        x,
        dx,
        y,
        dy,
        width: DIMENSIONS.DEFAULT.BALL.WIDTH,
        height: DIMENSIONS.DEFAULT.BALL.HEIGHT
      };

      const collisions = [...state.walls].map(wall => {
        return willCollide(ball, wall);
      });

      if (collisions[3].y) {
        //reset logic
        dispatch({ type: actions.DIE });
        return dispatch({
          type: actions.MOVE_BALL,
          payload: {
            isMoving: false,
            dx: dx,
            dy: dy,
            x:
              paddleX +
              DIMENSIONS.DEFAULT.PADDLE.WIDTH / 2 -
              DIMENSIONS.DEFAULT.BALL.WIDTH / 2,
            y:
              DIMENSIONS.DEFAULT.HEIGHT -
              (DIMENSIONS.DEFAULT.PADDLE.HEIGHT +
                2 * DIMENSIONS.DEFAULT.BALL.HEIGHT)
          }
        });
      }

      if (collisions.some(c => c.x)) {
        dx = -dx;
      }

      if (collisions.some(c => c.y)) {
        dy = -dy;
      }

      const brickCollision = [...state.bricks].map(ob => {
        return willCollide(ball, {
          width: DIMENSIONS.DEFAULT.BRICK.WIDTH,
          height: DIMENSIONS.DEFAULT.BRICK.HEIGHT,
          ...ob
        });
      });
      const yCol = brickCollision.filter(obc => obc.y);
      const xCol = brickCollision.filter(obc => obc.x);

      if (yCol.length) {
        dy = -dy;
        dispatch({
          type: actions.BRICK_COLLISION,
          payload: {
            bricks: yCol
          }
        });
        dispatch({
          type: actions.ADD_SCORE,
          payload: yCol.length * 10
        });
      }
      if (xCol.length) {
        dx = -dx;
        dispatch({
          type: actions.BRICK_COLLISION,
          payload: {
            bricks: xCol
          }
        });
        dispatch({
          type: actions.ADD_SCORE,
          payload: xCol.length * 10
        });
      }

      const paddleCollision = [
        {
          x: paddleX,
          y:
            DIMENSIONS.DEFAULT.HEIGHT -
            (DIMENSIONS.DEFAULT.PADDLE.HEIGHT + DIMENSIONS.DEFAULT.BALL.HEIGHT)
        }
      ].map(paddle => {
        return willCollide(ball, {
          width: DIMENSIONS.DEFAULT.PADDLE.WIDTH,
          height: DIMENSIONS.DEFAULT.PADDLE.HEIGHT,
          ...paddle
        });
      });

      if (paddleCollision.some(obc => obc.y)) {
        dy = -dy;
      }
      if (paddleCollision.some(obc => obc.x)) {
        dx = -dx;
      }

      return dispatch({
        type: actions.MOVE_BALL,
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
}

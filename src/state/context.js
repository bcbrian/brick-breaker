import React, { useReducer } from "react";

import * as actions from "./actions";
import reducer from "./reducer";

import levelOne from "../levels/one";
import useMouse from "../hooks/useMouse";
import useGameLoop from "../hooks/useGameLoop";
import createState from "./createState";
import useKeyboard from "../hooks/useKeyboard";
import { DIMENSIONS } from "../utils/constants";

export const GameContext = React.createContext();

const initialState = createState(levelOne);

export default function GameProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useMouse(x => {
    dispatch({
      type: actions.MOVE_PADDLE,
      payload: {
        x
      }
    });
    !state.ball.isMoving &&
      dispatch({
        type: actions.MOVE_BALL,
        payload: {
          x:
            x +
            DIMENSIONS.DEFAULT.PADDLE.WIDTH / 2 -
            DIMENSIONS.DEFAULT.BALL.WIDTH / 2
        }
      });
  }, state.ball.isMoving);

  useKeyboard(key => {
    if (!state.ball.isMoving && key === " ") {
      dispatch({
        type: actions.PRESS_START,
        payload: {
          isMoving: true
        }
      });
    }
  });

  useGameLoop(state, dispatch, actions);

  const value = { state, dispatch, actions };
  return <GameContext.Provider value={value} {...props} />;
}

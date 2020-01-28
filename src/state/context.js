import React, { useEffect, useReducer } from "react";

import * as actions from "./actions";
import reducer from "./reducer";

import levelOne from "../levels/one";
import useMouse from "../hooks/useMouse";
import useGameLoop from "../hooks/useGameLoop";
import createState from "./createState";

export const GameContext = React.createContext();

const initialState = createState(levelOne);

export default function GameProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useMouse(x =>
    dispatch({
      type: "MOVE_PADDLE",
      payload: {
        x
      }
    })
  );

  useGameLoop(state, dispatch, actions);

  const value = { state, dispatch, actions };
  return <GameContext.Provider value={value} {...props} />;
}

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { DIMENSIONS } from "../../utils/constants";
import { GameContext } from "../../state/context";

export default function HighScores() {
  const {dispatch, actions} = useContext(GameContext);
  const [highScores, setHighScores] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/high-scores")
      .then(res => setHighScores(res.data.highScores));
  }, []);

  return (
    <div
      style={{
        margin: "40px auto",
        width: DIMENSIONS.DEFAULT.WIDTH
      }}
    >
      <button
        style={{
          background: "rebeccapurple",
          padding: "10px 12px 8px",
          borderRadius: "4px",
          color: "#fff"
        }}
        onClick={() => dispatch({
          type: actions.START_GAME,
        })}
      >
        START GAME
      </button>

      <h1>High Scores</h1>
      <ol>
        {highScores.map(({ initials, score }) => (
          <li>
            {initials}: {score}
          </li>
        ))}
      </ol>
    </div>
  );
}

import {
  MOVE_BALL,
  MOVE_PADDLE,
  BRICK_COLLISION,
  PRESS_START,
  ADD_SCORE,
  DIE,
  GAME_OVER,
  START_GAME
} from "./actions";
import levelOne from "../levels/one";
import createState from "./createState";
import axios from "axios";

export default function reducer(state, action) {
  switch (action.type) {
    case START_GAME:
      return createState(levelOne, {
        isPlaying: true,
      });
    case GAME_OVER:
      const initials = prompt("YOUR SCORE WAS: "+ state.score+"\nINITALS PLEASE FOR HIGH SCORE");
      axios.post("http://localhost:5000/api/v1/high-scores",{
        initials,
        score: state.score,
      }).then(res =>console.log(res) )
      // return state;
      return createState(levelOne);
      
    case DIE:
      return { ...state, lives: state.lives - 1 };
    case ADD_SCORE:
      return { ...state, score: state.score + action.payload };
    case MOVE_PADDLE:
      return { ...state, paddle: action.payload };
    case MOVE_BALL:
      return { ...state, ball: { ...state.ball, ...action.payload } };
    case PRESS_START:
      return { ...state, ball: { ...state.ball, ...action.payload } };
    case BRICK_COLLISION:
      const newBricks = state.bricks.reduce((bricks, brick) => {
        if (action.payload.bricks.find(b => b.id === brick.id)) {
          if (brick.type - 1 <= 0) {
            return [...bricks];
          }
          return [
            ...bricks,
            {
              ...brick,
              type: brick.type - 1
            }
          ];
        }
        return [...bricks, brick];
      }, []);

      return {
        ...state,
        bricks: newBricks
      };
    default:
      throw new Error("UNKOWN ACTION:", action.type);
  }
}

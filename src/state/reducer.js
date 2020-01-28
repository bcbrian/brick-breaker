import {
  MOVE_BALL,
  MOVE_PADDLE,
  BRICK_COLLISION,
  PRESS_START
} from "./actions";

export default function reducer(state, action) {
  switch (action.type) {
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

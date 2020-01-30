import makeLevel from "../levels/makeLevel";
import { DIMENSIONS } from "../utils/constants";

export default function createState(level, overrides) {
  return {
    score: 0,
    lives: 3,
    paddle: {
      x: 0
    },
    ball: {
      x: 250,
      y: 250,
      dx: 5,
      dy: 5,
      isMoving: false
    },
    bricks: makeLevel(level),
    walls: [
      // left
      {
        x: -100,
        y: 0,
        width: 100,
        height: DIMENSIONS.DEFAULT.HEIGHT
      },
      // right
      {
        x: DIMENSIONS.DEFAULT.WIDTH,
        y: 0,
        width: 100,
        height: DIMENSIONS.DEFAULT.HEIGHT
      },
      // top
      {
        x: 0,
        y: -100,
        width: DIMENSIONS.DEFAULT.WIDTH,
        height: 100
      },
      // bottom
      {
        x: 0,
        y: DIMENSIONS.DEFAULT.HEIGHT,
        width: DIMENSIONS.DEFAULT.WIDTH,
        height: 100
      }
    ],
    ...overrides
  };
}

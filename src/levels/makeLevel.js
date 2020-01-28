import { DIMENSIONS } from "../utils/constants";

export default function makeLevel(level) {
  console.log(level);
  return level.reduce((bricks, row, y) => {
    return [
      ...bricks,
      ...row.split("").reduce((row, brick, x) => {
        if (brick === " ") {
          return [...row];
        }
        return [
          ...row,
          {
            id: `${x},${y}`,
            type: brick,
            x: DIMENSIONS.DEFAULT.BRICK.WIDTH * x,
            y: DIMENSIONS.DEFAULT.BRICK.HEIGHT * y
          }
        ];
      }, [])
    ];
  }, []);
}

import { newGame, gameOver, switchGamer, winner, makeMove } from "./actions";
import { hasWon, isDraw } from "./helper";
import { Gamer, Board } from "./types";
import { Dispatch } from "redux";

const checkWinner = (board: Board, gamer: Gamer) => (dispatch: Dispatch) => {
  let hasWinner = true;
  if (hasWon(board, gamer)) {
    dispatch(winner(gamer));
    dispatch(gameOver());
  } else if (isDraw(board)) {
    dispatch(winner(0));
    dispatch(gameOver());
  } else {
    hasWinner = false;
  }
  return hasWinner;
};

const playTurn = (gamer: Gamer, row: number, col: number) => (
  dispatch: Dispatch
) => {
  let nextGamer: Gamer;

  switch (gamer) {
    case 1:
      nextGamer = 2;
      break;
    case 2:
      nextGamer = 1;
      break;
    default:
      break;
  }
  dispatch(makeMove(gamer, row, col));
  dispatch(switchGamer(nextGamer));
};

export { newGame, checkWinner, playTurn };

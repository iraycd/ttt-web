import { combineReducers } from "redux";

import * as types from "./types";

const emptyBoard = (): types.Board => [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

const boardMove = (board: types.Board, { gamer, row, col }: types.Move) => {
  const updated = board.slice();
  updated[row][col] = gamer;
  return updated;
};

export type BoardActionTypes = types.NewGameAction | types.MakeMoveAction;
const boardReducer = (
  state: Array<Array<types.Gamer>> = [[]],
  action: BoardActionTypes
) => {
  switch (action.type) {
    case types.NEW_GAME:
      return emptyBoard();
    case types.BOARD_MOVE:
      return boardMove(state, action.payload);
    default:
      return state;
  }
};

export type GaveOverActionTypes =
  | types.NewGameAction
  | types.GameOverAction
  | types.WinnerAction;
const gameOverReducer = (state = false, action: GaveOverActionTypes) => {
  switch (action.type) {
    case types.NEW_GAME:
      return false;
    case types.GAME_OVER:
      return true;
    case types.WINNER:
      return true;
    default:
      return state;
  }
};

export type WinnerActionTypes = types.WinnerAction | types.NewGameAction;
const winnerReducer = (state = -1, action: WinnerActionTypes) => {
  switch (action.type) {
    case types.WINNER:
      return action.payload;
    case types.NEW_GAME:
      return -1;
    default:
      return state;
  }
};

export type GamerActionTypes = types.ChangeGamerAction | types.NewGameAction;
const gamerReducer = (state = 1, action: GamerActionTypes) => {
  switch (action.type) {
    case types.GAMER:
      return action.payload;
    case types.NEW_GAME:
      return 1;
    default:
      return state;
  }
};

export default combineReducers({
  board: boardReducer,
  gameOver: gameOverReducer,
  winner: winnerReducer,
  gamer: gamerReducer
});

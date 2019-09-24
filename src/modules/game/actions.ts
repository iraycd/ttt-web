import * as types from "./types";

const newGame = (): types.NewGameAction => ({
  type: types.NEW_GAME
});

const gameOver = (): types.GameOverAction => ({
  type: types.GAME_OVER
});

const makeMove = (
  gamer: types.Gamer,
  row: number,
  col: number
): types.MakeMoveAction => ({
  type: types.BOARD_MOVE,
  payload: { gamer, row, col }
});

const switchGamer = (gamer: types.Gamer): types.ChangeGamerAction => ({
  type: types.GAMER,
  payload: gamer
});

const winner = (gamer: types.Gamer): types.WinnerAction => ({
  type: types.WINNER,
  payload: gamer
});

export { newGame, gameOver, makeMove, switchGamer, winner };

export const NEW_GAME = "NEW_GAME";
export const GAME_OVER = "GAME_OVER";
export const BOARD_MOVE = "BOARD_MOVE";
export const GAMER = "GAMER";
export const WINNER = "WINNER";

export type Gamer = 0 | 1 | 2;
export type Board = Array<Array<0 | 1 | 2>>;

export interface Move {
  gamer: Gamer;
  row: number;
  col: number;
}

export interface NewGameAction {
  type: typeof NEW_GAME;
}

export interface GameOverAction {
  type: typeof GAME_OVER;
}

export interface MakeMoveAction {
  type: typeof BOARD_MOVE;
  payload: Move;
}

export interface ChangeGamerAction {
  type: typeof GAMER;
  payload: Gamer;
}

export interface WinnerAction {
  type: typeof WINNER;
  payload: Gamer;
}

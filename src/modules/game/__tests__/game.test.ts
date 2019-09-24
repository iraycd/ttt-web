import reducer from "../reducers";
import * as actions from "../actions";
import * as operations from "../operations";
import { Board } from "../types";

describe("Game Duck", () => {
  const emptyBoard: Board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

  const drawBoard: Board = [[2, 2, 1], [1, 1, 2], [2, 1, 1]];

  const gamer1WinBoard: Board = [[2, 2, 0], [1, 1, 1], [2, 2, 0]];

  describe("Module Tests", () => {
    it("Initial state must be present", () => {
      const expectedState = {
        board: [new Array<[]>(0)],
        gameOver: false,
        gamer: 1,
        winner: -1
      };

      const action = { type: "NOT_A_GAME_TYPE" };
      const result = reducer(undefined, action);

      expect(result).toEqual(expectedState);
    });

    it("Start a new game", () => {
      const state = {
        board: emptyBoard,
        gameOver: true,
        gamer: 1,
        winner: -1
      };

      const expectedState = {
        board: emptyBoard.slice(),
        gameOver: false,
        gamer: 1,
        winner: -1
      };

      const action = actions.newGame();
      const result = reducer(state, action);

      expect(result).toEqual(expectedState);
    });

    it("End a game", () => {
      const state = {
        board: emptyBoard,
        gameOver: false,
        gamer: 1,
        winner: -1
      };

      const expectedState = {
        board: emptyBoard,
        gameOver: true,
        gamer: 1,
        winner: -1
      };

      const action = actions.gameOver();
      const result = reducer(state, action);

      expect(result).toEqual(expectedState);
    });

    it("Update the board when a gamer makes a move", () => {
      const state = {
        board: emptyBoard,
        gameOver: false,
        gamer: 1,
        winner: -1
      };

      const expectedState = {
        board: [[0, 0, 0], [0, 0, 0], [0, 0, 1]],
        gameOver: false,
        gamer: 1,
        winner: -1
      };

      const gamer = 1;
      const row = 2;
      const col = 2;

      const action = actions.makeMove(gamer, row, col);
      const result = reducer(state, action);

      expect(result).toEqual(expectedState);
    });

    it("Win a game", () => {
      const state = {
        board: gamer1WinBoard,
        gameOver: false,
        gamer: 1,
        winner: -1
      };

      const expectedState = {
        board: gamer1WinBoard,
        gameOver: true,
        gamer: 1,
        winner: 1
      };

      const action = actions.winner(1);
      const result = reducer(state, action);

      expect(result).toEqual(expectedState);
    });

    it("Switch gamers", () => {
      const state = {
        board: emptyBoard,
        gameOver: false,
        gamer: 1,
        winner: -1
      };

      const expectedState = {
        board: emptyBoard,
        gameOver: false,
        gamer: 2,
        winner: -1
      };

      const action = actions.switchGamer(2);
      const result = reducer(state, action);

      expect(result).toEqual(expectedState);

      const state2 = Object.assign({}, expectedState);

      const expectedState2 = {
        board: emptyBoard,
        gameOver: false,
        gamer: 1,
        winner: -1
      };

      const action2 = actions.switchGamer(1);
      const result2 = reducer(state2, action2);

      expect(result2).toEqual(expectedState2);
    });
  });

  describe("Operations", () => {
    const { checkWinner, playTurn } = operations;

    it("Dispatch a winner", () => {
      const dispatch = jest.fn();
      const board = gamer1WinBoard;
      const gamer = 1;

      const winnerAction = actions.winner(1);
      const gameOverAction = actions.gameOver();

      const winner = checkWinner(board, gamer)(dispatch);

      expect(winner).toBe(true);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch.mock.calls[0][0]).toEqual(winnerAction);
      expect(dispatch.mock.calls[1][0]).toEqual(gameOverAction);
    });

    it("Dispatch a draw", () => {
      const dispatch = jest.fn();
      const board = drawBoard;
      const gamer = 1;

      const winnerAction = actions.winner(0);
      const gameOverAction = actions.gameOver();

      const winner = checkWinner(board, gamer)(dispatch);

      expect(winner).toBe(true);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch.mock.calls[0][0]).toEqual(winnerAction);
      expect(dispatch.mock.calls[1][0]).toEqual(gameOverAction);
    });

    it("Dispatch if game is in progress", () => {
      const dispatch = jest.fn();
      const board = emptyBoard;
      const gamer = 1;

      const winner = checkWinner(board, gamer)(dispatch);

      expect(winner).toBe(false);
      expect(dispatch).not.toHaveBeenCalled();
    });

    it("Play a turn", () => {
      const dispatch = jest.fn();

      const gamer1 = 1;
      let row = 0;
      let col = 0;

      const move1 = actions.makeMove(gamer1, row, col);
      const switch1 = actions.switchGamer(2);

      playTurn(gamer1, row, col)(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch.mock.calls[0][0]).toEqual(move1);
      expect(dispatch.mock.calls[1][0]).toEqual(switch1);

      const gamer2 = 2;
      row = 1;
      col = 1;

      const move2 = actions.makeMove(gamer2, row, col);
      const switch2 = actions.switchGamer(1);

      playTurn(gamer2, row, col)(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(4);
      expect(dispatch.mock.calls[2][0]).toEqual(move2);
      expect(dispatch.mock.calls[3][0]).toEqual(switch2);
    });
  });
});

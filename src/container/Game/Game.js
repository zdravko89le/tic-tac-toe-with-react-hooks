import React, { useReducer, useEffect } from 'react';
import { mapValues, reduce, map, countBy } from 'lodash';

import classes from './styles/Game.module.css';

import Table from "../Table/Table";
import { PlayersInfo } from "../PlayersInfo/PlayersInfo";

import { useGameLogic, checkGameStatus, getWinnerName } from "./GameLogic";

const Game = () => {

  const initState = {
    firstPlayer: '',
    secondPlayer: '',
    table: {
      0: null, // x - o
      1: null,
      2: null,

      3: null,
      4: null,
      5: null,

      6: null,
      7: null,
      8: null
    },
    play: false,
    turn: null,
    win: null,
    lose: null,
    drow: null,
    winningStreak: null
  };

  const [state, dispatch] = useGameLogic(initState);

  const setFieldValue = (fieldNumber, turn) => {
    if (state.table[fieldNumber] || !state.play)
      return;

    dispatch({type:"MAKE_MOVE", field: fieldNumber, value: turn});
  }

  useEffect(() => {
    document.title = state.firstPlayer !== '' || state.secondPlayer !== '' ? 
    state.firstPlayer + ' vs ' + state.secondPlayer : 
    'XO';
  }, [state.firstPlayer, state.secondPlayer]);

  useEffect(() => {
    const gameStatus = checkGameStatus(state.table);

    if (gameStatus.end) {
      dispatch({
        type:"END",
        win: gameStatus.win,
        lose: gameStatus.lose,
        winningStreak: gameStatus.winningStreak
      });
    }

  }, [state.table])

  return(
    <>
      <PlayersInfo
        play={state.play}
        firstPlayer={state.firstPlayer}
        secondPlayer={state.secondPlayer}
        setPlayerName={dispatch}
        startGame={()=>{dispatch({type:"START"})}}
        endGame={()=>{dispatch({type:"END", initState})}}
      />
      {state.win ? (<h1>{`Winner is ${getWinnerName(state, state.win)}`}</h1>): null}
      {state.draw ? <h1>It is draw!</h1>: null}
      <Table 
        table={state.table} 
        turn={state.turn}
        setFieldValue={setFieldValue}
      />
    </>
  )
}

export default Game;
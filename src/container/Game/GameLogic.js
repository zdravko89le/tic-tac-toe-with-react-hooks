import React, { useReducer, useEffect } from 'react';
import { mapValues, reduce, map, countBy } from 'lodash';

export const checkGameStatus = (table) => {
  // console.log('game status', table);
  console.log('three in row 0-1-2 or 0-3-6 or 0-4-8 2-4-6');

  const transformedState = reduce(table, (acc, v, k)=> {
    // console.log(acc, k, v);
    // ROW
    if (k < 3)
      acc.firstRow.push(v);
    if (k > 2 && k < 6)
      acc.secondRow.push(v);
    if (k > 5)
      acc.thirdRow.push(v);

    // COLUMN
    if ((k+1) % 3 == 1)
      acc.firstColumn.push(v);
    if ((k+1) % 3 == 2)
      acc.secondColumn.push(v);
    if ((k+1) % 3 == 0)
      acc.thirdColumn.push(v);

    // DIAGONAL
    if (k==0 || k==4 || k==8)
      acc.firstDiagonal.push(v);    
    if (k==2 || k==4 || k==6)
      acc.secondDiagonal.push(v);
    

    return acc;
  }, {
    firstRow:[],
    secondRow:[],
    thirdRow:[],
    firstColumn:[],
    secondColumn:[],
    thirdColumn:[],
    firstDiagonal:[],
    secondDiagonal:[]
  });

  const status = reduce(transformedState, (acc, v, k) => { 
    let count = countBy(v);

    acc[k] = {
      'x': count.x,
      'o': count.o
    }

    if (count.x === 3) {
      acc.end = true;
      acc.win = 'x';
      acc.lose = 'o';
      acc.winningStreak = k
    }    

    if (count.o === 3) {
      acc.end = true;
      acc.win = 'o';
      acc.lose = 'x';
      acc.winningStreak = k
    }

    return acc;    
  }, {
    end: false,
    win: null,
    lose: null,
    winningStreak: null
  });

  return status;
}

export const useGameLogic = (initState) => {

  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "START":
          if (!state.firstPlayer || !state.secondPlayer)
            return {...state};
          return {
            ...initState,
            firstPlayer: state.firstPlayer,
            secondPlayer: state.secondPlayer,
            play: true,
            turn: 'x'
          };
        case "END":
          return {
            ...state,
            win: action.win,
            lose: action.lose,
            winningStreak: action.winningStreak,
            play: false
          }
        case "CHANGE_TURN":
          return {
            ...state,
            turn: state.turn === 'x' ? 'o' : 'x' 
          }
        case "SET_FIRST_PLAYER":
          return {
            ...state,
            firstPlayer: action.value
          };
        case "SET_SECOND_PLAYER":
          return {
            ...state,
            secondPlayer: action.value
          }
        case "MAKE_MOVE":
          const count = countBy(state.table, v => { if (v==='x' || v==='o') return 'count' });
          return {
            ...state,
            table: {
              ...state.table,
              [action.field]: action.value
            },
            turn: state.turn === 'x' ? 'o' : 'x',
            draw: count.count === 8 ? true : false,
            play: count.count === 8 ? false : true
          }
        default:
          return state;
      }
    },
    initState
  );

  return [state, dispatch]
}

export const getWinnerName = ({firstPlayer, secondPlayer}, sign) => {
  const winner = sign === 'x' ? firstPlayer : secondPlayer;
  return winner;
}

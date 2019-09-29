import React, { useState, useEffect } from 'react';

import { Button, Input } from 'semantic-ui-react'

// css module
import classes from './styles/PlayersInfo.module.css';

const PlayersInfo = (
  { firstPlayer,
    secondPlayer,
    setPlayerName,
    play,
    startGame,
    endGame
  }) => {
  const width = useWindowWidth();
  
  // const [firstPlayer, setFirstPlayer] = useState('');
  // const firstPlayer = useFormInput('');
  // const [secondPlayer, setsecondPlayer] = useState('');

  // const handleFirstPlayerChange = (e) => {
  //   setFirstPlayer(e.target.value);
  // }
  // const handleSecondPlayerChange = (e) => {
  //   setsecondPlayer(e.target.value);
  // }

  // useEffect(() => {
  //   // console.log('updating');
  //   document.title = firstPlayer != '' || secondPlayer != '' ? firstPlayer + ' vs ' + secondPlayer : 'XO';
  // });

  return (
    <div className={classes.Holder}>
      <div className={classes.CardHolder}>
        {/* {width} */}
        <Input
          placeholder='first player'
          value={ firstPlayer }
          onChange={ (e)=>{setPlayerName({type: 'SET_FIRST_PLAYER', value: e.target.value})}  }
        />
      </div>
      <div className={[classes.CardHolder, classes.CardButtonHolder].join(' ')}>
        { !play ?
         <Button primary
          onClick={startGame}> START </Button>
         :
         <Button secundary="true"
         onClick={endGame}> END </Button>
        }
      </div>
      <div className={classes.CardHolder}>
        <Input 
          placeholder='second player' 
          value={secondPlayer}
          onChange={ (e)=>{setPlayerName({type: 'SET_SECOND_PLAYER', value: e.target.value})} }
          // onChange={handleSecondPlayerChange}
        />
      </div>
    </div>
  )
}

// function for calculating screen widht
const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    console.log('width', width);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  })

  return width;
}

const useFormInput = (initValue) => {
  const [value, setValue] = useState(initValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange
  }
}

export { PlayersInfo, useWindowWidth, useFormInput };
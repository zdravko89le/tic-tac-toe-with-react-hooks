import React from 'react';

import classes from './styles/Field.module.css';

const Field = ( { handleEnterEvent, handleFieldClick, value } ) => {
  // console.log(props);
  return (
    <div className={classes.Field}
      onMouseEnter={handleEnterEvent}
      onClick={handleFieldClick}
    >
      {value}
    </div>
  )
}

export default Field;
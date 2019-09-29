import React, { useState, useEffect } from 'react';

import classes from './styles/Table.module.css';

import Field from '../../component/Field/Field';

const Table = ( { table, turn, setFieldValue  } ) => {

  const handleEnterEvent = (fieldNumber) => {
    // console.log(table);
  }
  
  return (
    <div className={classes.TableContainer}>
      <div className={classes.TableHolder}>
        <div className={classes.TableRow}>
          <Field handleFieldClick={() => setFieldValue('0', turn)} value={table[0]}/>
          <Field handleFieldClick={() => setFieldValue('1', turn)} value={table[1]}/>
          <Field handleFieldClick={() => setFieldValue('2', turn)} value={table[2]}/>
        </div>
        <div className={classes.TableRow}>
          <Field handleFieldClick={() => setFieldValue('3', turn)} value={table[3]}/>
          <Field handleFieldClick={() => setFieldValue('4', turn)} value={table[4]}/>
          <Field handleFieldClick={() => setFieldValue('5', turn)} value={table[5]}/>
        </div>
        <div className={classes.TableRow}>
          <Field handleFieldClick={() => setFieldValue('6', turn)} value={table[6]}/>
          <Field handleFieldClick={() => setFieldValue('7', turn)} value={table[7]}/>
          <Field handleFieldClick={() => setFieldValue('8', turn)} value={table[8]}/>
        </div>
      </div>
    </div>
  )
}

export default Table;
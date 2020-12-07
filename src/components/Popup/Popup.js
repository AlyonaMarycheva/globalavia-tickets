import React from 'react';
import classes from './Popup.module.css';

import Input from '../../UI/Input/Input'

export const Popup = () => {
   
  return (
    <div className={classes.popup}>
      <div className={classes.container}>
        <div className={classes.header}>Редактирование рейса</div>
          <div className={classes.item}>
            <Input placeholder="Откуда" />
          </div>
        <div className={classes.dateTime}>
        <div className={classes.firstInput}>           
          <Input type="date" />
        </div>
          <Input type="time" />
        </div>
        <div className={classes.item}>
          <Input placeholder="Куда"/>
        </div>
        <div className={classes.dateTime}>
        <div className={classes.firstInput}> 
          <Input type="date" />
        </div>
          <Input type="time"/>
        </div>
        <div className={classes.item}>
        
          <Input placeholder="Цена"/>   
        </div>
        <button>отправить</button>
        </div>
    </div>
  )

}
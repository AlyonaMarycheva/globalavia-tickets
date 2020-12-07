import React from 'react';
import classes from './Popup.module.css';

import Input from '../../UI/Input/Input'

export const Popup = () => {
   
  return (
    <div className={classes.popup}>
      <div className={classes.container}>
<<<<<<< HEAD
        <div className={classes.header}>Редактирование рейса</div>
=======
        <div className={classes.header}>Создание рейса</div>
>>>>>>> f37f01b0b034be3c9878818e649e78a2a1b85fd5
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
          <button>Создать рейс</button>
        </div>
    </div>
  )

}
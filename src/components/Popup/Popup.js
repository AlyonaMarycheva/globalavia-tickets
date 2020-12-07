import React, { useState } from 'react';
import classes from './Popup.module.css';

import Input from '../../UI/Input/Input'

export const Popup = () => {
  const [ fromPoint, setFromPoint ] = useState('');
  const [ toPoint, setToPoint ] = useState('');
  const [ arrivalDate, setArrivalDate ] = useState('');
  const [ departureDate, setDepartureDate ] = useState('');
  const [ lowPrice, setLowPrice ] = useState('');
  const [ highPrice, setHighPrice ] = useState('');

  const changeFromPointHandler = (e) => {
    setFromPoint(e.target.value);
  };

  const changeToPointHandler = (e) => {
    setToPoint(e.target.value);
  };

  const changeArrivalDateHandler = (e) => {
    setArrivalDate(e.target.value);
  };

  const changeDepartureDateHandler = (e) => {
    setDepartureDate (e.target.value);
  };

  const changeLowPriceHandler = (e) => {
    setLowPrice(e.target.value);
  };

  const changeHighPriceHandler = (e) => {
    setHighPrice (e.target.value);
  };

  return (
    <div className={classes.popup}>
      <div className={classes.container}>
        <div className={classes.header}>Создание рейса</div>
          <div className={classes.item}>
            <Input 
              value={fromPoint} 
              changed={changeFromPointHandler}
              placeholder="Откуда" />
          </div>
        <div className={classes.dateTime}>
          <div className={classes.firstInput}>           
            <Input 
              value={arrivalDate} 
              changed={changeArrivalDateHandler}
              type="date" />
          </div>
          <Input 
            type="time" />
        </div>
        <div className={classes.item}>
          <Input 
            value={toPoint} 
            changed={changeToPointHandler}
            placeholder="Куда"/>
        </div>
        <div className={classes.dateTime}>
          <div className={classes.firstInput}> 
            <Input 
              type="date" 
              value={departureDate} 
              changed={changeDepartureDateHandler}/>
          </div>
          <Input type="time"/>
        </div>
        <div className={classes.item}>
          <Input 
            type="number"
            placeholder="Цена комфорт+"
            value={highPrice} 
            changed={changeHighPriceHandler}
            />   
        </div>
        <div className={classes.item}>
          <Input 
            type="number"
            placeholder="Цена эконом"
            value={lowPrice} 
            changed={changeLowPriceHandler}
            />   
        </div>
          <button>Создать рейс</button>
        </div>
    </div>
  )

}
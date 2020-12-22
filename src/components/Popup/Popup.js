import React, { useState } from 'react';
import classes from './Popup.module.css';

import Input from '../../UI/Input/Input'

export const Popup = ({setIsOpen, routes, setRoutes}) => {
  const [ fromPoint, setFromPoint ] = useState('');
  const [ toPoint, setToPoint ] = useState('');
  const [ arrivalDate, setArrivalDate ] = useState('');
  const [ departureDate, setDepartureDate ] = useState('');
  const [ lowPrice, setLowPrice ] = useState('');
  const [ highPrice, setHighPrice ] = useState('');

  const addRoute = (event) => {
    event.preventDefault();
    const routeObject = {
      departureCityId : 5,
      arrivalCityId : 2,
      departureDate : "2020-12-17 09:00",
      arrivalDate : "2020-12-24 12:25",
      Prices : [8756, 10653]
};
    setRoutes(routes.concat(routeObject));
    closePopup();
  }

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
  const closePopup = () => {
    setIsOpen(false);
    // setEditedUser(null);
  }

  return (
    <div>
     <div className={classes.backdrop} onClick={closePopup}></div>
      <div className={classes.popup}>
        <div className={classes.header}>Создание рейса
        <button className={classes.closeButton} onClick={closePopup}>×</button>
        </div>
        <form className={classes.content} onSubmit={addRoute}>
          <div className={classes.item}>
              <Input 
                value={fromPoint} 
                changed={changeFromPointHandler}
                placeholder="Откуда" />
          </div>

          <div className={classes.item}>
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
          </div>

          <div className={classes.item}>
            <Input 
              value={toPoint} 
              changed={changeToPointHandler}
              placeholder="Куда"/>
          </div>

          <div className={classes.item}>
            <div className={classes.dateTime}>
              <div className={classes.firstInput}> 
                <Input 
                  type="date" 
                  value={departureDate} 
                  changed={changeDepartureDateHandler}/>
              </div>
              <Input type="time"/>
            </div>
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
            <button type="submit" className={classes.button}>Создать рейс</button>
        </form>
      </div>  
    </div>
    
  )

}
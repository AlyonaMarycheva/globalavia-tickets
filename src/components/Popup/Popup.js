import React, { useEffect, useState } from 'react';
import classes from './Popup.module.css';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Select from '../../UI/Select/Select';
import axios from 'axios';

export const Popup = ({ type, setIsOpen, routes, setRoutes, cities, flightId }) => {
  const [ fromPointId, setFromPointId ] = useState('');
  const [ toPointId, setToPointId ] = useState('');
  const [ arrivalDate, setArrivalDate ] = useState('');
  const [ arrivalTime, setArrivalTime ] = useState('');
  const [ departureDate, setDepartureDate ] = useState('');
  const [ departureTime, setDepartureTime ] = useState('');
  const [ lowPrice, setLowPrice ] = useState('');
  const [ highPrice, setHighPrice ] = useState('');

  useEffect(() => {
    if (type === 'edit') {
      axios
        .get(`https://globalaviaapi.azurewebsites.net/operator/flights/${flightId}`)
        .then(({ data }) => {
          const [ arDate, arTime ] = data.arrivalDate.split('T');
          const [ depDate, depTime ] = data.departureDate.split('T');
          setArrivalDate(arDate);
          setArrivalTime(arTime.slice(0, 5));
          setDepartureTime(depTime.slice(0, 5));
          setDepartureDate(depDate);
          setFromPointId(data.departureCityId);
          setToPointId(data.arrivalCityId);
        });
    }
  }, [])
  

  const createFlight = (event) => {
    event.preventDefault();
    const newFlight = {
      departureCityId : fromPointId,
      arrivalCityId : toPointId,
      departureDate : departureDate + 'T' + departureTime,
      arrivalDate : arrivalDate + 'T' + arrivalTime,
      Prices : [lowPrice, highPrice]
    };

    axios
      .post('https://globalaviaapi.azurewebsites.net/operator/flights', newFlight)
      .then(res => {
        const [ fromCity ] = cities.filter(c => c.id === +newFlight.departureCityId);
        const [ toCity ] = cities.filter(c => c.id === +newFlight.arrivalCityId);
    
        setRoutes(routes.concat({
          id: res.data.Id,
          departureCity: fromCity.name,
          arrivalCity: toCity.name,
          departureDate: newFlight.departureDate,
          arrivalDate: newFlight.arrivalDate,
          price: newFlight.Prices[0]
        }));
        alert(`Рейс ${fromCity.name}-${toCity.name} был успешно добавлен.`);
      })
      .catch(error => {
        alert('Произошла непредвиденная ошибка.')
      });

    closePopup();
  }

  const changeFromPointHandler = (e) => {
    setFromPointId(e.target.value);
  };

  const changeToPointHandler = (e) => {
    setToPointId(e.target.value);
  };

  const changeArrivalDateHandler = (e) => {
    setArrivalDate(e.target.value);
  };

  const changeDepartureDateHandler = (e) => {
    setDepartureDate(e.target.value);
  };

  const changeDepartureTimeHandler = (e) => {
    setDepartureTime(e.target.value);
  };

  const changeArrivalTimeHandler = (e) => {
    setArrivalTime(e.target.value);
  };

  const changeLowPriceHandler = (e) => {
    setLowPrice(+e.target.value);
  };

  const changeHighPriceHandler = (e) => {
    setHighPrice (+e.target.value);
  };
  const closePopup = () => {
    setIsOpen(false);
  }

  return (
    <div>
     <div className={classes.backdrop} onClick={closePopup}></div>
      <div className={classes.popup}>
        <div className={classes.header}>
          {type === 'create'
            ? 'Создание рейса'
            : 'Изменение рейса'
          }
        <button className={classes.closeButton} onClick={closePopup}>×</button>
        </div>
        <form className={classes.content} onSubmit={createFlight}>
          <div className={classes.item}>
              <Select
                value={toPointId}
                options={cities} 
                onChange={changeFromPointHandler}
                placeholder="Откуда"
                required />
          </div>

          <div className={classes.item}>
            <div className={classes.dateTime}>
              <div className={classes.firstInput}>           
                <Input 
                  value={arrivalDate} 
                  changed={changeArrivalDateHandler}
                  type="date"
                  required />
              </div>
              <Input
                value={arrivalTime}
                changed={changeDepartureTimeHandler}
                type="time"
                required />
            </div>
          </div>

          <div className={classes.item}>
            <Select
              value={fromPointId}
              options={cities}
              onChange={changeToPointHandler}
              placeholder="Куда"
              required/>
          </div>

          <div className={classes.item}>
            <div className={classes.dateTime}>
              <div className={classes.firstInput}> 
                <Input 
                  type="date" 
                  value={departureDate} 
                  changed={changeDepartureDateHandler}
                  required />
              </div>
              <Input value={departureTime} changed={changeArrivalTimeHandler} type="time" required />
            </div>
          </div>
          <div className={classes.item}>
            <Input
              value={departureTime}
              type="number"
              placeholder="Цена комфорт+"
              value={highPrice} 
              changed={changeHighPriceHandler}
              required
              />   
          </div>
          <div className={classes.item}>
            <Input 
              type="number"
              placeholder="Цена эконом"
              value={lowPrice} 
              changed={changeLowPriceHandler}
              required
              />   
          </div>
            <Button type="submit" text='Создать рейс' className={classes.button} />
        </form>
      </div>  
    </div>
    
  )

}
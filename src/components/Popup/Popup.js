import React, { useEffect, useState } from 'react';
import classes from './Popup.module.css';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Select from '../../UI/Select/Select';
import axios from 'axios';

export const Popup = ({ editingFlightId, setEditingFlightId, setIsOpen, routes, setRoutes, cities}) => {
  console.log(editingFlightId)
  const [ fromPointId, setFromPointId ] = useState('');
  const [ toPointId, setToPointId ] = useState('');
  const [ arrivalDate, setArrivalDate ] = useState('');
  const [ arrivalTime, setArrivalTime ] = useState('');
  const [ departureDate, setDepartureDate ] = useState('');
  const [ departureTime, setDepartureTime ] = useState('');
  const [ lowPrice, setLowPrice ] = useState('');
  const [ highPrice, setHighPrice ] = useState('');

  useEffect(() => {
    if (editingFlightId) 
      axios
        .get(`https://globalaviaapi.azurewebsites.net/operator/flights/${editingFlightId}`)
        .then(({ data }) => {
          console.log(data)
          const [ arDate, arTime ] = data.arrivalDate.split('T');
          const [ depDate, depTime ] = data.departureDate.split('T');
          setArrivalDate(arDate);
          setArrivalTime(arTime.slice(0, 5));
          setDepartureTime(depTime.slice(0, 5));
          setDepartureDate(depDate);
          setFromPointId(data.departureCityId);
          setToPointId(data.arrivalCityId);
          setLowPrice(data.prices[0]);
          setHighPrice(data.prices[1]);
        });
  }, [])
  

  const createFlight = (event) => {
    event.preventDefault();
    const newFlight = {
      departureCityId : fromPointId,
      arrivalCityId : toPointId,
      departureDate : departureDate + 'T' + departureTime,
      arrivalDate : arrivalDate + 'T' + arrivalTime,
      prices : [lowPrice, highPrice]
    };

    axios
      .post('https://globalaviaapi.azurewebsites.net/operator/flights', newFlight)
      .then(res => {
        console.log('creation response', res)
        const [ fromCity ] = cities.filter(c => c.id === +newFlight.departureCityId);
        const [ toCity ] = cities.filter(c => c.id === +newFlight.arrivalCityId);
    
        setRoutes(routes.concat({
          id: res.data.Id,
          departureCity: fromCity.name,
          arrivalCity: toCity.name,
          departureDate: newFlight.departureDate,
          arrivalDate: newFlight.arrivalDate,
          prices: newFlight.prices
        }));
        alert(`Рейс ${fromCity.name}-${toCity.name} был успешно добавлен.`);
      })
      .catch(error => {
        alert('Произошла непредвиденная ошибка.')
      });
    if (editingFlightId)
      setEditingFlightId(null);
    closePopup();
  }

  const editFlight = (event) => {
    event.preventDefault();
    const editedFlight = {
      departureCityId : fromPointId,
      arrivalCityId : toPointId,
      departureDate : departureDate + 'T' + departureTime,
      arrivalDate : arrivalDate + 'T' + arrivalTime,
      prices : [lowPrice, highPrice]
    };

    axios
      .put(`https://globalaviaapi.azurewebsites.net/operator/flights/${editingFlightId}`, editedFlight)
      .then(res => {
        const [ fromCity ] = cities.filter(c => c.id === +editedFlight.departureCityId);
        const [ toCity ] = cities.filter(c => c.id === +editedFlight.arrivalCityId);
    
        setRoutes(routes.concat({
          id: res.data.Id,
          departureCity: fromCity.name,
          arrivalCity: toCity.name,
          departureDate: editedFlight.departureDate,
          arrivalDate: editedFlight.arrivalDate,
          prices: editedFlight.prices
        }));
        alert(`Рейс ${fromCity.name}-${toCity.name} был успешно изменен.`);
      })
      .catch(error => {
        alert('Произошла непредвиденная ошибка.')
      });
    setEditingFlightId(null);
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
    if (editingFlightId)
      setEditingFlightId(null);
    setIsOpen(false);
  }

  return (
    <div>
     <div className={classes.backdrop} onClick={closePopup}></div>
      <div className={classes.popup}>
        <div className={classes.header}>
          {editingFlightId 
            ? 'Изменение рейса'
            : 'Создание рейса'
          }
        <button className={classes.closeButton} onClick={closePopup}>×</button>
        </div>
        <form className={classes.content} onSubmit={editingFlightId ? editFlight : createFlight}>
          <div className={classes.item}>
              <Select
                value={toPointId}
                options={cities} 
                onChange={changeFromPointHandler}
                placeholder="Откуда"
              />
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
                changed={changeArrivalTimeHandler}
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
              />
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
              <Input value={departureTime} changed={changeDepartureTimeHandler} type="time" required />
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
            <div className={classes.button}>
              <Button type="submit" text={editingFlightId ? 'Изменить': 'Создать'} className={classes.button} />
            </div>
        </form>
      </div>  
    </div>
    
  )

}
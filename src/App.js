import './App.css';
import React, { useEffect, useState } from 'react';
import Input from './UI/Input/Input';
import axios from 'axios';

export const App = () => {
  const [tickets, setTickets] = useState([]);
  const [sortingParameter, setSortingParameter] = useState("departureDate");
  const [fromPoint, setFromPoint] = useState('');
  const [toPoint, setToPoint] = useState('');

  const setTime = (date) => new Date(date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  const setDate = (date) => new Date(date).toLocaleDateString();
  const setPeriod = (start, end) => new Date(end) - new Date(start);

  const getTicket = () => {
    axios
      .get('https://globalaviaapi.azurewebsites.net/flights')
      .then(response => {
        setTickets(response.data.sort((a, b) => new Date(a.departureDate) - new Date(b.departureDate)));
      })
  };

  useEffect(getTicket, []);


  const sortTickets = (tickets) => {
    if (sortingParameter === 'period') {
      return tickets.sort((a, b) => {
        const durationA = new Date(a.arrivalDate) - new Date(a.departureDate);
        const durationB = new Date(b.arrivalDate) - new Date(b.departureDate);
        return durationA - durationB;
      })
    }
    console.log(sortingParameter)
    return tickets.sort((a, b) => {
      console.log(new Date(a[sortingParameter]), new Date(b[sortingParameter]))
      if (new Date(a[sortingParameter]) > new Date(b[sortingParameter])) {
        console.log('returned 1')
        return 1;
      }
      if (new Date(a[sortingParameter]) < new Date(b[sortingParameter])) {
        console.log('returned -1')
        return -1;
      }

      return 0;
    });
  };

  const changeFromPointHandler = (e) => {
    setFromPoint(e.target.value);
  };

  const changeToPointHandler = (e) => {
    setToPoint(e.target.value);
  };

  const ticketsToShow = tickets
    .filter(t =>
      t.arrivalCity.toLowerCase().includes(toPoint.toLowerCase()) && t.departureCity.toLowerCase().includes(fromPoint.toLowerCase()));

  const sortedTickets = sortTickets(ticketsToShow);

  return (
    <div className="app-container">
      <ul className="ticket-list">
      <div className='city-inputs'>
        <div className='city-input'>
          <Input
            value={fromPoint}
            changed={changeFromPointHandler}
            placeholder='Откуда'/>
        </div>
        <div className='city-input'>
          <Input
            value={toPoint}
            changed={changeToPointHandler}
            placeholder='Куда'/>
        </div>
      </div>
      <div className='sorting-type'>
        <span style={{marginRight: '10px'}}>Сортировать по: </span>
        <select value={sortingParameter} onChange={(e) => setSortingParameter(e.target.value)}>
          <option value="departureDate">по дате отправления</option>
          <option value="arrivalDate">по дате прибытия</option>
          <option value="period">по времени в пути</option>
          <option value="price">по цене</option>
        </select>
      </div>
      {sortedTickets.map(ticket => 
        <li className="ticket-info" key={ticket.id}>
          <div>
            <div className="time">{setTime(ticket.departureDate)}</div>
            <div>{ticket.departureCity}</div>
            <div>{setDate(ticket.departureDate)}</div>
          </div>
          <div className="period">
            В пути: {new Date(setPeriod(ticket.departureDate, ticket.arrivalDate)).getHours() - 3} ч.  {new Date(setPeriod(ticket.departureDate, ticket.arrivalDate)).getMinutes()} мин.
          </div>
          <div>
            <div className="time">{setTime(ticket.arrivalDate)}</div>
            <div>{ticket.arrivalCity}</div>
            <div>{setDate(ticket.arrivalDate)}</div>
          </div>
          <div className="price">от {ticket.price} р.</div>
        </li>)}
      </ul>
    </div>
  );
}


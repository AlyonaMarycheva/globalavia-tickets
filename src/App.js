import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const App = () => {
  const [tickets, setTickets] = useState([]);
  const [sortingParameter, setSortingParameter] = useState("departure");

  const setTime = (date) => new Date(date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  const setDate = (date) => new Date(date).toLocaleDateString();
  const setPeriod = (start, end) => new Date(end) - new Date(start);

  const getTicket = () => {
    axios
      .get('https://localhost:5001/flights')
      .then(response => {
        setTickets(response.data.sort((a, b) => new Date(a.departureDate) - new Date(b.departureDate)));
      })
  };

  useEffect(getTicket, []);

  //походу не работает сортировка(
  useEffect(() => {
    console.log(sortingParameter)
    switch(sortingParameter) {
      case "period": 
        setTickets(tickets.sort((a, b) => setPeriod(a.departureDate, a.arrivalDate) > setPeriod(b.departureDate, b.arrivalDate) ));
        break;
      case "arrival":
        setTickets(tickets.sort((a, b) => new Date(a.arrivalDate) > new Date(b.arrivalDate)));
        break;
      default: 
        setTickets(tickets.sort((a, b) => new Date(a.departureDate) > new Date(b.departureDate)));
    }
  }, [sortingParameter])

  return (
    <div className="app-container">
      <ul className="ticket-list">
      <select value={sortingParameter} onChange={(e) => setSortingParameter(e.target.value)}>
        <option value="departure">по дате отправления</option>
        <option value="arrival">по дате прибытия</option>
        <option value="period">по времени в пути</option>
      </select>
      {tickets.map(ticket => 
        <li className="ticket-info" key={ticket.departureDate}>
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
        </li>)}
      </ul>
    </div>
  );
}


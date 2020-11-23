import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


export const App = () => {
  const [tickets, setTickets] = useState([]);

  const getTicket = () => {
    axios
      .get('http://localhost:5000/flights')
      .then(response => {
        console.log(response.data)
        setTickets(response.data.map(ticket => {
          return {
            ...ticket,
            departureTime: new Date(ticket.departureDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            arrivalTime: new Date(ticket.arrivalDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            departureDate: new Date(ticket.departureDate).toLocaleDateString(),
            arrivalDate: new Date(ticket.arrivalDate).toLocaleDateString(),
            period: new Date(ticket.arrivalDate) - new Date(ticket.departureDate)
          }
        }
        ))
      })
  };
  useEffect(getTicket, []);

  return (
    <div className="app-container">
      <ul className="ticket-list">
      {tickets.map(ticket => 
        <li className="ticket-info" key={ticket.departureDate}>
          <div>
            <div className="time">{ticket.departureTime}</div>
            <div>{ticket.departureCity}</div>
            <div>{ticket.departureDate}</div>
          </div>
          <div className="period">
            В пути: {new Date(ticket.period).getHours() - 3} ч.  {new Date(ticket.period).getMinutes()} мин.
          </div>
          <div>
            <div className="time">{ticket.arrivalTime}</div>
            <div>{ticket.arrivalCity}</div>
            <div>{ticket.arrivalDate}</div>
          </div>
        </li>)}
      </ul>
    </div>
  );
}


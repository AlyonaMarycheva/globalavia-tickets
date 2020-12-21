import classes from './FlightTable.module.css';

const FlightTable = ({ routes }) => {
  console.log('table', routes)
  return (
    <table className={classes.flightTable}>
      <tr>
        <th>Город отправления</th>
        <th>Город прибытия</th>
        <th>Дата отправления</th>
        <th>Дата прибытия</th>
        <th>Время в пути</th>
        <th>Стоимость билета</th>
      </tr>
      <tbody>
        {
          routes.map(r => <tr key={r.id}>
            <td>{r.fullFlights[0].departureCity}</td>
            <td>{r.fullFlights[0].arrivalCity}</td>
            <td>{r.fullFlights[0].departureDate}</td>
            <td>{r.fullFlights[0].arrivalDate}</td>
            <td>{r.duration}</td>
            <td>{r.price}</td>
          </tr>)
        }
      </tbody>
      
    </table>
  )
};


export default FlightTable;
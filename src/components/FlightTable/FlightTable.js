import classes from './FlightTable.module.css';

const FlightTable = ({ routes }) => {
  return (
    <table className={classes.flightTable}>
      <tr>
        <th>Город отправления</th>
        <th>Город прибытия</th>
        <th>Дата отправления</th>
        <th>Дата прибытия</th>
        <th>Стоимость билета</th>
      </tr>
      <tbody>
        {
          routes.map(r => <tr key={r.id}>
            <td>{r.departureCity}</td>
            <td>{r.arrivalCity}</td>
            <td>{r.departureDate}</td>
            <td>{r.arrivalDate}</td>
            <td>{r.price}</td>
          </tr>)
        }
      </tbody>
      
    </table>
  )
};


export default FlightTable;
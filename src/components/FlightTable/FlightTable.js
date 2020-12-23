import classes from './FlightTable.module.css';

const FlightTable = ({ routes, onDeleteClick, onChangeClick }) => {
  return (
    <table className={classes.flightTable}>
      <thead>
        <tr>
          <th>Город отправления</th>
          <th>Город прибытия</th>
          <th>Дата отправления</th>
          <th>Дата прибытия</th>
          <th>Стоимость билета</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {
          routes.map(r => <tr key={r.id}>
            <td>{r.departureCity}</td>
            <td>{r.arrivalCity}</td>
            <td>{r.departureDate}</td>
            <td>{r.arrivalDate}</td>
            <td>{r.price}</td>
            <td>
              <div onClick={() => onChangeClick(r.id)}>Изменить</div>
              <div>---------</div>
              <div onClick={() => onDeleteClick(r.id)}>Удалить</div>
            </td>
          </tr>)
        }
      </tbody>
      
    </table>
  )
};


export default FlightTable;
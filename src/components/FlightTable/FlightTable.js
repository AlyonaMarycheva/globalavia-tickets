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
            <td>
              <div>Комфорт: {r.prices[0]} руб.</div>
              <div>Эконом: {r.prices[1]} руб.</div>
            </td>
            <td>
              <div onClick={() => onChangeClick(r.id)} className={classes.button}>Изменить</div>
              <div>---------</div>
              <div onClick={() => onDeleteClick(r.id)} className={classes.button}>Удалить</div>
            </td>
          </tr>)
        }
      </tbody>
      
    </table>
  )
};


export default FlightTable;
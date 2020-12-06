import styles from './Flight.module.css'

const Flight = ({ flightInfo }) => {

  const setTime = (date) => new Date(date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  const setDate = (date) => new Date(date).toLocaleDateString();
  const setPeriod = (start, end) => new Date(end) - new Date(start);

  return (
    <li className={styles.FlightInfo}>
          <div>
            <div className={styles.Time}>{setTime(flightInfo.DepartureDate)}</div>
            <div>{flightInfo.from}</div>
            <div>{setDate(flightInfo.DepartureDate)}</div>
          </div>
          <div>
            В пути: {new Date(setPeriod(flightInfo.DepartureDate, flightInfo.ArrivalDate)).getHours() - 3} ч.  {new Date(setPeriod(flightInfo.DepartureDate, flightInfo.ArrivalDate)).getMinutes()} мин.
          </div>
          <div>
            <div className={styles.Time}>{setTime(flightInfo.ArrivalDate)}</div>
            <div>{flightInfo.to}</div>
            <div>{setDate(flightInfo.ArrivalDate)}</div>
          </div>
    </li>
    
  );
};

export default Flight;
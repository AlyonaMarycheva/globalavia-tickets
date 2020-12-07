import styles from './Flight.module.css'

const Flight = ({ flightInfo }) => {

  const setTime = (date) => new Date(date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  const setDate = (date) => new Date(date).toLocaleDateString();
  const setPeriod = (start, end) => new Date(end) - new Date(start);

  return (
    <li className={styles.FlightInfo}>
          <div>
            <div className={styles.Time}>{setTime(flightInfo.departureDate)}</div>
            <div>{flightInfo.departureCity}</div>
            <div>{setDate(flightInfo.departureDate)}</div>
          </div>
          <div>
            В пути: {new Date(setPeriod(flightInfo.departureDate, flightInfo.arrivalDate)).getHours() - 3} ч.  {new Date(setPeriod(flightInfo.departureDate, flightInfo.arrivalDate)).getMinutes()} мин.
          </div>
          <div>
            <div className={styles.Time}>{setTime(flightInfo.arrivalDate)}</div>
            <div>{flightInfo.arrivalCity}</div>
            <div>{setDate(flightInfo.arrivalDate)}</div>
          </div>
    </li>
    
  );
};

export default Flight;
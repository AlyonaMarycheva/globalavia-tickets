import Flight from './Flight/Flight';
import styles from './Route.module.css';

const Route = ({ routeInfo }) => {

  const flightList = routeInfo.fullFlights.map(f => <Flight key={f.id} flightInfo={f} />)
  const durationTimes = routeInfo.duration.split(':');

  return (
    <div className={styles.Route}>
      <div className={styles.RouteInfo}>
        <div className="price">В пути всего: {durationTimes[0]} ч. {durationTimes[1]} мин.</div>
        <div className="price">от {routeInfo.price} р.</div>
      </div>
      <ul>
        {flightList}
      </ul>
    </div>
  );
};

export default Route;
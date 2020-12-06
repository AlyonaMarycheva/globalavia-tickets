import Route from './Route/Route';
import styles from './RouteList.module.css';

const RouteList = ({ routes }) => {
  const routeList = routes.map((r => {
    return <Route key={r.id} routeInfo={r} />
  }));

  return (
    <div className={styles.RouteList}>
      {routeList}
    </div>
  );
};

export default RouteList;
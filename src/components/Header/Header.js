import classes from "./Header.module.css";
import { GiExitDoor } from "react-icons/gi";
import { useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";


export const Header = ({user, setUser}) => {
  const history = useHistory();
  const location = useLocation();
  const handleLogin = () => {
      setUser(null);
      history.push('/login')
  }

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.item}>
          <Link className={classes.link} to="/">Список рейсов</Link>
          {user  ? <Link  className={classes.link} to="/operator">Панель оператора</Link> : null}
        </div>
        <div className={classes.item}>
          {user  ? <div>{user.firstName}</div> : null}
        {location.pathname !== '/login' ?
          <button className={classes.button} onClick={handleLogin}>
            <GiExitDoor size='1.5rem' className={classes.svg}/>
          </button> :
          null 
        }
        </div>
      </div>
    </div>
  )
}
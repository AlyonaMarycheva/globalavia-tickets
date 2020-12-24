import { useState } from 'react';
import classes from './Toolbar.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';

const Toolbar = ({ formRequestConfig, setSortingParameter, extended, cities }) => {
  const [ fromPoint, setFromPoint ] = useState('');
  const [ toPoint, setToPoint ] = useState('');
  const [ hasTransfers, setHasTransfers ] = useState(false);

  const changeFromPointHandler = (e) => {
    if (e.target.value) {
      const [ city ] = cities.filter(c => c.id === +e.target.value);
      setFromPoint(city.name);
    }
  };

  const changeToPointHandler = (e) => {
    if (e.target.value) {
    const [ city ] = cities.filter(c => c.id === +e.target.value);
    setToPoint(city.name);
   }
  };

  const handleTransferChange = (e) => {
    setHasTransfers(e.target.checked);
  };

  const handleSearchClick = () => {
    const config = {
      params: {}
    };
    if (fromPoint !== toPoint)
    {
        if (fromPoint) {
        config.params.from = fromPoint;
      }

      if (toPoint) {
        config.params.to = toPoint;
      }
    }
    else alert('Ничего не найдено')
    if (hasTransfers) {
      config.params.directonly = hasTransfers;
    }

    formRequestConfig(config);
  };

  return (
    <>
      <SearchBar
        cities={cities}
        fromPoint={fromPoint}
        changeFromPointHandler={changeFromPointHandler}
        toPoint={toPoint}
        changeToPointHandler={changeToPointHandler}
        handleSearchClick={handleSearchClick} />
      {extended
        ? <div className={classes.tools}>
            <div className={classes.transfer}>
              <input className={classes.checkbox} onChange={handleTransferChange} type='checkbox' checked={hasTransfers} /> Без пересадок
            </div>
            <div className={classes.sorting}>
              <span>Сортировать по: </span>
              <select className={classes.sortingSelect} onChange={(e) => setSortingParameter(e.target.value)}>
                <option value="price">по цене</option>
                <option value="departureDate">по дате отправления</option>
                <option value="arrivalDate">по дате прибытия</option>
                <option value="duration">по времени в пути</option>
              </select>
            </div>
          </div>
        : null}
    </>
  )
};

export default Toolbar;
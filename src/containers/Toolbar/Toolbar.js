import { useState } from 'react';
import classes from './Toolbar.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';

const Toolbar = ({ formRequestConfig, setSortingParameter }) => {
  const [ fromPoint, setFromPoint ] = useState('');
  const [ toPoint, setToPoint ] = useState('');
  const [ hasTransfers, setHasTransfers ] = useState(false);

  const changeFromPointHandler = (e) => {
    setFromPoint(e.target.value);
  };

  const changeToPointHandler = (e) => {
    setToPoint(e.target.value);
  };

  const handleTransferChange = (e) => {
    setHasTransfers(e.target.checked);
  };

  const handleSearchClick = () => {
    const config = {
      params: {}
    };

    if (fromPoint) {
      config.params.from = fromPoint;
    }

    if (toPoint) {
      config.params.to = toPoint;
    }

    if (hasTransfers) {
      config.params.directonly = hasTransfers;
    }

    formRequestConfig(config);
  };

  return (
    <>
      <SearchBar
        fromPoint={fromPoint}
        changeFromPointHandler={changeFromPointHandler}
        toPoint={toPoint}
        changeToPointHandler={changeToPointHandler}
        handleSearchClick={handleSearchClick} />
      <div className={classes.tools}>
        <div className={classes.transfer}>
          <input className={classes.checkbox} onChange={handleTransferChange} type='checkbox' checked={hasTransfers} /> Без пересадок
        </div>
        <div className={classes.sorting}>
          <span>Сортировать по: </span>
          <select className={classes.sortingSelect} onChange={(e) => setSortingParameter(e.target.value)}>
            <option value="departureDate">по дате отправления</option>
            <option value="arrivalDate">по дате прибытия</option>
            <option value="duration">по времени в пути</option>
            <option value="price">по цене</option>
          </select>
        </div>
      </div>
    </>
  )
};

export default Toolbar;
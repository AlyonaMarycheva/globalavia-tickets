import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import classes from './SearchBar.module.css';

const SearchBar = ({ fromPoint, changeFromPointHandler, toPoint, changeToPointHandler, handleSearchClick }) => {
  return (
    <div className={classes.inputs}>
      <div className={classes.input}>
        <Input
          value={fromPoint}
          changed={changeFromPointHandler}
          placeholder='Откуда'/>
      </div>
      <div className={classes.input}>
        <Input
          value={toPoint}
          changed={changeToPointHandler}
          placeholder='Куда'/>
      </div>
      <Button text="Найти" clicked={handleSearchClick}/>
    </div>
  );
};

export default SearchBar;
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import classes from './SearchBar.module.css';
import Select from '../../UI/Select/Select';

const SearchBar = ({ fromPoint, changeFromPointHandler, toPoint, changeToPointHandler, handleSearchClick, cities }) => {
  return (
    <div className={classes.inputs}>
      <div className={classes.input}>
        <Select
          onChange={changeFromPointHandler}
          options={cities}
          placeholder='Откуда' />
      </div>
      <div className={classes.input}>
        <Select
          onChange={changeToPointHandler}
          options={cities}
          placeholder='Куда' />
      </div>
      <Button text="Найти" clicked={handleSearchClick}/>
    </div>
  );
};

export default SearchBar;
import classes from './Input.module.css';

const Input = ({ placeholder, value, changed }) => {
  return <input
    value={value}
    placeholder={placeholder}
    className={classes.Input}
    onChange={changed} />
};

export default Input;
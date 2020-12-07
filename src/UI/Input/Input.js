import classes from './Input.module.css';

const Input = ({ placeholder, value, type, changed }) => {
  return <input
    value={value}
    placeholder={placeholder}
    type={type}
    className={classes.Input}
    onChange={changed} />
};

export default Input;
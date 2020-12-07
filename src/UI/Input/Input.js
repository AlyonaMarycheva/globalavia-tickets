import classes from './Input.module.css';

const Input = ({ placeholder, type, value, changed }) => {
  return <input
    value={value}
    placeholder={placeholder}
    type={type}
    className={classes.Input}
    onChange={changed} 
    type={type}
    />

};

export default Input;
import classes from './Input.module.css';

const Input = ({ placeholder, type, value, changed, required }) => {
  return <input
    value={value}
    placeholder={placeholder}
    type={type}
    className={classes.Input}
    onChange={changed} 
    required={required}
    />

};

export default Input;
import classes from './Button.module.css';

const Button = ({ text, clicked, type}) => {
  return <button onClick={clicked} className={classes.button} type={type}>
    {text}
  </button>

};

export default Button;
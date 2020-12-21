import classes from './Button.module.css';

const Button = ({ text, clicked }) => {
  return <button onClick={clicked} className={classes.button}>
    {text}
  </button>

};

export default Button;
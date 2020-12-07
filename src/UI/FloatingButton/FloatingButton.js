import classes from './FloatingButton.module.css';

const FloatingButton = ({ onClick, children }) => {
  return (
    <div onClick={onClick} className={classes.floatingButton}>
      {children}
    </div>
  )
};

export default FloatingButton;
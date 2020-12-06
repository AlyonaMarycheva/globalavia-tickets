import classes from './Info.module.css';

const Info = () => {
  return (
    <div className={classes.info}>
      <h1>
        Давай найдем рейсы!
      </h1>
      <p>
        Введи город отправления, город прибытия и нажми на кнопку "Найти"...
      </p>
    </div>
    
  )
};

export default Info;

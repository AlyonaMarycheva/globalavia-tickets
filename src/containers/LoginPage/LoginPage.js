import React, { useState } from 'react';
import classes from './LoginPage.module.css';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const LoginPage = ({user, setUser}) => {
  const history = useHistory();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const changeLoginHandler = (e) => setLogin(e.target.value);
  const changePasswordHandler = (e) => setPassword(e.target.value);
  
  const handleLogin = (e)=> {
    e.preventDefault();
  axios
    .post('https://globalaviaapi.azurewebsites.net/operator/token', {login, password})
    .then(response => {
      if (typeof response.data['token'] !== "undefined") {
        setUser(response.data)
        setLogin('');
        setPassword('');
        history.push('/');
      }
      else 
        alert("Неверные данные. Попробуйте снова")
    })
 
  } 

  return (
    <form onSubmit={handleLogin} className={classes.container}>
      <div className={classes.header}>
        Вход в систему
      </div>
      <div className={classes.item}>
        <Input placeholder="Логин" value={login} changed={changeLoginHandler} required={true}/>
      </div>
      <div className={classes.item}>
        <Input placeholder="Пароль" type="password" value={password} changed={changePasswordHandler} required={true}/>
      </div>
      <div className={classes.buttonContainer}>
        <Button text="Войти" type="submit"/>
      </div>
     
    </form>
  )
}

export default LoginPage;

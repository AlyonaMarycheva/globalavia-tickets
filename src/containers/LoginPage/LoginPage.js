import React, { useState } from 'react';
import classes from './LoginPage.module.css';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import axios from 'axios';

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const changeLoginHandler = (e) => setLogin(e.target.value);
  const changePasswordHandler = (e) => setPassword(e.target.value);
  
  const handleLogin = async event => {
    event.preventDefault()
    try {
      const response = await axios.post(
        'https://globalaviaapi.azurewebsites.net/operator/token',
       {login, password}
       );
      const user = response.data;
      // console.log(user)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 
      setUser(user);
      setLogin('');
      setPassword('');
    } catch (exception) {
      console.log('ты дурак')
    }
  } 

  console.log(login, password)
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        Вход в систему
      </div>
      <div className={classes.item}>
        <Input placeholder="Логин" value={login} changed={changeLoginHandler}/>
      </div>
      <div className={classes.item}>
        <Input placeholder="Пароль" type="password" value={password} changed={changePasswordHandler}/>
      </div>
      <div className={classes.buttonContainer}>
        <Button text="Войти" clicked={handleLogin}/>
      </div>
    </div>
  )
}

export default LoginPage;

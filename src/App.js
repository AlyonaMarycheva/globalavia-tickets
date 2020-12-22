import {
  BrowserRouter as Router,
  Switch, Route, Redirect
} from "react-router-dom";
import React, {useState, useEffect} from "react";
import BookingPage from './containers/BookingPage/BookingPage';
import OperatorPage from './containers/OperatorPage/OperatorPage';
import LoginPage from './containers/LoginPage/LoginPage';
import './App.css';
import {Header} from './components/Header/Header'

export const App = () => {
  const [user, setUser] = useState(() => {
    const localData = localStorage.getItem('loggedUser');
    return localData ? JSON.parse(localData) : null
  });

  useEffect(() => {
    user ?
    window.localStorage.setItem(
      'loggedUser', JSON.stringify(user)
    ) 
    : window.localStorage.clear();
  }, [user])

  return (
    <Router>
      <Header user={user} setUser={setUser}/>
      <Switch>
      <Route path="/login">
        <LoginPage user={user} setUser={setUser}/>
      </Route>
      <Route path="/operator" render={() =>
          user ? <OperatorPage /> : <Redirect to="/login" />
        } />
      <Route path="/">
       <BookingPage />
       </Route>
       </Switch>
    </Router>
  );
};
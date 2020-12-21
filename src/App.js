import './App.css';
import BookingPage from './containers/BookingPage/BookingPage';
import OperatorPage from './containers/OperatorPage/OperatorPage';
import LoginPage from './containers/LoginPage/LoginPage';


export const App = () => {
  return (
    <div>
      <LoginPage />
      {/* <OperatorPage /> */}
      {/* <BookingPage /> */}
    </div>
  );
};
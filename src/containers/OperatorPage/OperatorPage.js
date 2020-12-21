import { useState, useEffect } from 'react';
import axios from 'axios';
import Toolbar from '../Toolbar/Toolbar';
import FloatingButton from '../../UI/FloatingButton/FloatingButton';
import FlightTable from '../../components/FlightTable/FlightTable';
import { Popup } from '../../components/Popup/Popup';

const OperatorPage = () => {
  const [ routes, setRoutes ] = useState([]);
  const [ sortingParameter, setSortingParameter ] = useState('departureDate');
  const [ requestConfig, setRequestConfig ] = useState({ params: {} });
  const [ editingFlight, setEditingFlight ] = useState(false);
  const [popupIsOpen, setPopupIsOpen] = useState(false);


  const getRoutes = () => {
      console.log('performing request');
      axios
      .get('https://globalaviaapi.azurewebsites.net/flights', requestConfig)
      .then(response => {
        console.log(response.data)
        setRoutes(response.data);
      })
  };

  useEffect(getRoutes, [requestConfig]);

  const handleAddFlightClick = () => {
    setPopupIsOpen(true);
  };

  const sortRoutes = (tickets) => {
    if (sortingParameter === 'duration' || sortingParameter === 'price') {
      return tickets.sort((a, b) => {
        if (a[sortingParameter] > b[sortingParameter]) {
          return 1
        }
        if (a[sortingParameter] < b[sortingParameter]) {
          return -1
        }
        return 0;
      })
    }

    return tickets.sort((a, b) => {
      if (new Date(a[sortingParameter]) > new Date(b[sortingParameter])) {
        console.log('returned 1')
        return 1;
      }
      if (new Date(a[sortingParameter]) < new Date(b[sortingParameter])) {
        console.log('returned -1')
        return -1;
      }

      return 0;
    });
  };

  const sortedRoutes = sortRoutes(routes);
  console.log(sortedRoutes)
  return (
    <div className="app-container">
      {popupIsOpen ? <Popup setIsOpen={setPopupIsOpen} routes={routes} setRoutes={setRoutes}/> : null}
      <Toolbar formRequestConfig={setRequestConfig} setSortingParameter={setSortingParameter} />
        <FlightTable routes={sortedRoutes} />
      <FloatingButton onClick={handleAddFlightClick}>+</FloatingButton>
      
    </div>
  );
};

export default OperatorPage;
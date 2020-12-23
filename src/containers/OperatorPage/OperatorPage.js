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
  const [ popupIsOpen, setPopupIsOpen ] = useState(false);
  const [ cities, setCities ] = useState([]);
  const [ popupType, setPopupType ] = useState('create');
  const [ editingFlightId, setEditingFlightId ] = useState(null);


  const getRoutes = () => {
      axios
      .get('https://globalaviaapi.azurewebsites.net/operator/flights', requestConfig)
      .then(response => {
        setRoutes(response.data);
      });
  };

  const getCities = () => {
    axios
      .get('https://globalaviaapi.azurewebsites.net/cities')
      .then(response => {
        setCities(response.data);
      });
  }

  useEffect(getCities, []);

  useEffect(getRoutes, [requestConfig]);

  const handleAddFlightClick = () => {
    setPopupType('create');
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
        return 1;
      }
      if (new Date(a[sortingParameter]) < new Date(b[sortingParameter])) {
        return -1;
      }

      return 0;
    });
  };

  const deleteFlight = (id) => {
    console.log('удаляем' + id);
    axios
    .delete(`https://globalaviaapi.azurewebsites.net/operator/flights/${id}`)
    .then(response => {
      setRoutes(routes.filter(r => r.id !== id));
      alert('Рейс был удален.');
    })
    .catch(error => alert('Произошла ошибка во время удаления рейса.'));
  };

  const handleChangeClick = (id) => {
    setPopupType('edit');
    setEditingFlightId(id);
    setPopupIsOpen(true)
  }

  const sortedRoutes = sortRoutes(routes);

  return (
    <div className="app-container">
      {popupIsOpen ? <Popup type='edit' flightId={editingFlightId} cities={cities} setIsOpen={setPopupIsOpen} routes={routes} setRoutes={setRoutes}/> : null}
      <Toolbar cities={cities} formRequestConfig={setRequestConfig} setSortingParameter={setSortingParameter} />
        <FlightTable onChangeClick={handleChangeClick} onDeleteClick={deleteFlight} routes={sortedRoutes} />
      <FloatingButton onClick={handleAddFlightClick}>+</FloatingButton>
    </div>
  );
};

export default OperatorPage;
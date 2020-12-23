import { useState, useEffect } from 'react';
import axios from 'axios';
import Toolbar from '../Toolbar/Toolbar';
import RouteList from '../../components/RouteList/RouteList';
import Info from '../../components/Info/Info';

const BookingPage = () => {
  const [ routes, setRoutes ] = useState([]);
  const [ sortingParameter, setSortingParameter ] = useState('departureDate');
  const [ requestConfig, setRequestConfig ] = useState({ params: {} });
  const [ cities, setCities ] = useState([]);


  const getRoutes = () => {
    
    if (Object.keys(requestConfig.params).length) {
      axios
      .get('https://globalaviaapi.azurewebsites.net/flights', requestConfig)
      .then(response => {
        console.log(response)
        setRoutes(response.data);
      })
    }
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

  return (
    <div className="app-container">
      <Toolbar cities={cities} formRequestConfig={setRequestConfig} setSortingParameter={setSortingParameter} extended />
      {Object.keys(requestConfig.params).length
        ? <RouteList routes={sortedRoutes} />
        : <Info />}
    </div>
  );
};

export default BookingPage;
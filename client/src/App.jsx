import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GlobalContext from './context/GlobalContext';
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import MainLayout from './layout/MainLayout';
import MainPage from './pages/MainPage/MainPage';
import ShowPage from './pages/ShowPage/ShowPage';
import OwnersPage from './pages/OwnersPage/OwnersPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import OwnerShowpage from './pages/OwnerShowPage/OwnerShowPage';
import MessagesPage from './pages/MessagesPage/MessagesPage';
import OwnersDataPage from './pages/OwnersDataPage/OwnersDataPage'
import axios from 'axios';
import AddProperty from './pages/addpropertyPage/AddProperty';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Navigate, useSearchParams } from "react-router-dom";





function App() {



  const [houses, setHouses] = useState();
  const [searchedCity, setSearchedCity] = useState('');
  const [owner, setOwner] = useState({});
  const [sidebarUserOrOwner, setSidebarUserOrOwner] = useState(true);
  const [selectedRoomNumbers, setSelectedRoomNumbers] = useState(null)
  const [selectedBeds, setSelectedBeds] = useState(null);
  const [selectedBathrooms, setSelectedBathrooms] = useState(null);
  const [headerTitle, setHeaderTitle] = useState(true);



  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    city: searchParams.get("city") || "",
    rooms: searchParams.get("rooms") || "",
    beds: searchParams.get("beds") || "",
    bathrooms: searchParams.get("bathrooms") || "",
    size: searchParams.getAll('size') || "",
    price: searchParams.getAll('price') || "",
  });
  const [selectedSize, setSelectedSize] = useState([0, 3000]);
  const [selectedPrice, setSelectedPrice] = useState([0, 5000]);




  function logout() {
    localStorage.removeItem('token');
    setOwner(null);
    Navigate("/owners");
  }



  function fetchHouses(parametriDellaQuery = {}) {


    console.log('chiamata axios', parametriDellaQuery)
    axios.get('http://localhost:3000/api/boolbnb', {
      params: parametriDellaQuery
    })
      .then(res => {
        console.log(searchedCity, "debug prova")
        setHouses(res.data)
        setSidebarUserOrOwner(true)

      }).catch(err => console.error(err))
      .finally(() => {
        console.log('finally')
      })

  }


  return (
    <>
      <GlobalContext.Provider value={{
        houses, setHouses, searchedCity, setSearchedCity,
        owner, setOwner, fetchHouses, sidebarUserOrOwner,
        setSidebarUserOrOwner, logout, setSelectedRoomNumbers,
        searchParams, setSearchParams, filters, setFilters,
        selectedSize, setSelectedSize, selectedPrice,
        setSelectedPrice, selectedRoomNumbers,
        selectedBeds, setSelectedBeds,
        selectedBathrooms, setSelectedBathrooms,
        headerTitle, setHeaderTitle
      }}>

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route element={<MainLayout />}>
            <Route path="/:slug" element={<ShowPage />} />
            <Route path='/owners' element={<OwnersPage />} />
            <Route path='/owners/:id' element={<OwnerShowpage />} />
            <Route path='/owners/:id/add-property' element={<AddProperty />} />
            <Route path='/owners/:id/messages' element={<MessagesPage />} />
            <Route path='/owners/:id/owners-data' element={<OwnersDataPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>

      </GlobalContext.Provider>

    </>
  )
}

export default App

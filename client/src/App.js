import './App.css'
import React, {  useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import Registrarse from "./Components/Registrarse"
import NavFilterComp from './Components/NavFilterComp';
import Nav from "./Components/Nav"
import Filter from "./Components/Filter"
import About from "./Components/About"
import Favorites from "./Components/Favorites"
import Temperament from "./Components/Temperament"
import Detail from "./Components/Detail"
import Perfil from "./Components/Perfil"
import PostBreed from "./Components/PostBreed"
import Home from "./Components/Home"
import CreastaRaza from "./Components/CreasteRaza"
import Search from './Components/Search';
import Order from "./Components/Order"
import NavOrder from "./Components/NavOrder"
import FilterTemper from "./Components/FilterTempe"
import { filterByName, postUser, getUser } from './Redux/actions';




function App() {
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getAllBreed())
  // }, [dispatch])

  const location = useLocation()

  return (
    <div className='App' style={{ padding: '25px' }}>

      {location.pathname === "/" || location.pathname === "/registrarse" ? null : <Nav filterByName={filterByName} />}
      {location.pathname === "/home" || location.pathname === "/filter" || location.pathname === "/order" ? <NavFilterComp/> : null }
      {location.pathname === "/home" || location.pathname === "/filter" ||  location.pathname === "/order" ? <NavOrder/> : null }
      <Routes>
        <Route path='/' element={<LoginForm getUser={getUser} />}></Route>
        <Route path='/registrarse' element={<Registrarse postUser={postUser} />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/favorites' element={<Favorites />}></Route>
        <Route path='/temperaments' element={<Temperament />}></Route>
        <Route path='/temperaments/:tempe' element={<FilterTemper />}></Route>
        <Route path='/filter' element={<Filter />}></Route>
        <Route path='/order' element={<Order />}></Route>
        <Route path='/search' element={<Search />}></Route>
        <Route path='/detail/:detailId' element={<Detail />}></Route>
        <Route path='/user' element={<Perfil />}></Route>
        <Route path='/postBreed' element={<PostBreed />}></Route>
        <Route path='/postBreed/creasteRaza' element={<CreastaRaza />}></Route>
      </Routes>
    </div>
  )
}

export default App;


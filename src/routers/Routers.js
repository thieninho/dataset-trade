import { Routes, Route, Navigate} from 'react-router-dom'

import React from 'react'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import ProductDetails from '../pages/ProductDetails'
import Checkout from '../pages/Checkout'
import Login from '../pages/Login1'
import UserDetails from '../pages/UserDetails'
import Purchased from '../pages/Purchased'


const Routers = () => {
  return <Routes>
    <Route path="/" element={<Navigate to='login'/>}/>
    <Route path='home' element={<Home/>} />
    <Route path='shop' element={<Shop/>} />
    <Route path='cart' element={<Cart/>} />
    <Route path='shop/:id' element={<ProductDetails/>} />
    <Route path='checkout' element={<Checkout/>} />
    <Route path='login' element={<Login/>} />
    <Route path='userdetail' element={<UserDetails/>} />
    <Route path='purchased' element={<Purchased/>} />

  </Routes>
}

export default Routers
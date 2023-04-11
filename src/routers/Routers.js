import { Routes, Route, Navigate} from 'react-router-dom'

import React from 'react'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import ProductDetails from '../pages/ProductDetails'
import Checkout from '../pages/Checkout'
import Login from '../pages/Login'
import UserDetails from '../pages/UserDetails'
import Purchased from '../pages/Purchased'
import ReviewPayment from '../pages/ReviewPayment'
import Success from '../pages/Success'
import Cancel from '../pages/Cancel'
import { Base } from '../functionHelper/APIFunction'
import Null from '../pages/Null'
const Routers = () => {
const token = JSON.stringify(Base.getCookie("token"));

let a = 'login'
  if (token !== "null"){
    a = 'home'
  }

  return <Routes>
    <Route path="/" element={<Navigate to='home'/>}/>
    <Route path='*' element={<Null/>} />
    <Route path='home' element={<Home/>} />
    <Route path='shop' element={<Shop/>} />
    <Route path='cart' element={<Cart/>} />
    <Route path='shop/:id' element={<ProductDetails/>} />
    <Route path='checkout' element={<Checkout/>} />
    <Route path={a} element={<Login/>} />
    <Route path='userdetail' element={<UserDetails/>} />
    <Route path='purchased' element={<Purchased/>} />
    <Route path='payment/paypal/success' element={<Success/>} />
    <Route path='payment/paypal/cancel' element={<Cancel/>} />
    <Route path='payment/paypal/review_payment' element={<ReviewPayment/>}/>
  </Routes>
}

export default Routers
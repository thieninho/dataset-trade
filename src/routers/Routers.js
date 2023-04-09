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

const Routers = () => {
  return <Routes>
    <Route path="/" element={<Navigate to='home'/>}/>
    <Route path='home' element={<Home/>} />
    <Route path='shop' element={<Shop/>} />
    <Route path='cart' element={<Cart/>} />
    <Route path='shop/:id' element={<ProductDetails/>} />
    <Route path='checkout' element={<Checkout/>} />
    <Route path='login' element={<Login/>} />
    <Route path='userdetail' element={<UserDetails/>} />
    <Route path='purchased' element={<Purchased/>} />
    <Route path='payment/paypal/success' element={<Success/>} />
    <Route path='payment/paypal/cancel' element={<Cancel/>} />
    <Route path='payment/paypal/review_payment' element={<ReviewPayment/>}/>
  </Routes>
}

export default Routers
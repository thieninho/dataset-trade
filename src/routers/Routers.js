import { Routes, Route, Navigate} from 'react-router-dom'

import React from 'react'
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
import HomeNewVer from '../pages/HomeNewVer'
import { Base } from '../functionHelper/APIFunction'
import Register from '../pages/Register'
import ShopCate from '../pages/ShopCate'
const Routers = () => {
const token = JSON.stringify(Base.getCookie("token"));

let a = 'login'
let b = 'register'
  if (token !== "null"){
    a = 'homenew'
    b = 'homenew'
  }

  return <Routes>
    <Route path="/" element={<Navigate to='homenew'/>}/>
    <Route path='*' element={<HomeNewVer/>} />
    <Route path='homenew' element={<HomeNewVer/>} />
    <Route path='shop' element={<Shop/>} />
    <Route path='cart' element={<Cart/>} />
    <Route path='shop/:dataset_category_id/:id' element={<ProductDetails/>} />
    <Route path='shop/:name_category/:dataset_category_id' element={<ShopCate/>} />
    <Route path='checkout' element={<Checkout/>} />
    <Route path= {a} element={<Login/>} />
    <Route path= {b} element={<Register/>}/>
    <Route path='userdetail' element={<UserDetails/>} />
    <Route path='purchased' element={<Purchased/>} />
    <Route path='payment/paypal/success' element={<Success/>} />
    <Route path='payment/paypal/cancel' element={<Cancel/>} />
    <Route path='payment/paypal/review_payment' element={<ReviewPayment/>}/>
  </Routes>
}

export default Routers
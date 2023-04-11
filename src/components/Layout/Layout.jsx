import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Routers from '../../routers/Routers'
import { useLocation } from "react-router-dom";
import { Base } from '../../functionHelper/APIFunction';

const Layout = () => {
  const { pathname } = useLocation();
  const token = JSON.stringify(Base.getCookie("token"));

let a = 'login'
  if (token !== "null"){
    a = '/*'
  }
  
  return <>

    <div>
    { pathname !== "/payment/paypal/success" && pathname !== "/payment/paypal/cancel" && <Header />} 
        <Routers/>
    { pathname !== "/payment/paypal/success" && pathname !== "/payment/paypal/cancel" && <Footer />}

    </div>
  </>
  
}

export default Layout
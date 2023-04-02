import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Routers from '../../routers/Routers'
import { useLocation } from "react-router-dom";


const Layout = () => {
  const { pathname } = useLocation();
  return <>

    <div>
    {pathname !== "/login" && pathname !== "/signup" && pathname !== "/payment/paypal/success" && pathname !== "/payment/paypal/cancel" && <Header />}
        <Routers/>
    {pathname !== "/login" && pathname !== "/signup" && pathname !== "/payment/paypal/success" && pathname !== "/payment/paypal/cancel" && <Footer />}

    </div>
  </>
  
}

export default Layout
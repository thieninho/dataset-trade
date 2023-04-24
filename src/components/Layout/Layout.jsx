import React from 'react'
import Header from '../HeaderNew/HeaderNew'
import Footer from '../Footer/Footer'
import GetStarted from '../GetStarted/GetStarted'
import Routers from '../../routers/Routers'
import { useLocation } from "react-router-dom";
import { Base } from '../../functionHelper/APIFunction';

const Layout = () => {
  

  return <>

    <div>
     <Header />
        <Routers/>
    {/* {   pathname === "/payment/paypal/success" }{ pathname === "/payment/paypal/cancel" &&  */}
    <Footer />

    </div>
  </>
  
}

export default Layout
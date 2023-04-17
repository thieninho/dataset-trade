import React from 'react'
import Header from '../HeaderNew/HeaderNew'
import Footer from '../FooterNew/FooterNew'
import GetStarted from '../GetStarted/GetStarted'
import Routers from '../../routers/Routers'
import { useLocation } from "react-router-dom";
import { Base } from '../../functionHelper/APIFunction';

const Layout = () => {
  const { pathname } = useLocation();
  const token = JSON.stringify(Base.getCookie("token"));

  return <>

    <div>
    {   pathname !== "/payment/paypal/success" && pathname !== "/payment/paypal/cancel" && <Header />} 
        <Routers/>
    {   pathname !== "/payment/paypal/success" && pathname !== "/payment/paypal/cancel" && <GetStarted />}
    {   pathname !== "/payment/paypal/success" && pathname !== "/payment/paypal/cancel" && <Footer />}

    </div>
  </>
  
}

export default Layout
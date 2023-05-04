import React from 'react'
import Header from '../HeaderNew/HeaderNew'
import Footer from '../Footer/Footer'
import GetStarted from '../GetStarted/GetStarted'
import Routers from '../../routers/Routers'
import { useLocation } from "react-router-dom";
import { Base } from '../../functionHelper/APIFunction';

const Layout = () => {
  
  const { pathname } = useLocation();

  return <>

    <div>
    { pathname !== "/login_with_chatbot" ? <Header/> : null}

        <Routers/>
    { pathname !== "/login_with_chatbot" ? <Footer/> : null}
    </div>
  </>
  
}

export default Layout
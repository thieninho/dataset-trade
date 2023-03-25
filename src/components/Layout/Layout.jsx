import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Routers from '../../routers/Routers'
import { useLocation } from "react-router-dom";


const Layout = () => {
  const { pathname } = useLocation();
  return <>

    <div>
    {pathname !== "/login" && pathname !== "/signup" && <Header />}
        <Routers/>
    {pathname !== "/login" && pathname !== "/signup" && <Footer />}

    </div>
  </>
  
}

export default Layout
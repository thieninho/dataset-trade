import React from 'react'
import Hero from '../components/Footer/Hero/Hero'
import Services from '../components/Services/Services';
import Residencies from '../components/Residencies/Residencies';
import Value from '../components/Value/Value';
import Contact from '../components/Contact/Contact';
import Helmet from '../components/Helmet/Helmet';
import GetStarted from '../components/GetStarted/GetStarted';
import CommonSection from '../components/UI/CommonSection2';
import ProductHome from '../components/ProductHome/ProductHome';

const HomeNewVer = () => {
  return (
    <Helmet title={'Home'}>
  <div className="App">
    <div>
      <div className='white-gradient'/>
    
    <Hero/>
    </div>
    <CommonSection title="DATA ALWAYS BY YOUR SIDE"/>
    <ProductHome/>
    {/* <Residencies/> */}
    <Value/>
    <Services/>

    <Contact/>

    </div>
    <GetStarted/>
    </Helmet>
    
  );
}

export default HomeNewVer
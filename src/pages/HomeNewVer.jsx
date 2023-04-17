import React from 'react'
import Hero from '../components/Footer/Hero/Hero'
import Services from '../components/Services/Services';
import Residencies from '../components/Residencies/Residencies';
import Value from '../components/Value/Value';
import Contact from '../components/Contact/Contact';
import Helmet from '../components/Helmet/Helmet';

const HomeNewVer = () => {
  return (
    <Helmet title={'Home'}>
  <div className="App">
    <div>
      <div className='white-gradient'/>
    
    <Hero/>
    </div>
    <Services/>
    <Residencies/>
    <Value/>
    <Contact/>
    </div>
    </Helmet>
  );
}

export default HomeNewVer
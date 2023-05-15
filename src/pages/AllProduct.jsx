import React, {useEffect} from 'react'
import CommonSection from '../components/UI/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import ProductAll from '../components/ProductHome/ProductAll'
const AllProduct = () => {
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
  return (
    <Helmet title="All Dataset">
    <CommonSection title="All Dataset" />
    <ProductAll/>
    </Helmet>
  )
}

export default AllProduct
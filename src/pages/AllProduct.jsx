import React from 'react'
import CommonSection from '../components/UI/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import ProductAll from '../components/ProductHome/ProductAll'
const AllProduct = () => {
  return (
    <Helmet title="All Dataset">
    <CommonSection title="All Dataset" />
    <ProductAll/>
    </Helmet>
  )
}

export default AllProduct
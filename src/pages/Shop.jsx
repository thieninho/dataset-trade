import React, {useState} from 'react';

import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import '../styles/shop.css'

import products from '../assets/data/products'
import ProductsLists from '../components/UI/ProductsList'

const Shop = () => {

  const [productsData, setProductsData] = useState(products)

  const handleSearch = e=>{
    const searchTerm = e.target.value
    const searchedProducts = products.filter(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()))
    setProductsData(searchedProducts)
  }

  return ( <Helmet title='Shop'>
    <CommonSection title='Products' />

    <section>
      <Container>
        <Row>
          <Col lg='3' md='6' className='text-end'>
            <div className="filter__widget">
              <select>
                <option>Sort By</option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select>
            </div>
          </Col>
          <Col lg='6' md='12'>
            <div className="search__box">
              <input type='text' placeholder='Search...'
              onChange={handleSearch}
              />
              <span>
                <i class="ri-search-line"></i>
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>

    <section>
      <Container>
        <Row>
          {
            productsData.length === 0? <h1 className='text-center fs-4'>No datasets are found</h1>
            : <ProductsLists data={products}/>
          }
        </Row>
      </Container>
    </section>

  </Helmet>
  );
}

export default Shop
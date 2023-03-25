import React, {useState, useEffect} from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"
import { GET } from "../functionHelper/APIFunction";
import { BASE_URL} from "../global/globalVar";
import products from '../assets/data/products'
import { Container, Row, Col} from "reactstrap"
import heroImg from '../assets/images/Heroo.svg'

import Services from '../services/Services'
import ProductsList from '../components/UI/ProductsList'
import '../styles/home.css'

const Home = () => {
  // const year = new Date().getFullYear()
  const [data, setData] = useState([])

  const getData = () => {
    let apiURL = "api/dataset_collection/64076f2a9ede6ac346c8da3f";
    GET(
      BASE_URL + apiURL
    ).then((res) => {
      console.log(res.payload);
      setData();
    });
  };
  useEffect(() => getData(), [data]);


  return <Helmet title={'Home'}>
    <section className='hero__section'>
      <Container>
        <Row>
          <Col lg='6' md='6'>
            <div className="hero__content">
              {/* <p className="hero_subtitle">Trending dataset in {year}</p> */}
              <h2 style={{fontSize: "4rem", fontWeight: "400", color: "black"}}>Get The Best dataset Services</h2>
              <p className='mt-3'
              style={{fontSize: "1.12rem", fontWeight: "400", color: "black"}}
              >Find the best dataset services you need to help you successfully meet your project planning goals and deadline</p>
              <motion.button
              whileTap={{ scale: 1.2 }} className="buy__btn"
              >
                <Link to='/shop'
                style={{fontSize: "0.8rem", fontWeight: "600", color: "#b721ff"}}
                >SHOP NOW </Link>
              </motion.button>

            </div>
          </Col>

          <Col lg='6' md='6'>
            <div className="hero__img">
              <img src={heroImg} alt="" />
            </div>
          </Col>

        </Row>
      </Container>
    </section>

    <Services/>
    <section className="trending__products">
      <Container>
        <Row>
        <Col lg="12" className="text-center">
          <h2 className="section__title">Best Sales Datasets</h2>
        </Col>
          <ProductsList data={products}/>

        
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Home
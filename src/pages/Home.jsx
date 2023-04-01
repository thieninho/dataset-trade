import React, {useState, useEffect} from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"
import { POST} from "../functionHelper/APIFunction";
import { BASE_URL} from "../global/globalVar";
import { Container, Row, Col} from "reactstrap"
import heroImg from '../assets/images/Heroo.svg'
import Services from '../services/Services'
import ProductsList from '../components/UI/ProductsList'
import '../styles/home.css'
import whyImg from '../assets/images/section1.gif'
const Home = () => {
  const [data, setData] = useState([])
  const getData = (page) => {
    let apiURL = "api/dataset_collection/";
    let body = {
      page: 1,
      size: 8,
    };
    POST(
      BASE_URL + apiURL, JSON.stringify(body)
    ).then((res) => {
      console.log(res.payload.items)
      setData(res.payload.items)

    });
  };
  useEffect(() => getData(), []);


  return <Helmet title={'Home'}>
    <section className='hero__section'>
      <Container>
        <Row>
          <Col lg='6' md='6'>
            <div className="hero__content">
              {/* <p className="hero_subtitle">Trending dataset in {year}</p> */}
              <h2 style={{fontSize: "4rem", fontWeight: "400", color: "#076585"}}>Get The Best dataset Services</h2>
              <p className='mt-3'
              style={{fontSize: "1.12rem", fontWeight: "400", color: "#076585"}}
              >Find the best dataset services you need to help you successfully meet your project planning goals and deadline</p>
              <motion.button
              whileTap={{ scale: 1.2 }} className="buy__btn"
              >
                <Link to='/shop'
                style={{fontSize: "0.8rem", fontWeight: "600", color: "#fff"}}
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
           <ProductsList data={data}/>
        </Row>
        <Row lg="6" md="6">
              <img src={whyImg} alt="delivery" className="w-100" />
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Home
import React, {useState, useEffect} from 'react'
import Helmet from '../components/Helmet/Helmet'
import { POST} from "../functionHelper/APIFunction";
import { BASE_URL} from "../global/globalVar";
import { Container, Row, Col} from "reactstrap"
import heroImg from '../assets/images/Heroo.svg'
import heroImg2 from '../assets/images/chatbot.png'
import Services from '../services/Services'
import ProductsList from '../components/UI/ProductsList'
import '../styles/home.css'
import whyImg from '../assets/images/section1.gif'
const Home = () => {
  const [data, setData] = useState()
  const getData = (page) => {
    if (page === undefined) page = 1;
    let apiURL = "api/dataset_collection/";
    let body = {
      page: page,
      size: 4,
    };
    POST(
      BASE_URL + apiURL, JSON.stringify(body)
    ).then((res) => {
      setData(res.payload.items)
    })
    .catch((err)=> {
      console.log(err)
    })
  };
  useEffect(() => getData(), []);


  return <Helmet title={'Home'}>
    <section className='hero__section'>
      <Container>
        <Row>
        <div className="hero__content">
              <h2 style={{fontSize: "5rem", fontWeight: "900", color: "#304352"}}>DATASET SHOP</h2>
              <p className=''
              style={{fontSize: "1rem", fontWeight: "300", color: "#304352"}}
              >Discover or build your own legally clean datasets of people, objects and scenes for Machine Learning and AI.</p>
              {/* <motion.button
              whileTap={{ scale: 1.2 }} className="buy__btn"
              >
                <Link to='/shop'
                style={{fontSize: "0.8rem", fontWeight: "600", color: "#fff"}}
                >SHOP NOW </Link>
              </motion.button> */}

            </div>
        </Row>
        <Row>
          
          
          <Col lg='6' md='6'>
          

            <div className="hero__img m-t-20">
              <img src={heroImg2} alt="" />
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
    <section className='trending__service'>
    <Services/>
    </section>
    <section className="trending__products">
      
      <Container>
        <Row>
       

        <Col lg="12" className="text-center">
          <h2 className="section__title p-b-40">Best Sales Datasets</h2>
        </Col>
           <ProductsList data={data}/>
        </Row>
        
      </Container>
    </section>
    <Row lg="6" md="6">
              <img src={whyImg} alt="delivery" className="w-100" />
        </Row>
  </Helmet>
}

export default Home
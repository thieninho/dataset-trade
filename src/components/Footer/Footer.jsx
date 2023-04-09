import React from 'react'
//import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import logo from '../../assets/images/logo.png';
import "./footer.css"


const Footer = () => {
  return <footer className='footer'>
    <Container>
      <Row>
        <Col lg='3' md='4' sm='6'>
        <div className='footer__logo text-start'>
          <img src= {logo} alt="logo" />
            <h5>DATA EVERYWHERE</h5>
            <p>Best choice for you.</p>
        </div>
        </Col>

        <Col lg='3' md='4' sm='6'>
        <h5 className='footer_title'>Business hours</h5>
        <ListGroup className='deliver_time-list'>
          <ListGroupItem className='delivery__time-item border-0 ps-0'>
            <span> Monday - Friday </span>
            <p>8:00am - 11:00pm</p>
          </ListGroupItem>
          <ListGroupItem className='delivery__time-item border-0 ps-0'>
            <span> Saturday - Sunday </span>
            <p>10:00am - 6:00pm</p>
          </ListGroupItem>
        </ListGroup>
        </Col>
        

        <Col lg='3' md='4' sm='6'>
        <h5 className='footer_title'>Contact</h5>
        <ListGroup className='deliver_time-list'>
        <ListGroupItem className='delivery__time-item border-0 ps-0'>
            <p>Address: Ho Chi Minh city, Viet Nam</p>
          </ListGroupItem>
          <ListGroupItem className='delivery__time-item border-0 ps-0'>
            <span>Phone: 0977214077</span>
          </ListGroupItem>
          <ListGroupItem className='delivery__time-item border-0 ps-0'>
            <span>Email: lil.thieninho@gmail.com</span>
          </ListGroupItem>
        </ListGroup>
        </Col>

        <Col lg='3' md='4' sm='6'>
        <h5 className='footer_title'>Useful link:</h5>
        <ListGroup className='deliver_time-list'>
        <ListGroupItem className='delivery__time-item border-0 ps-0'>
            <p>Shop</p>
          </ListGroupItem>
          <ListGroupItem className='delivery__time-item border-0 ps-0'>
            <p>Cart</p>
          </ListGroupItem>
          <ListGroupItem className='delivery__time-item border-0 ps-0'>
            <p>Login</p>
          </ListGroupItem>
          <ListGroupItem className='delivery__time-item border-0 ps-0'>
            <p>Privacy Policy</p>
          </ListGroupItem>
        </ListGroup>
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col lg='6' md='6'>
          <p className='copyright__text'>
            Copyright - 2023, made by Thieninho. All Right Reserved.
          </p>
        </Col>
        <Col lg='6' md='6'>
          <div className="social__links d-flex align-items-center gap-4 justify-content-end">
            <p className='m-0'>Follow us: </p>
            <span> <i className="ri-facebook-line"></i></span>
            <span> <i className="ri-github-line"></i></span>
            <span> <i className="ri-instagram-line"></i></span>
            <span> <i className="ri-linkedin-line"></i></span>
          </div>
        </Col>
      </Row>
    </Container>
  </footer>
}

export default Footer
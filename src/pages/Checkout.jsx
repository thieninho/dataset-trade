import React from 'react'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'

const Checkout = () => {
  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout"/>
      <section>
        <Container>
          <Row>
            <Col lg='8'>
              <h6 className='mb-4 fw-bold'>Billing Information</h6>
            </Col>
            <Form>
              <FormGroup className='form__group'>
                <input type='text' placeholder='Enter your name'/>
              </FormGroup>

              <FormGroup className='form__group'>
                <input type='number' placeholder='Enter your phone'/>
              </FormGroup>

              <FormGroup className='form__group'>
                <input type='text' placeholder='Enter your email'/>
              </FormGroup>
            </Form>
            <Col lg='4'></Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Checkout
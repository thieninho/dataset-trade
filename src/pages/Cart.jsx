import React from 'react'
import '../styles/cart.css'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import { Container, Row, Col } from 'reactstrap';
import { motion } from 'framer-motion';
import {cartActions} from '../redux/slices/cartSlice'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const Cart = () => {

  const cartItems = useSelector((state) => state.cart.cartItems)
  const totalAmount = useSelector((state) => state.cart.totalAmount)
  return (
  <Helmet title='Cart'>
    <CommonSection title='Shopping Cart'/>
    <section>
      <Container>
        <Row>
          <Col lg='9'>
            {cartItems.length===0 ? (
              <h2 className='fs-4 text-center'>No item added to the cart</h2> ): (
              <table className='table bordered'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {
                cartItems.map((item, index) =>(
                  <Tr item={item} key={index}/>
                ))
              }
            </tbody>
          </table>
            )}
  
          </Col>
          <Col lg='3'>
            <div>
              <h6 className='d-flex align-items-center justify-content-between'>Subtotal
              <span className='fs-4 fw-bold'>${totalAmount}</span>
              </h6>
              
            </div>
            <div>
              <button className="buy__btn w-100 mb-4"> 
              <Link to='/shop'> Continue Shopping</Link></button>
              
              <PayPalScriptProvider
        options={{ "client-id": "AVNbpleF-rB5-9TunkBQpwod45gN-4QGZTwxa3L5gtMFOX36Dx8mQZ0lBgQRccl9Dt1je3cBxymUu8-9" }}
      >
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: totalAmount,
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            const details = await actions.order.capture();
            const name = details.payer.name.given_name;
            alert("Transaction completed by " + name);
          }}
        />
      </PayPalScriptProvider>
            </div>
          
          </Col>
        </Row>
      </Container>
    </section>

  </Helmet>
  );
};

const Tr = ({item}) =>{

  const dispatch = useDispatch()
  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id))
  }

  return (
    <tr>
      <td><img src={item.imgUrl} alt=""/></td>
      <td>{item.productName}</td>
      <td>${item.price}</td>
      <td>{item.quantity}</td>
      <td><motion.i 
        whileTap={{scale: 1.2}}
        onClick={deleteProduct}
        class="ri-delete-bin-line"
        ></motion.i>
      </td>
    </tr>
  );
}

export default Cart
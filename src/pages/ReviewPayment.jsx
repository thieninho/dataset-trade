import React, {useState, useEffect} from 'react';
import '../styles/cart.css'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import { Container, Row, Col } from 'reactstrap';
import { GET, POST, Base} from "../functionHelper/APIFunction";
import { BASE_URL} from "../global/globalVar";
import { useNavigate } from 'react-router-dom';
import loading from '../assets/images/loading.gif'
import { toast } from "react-toastify"

const ReviewPayment = () => {
  const [show, setShow] = useState(true)
  const [showLoading, setShowLoading] = useState(false)

    let paymentId = Base.getAllUrlParams().paymentId
    let PayerID = Base.getAllUrlParams().PayerID
    const [data, setData] = useState([])
    const navigate = useNavigate()

    const Cancel = () => {
      navigate('/payment/paypal/cancel')
    }
    const addData = () => {
      let apiURL = "api/payment/paypal/cart_items/";
        GET(
          BASE_URL + apiURL + paymentId
        ).then((res) => {  
          if (res.status.http_status === "OK")
            setData(res.payload)
            setTimeout(()=>{
              setShowLoading(false)
            }, 5000)
            if (res.status.http_status !== "OK")
          {
            setTimeout(()=>{
              setShow(true)
              setShowLoading(false)
            }, 2000)

		      toast.error("Please choose product!")
          }
        })
      .catch ((e) => {
        console.log(e);
      })
    };
    var size = data.length
    console.log(size)

    const payNow = () => {
      let apiURL = "api/payment/paypal/execute_payment";
      let body = {
        payment_id: paymentId,
        payer_id: PayerID
      };
      POST(
        BASE_URL + apiURL, JSON.stringify(body)
      ).then((res) => {
        if(res.status.http_status === "OK"){
          window.location.href = "/payment/paypal/success"
        }
      });
      
    };
useEffect(()=>{
  addData()
}, [])
function payMoment(){
  payNow()
  setShow(!true)
  setShowLoading(!false)
}

    const totalAmount = data.reduce((total, item) => total + Number(item.dataset_collection.amount), 0)


    
  return (
    <Helmet title='Review Payment'>
    <CommonSection title='REVIEW PAYMENT'/>
    <section className='pagi'>
      <Container>
        <Row>
          {/* <h2>{addData()}</h2> */}
          <Col lg='9'>
            {data.length===0 ? (
              <div>
              <table className='table bordered'>
               
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
              </tr>
            </thead>
            </table>
            <h2 className='text-center m-t-100 m-b-100'>No items purchased</h2> 
            </div>
              ): (
              <table className='table bordered'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              {
                data.map((item, index) =>(
                  <tr item={item} key={index}>
                  <td><img src={item.dataset_collection.picture} alt=""/></td>
                  <td>{item.dataset_collection.name}</td>
                  <td  style={{color:"orange"}}>${item.dataset_collection.amount}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
            )}
  
          </Col>
          <Col lg='3'>
          <div>
            
            <h6 className='d-flex align-items-center justify-content-between m-t-20'>Total price:
            <span className='fs-4 fw-bold'  style={{color:"orange"}}>${totalAmount}</span>
            </h6>
          </div>
          {show === true}
          {show && <div>
            <div>
              <button className="button-background-move buy__btn w-100 mb-4 m-t-20" style={{color: "#253b80", fontSize: "20px", fontWeight: "700"}}
              onClick={payMoment}
              > 
               Payment Confirm</button>
            </div>
            <div>
              <button className="button-background-move buy__btn w-100 mt-2" style={{background: "#fff" ,color: "#253b80", fontSize: "20px", fontWeight: "700", border: "1px solid #4161df"}}
              onClick={Cancel}> 
               Cancel</button>
            </div>
            </div>}
            <div>
            </div>
            <div className='p-l-75'>
            {showLoading === true}
            {showLoading && <img src={loading} alt=""  style={{width: "70%"}}/> }
            </div>
          </Col>
        </Row>
        <Row>
     
        </Row>
        
      </Container>
    </section>

  </Helmet>
  )
}

export default ReviewPayment
import React from 'react'
import "../styles/login/success.css"
import Helmet from '../components/Helmet/Helmet'
const Success = () => {
  return (
    <>
    <Helmet title='Success'>
 <div className="container">
   <div className="row">
      <div className="col-md-6 mx-auto mt-5">
         <div className="payment">
            <div className="payment_header">
               <div className="check"><i className="ri-checkbox-circle-fill"></i></div>
            </div>
            <div className="content1">
               <h1>Payment Success !</h1>
               <p>I just wanted to drop you a quick note and let you know that I received your payment. Thank you so much. I really appreciate it.</p>
               <p>Have a great day!</p>
               <p>[Data-everywhere Shop]</p>
               <a href="/homenew">Go to Home</a>
            </div>
            
         </div>
      </div>
   </div>
</div>
</Helmet>
    </>
  )
}

export default Success
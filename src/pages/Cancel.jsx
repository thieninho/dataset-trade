import React from 'react'
import "../styles/login/success.css"
import Helmet from '../components/Helmet/Helmet'
const Cancel = () => {
  return (
    <>
    <Helmet title='Fail'>
 <div className="container">
   <div className="row">
      <div className="col-md-6 mx-auto mt-5">
         <div className="payment">
            <div className="payment1_header">
               <div className="check1"><i className="ri-close-circle-fill"></i></div>
            </div>
            <div className="content2">
               <h1>Payment failure !</h1>
               <p>Don't worry. Please try your payment again over the next few days.</p>
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

export default Cancel
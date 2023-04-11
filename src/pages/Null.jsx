import React from 'react'
import "../styles/login/success.css"
import Helmet from '../components/Helmet/Helmet'
const Null = () => {
  return (
    <>
    <Helmet title='Unknown page'>
        <section style={{background:"linear-gradient(to right, #bbd5de, #076585)"}}>
 <div class="container" style={{height: "500px"}}>
   <div class="row">
      <div class="col-md-6 mx-auto mt-5">
         <div class="payment">
            <div class="payment1_header">
               <div class="check1"><i class="ri-checkbox-circle-fill"></i></div>
            </div>
            <div class="content2">
               <h1>Unknown Page !</h1>
               <p>Maybe the link is broken or the page has been removed. </p>
               <p>Please check that the link you are trying to open is correct.</p>
               <p>[Data-everywhere Shop]</p>
               <a href="/home">Go to Home</a>
            </div>
            
         </div>
      </div>
   </div>
</div>
</section>
</Helmet>
    </>
  )
}

export default Null
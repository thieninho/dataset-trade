import React from 'react'
import "../styles/login/success.css"
const Cancel = () => {
  return (
    <>
 <div class="container">
   <div class="row">
      <div class="col-md-6 mx-auto mt-5">
         <div class="payment">
            <div class="payment1_header">
               <div class="check1"><i class="ri-checkbox-circle-fill"></i></div>
            </div>
            <div class="content2">
               <h1>Payment failure !</h1>
               <p>Don't worry. Please try your payment again over the next few days.</p>
               <p>Have a great day!</p>
               <p>[Data-everywhere Shop]</p>
               <a href="/home">Go to Home</a>
            </div>
            
         </div>
      </div>
   </div>
</div>
    </>
  )
}

export default Cancel
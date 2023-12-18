import React from 'react'
import "../styles/login/success.css"
import Helmet from '../components/Helmet/Helmet'
const Null = () => {
  return (
    <>
    <Helmet title='Unknown page'>
        <section style={{background:"#fff"}}>
 <div className="container" >
   <div className="row">
      <div className="col-md-6 mx-auto mt-5">
         <div className="payment">
            <div className="payment1_header">
               <div className="check1"><i className="ri-checkbox-circle-fill"></i></div>
            </div>
            <div className="content2">
               <h1>Unknown Page !</h1>
               <p>Maybe the link is broken or the page has been removed. </p>
               <p>Please check that the link you are trying to open is correct.</p>
               <p>[Data-everywhere Shop]</p>
               <a href="/homenew">Go to Home</a>
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
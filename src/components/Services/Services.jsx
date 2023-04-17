import React from 'react'
import "./Services.css"
import Support from "../../assets/public/1.png"
import Return from "../../assets/public/2.png"
import Secure from "../../assets/public/3.png"
import Back from "../../assets/public/4.png"

const Services = () => {
  return (
    <section className='c-wrapper'>
        <div className='paddings innerWidth flexCenter c-container'>
            <img src={Support} alt="" />
            <img src={Return} alt="" />
            <img src={Secure} alt="" />
            <img src={Back} alt="" />
        </div>
    </section>
  )
}

export default Services
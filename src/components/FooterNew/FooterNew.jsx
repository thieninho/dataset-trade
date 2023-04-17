import React from 'react'
import logo from "../../assets/public/minilogo.svg"
import './FooterNew.css'
const FooterNew = () => {
  return (
    <section className="f-wrapper">
        <div className="paddings innerWidth flexCenter f-container">
            <div className="flexColStart f-left">
                <h3 className='primaryText'><img src={logo} alt="" width={120} />DATA EVERYWHERE</h3>
                <span className="secondaryText">
                Our vision is to make all people have
the best data for them to use
                </span>
            </div>
            <div className="flexColStart f-right">
                <span className='primaryText'>Information</span>
                <span className='secondaryText'> Thu Duc City, Ho Chi Minh City</span>
                <div className="flexCenter f-menu">
                    <span>Home</span>
                    <span>Shop</span>
                    <span>Cart</span>
                    <span>Purchased</span>
                </div>
            </div>
        </div>
    </section>
  )
}

export default FooterNew
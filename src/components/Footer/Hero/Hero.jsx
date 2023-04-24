import React, {useState, useEffect} from 'react';
import heroImg from "../../../assets/images/3.gif"
import { NavLink, useNavigate} from 'react-router-dom';
import CommonSection from "../../UI/CommonSection"
import "./Hero.css"
import "../../../App.css"

import { motion } from 'framer-motion'

const Hero = () => {
  const navigate = useNavigate()
  const navigateToShop = () =>{
    navigate('/shop')
  }
 
  return (
    <section className='hero-wrapper'>
        <div className="paddings innerWidth flexCenter hero-container">
                <div className='flexColStart hero-left'>
                    <div className='hero-title'>
                        <div className="orange-circle"/>
                        <motion.h1
                        initial={{y: "2rem", opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{
                            duration: 2,
                            type: "spring"
                        }}
                        >DATA <br /> EVERYWHERE <br /> SHOP</motion.h1>
                        
                    </div>
                    <div className="flexColStart hero-des">
                        <span className='secondaryText'>Find a variety of data that suit you very easily</span>
                        <span className='secondaryText'>Forget all difficulties in finding a data for you.</span>
                    </div>
                    <div className="flexCenter search-bar" >
                    <button className='glow-on-hover' onClick={navigateToShop}>
                        <i class="ri-shopping-cart-fill"></i> &nbsp;
                           SHOPPING NOW</button>
                    </div>
                </div>

                <div className="flexCenter hero-right">
                    <motion.div 
                    initial={{x: "7rem", opacity: 0}}
                    animate={{x: 0, opacity: 1}}
                    transition={{
                        duration: 2,
                        type: "spring"
                    }}
                    className="image-container">
                        <img src={heroImg} alt="" />
                    </motion.div>
                </div>
            </div>      

    </section>
  )
}

export default Hero
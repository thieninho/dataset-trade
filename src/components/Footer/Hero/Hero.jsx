import React, {useState, useEffect} from 'react';
import heroImg from "../../../assets/images/3.gif"
import {HiSearch} from 'react-icons/hi'

import "./Hero.css"
import "../../../App.css"

import { motion } from 'framer-motion'

const Hero = () => {
 
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
                    <form className="flexCenter search-bar" >
                        <HiSearch color="var(--blue)" size={25}/>
                        <input type='text' />
                        <button className='button'>Search</button>
                    </form>
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
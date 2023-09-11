import React from 'react'
import './Contact.css'
import ContactImg from '../../assets/images/1.gif'
import { MdCall } from 'react-icons/md'
import { BsFillChatDotsFill} from 'react-icons/bs'
import {HiChatBubbleBottomCenter} from 'react-icons/hi2'

const Contact = () => {
  return (
    <section className="c-wrapper">
        <div className="paddings innerWidth flexCenter c-container">
            <div className="flexColStart c-left">
                <span className='orangeText'>Our Contacts</span>
                <span className='primaryText'>Easy to Contact us</span>
                <span className='secondaryText'> We always ready to help by providijng the best services for you. We beleive a good blace to live can make your life better</span>
                <div className="flexColStart contactModes">
                    <div className='flexStart row'>
                        <div className="flexColCenter mode">
                            <div className="flexStart">
                                <div className="flexCenter icon">
                                    <MdCall size={25}/>
                                </div>
                                <div className="flexColStart detail">
                                    <span className='primaryText'>Call</span>
                                    <span className='secondaryText'>0977 214 077</span>
                                </div>
                            </div>
                            <div className='flexCenter button'>
                                Call Now
                            </div>
                        </div>

                        <div className="flexColCenter mode">
                            <div className="flexStart">
                                <div className="flexCenter icon">
                                    <BsFillChatDotsFill size={25}/>
                                </div>
                                <div className="flexColStart detail">
                                    <span className='primaryText'>Chat</span>
                                    <span className='secondaryText'>0977 214 077</span>
                                </div>
                            </div>
                            <div className='flexCenter button'>
                                Chat Now
                            </div>
                        </div>

                        <div className="flexColCenter mode">
                            <div className="flexStart">
                                <div className="flexCenter icon">
                                    <HiChatBubbleBottomCenter size={25}/>
                                </div>
                                <div className="flexColStart detail">
                                    <span className='primaryText'>Message</span>
                                    <span className='secondaryText'>Nguyen Thanh Thien</span>
                                </div>
                            </div>
                            <div className='flexCenter button'>
                                Message Now
                            </div>
                        </div>

                        <div className="flexColCenter mode">
                            <div className="flexStart">
                                <div className="flexCenter icon">
                                    <HiChatBubbleBottomCenter size={25}/>
                                </div>
                                <div className="flexColStart detail">
                                    <span className='primaryText'>Mail</span>
                                    <span className='secondaryText'>leothien2605</span>
                                </div>
                            </div>
                            <div className='flexCenter button'>
                                Mail Now
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flexEnd c-right">
                <div className="image-container">
                    <img src={ContactImg} alt="" />
                </div>
            </div>
        </div>
    </section>
  )
}

export default Contact
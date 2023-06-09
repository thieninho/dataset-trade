import React, {useState, useEffect} from 'react'
import { POST} from "../../functionHelper/APIFunction";
import { BASE_URL} from "../../global/globalVar";
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react'
import './swiper.css'
import './Residencies.css'
import { Link } from 'react-router-dom'

import { sliderSettings } from '../../utils/common'
const Residencies = (items) => {

const [data, setData] = useState()
  const getData = (page) => {
    if (page === undefined) page = 1;
    let apiURL = "api/dataset_collection/";
    let body = {
      page: page,
      size: 24,
    };
    POST(
      BASE_URL + apiURL, JSON.stringify(body)
    ).then((res) => {
      setData(res.payload.items)
    })
    .catch((err)=> {
      console.log(err)
    })
  };
  useEffect(() => getData()
  , []);
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };



  return (
    <section className='r-wrapper'>
        <div className="paddings innerWidth r-container">
            <div className="r-head flexColStart">
                <span className='orangeText'>Best Choices</span>
                <span className='primaryText'>Popular Data</span>

            </div>

            <div>
          {data?.length === 0 ? (
             <h2 className='text-center m-t-100'>No item added to the cart</h2> 

          ) : (
            <Swiper {...sliderSettings}>
            <SliderButtons/>
                { 
                    data?.map((items, i)=> (
                        <SwiperSlide key={i} >
                            <div className="flexColStart r-card" >
                              <div className='product__img'>
                            <Link to={`/shop/${items.id}`}> <img src={items.picture} alt="home"/></Link>
                            </div>
                            
                                <h3 className='primaryText'>{items.name}</h3>
                                <span className="secondaryText r-price"  style={{color:"orange"}}>
                                    <span style={{color:"orange"}}>$</span>
                                    <span className='m-r-140'>{items.amount}</span>
                                    {/* {isHovering && (   <span className='price' whileTap={{scale: 1.2}} onClick={window.open(BASE_URL + "api/dataset_collection/preview/" + items.id)}>
              <i class="ri-eye-fill"></i>
            </span> )} */}
                                </span>
                               
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            )}
            </div>
        </div>
    </section>
  )
}

export default Residencies

const SliderButtons = () =>{
    const swiper = useSwiper();
    return (
        <div className="flexCenter r-button">
           <button onClick={()=> swiper.slidePrev()}>&lt;</button>
           <button onClick={()=> swiper.slideNext()}>&gt;</button>
        </div>
    )

}
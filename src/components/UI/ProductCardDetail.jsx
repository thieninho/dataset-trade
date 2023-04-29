import React, {useState} from 'react'
import { motion } from "framer-motion"
import '../../styles/product-card.css'
import { Col } from "reactstrap"
import { Link } from 'react-router-dom'
import { BASE_URL} from "../../global/globalVar";

const ProductCard = ({items}) => {

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  }
const handlePreview =()=> {
  window.open(BASE_URL + "api/dataset_collection/preview/" + items.id)
    
}; 
const reload = () =>{
  window.location.reload(false)
}

  return (
    <Col lg='3' md='4' className='mb-2'>
    <div className="product__item" onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}>
        <div className="product__img" onClick={reload}>
        <Link to={`/shop/${items.dataset_category_id}/${items.id}`}> <motion.img  whileHover={{scale: 0.9}} src={items.picture} alt="" /></Link>
        </div>
        <div className="p-2 product__info" onClick={reload}>
        <h3 className="product__name" >
            <Link to={`/shop/${items.dataset_category_id}/${items.id}`}>{items.name}</Link>
        </h3>
        </div>
        <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
          
            <span className="price m-r-90" style={{color:"orange"}}>${items.amount}</span>
            {isHovering && (
            <motion.span className='price' whileTap={{scale: 1.2}} onClick={handlePreview} >
              <i class="ri-eye-fill"></i>
            </motion.span>
            )
            }
            

        </div>
    </div>
    </Col>
  )
}

export default ProductCard
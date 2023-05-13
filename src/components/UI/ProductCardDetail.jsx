import React, {useState} from 'react'
import { motion } from "framer-motion"
import '../../styles/product-card.css'
import { Col } from "reactstrap"
import { Link } from 'react-router-dom'
import { BASE_URL} from "../../global/globalVar";
import { POST } from '../../functionHelper/APIFunction'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../redux/slices/cartSlice'
import { toast } from "react-toastify"

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
const addData = (items) => {
    
  let apiURL = "api/cart_item/add";
  let body = {
      dataset_collection_id: items.id
  };
  POST(
    BASE_URL + apiURL, JSON.stringify(body)
  ).then((res) => {
    if (res.status.http_status !== "OK")
    {
        toast.error("Dataset exist in your cart")
    }
    if (res.status.http_status === "OK")
    {
      toast.success("Product added successfully");
    }
  });
};
const dispatch = useDispatch()
const addToCart =()=> {
  dispatch(cartActions.addItem({
      id: items.id,
      name:items.name,
      amount: items.amount,
      picture: items.picture,
      short_description: items.short_description,
      description: items.description,
  })
  );
  
  addData(items);
 // window.location.reload(false);
}; 
const reload = () =>{
  window.location.reload(false)
}

  return (
    <Col lg='3' md='4' className='mb-2'>
    <div className="product__item" onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}>
        <div className="product__img" onClick={reload}>
        <Link to={`/shop/product_detail/${items.dataset_category_id}/${items.id}`}> <motion.img  whileHover={{scale: 0.9}} src={items.picture} alt="" /></Link>
        </div>
        <div className="p-2 product__info" onClick={reload}>
        <h3 className="product__name" >
            <Link to={`/shop/product_detail/${items.dataset_category_id}/${items.id}`}>{items.name}</Link>
        </h3>
        </div>
        <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
          
            <span className="price m-r-90" style={{color:"orange"}}>${items.amount}</span>
            {isHovering && (
              
              <motion.span className='price' whileTap={{scale: 1.2}} onClick={addToCart} >
               <i class="ri-add-circle-fill"></i>
              </motion.span>
              
              )
              }
            {/* {isHovering && (
            <motion.span className='price' whileTap={{scale: 1.2}} onClick={handlePreview} >
              <i class="ri-eye-fill"></i>
            </motion.span>
            )
            } */}

        </div>
    </div>
    </Col>
  )
}

export default ProductCard
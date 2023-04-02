import React from 'react'
import { motion } from "framer-motion"
import '../../styles/product-card.css'
import { Col } from "reactstrap"
import { Link } from 'react-router-dom'
import { toast } from "react-toastify"
import { POST} from "../../functionHelper/APIFunction";
import { BASE_URL} from "../../global/globalVar";
import { useDispatch } from 'react-redux'
import { cartActions } from '../../redux/slices/cartSlice'
import testImg from "../../assets/images/Hero4.png"

const ProductCard = ({items}) => {

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


  return (
    <Col lg='3' md='4' className='mb-2'>
    <div className="product__item">
        <div className="product__img">
            <motion.img whileHover={{scale: 0.9}} src={testImg} alt="" />
        </div>
        <div className="p-2 product__info">
        <h3 className="product__name">
            <Link to={`/shop/${items.id}`}>{items.name}</Link>
        </h3>
        </div>
        <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
            <span className="price">${items.amount}</span>
            <motion.span className='price' whileTap={{scale: 1.2}} onClick={addToCart}>
                <i class="ri-add-line"></i>
            </motion.span>
        </div>
    </div>
    </Col>
  )
}

export default ProductCard
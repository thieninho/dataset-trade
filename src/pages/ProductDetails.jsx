import React, {useState, useEffect} from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useParams } from 'react-router-dom'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import '../styles/product-details.css'
import {motion} from "framer-motion"
import { useDispatch } from 'react-redux'
import { cartActions } from "../redux/slices/cartSlice"
import { toast } from 'react-toastify'
import { POST, GET} from "../functionHelper/APIFunction";
import { BASE_URL} from "../global/globalVar";
import testImg from "../assets/images/Hero5.png"


const ProductDetails = ({items}) => {
const [tab, setTab] = useState('desc')
const dispatch = useDispatch()

const {id} = useParams()
const [data, setData] = useState([])
const [dataSize, setDataSize] = useState([])
const [name, setName] = useState("")
const [short_description, setShort_description] = useState("")
const [description, setDescription] = useState("")
const [picture, setPicture] = useState("")
const [preview, setPreview] = useState("")
const [amount, setAmount] = useState("")


const getData = () => {
    

  let apiURL = "api/dataset_collection/";
  let body = {
    page: 1,
    size: 4,
  };
  POST(
    BASE_URL + apiURL, JSON.stringify(body)
  ).then((res) => {
    setDataSize(res.payload.total_items)
    console.log(res.payload.total_items)
  });
};

const getDataSize = () => {

  let apiURL = "api/dataset_collection/";
  let body = {
    page: 1,
    size: dataSize,
  };
  POST(
    BASE_URL + apiURL, JSON.stringify(body)
  ).then((res) => {
    setData(res.payload.items)
    console.log(res.payload.items)
  });
};

const getDataDetail = () => {
  console.log("login")
  let apiURL = "api/dataset_collection/";
    GET(
      BASE_URL + apiURL + id
    ).then((res) => {
      console.log(res.payload.name);
      setName(res.payload.name);
      setShort_description(res.payload.short_description);
      setDescription(res.payload.description);
      setPicture(res.payload.picture);
      setPreview(res.payload.preview);
      setAmount(res.payload.amount);
    })
  .catch ((e) => {
    console.log(e);
  })
};

const addData = (items) => {
    
  let apiURL = "api/cart_item/add";
  let body = {
      dataset_collection_id: id
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
useEffect(() => getData(), []);
useEffect(() => getDataSize(), []);

useEffect(() => getDataDetail(), []);


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
  addData(items)
};
// useEffect(()=>{
//   window.scrollTo(0,0 );
// }, [data]);

  return <Helmet title={name}>
      <CommonSection/>

      <section className='pt-09'>
        <Container>
          <Row>
            <Col lg="6">
              <img src={testImg} alt="" />
            </Col>
            <Col lg="6">
              <div className="product__details">
                <h2>{name}</h2>
                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                  <div>
                    <span> <i class="ri-star-s-fill"></i></span>
                    <span> <i class="ri-star-s-fill"></i></span>
                    <span> <i class="ri-star-s-fill"></i></span>
                    <span> <i class="ri-star-s-fill"></i></span>
                    <span> <i class="ri-star-s-fill"></i></span> 
                  </div>
                  {/* <p>(<span>{avgRating}</span> ratings)</p> */}
                </div>
                <span className="product__price">${amount}</span>
                <p className='mt-3'>{short_description}</p>
                <motion.button whileTap={{scale: 1.2}} className="buy__btn" 
                style={{color: "#fff"}}
                onClick={addData}>Add to Cart</motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='pt-1'>
        <Container>
          <Row>
            <Col lg='12'>
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6 className={`${tab === "desc" ? "active__tab" : ""}`} onClick={()=> setTab('desc')}>Description</h6>
                <h6 className={`${tab === "rev" ? "active__tab" : ""}`} onClick={()=> setTab('rev')}>Reviews ({preview.length})</h6>
                <h6 className={`${tab === "pre" ? "active__tab" : ""}`} onClick={()=> setTab('pre')}>Preview</h6>
              </div>
              
            {
              tab==='desc' ? 
              <div className='tab__content mt-5'>
                <p>{description}</p>
              </div> : 
              <div className='tab__content mt-5'>
              <p>{preview}</p>
            </div>
              // <div className='product__review mt-5'>
              //   <div className="review__wrapper">
              //     <ul>
              //       {preview?.map((item, index) => (
              //         <li key={index} className='mb-4'>
              //           <h6>Thanh Thien</h6>
              //           <span>{item.rating} (rating)</span>
              //           <p>{item.text}</p>
              //         </li>
              //       ))}
              //     </ul>
              //     <div className='review__form'>
              //       <h4>Leave your experience</h4>
              //       <form action="" onSubmit={submitHandler}>
              //         <div className='form__group'>
              //           <input type="text" placeholder='Enter name' ref={reviewUser} required/>
              //         </div>
              //         <div className='form__group d-flex align-items-center gap-5 rating__group'>
              //           <motion.span whileTap={{scale:1.2}} onClick={()=> setRating(1)}>1 <i class="ri-star-s-fill"></i></motion.span>
              //           <motion.span whileTap={{scale:1.2}} onClick={()=> setRating(2)}>2 <i class="ri-star-s-fill"></i></motion.span>
              //           <motion.span whileTap={{scale:1.2}} onClick={()=> setRating(3)}>3 <i class="ri-star-s-fill"></i></motion.span>
              //           <motion.span whileTap={{scale:1.2}} onClick={()=> setRating(4)}>4 <i class="ri-star-s-fill"></i></motion.span>
              //           <motion.span whileTap={{scale:1.2}} onClick={()=> setRating(5)}>5 <i class="ri-star-s-fill"></i></motion.span>
              //         </div>
              //         <div className='form__group'>
              //           <textarea
              //           ref={reviewMsg}
              //           rows={4} type="text"
              //           placeholder='Review Message'
              //           required
              //           />
              //         </div>

              //         <motion.button whileTap={{scale:1.2}} type='submit' className='buy__btn'>Submit</motion.button>
              //       </form>
              //     </div>
              //   </div>
              // </div>
            }

            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
}

export default ProductDetails
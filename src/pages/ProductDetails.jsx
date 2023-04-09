import React, {useState, useEffect} from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useParams } from 'react-router-dom'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import '../styles/product-details.css'
import {motion} from "framer-motion"
import { toast } from 'react-toastify'
import { POST, GET} from "../functionHelper/APIFunction";
import { BASE_URL} from "../global/globalVar";
import testImg from "../assets/images/Hero5.png"
import { Base } from '../functionHelper/APIFunction'

const ProductDetails = () => {
const [tab, setTab] = useState('desc')

const {id} = useParams()
const [name, setName] = useState("")
const [short_description, setShort_description] = useState("")
const [description, setDescription] = useState("")
const [picture, setPicture] = useState("")
const [preview, setPreview] = useState("")
const [amount, setAmount] = useState("")
const [data, setData] = useState("")
const [dataDownload, setDataDownload] = useState([])
const [rating, setRating] = useState()

const getDataDetail = () => {
  
  let apiURL = "api/dataset_collection/";
    GET(
      BASE_URL + apiURL + id
    ).then((res) => {
      setName(res.payload.name);
      setShort_description(res.payload.short_description);
      setDescription(res.payload.description);
      setPicture(res.payload.picture);
      setPreview(res.payload.preview);
      setAmount(res.payload.amount);
      setData(res.payload)
      setDataDownload(res.payload.dataset_items)
      if (res.payload.purchased){
        setShow(false)
      }
      if (!res.payload.purchased){
        setShow1(false)
      }
    })
  .catch ((e) => {
    console.log(e);
  })
};
const [show, setShow] = useState(true)
const [show1, setShow1] = useState(true)

const token = JSON.stringify(Base.getCookie("token"));
 
const addData = () => {
    
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
  })
  .catch((err) => {
    console.log(err)
  })
};
const handleAddData =()=>{
  if (token === "null")
  {
    toast.error("Please login with your account")
  }
  addData()
}

useEffect(() => getDataDetail(), []);

const handleDownload = (datasetItemId) => {
  let apiURL = "api/file/?path=";
  if (data == null || 
    data.dataset_items == null || 
    data.dataset_items === []) {
        return;
    }

var path = null;
for (var i=0; i< data.dataset_items.length; i++) {
    if (data.dataset_items[i].id === datasetItemId) {
        path = data.dataset_items[i].path;
        break;
    }
}


 if (path == null) return;
 window.location.href = BASE_URL + apiURL + path;

}

const handlePreview =()=> {
  window.open = BASE_URL + "api/dataset_collection/preview/" + id;
    
}; 
  return <Helmet title={name}>
      <CommonSection/>

      <section className='section__product pt-09'>
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
                style={ {width:"150px"}}
                onClick={handlePreview}>Preview</motion.button>
                <div>
                {show === false}  
                {show && <motion.button whileTap={{scale: 1.2}} className="buy__btn" 
                style={{color: "#fff", width:"150px" }}
                onClick={handleAddData}>Add to Cart</motion.button>}
                </div>
                <div>
                  {show1 === true}
                {show1 && <table className='table bordered'>
                
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Download</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    dataDownload.map((item, index) => (
                  <tr item={item} key={index}>
                    <td>{item.name}</td>
                    <td style={{color:"#304352", fontSize:"1.4rem"}}><i class="ri-download-cloud-2-fill"
                     onClick={() => {
                      handleDownload(item.id);
                          }}
                    ></i></td>
                  </tr>
                    ))
                  }
                </tbody>
                </table>}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='pt-10'>
        <Container>
          <Row>
            <Col lg='12'>
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6 className={`${tab === "desc" ? "active__tab" : ""}`} onClick={()=> setTab('desc')}>Description</h6>
                <h6 className={`${tab === "rev" ? "active__tab" : ""}`} onClick={()=> setTab('rev')}>Reviews</h6>
              </div>
              
            {
              tab==='desc' ? 
              <div className='tab__content mt-5'>
                <p>{description}</p>
              </div> : 
              
              <div className='product__review mt-5'>
                <div className="review__wrapper">
                  {/* <ul>
                    {preview?.map((item, index) => (
                      <li key={index} className='mb-4'>
                        <h6>Thanh Thien</h6>
                        <span>{item.rating} (rating)</span>
                        <p>{item.text}</p>
                      </li>
                    ))}
                  </ul> */}
                  <div className='review__form'>
                    <h4>Leave your experience</h4>
                    <form action="" 
                    //onSubmit={submitHandler}
                    >
                      <div className='form__group'>
                        <input type="text" placeholder='Enter name'
                         //ref={reviewUser}
                          required/>
                      </div>
                      <div className='form__group d-flex align-items-center gap-5 rating__group'>
                        <motion.span whileTap={{scale:1.2}} onClick={()=> setRating(1)}>1 <i class="ri-star-s-fill"></i></motion.span>
                        <motion.span whileTap={{scale:1.2}} onClick={()=> setRating(2)}>2 <i class="ri-star-s-fill"></i></motion.span>
                        <motion.span whileTap={{scale:1.2}} onClick={()=> setRating(3)}>3 <i class="ri-star-s-fill"></i></motion.span>
                        <motion.span whileTap={{scale:1.2}} onClick={()=> setRating(4)}>4 <i class="ri-star-s-fill"></i></motion.span>
                        <motion.span whileTap={{scale:1.2}} onClick={()=> setRating(5)}>5 <i class="ri-star-s-fill"></i></motion.span>
                      </div>
                      <div className='form__group'>
                        <textarea
                        //ref={reviewMsg}
                        rows={4} type="text"
                        placeholder='Review Message'
                        required
                        />
                      </div>

                      <motion.button whileTap={{scale:1.2}} type='submit' className='buy__btn'>Submit</motion.button>
                    </form>
                  </div>
                </div>
              </div>
            }

            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
}

export default ProductDetails
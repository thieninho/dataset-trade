import React, {useState, useEffect} from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useParams } from 'react-router-dom'
import Helmet from '../components/Helmet/Helmet'
import '../styles/product-details.css'
import {motion} from "framer-motion"
import { toast } from 'react-toastify'
import { POST, GET} from "../functionHelper/APIFunction";
import { BASE_URL} from "../global/globalVar";
import { Base } from '../functionHelper/APIFunction'
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import ProductCardDetail from '../components/UI/ProductCardDetail'
import { Document,Page } from 'react-pdf/dist/esm/entry.webpack';
const ProductDetails = () => {

  

const {id} = useParams()
const {dataset_category_id} = useParams()
const [name, setName] = useState("")
const [short_description, setShort_description] = useState([])
const [description, setDescription] = useState()
const [picture, setPicture] = useState("")
const [amount, setAmount] = useState("")
const [data, setData] = useState("")
const [dataAlso, setDataAlso] = useState([])
const [dataDownload, setDataDownload] = useState([])
const [rating, setRating] = useState()
const pdf = 
"http://103.200.20.180:8086/api/dataset_collection/preview/" + id

const [numPages, setNumPages] = useState(null);
const [pageNumber, setPageNumber] = useState(1);
const [numScale, setNumScale] = useState(null)
const [scaleNumber, setScaleNumber] = useState(1.5)

const onDocumentLoadSuccess = ({ numPages, numScale }) => {
  setNumPages(numPages);
  setNumScale(numScale);

};

const goToPrevPage = () =>
  setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

const goToNextPage = () =>
  setPageNumber(
    pageNumber + 1 >= numPages ? numPages : pageNumber + 1,
  );
  const zoomOut = () => {
    setScaleNumber(
      scaleNumber - 0.25 <= 1 ? 1 : scaleNumber - 0.25, 
    );
  }
const zoomIn = () => {
  setScaleNumber(
    scaleNumber + 0.25 >= 3 ? 3 : scaleNumber + 0.25, 
  );
}
const getDataDetail = () => {

  let apiURL = "api/dataset_collection/";
    GET(
      BASE_URL + apiURL + id
    ).then((res) => {
      setName(res.payload.name);
      setShort_description(res.payload.short_description);
      setPicture(res.payload.picture);
      setAmount(res.payload.amount);
      setData(res.payload)
      setDataDownload(res.payload.dataset_items)
      if (!res.payload.purchased){
        setShow(true)
      }
      if (res.payload.purchased){
        setShow1(true)
      }
    })
  .catch ((e) => {
    console.log(e);
  })
};
const getDataDes = () => {
  
  let apiURL = "api/dataset_collection/preview/";
    GET(
      BASE_URL + apiURL + id
    ).then((res) => {
      setDescription(res);
      console.log(res)
    })
  .catch ((e) => {
    console.log(e);
  })
};
const [show, setShow] = useState(false)
const [show1, setShow1] = useState(false)
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

const getData = (page) => {
    
  if (page === undefined) page = 1;
  let apiURL = "api/dataset_collection/";
  let body = {
    page: page,
    size: 2,
    dataset_category_id: dataset_category_id,
  };
  POST(
    BASE_URL + apiURL, JSON.stringify(body)
  ).then((res) => {

    setDataAlso(res.payload.items)
  });
};
useEffect(() => getDataDetail(), []);
useEffect(() => getData(), []);
useEffect(() => getDataDes(), []);

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
  window.open(BASE_URL + "api/dataset_collection/preview/" + id);
    
}; 
const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <div className="text">
      <div>
      {isReadMore ? text.slice(0, 0) : text}
      <div onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "...read more" : " show less"}
      </div>
      </div>
    </div>
  );
};
const ReadMoreLong = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <div className="text">
      {isReadMore ? text.slice(0, 3) : text}
      <div onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "...read more" : " show less"}
      </div>
    </div>
  );
};
const [toggleState, setToggleState] = useState(1);

const toggleTab = (index) => {
  setToggleState(index);
};
const html = `${short_description}`
//const htmlLong = `${description}`
const cleanHTML = DOMPurify.sanitize(html, {
  USE_PROFILES: { html: true },
});
// const cleanHTMLLONG = DOMPurify.sanitize(htmlLong, {
//   USE_PROFILES: { html: true },
// });

// const relatedProducts = 
  return <Helmet title={name}>

      <section className='section__product'>
        <Container>
          <Row>
            <Col lg="5">
              <img src={picture} alt="" />
            </Col>
            <Col lg="7">
              <div className="product__details">
                <h2>{name}</h2>
                {/* <div className="product__rating d-flex align-items-center gap-5 mb-3">
                  <div>
                    <span> <i class="ri-star-s-fill"></i></span>
                    <span> <i class="ri-star-s-fill"></i></span>
                    <span> <i class="ri-star-s-fill"></i></span>
                    <span> <i class="ri-star-s-fill"></i></span>
                    <span> <i class="ri-star-s-fill"></i></span> 
                  </div>
                  <p>(<span>{avgRating}</span> ratings)</p>
                </div> */}
                {show === false}  
                {show && <span className="product__price"  style={{color:"orange"}}>${amount}</span> }
                <div className='text1'>{parse(cleanHTML)}</div>
                <div className='m-t-10'>
                {/* <motion.button whileTap={{scale: 1.2}} className="buy__btn button-background-move" 
                style={{color: "#253b80", width:"150px" }}
                onClick={handlePreview}>Preview</motion.button> */}
                
                {show === false}  
                {show && <motion.button whileTap={{scale: 1.2}} className="buy__btn button-background-move m-l-15" 
                style={{ width:"150px" }}
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
      <section className='p-t-10'>
        <Container>
          <Row>
          <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Preview
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Review
        </button>
       
      </div>
      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <div className='tab__content mt-3'>
                
                  {/* {parse(cleanHTMLLONG)} */}
                  <div>
			<nav className='nav__pdf'>
				<button className='btn__pdf previous' onClick={goToPrevPage}>Prev</button>
				<button className='btn__scale' onClick={zoomOut}><i class="ri-zoom-out-line"></i></button>

        <p className='pdf'>
					Page  {pageNumber} of {numPages}
				</p>
				<button className='btn__scale' onClick={zoomIn}><i class="ri-zoom-in-fill"></i></button>

				<button className='btn__pdf next' onClick={goToNextPage}>Next</button>
				
			</nav>

			<Document
				file={pdf}
				onLoadSuccess={onDocumentLoadSuccess}
			>
				<Page scale={scaleNumber} pageNumber={pageNumber}  renderTextLayer={false} renderAnnotationLayer={false}/>
			</Document>
		</div>


          </div>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <div className='product__review mt-3'>
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

                      <motion.button whileTap={{scale:1.2}} type='submit' className='button buy__btn'>Submit</motion.button>
                    </form>
                  </div>
                </div>
              </div>
        </div>
      </div>
          </Row>
          <Col lg='12'>
            <h2 className='related__title'> You might also like</h2>
          </Col>

          <Row>
          
       
          {/* {dataAlso?.map((item) => (
        <ProductCard items={item} />  
         ))} */}
              {
              dataAlso.filter(item => item.id !== id).map((filteredItem, index) => (
                
              <ProductCardDetail items={filteredItem} key={index} />
          ))}
        </Row>
       
        </Container>
        <Col className='m-b-40'>
          
          </Col>
      </section>
      

    </Helmet>
}

export default ProductDetails
import React, {useState, useEffect} from 'react';
import '../styles/cart.css'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import { Container, Row, Col } from 'reactstrap';
import { motion } from 'framer-motion';
import {cartActions} from '../redux/slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import { POST} from "../functionHelper/APIFunction";
import { toast } from "react-toastify"
import { BASE_URL} from "../global/globalVar";
import { confirmAlert } from 'react-confirm-alert';
import {
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import loading from '../assets/images/loading.gif'
import 'react-confirm-alert/src/react-confirm-alert.css';
const Cart = (item) => {

  const [show, setShow] = useState(true)
  const [showLoading, setShowLoading] = useState(false)

  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({});
  const cartItems = useSelector((state) => state.cart.cartItems)
  const totalAmount = useSelector((state) => state.cart.totalAmount)


  const addData = (page) => {
    if (page === undefined) page = 1;
    let apiURL = "api/cart_item/";
    let body = {
      page: page,
      size: 5,
      purchased: false,
      has_dataset_collection: true
    };
    POST(
      BASE_URL + apiURL, JSON.stringify(body)
    ).then((res) => {
      setPagination({
        totalItem: res.payload.total_items,
        totalPage: res.payload.total_pages,
      });
      setData(res.payload.items)
      console.log(res.payload.total_pages)


    });
  };

  useEffect(() =>{ 
    addData()
  }, []);
  console.log(data)

  let checkboxes = document.querySelectorAll("[type='checkbox']");
  var cartItemIds = [];

  function myFunc() {
    let checked = document.querySelectorAll("[type='checkbox']:checked");
      cartItemIds = []
      
      checked.forEach(function(el){
        cartItemIds.push(el.value)
      })
  }


    checkboxes.forEach(function(el) {
      el.addEventListener("change", function(){
        myFunc();
        console.log(el)
      })
    })
    const totalAmount1 = data.reduce((total, item) => total + Number(item.dataset_collection.amount), 0)

    
  const deleteData = (item) => {
    let apiURL = "api/cart_item/remove";
    let body = {
      "cart_item_ids": cartItemIds
    };
   
    POST(
      BASE_URL + apiURL, JSON.stringify(body)
    ).then((res) => {
      console.log(item.id)
      if (res.status.http_status !== "OK")
          {
		          toast.error("Please choose products")
          }
      if (res.status.http_status === "OK")
          {
            toast.success("Product deleted successfully");
          }
    });
  }

  const paymentData = (item) => {
    let apiURL = "api/payment/paypal/authorize_payment";
    let body = {
      "cart_item_ids": cartItemIds
    };
    POST(
      BASE_URL + apiURL, JSON.stringify(body)
    ).then((res) => {
      console.log(item.id)
      if (res.status.http_status === "OK")
          {
            console.log("success")
            setTimeout(()=>{
              setShowLoading(false)
            }, 5000)
            window.location.href = res.payload.approval_link; 
          }
      if (res.status.http_status !== "OK")
          {
            setTimeout(()=>{
              setShow(true)
              setShowLoading(false)
            }, 2000)

		      toast.error("Please choose product!")
          }
    });
  }
  
  const dispatch = useDispatch()
  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id))
    // deleteData(item)
    // if (window.confirm('Are you sure you wish to delete this item?')) this.onCancel() 
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="react-confirm-alert-body">
            <p>Are you sure want to remove this product from your cart?</p>
            <div className="react-confirm-alert-button-group">
              <button onClick={onClose}>No</button>
              <button id="btn-confirm-delete-cart"
                onClick={() => {
                  console.log(cartItemIds)
                  if (cartItemIds !== 0){
                    deleteData()
                    onClose();
                   window.location.reload(false);
                  }
                  
                }}
              >
                Yes, Remove it!
              </button>
            </div>
          </div>
        );
      }
    });
  }

 
  
  const paymentProduct = () => {
    dispatch(cartActions.deleteItem(item.id))
    //deleteData(item)
    paymentData(item)
      setShow(!true)
      setShowLoading(!false)
  }
  

  return (
  <Helmet title='Cart'>
    <CommonSection title=''/>
    <section>
      <Container>
        <Row>
          {/* <h2>{addData()}</h2> */}
          <Col lg='9'>
            {data.length===0 ? (
               <div>
               <table className='table bordered'>
                
             <thead>
               <tr>
                 <th>Image</th>
                 <th>Title</th>
                 <th>Price</th>
               </tr>
             </thead>
             </table>
             <h2 className='text-center m-t-100'>No item added to the cart</h2> 
             </div>
               )  : (
              <table className='table bordered'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th
                 className="buy__btn" style={{cursor: 'pointer',height: "40px", color:"red", background:"#fff", fontSize:"1.3rem", fontWeight: "200"}}> <motion.i
        whileTap={{scale: 1.2}}
        onClick={()=>{
          if (cartItemIds.length === 0)
                  {
		                toast.error("Please choose products")

                  }
          else{
                  deleteProduct()
                  }
        }}
        
        class="ri-delete-bin-4-fill"
        ></motion.i>
              </th>
              </tr>
            </thead>

            <tbody>
              {
                data.map((item, index) =>(
                  <tr item={item} key={index}>
                  <td><Link to={`/shop/${item.dataset_collection_id}`}><img src={item.dataset_collection.picture} alt=""/></Link></td>
                  <td><Link to={`/shop/${item.dataset_collection_id}`}>{item.dataset_collection.name} </Link></td>
                  <td
                  >${item.dataset_collection.amount}</td>
      <td> 
        <input type="checkbox"  value={item.id}
        onChange={() => 
          myFunc()
        }
        />
        
      </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
            )}
  
          </Col>
          <Col lg='3'>
            
            <div>
            
              <h6 className='d-flex align-items-center justify-content-between'>Subtotal
              <span className='fs-4 fw-bold'>${totalAmount1}</span>
              </h6>
            </div>
            <div>
              <button className="buy__btn w-100 mb-4"> 
              <Link to='/shop' style={{fontSize:"17px", fontWeight:"700"}}> Continue Shopping</Link></button>
            </div>
            <div>
            {show === true}
          {show &&  <button className="buy__btn w-100 mt-1" style={{background:"#ffc439"}} onClick={paymentProduct} >
              <span class="paypal-logo">
                
                  <i style={{fontFamily: "Verdana, Tahoma", display: "inline-block", fontSize:"22px", color:"#253b80", fontWeight:"700"}}>Pay</i>
                  <i style={{fontFamily: "Verdana, Tahoma", display: "inline-block", fontSize:"20px", color:"#179bd7", fontWeight:"700"}}>Pal</i>
              </span>
            </button> }
            </div>
            <div className='p-l-75'>
            {showLoading === false}
            {showLoading && <img src={loading} alt=""  style={{width: "70%"}}/> }
            </div>
          </Col>
        </Row>
        <Row>
        <Pagination aria-label="Page navigation example">
        {Array.from({ length: pagination.totalPage }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => {
                addData(i + 1);
              }}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </Pagination>
     
        </Row>
        
      </Container>
    </section>

  </Helmet>
  );
};


export default Cart
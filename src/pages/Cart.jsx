import React, {useState, useEffect} from 'react';
import '../styles/cart.css'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import { Container, Row, Col } from 'reactstrap';
import { motion } from 'framer-motion';
import {cartActions} from '../redux/slices/cartSlice'
import { useDispatch } from 'react-redux';
import { Link} from 'react-router-dom';
import { POST} from "../functionHelper/APIFunction";
import { toast } from "react-toastify"
import { BASE_URL} from "../global/globalVar";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import testImg from '../assets/images/Hero4.png'
const Cart = (item) => {

  const [data, setData] = useState([])
  const [dataSize, setDataSize] = useState([])
  const [pagination, setPagination] = useState({});
  const [size, setSize] = useState("")
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
      setSize(res.payload.total_items)
      console.log(res.payload.total_pages)

    });
  };


  useEffect(() =>{ 
    addData()
      let apiURL = "api/cart_item/";
      let body = {
        page: 1,
        size: size,
        purchased: false,
        has_dataset_collection: true
      };
      POST(
        BASE_URL + apiURL, JSON.stringify(body)
      ).then((res) => {
        setDataSize(res.payload.items)
        console.log(res.payload.total_items)
      });
  }, [size]);

  const totalAmount = dataSize.reduce((total, item) => total + Number(item.dataset_collection.amount), 0)
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
      })
    })
    
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
		          toast.error("Dataset not exist in your cart")
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
            window.location.href = res.payload.approval_link; 
          }
      if (res.status.http_status !== "OK")
          {
		        toast.error("Please choose product!")
          }
    });
  }
  
  const dispatch = useDispatch()
  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id))
    deleteData(item)
    window.location.reload(false);
  }

  const paymentProduct = () => {
    dispatch(cartActions.deleteItem(item.id))
    //deleteData(item)
    paymentData(item)
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
        onClick={deleteProduct}
        class="ri-delete-bin-4-fill"
        ></motion.i>
              </th>
              </tr>
            </thead>

            <tbody>
              {
                data.map((item, index) =>(
                  <tr item={item} key={index}>
                  <td><img src={testImg} alt=""/></td>
                  <td>{item.dataset_collection.name}</td>
                  <td>${item.dataset_collection.amount}</td>
      <td> 
        <input type="checkbox" value={item.id} 
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
              <span className='fs-4 fw-bold'>${totalAmount}</span>
              </h6>
            </div>
            <div>
              <button className="buy__btn w-100 mb-4"> 
              <Link to='/shop' style={{fontSize:"17px", fontWeight:"700"}}> Continue Shopping</Link></button>
            </div>
            <div>
            <button className="buy__btn w-100 mt-1" style={{background:"#ffc439"}} onClick={paymentProduct} >
              <span class="paypal-logo">
                  <i style={{fontFamily: "Verdana, Tahoma", display: "inline-block", fontSize:"22px", color:"#253b80", fontWeight:"700"}}>Pay</i>
                  <i style={{fontFamily: "Verdana, Tahoma", display: "inline-block", fontSize:"20px", color:"#179bd7", fontWeight:"700"}}>Pal</i>
              </span>
            </button>
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
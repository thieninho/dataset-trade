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
import { Pagination } from "antd";


import loading from '../assets/images/loading.gif';
import 'react-confirm-alert/src/react-confirm-alert.css';
const Cart = (item) => {

  const [show, setShow] = useState(true)
  const [showLoading, setShowLoading] = useState(false)

  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({});
  const cartItems = useSelector((state) => state.cart.cartItems)
  const totalAmount = useSelector((state) => state.cart.totalAmount)

 
  const addData = (page, pageSize) => {
    if (page === undefined) page = 1;
    let apiURL = "api/cart_item/";
    let body = {
      page: page,
      size: 4,
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
 

    const [peopleInfo, setPeopleInfo] = useState({});
    const [idInfo, setIDInfo] = useState([]);

  const toggleHandler = (item) => () => {
    setPeopleInfo((state) => ({
      ...state,
      [item.id]: state[item.id]
        ? null
        : 
            item.id,
    }
    )
    
    );
    setIDInfo((state) => ({
      ...state,
      [item.id]: state[item.id]
        ? null
        : 
            item.dataset_collection.amount,
    }
    )
    
    )
    
  };

  useEffect(() => {
    
  }, [peopleInfo]);
  useEffect(() => {
    
  }, [idInfo]);
  const arrayAmount = Object.values(idInfo)
  const cartItemIds = Object.values(peopleInfo);
  useEffect(() => {
    
  }, [cartItemIds]);
  useEffect(() => {
    
  }, [arrayAmount]);
  
    const totalAmount1 = arrayAmount.reduce((a, b) => a + b, 0)
    
  const deleteData = (item) => {
    let apiURL = "api/cart_item/remove";
    let body = {
      "cart_item_ids": cartItemIds
    };
   
    POST(
      BASE_URL + apiURL, JSON.stringify(body)
    ).then((res) => {
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
          setShowLoading(false)
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
                  if (lastCartItemIds.length !== 0){
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
  const lastCartItemIds = cartItemIds.filter(item => item !== null);
  const handleJumpPagination = (page, pageSize) => {
    addData(page, pageSize);
  };
  return (
  <Helmet title='Cart'>
    <CommonSection title='CART'/>
    <section className='pagi'>
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
             <h2 className='text-center m-t-90 m-b-90'>No item added to the cart</h2> 
             </div>
               )  : (
              <table className='table bordered'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th
                 className="buy__btndelete mr-10" style={{cursor: 'pointer',height: "40px", color:"red", background:"#fff", fontSize:"1.3rem", fontWeight: "200", scale:"1.2"}}> <motion.i
        whileTap={{scale: 1.2}}
        onClick={()=>{
            if (lastCartItemIds.length === 0)
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
                  <td><Link to={`/shop/product_detail/${item.dataset_collection.dataset_category_id}/${item.dataset_collection_id}`}><img src={item.dataset_collection.picture} alt=""/></Link></td>
                  <td><Link to={`/shop/product_detail/${item.dataset_collection.dataset_category_id}/${item.dataset_collection_id}`}>{item.dataset_collection.name} </Link></td>
                  <td style={{color:"orange"}}
                  >${item.dataset_collection.amount}</td>
                  <input
                  onChange={toggleHandler(item)}
                  checked={peopleInfo[item.id]}
                  style={{ margin: "20px", scale:"1.5", background:"#fff"}}
                  type="checkbox"
                />
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
              <span className='fs-4 fw-bold'  style={{color:"orange"}}>${totalAmount1}</span>
              </h6>
            </div>
            <div>
              <button className="button-background-move buy__btn w-100 mt-4"> 
              <Link to='/shop' style={{fontSize:"20px", fontWeight:"700", color:"#000"}}> Continue Shopping</Link></button>
            </div>
            <div>
            {show === true}
          {show &&  <button className="button-background-move buy__btn w-100 mt-3" style={{background:"#ffc439"}} onClick={paymentProduct} >
              <span class="paypal-logo">
                
                  <i style={{fontFamily: "Verdana, Tahoma", display: "inline-block", fontSize:"25px", color:"#253b80", fontWeight:"700"}}>Pay</i>
                  <i style={{fontFamily: "Verdana, Tahoma", display: "inline-block", fontSize:"22px", color:"#179bd7", fontWeight:"700"}}>Pal</i>
              </span>
            </button> }
            </div>
            <div className='p-l-75 mt-3'>
            {showLoading === false}
            {showLoading && <img src={loading} alt=""  style={{width: "70%"}}/> }
            </div>
          </Col>
        </Row>
        <Row>
        <Pagination
        showQuickJumper
        defaultCurrent={1}
        total={pagination.totalItem}
        pageSize={4}
        onChange={handleJumpPagination}
    />
     
        </Row>
        
      </Container>
    </section>

  </Helmet>
  );
};


export default Cart
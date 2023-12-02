import React, {useState, useEffect} from 'react';
import '../styles/cart.css'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import { Container, Row, Col } from 'reactstrap';

import { Link} from 'react-router-dom';
import { POST} from "../functionHelper/APIFunction";
import { BASE_URL} from "../global/globalVar";
import { Pagination } from "antd";
import { useGlobalContext } from "../components/GlobalContext/GlobalContext";



const Purchased = ({item}) => {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({});
  const { globalPackage, setGlobalPackage } = useGlobalContext();

  const addData = (page) => {
    if (page === undefined) page = 1;
    let apiURL = "api/cart_item/purchased";
    let body = {
      page: page,
      size: 5
    };
    POST(
      process.env.REACT_APP_BASE_URL + apiURL, JSON.stringify(body)
    ).then((res) => {
      setPagination({
        totalItem: res.payload.total_items,
        totalPage: res.payload.total_pages,
      });
      setData(res.payload.items)
console.log(res)
    });
  };

  useEffect(() => addData(), [])
  const handleJumpPagination = (page, pageSize) => {
    addData(page, pageSize);
  };
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
  return (
    <Helmet title='Purchased'>
      <CommonSection title='PURCHASED'/>
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
              <h2 className='text-center m-t-100 m-b-100'>No item added to the cart</h2> 
              </div>
                ): (
                <table className='table bordered'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                </tr>
              </thead>
  
              <tbody>
                {
                  data.map((item, index) =>(
                    <tr item={item} key={index}>
                    <td><Link to={`/shop/product_detail/${item.dataset_collection.dataset_category_id}/${item.dataset_collection_id}`}> <img src={item.dataset_collection.picture} alt=""/></Link></td>
                    <td> <Link to={`/shop/product_detail/${item.dataset_collection.dataset_category_id}/${item.dataset_collection_id}`}>{item.dataset_collection.name}</Link></td>
                    <td><Link to={`/shop/product_detail/${item.dataset_collection.dataset_category_id}/${item.dataset_collection_id}`}>{item.dataset_collection.name} </Link></td>
                  {`${globalPackage}` === "PREMIUM" ? (
                  
                  <td style={{color:"orange"}}
                    >$0</td>
                  ) : (
                    <td style={{color:"orange"}}
                  >${item.dataset_collection.amount}</td>
                  )}
                    </tr>
                  ))
                }
              </tbody>
            </table>
              )}
    
            </Col>
            <Col lg='3'>
              <div>
               
                <Link to='/shop'> <button className="button-background-move buy__btn w-100 mt-4" style={{fontSize:"1.2rem", fontWeight:"700"}}>  Continue Shopping </button></Link>
              </div>
              <div>
              </div>
            </Col>
          </Row>
          <Row className='m-t-20'>
        
        <Col lg='6' md='12'>
           

        <Pagination
        showQuickJumper
        defaultCurrent={1}
        showSizeChanger={false}
        total={pagination.totalItem}
        pageSize={8}
        onChange={handleJumpPagination}
    />
          </Col>
        
        </Row>
          
        </Container>
      </section>
  
    </Helmet>
    );
  };

export default Purchased
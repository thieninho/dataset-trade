import React, {useState, useEffect} from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import '../styles/shop.css'
import { POST} from "../functionHelper/APIFunction";
import { BASE_URL} from "../global/globalVar";
import ProductCard from '../components/UI/ProductCard';
import { Link } from 'react-router-dom'

import CommonSection from '../components/UI/CommonSection';
import {
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import ProductCate from '../components/UI/ProductCate';
const Shop = () => {


  //const [data, setData] = useState({id:'', name:'', picture:'', amount:'', short_description: '', description: '', preview: ''})
  const [data, setData] = useState([])
  const [dataNameCate, setNameDataCate] = useState([])
  const [pagination, setPagination] = useState({});
  const [keyword, setKeyword] = useState("")
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(true)
  const getData = (page) => {
    
    if (page === undefined) page = 1;
    let apiURL = "api/dataset_collection/";
    let body = {
      page: page,
      size: 8,
    };
    POST(
      BASE_URL + apiURL, JSON.stringify(body)
    ).then((res) => {

      setData(res.payload.items)
      setPagination({
        totalItem: res.payload.total_items,
        totalPage: res.payload.total_pages,
      });
    });
  };
  const getNameDataCate = (page) => {
    
    if (page === undefined) page = 1;
    let apiURL = "api/dataset_category/";
    let body = {
      page: page,
      size: 4,
    };
    POST(
      BASE_URL + apiURL, JSON.stringify(body)
    ).then((res) => {

      setNameDataCate(res.payload.items)
      setPagination({
        totalItem: res.payload.total_items,
        totalPage: res.payload.total_pages,
      });

    });
  };


  const searchData = (page) => {
    
    if (page === undefined) page = 1;
    let apiURL = "api/dataset_collection/";
    let body = {
      page: page,
      size: 8,
      keyword: keyword
    };
    POST(
      BASE_URL + apiURL, JSON.stringify(body)
    ).then((res) => {
      setData(res.payload.items)
      setPagination({
        totalItem: res.payload.total_items,
        totalPage: res.payload.total_pages,
      });
      setKeyword(body.keyword)
    });
  };
  
    useEffect(() => {
      getNameDataCate()
      
    }, []);
    const handleSubmit = (e) => {
        
      e.preventDefault();

      searchData()
      if (keyword !== "")
      {
        setShow(true)
        setShow1(false)
      }
      if (keyword === ""){
        setShow(false)
        setShow1(true)
      }
      
    };
  
    const onChange = (e) => {
      
      setKeyword(e.target.value);
      
    };
  return ( <Helmet title='Shop'>

    <section>
    <CommonSection title='STORE'/>

      <Container>
        <Row>
          <Col lg='3' md='6' className='text-end'>
          
          </Col>
          <Col lg='6' md='12'>
            <form onSubmit={handleSubmit}>
          <div className="search__box">
              <input type='text' placeholder='Search...' 
               onChange={onChange}
                value={keyword}
              />
               <div className="filter__widget">
              {/* <select>
                <option>Sort By</option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select> */}
              <button md='0' className='button filter__widget' 
              >
                <i  class="ri-search-line"></i>
              </button>
            </div>

            </div>
            </form>


          </Col>
        </Row>
        {/* <Row>
        <div className="filterItem">
          <ul>
            <li><button className='button-background-move2' style={{background: "#279bd7", border:"none", color:"#fff"}}>All</button></li>
            <li><button className='button-background-move2'>All</button></li>
            <li><button className='button-background-move2'>All</button></li>
            <li><button className='button-background-move2'>All</button></li>
            
          </ul>
        </div>
        </Row> */}
      </Container>
    </section>
    <section className='pagi'>
      
      <Container>
       
         
    
      {show && <Row >
        <p className='p-t-10' style={{fontSize:"20px"}}>Result for "{keyword}" </p>

          { 
            data?.map((item, index) => (
              <ProductCard items={item} key={index}/>
          ))}
        </Row>}

        {show && <Row>
        <Pagination aria-label="Page navigation example" className='p-t-20'>
        {Array.from({ length: pagination.totalPage }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => {
                getData(i + 1);
              }}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </Pagination>
        </Row>}
        <ul>
       {dataNameCate.map((items, index) => <li> 
        {show1 &&
        <Row style={{borderBottom: "1px solid rgb(218, 220, 224)"}} className='m-t-30' key={index}>
        <div className='category'>
        <h3 className='title_cate'> {items.name}</h3>
        <Link to={`/shop/${items.name}/${items.id}`}><div className='btn_cate'>
          <span>See All</span>
        </div></Link>
        </div>
        {
          <ProductCate dataset_category_id={items.id} size={4} />  
          }
        </Row>}
        </li>)}
        </ul>
        {show1 && <Row>
        <Pagination aria-label="Page navigation example" className='p-t-20'>
        {Array.from({ length: pagination.totalPage }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => {
                getNameDataCate(i + 1);
              }}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </Pagination>
        </Row>}
      </Container>
    </section>

  </Helmet>
  );
        
}

export default Shop
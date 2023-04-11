import React, {useState, useEffect} from 'react';
import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import '../styles/shop.css'
import { POST} from "../functionHelper/APIFunction";
import { BASE_URL} from "../global/globalVar";
import ProductCard from '../components/UI/ProductCard';
import {
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
const Shop = () => {


  //const [data, setData] = useState({id:'', name:'', picture:'', amount:'', short_description: '', description: '', preview: ''})
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({});
  const [keyword, setKeyword] = useState("")
  const [show, setShow] = useState(false)
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
      getData()
      
    }, []);
    const handleSubmit = (e) => {
        
      e.preventDefault();

      searchData()
      if (keyword !== null)
      {
        setShow(true)
      }
      
    };
  
    const onChange = (e) => {
      
      setKeyword(e.target.value);
      
    };
  return ( <Helmet title='Shop'>

    <section>
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
              <button md='0' className='filter__widget' 
              >
                <i  class="ri-search-line"></i>
              </button>
            </div>

            </div>
            </form>

            {show &&<p className='p-t-10' style={{fontSize:"20px"}}>Result for "{keyword}" </p>}

          </Col>
        </Row>
      </Container>
    </section>

    <section>
      <Container>
        <Row>
          {
            data.length === 0? <h1 className='text-center fs-4'>No datasets are found</h1>
            : 
            data?.map((item, index) => (
              <ProductCard items={item} key={index}/>
          ))}
          
        </Row>
        <Row>
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
        </Row>
      </Container>
    </section>

  </Helmet>
  );
}

export default Shop
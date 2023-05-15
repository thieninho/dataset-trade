import React, {useState, useEffect} from 'react';
import Helmet from '../../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import '../../styles/shop.css'
import { POST} from "../../functionHelper/APIFunction";
import { BASE_URL} from "../../global/globalVar";
import ProductCard from '../../components/UI/ProductCard';
import CommonSection from '../../components/UI/CommonSection';
import { Pagination } from "antd";

const ProductHome = () => {


  //const [data, setData] = useState({id:'', name:'', picture:'', amount:'', short_description: '', description: '', preview: ''})
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({});
  const [keyword, setKeyword] = useState("")
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(true)

  const getData = (page, pageSize) => {
    
    if (page === undefined) page = 1;
    let apiURL = "api/dataset_collection/";
    let body = {
      page: page,
      size: pageSize,
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
  const searchDataBtn = (page, keyword) => {
    if (page === undefined) page = 1;
    let apiURL = "api/dataset_collection/";
    let body = {
      page: page,
      size: 8,
      keyword: keyword,
    };
    POST(BASE_URL + apiURL, JSON.stringify(body)).then((res) => {
      setData(res.payload.items);
      setPagination({
        totalItem: res.payload.total_items,
        totalPage: res.payload.total_pages,
      });
      setKeyword(body.keyword);
      console.log(res.payload.items)
    });
  };
    useEffect(() => {
      getData(1, 8)
      
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
    const handleJumpPagination = (page, pageSize) => {
      getData(page, pageSize);
    };
    const handleJumpPaginationSearch = (page, pageSize) => {
      searchData(page, pageSize);
    };
    const handleBtnKeyword = (keyword) => {
      searchDataBtn(1, keyword)
      if (keyword !== "") {
        setShow(true);
        setShow1(false);
      }
      if (keyword === "") {
        setShow(false);
        setShow1(true);
      }
    }
  
    const setAll = () => {
      setKeyword("")
      handleBtnKeyword("")
    }
    const setNBA = () => {
      setKeyword("NBA")
      handleBtnKeyword("NBA")
    }
    const setFood = () => {
      setKeyword("Food")
      handleBtnKeyword("Food")
    }
    const setCovid = () => {
      setKeyword("Covid-19")
      handleBtnKeyword("Covid-19")
    }
    const setDatabase = () => {
      setKeyword("Database")
      handleBtnKeyword("Database")
    }
    const setPremierLeague = () => {
      setKeyword("Premier League")
      handleBtnKeyword("Premier League")
    }
    const setMicrosoft = () => {
      setKeyword("Microsoft")
      handleBtnKeyword("Microsoft")
    }
    const setValorant = () => {
      setKeyword("Valorant")
      handleBtnKeyword("Valorant")
    }
    useEffect(() => {
      // 👇️ scroll to top on page load
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);
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
              <button md='0' className='button filter__widget' 
              >
                <i  class="ri-search-line"></i>
              </button>
            </div>

            </div>
            </form>


          </Col>
        </Row>
        <Row>
        <div className="filterItem">
          <ul>
            <li><button className='button-background-move2' style={{background: "#279bd7", border:"none", color:"#fff"}} onClick={setAll}>All</button></li>
            <li><button className='button-background-move2' onClick={setNBA}>NBA</button></li>
            <li><button className='button-background-move2' onClick={setFood}>Food</button></li>
            <li><button className='button-background-move2' onClick={setDatabase}>Database</button></li>
            <li><button className='button-background-move2' onClick={setCovid}>Covid-19</button></li>
            <li><button className='button-background-move2' onClick={setValorant}>Valorant</button></li>
            <li><button className='button-background-move2' onClick={setPremierLeague}>Premier League</button></li>

            
          </ul>
        </div>
        </Row>
      </Container>
    </section>
    <section className='pagi'>
      
      <Container>
        <Row>
        {show &&<p className='p-t-10' style={{fontSize:"20px"}}>Result for "{keyword}" </p>}

          {
            data.length === 0? <h1 className='text-center fs-4'>No datasets are found</h1>
            : 
            data?.map((item, index) => (
              <ProductCard items={item} key={index}/>
          ))}
        </Row>
        {show1 && (
        <Row className='m-t-20'>
        <Col lg='3' md='6' className='text-end'>
          
          </Col>
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
        )}
        {show && (
           <Row className='m-t-20'>
           <Col lg='3' md='6' className='text-end'>
             
             </Col>
           <Col lg='6' md='12'>
              
   
           <Pagination
           showQuickJumper
           defaultCurrent={1}
           showSizeChanger={false}
           total={pagination.totalItem}
           pageSize={16}
           onChange={handleJumpPaginationSearch}
       />
             </Col>
           
           </Row>
        )}
      </Container>
    </section>

  </Helmet>
  );
}

export default ProductHome
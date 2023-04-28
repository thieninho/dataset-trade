import React, {useState, useEffect} from 'react';
import { BASE_URL} from "../../global/globalVar";
import { POST } from '../../functionHelper/APIFunction'
import { Container, Row, Col } from 'reactstrap';
import ProductCard from './ProductCard';

const ProductCate = ({dataset_category_id, size}) => {
  const [dataCate, setDataCate] = useState([])

    const getDataCate = (page) => {
    
        if (page === undefined) page = 1;
        let apiURL = "api/dataset_collection/";
        let body = {
          page: page,
          size: size,
          dataset_category_id : dataset_category_id
        };
        POST(
          BASE_URL + apiURL, JSON.stringify(body)
        ).then((res) => {
    
          setDataCate(res.payload.items)
          console.log(res.payload.items)
    
        });
      };
      useEffect(() => {
        getDataCate()
        
      }, []);
  return (
    <section className='pagi'>
      
      <Container>
       
         
        <Row>

          {
            dataCate.length === 0? <h1 className='text-center fs-4'>No datasets are found</h1>
            : 
            dataCate?.map((item, index) => (
              <ProductCard items={item} key={index}/>
          ))}
        </Row>
       
        {/* <Row>
        <Pagination aria-label="Page navigation example" className='p-t-20'>
        {Array.from({ length: pagination.totalPage }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => {
                getDataCate(i + 1);
              }}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </Pagination>
        </Row> */}
      </Container>
    </section>
  )
}

export default ProductCate
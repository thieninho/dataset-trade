import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import "../styles/product-details.css";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { POST, GET } from "../functionHelper/APIFunction";
import { BASE_URL } from "../global/globalVar";
import { Base } from "../functionHelper/APIFunction";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import ProductCardDetail from "../components/UI/ProductCardDetail";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
const ProductDetails = () => {
  const { id } = useParams();
  const { dataset_category_id } = useParams();
  const [name, setName] = useState("");
  const [short_description, setShort_description] = useState([]);
  const [picture, setPicture] = useState("");
  const [amount, setAmount] = useState("");
  const [data, setData] = useState("");
  const [dataAlso, setDataAlso] = useState([]);
  const [dataDownload, setDataDownload] = useState([]);
  const pdf = process.env.REACT_APP_BASE_URL + "api/dataset_collection/preview/" + id;
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const getDataDetail = useCallback( async () => {
    let apiURL = "api/dataset_collection/";
    GET(process.env.REACT_APP_BASE_URL + apiURL + id)
      .then((res) => {
        setName(res.payload.name);
        setShort_description(res.payload.short_description);
        setPicture(res.payload.picture);
        setAmount(res.payload.amount);
        setData(res.payload);
        setDataDownload(res.payload.dataset_items);
        if (!res.payload.purchased) {
          setShow(true);
        }
        if (res.payload.purchased) {
          setShow1(true);
        }

      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const token = JSON.stringify(Base.getCookie("token"));

  const addData = () => {
    let apiURL = "api/cart_item/add";
    let body = {
      dataset_collection_id: id,
    };
    POST(process.env.REACT_APP_BASE_URL + apiURL, JSON.stringify(body))
      .then((res) => {
        if (res.status.http_status !== "OK") {
          toast.error("Dataset exist in your cart");
        }
        if (res.status.http_status === "OK") {
          toast.success("Product added successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAddData = () => {
    if (token === "null") {
      toast.error("Please login with your account");
    }
    addData();
  };

  const getData = useCallback( async (page) => {
    if (page === undefined) page = 1;
    let apiURL = "api/dataset_collection/";
    let body = {
      page: page,
      size: 4,
      dataset_category_id: dataset_category_id,
    };
    POST(process.env.REACT_APP_BASE_URL + apiURL, JSON.stringify(body)).then((res) => {
      setDataAlso(res.payload.items);
    });
  }, [dataset_category_id]);
  useEffect(() => { getDataDetail() }, [getDataDetail]);

  useEffect(() => { getData() }, [getData]);
  //useEffect(() => getDataDes(), []);
  var a
  const handleDownload = (datasetItemId) => {
    let apiURL = "api/file/?path=";
    if (
      data == null ||
      data.dataset_items == null
    ) {
      return;
    }

    var path = null;
    for (var i = 0; i < data.dataset_items.length; i++) {
      if (data.dataset_items[i].id === datasetItemId) {
        path = data.dataset_items[i].path;
        break;
      }
    }
    a = path.slice(0, 8)
    if (path == null) return;
    if (path !== null && a !== "https://")
      window.location.href = BASE_URL + apiURL + path;
    if (path !== null && a === "https://")
      window.open(path)

  };



  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  const html = `${short_description}`;
  //const htmlLong = `${description}`
  const cleanHTML = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  });
  // const cleanHTMLLONG = DOMPurify.sanitize(htmlLong, {
  //   USE_PROFILES: { html: true },
  // });

  // const relatedProducts =

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <Helmet title={name}>
      <section className="section__product">
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
                {show && (
                  <span className="product__price" style={{ color: "orange" }}>
                    ${amount}
                  </span>
                )}
                <div className="text1">{parse(cleanHTML)}</div>
                <div className="m-t-10">
                  {/* <motion.button whileTap={{scale: 1.2}} className="buy__btn button-background-move" 
                style={{color: "#253b80", width:"150px" }}
                onClick={handlePreview}>Preview</motion.button> */}

                  {show === false}
                  {show && (
                    <motion.button
                      whileTap={{ scale: 1.2 }}
                      className="buy__btn button-background-move m-l-15"
                      style={{ width: "150px" }}
                      onClick={handleAddData}
                    >
                      Add to Cart
                    </motion.button>
                  )}
                </div>
                <div>
                  {show1 === true}
                  {show1 && (
                    <table className="table bordered">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Download</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataDownload.map((item, index) => (
                          <tr item={item} key={index}>
                            <td>{item.name}</td>
                            <td
                              style={{ color: "#304352", fontSize: "1.4rem" }}
                            >
                              <i
                                className="ri-download-cloud-2-fill"
                                onClick={() => {
                                  handleDownload(item.id);
                                }}
                              ></i>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="p-t-10">
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
                className={
                  toggleState === 1 ? "content  active-content" : "content"
                }
              >
                <div className="tab__content mt-3">
                  {/* {parse(cleanHTMLLONG)} */}
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
                    <div className="pdf_view" style={{ height: "1262px", width: "1000px" }}>
                      <Viewer fileUrl={pdf} plugins={[defaultLayoutPluginInstance]} />
                    </div>
                  </Worker>

                </div>

              </div>

              <div
                className={
                  toggleState === 2 ? "content  active-content" : "content"
                }
              >
                <div className="product__review mt-3">
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
                    <div className="review__form">
                      <h4>Leave your experience</h4>
                      <form
                        action=""
                      //onSubmit={submitHandler}
                      >
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Enter name"
                            //ref={reviewUser}
                            required
                          />
                        </div>
                        <div className="form__group d-flex align-items-center gap-5 rating__group">
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                          // onClick={() => setRating(1)}
                          >
                            1 <i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                          // onClick={() => setRating(2)}
                          >
                            2 <i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                          //onClick={() => setRating(3)}
                          >
                            3 <i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                          //  onClick={() => setRating(4)}
                          >
                            4 <i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                          //  onClick={() => setRating(5)}
                          >
                            5 <i className="ri-star-s-fill"></i>
                          </motion.span>
                        </div>
                        <div className="form__group">
                          <textarea
                            //ref={reviewMsg}
                            rows={4}
                            type="text"
                            placeholder="Review Message"
                            required
                          />
                        </div>

                        <motion.button
                          whileTap={{ scale: 1.2 }}
                          type="submit"
                          className="button buy__btn"
                        >
                          Submit
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </Row>
          <Col lg="12">
            <h2 className="related__title"> You might also like</h2>
          </Col>

          <Row>
            {/* {dataAlso?.map((item) => (
        <ProductCard items={item} />  
         ))} */}
            {dataAlso
              .filter((item) => item.id !== id)
              .map((filteredItem, index) => (
                <ProductCardDetail items={filteredItem} key={index} />
              ))}
          </Row>
        </Container>
        <Col className="m-b-40"></Col>
      </section>
    </Helmet>
  );
};

export default ProductDetails;

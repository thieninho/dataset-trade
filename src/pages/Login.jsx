import React, { useState} from 'react'
import FormInput from '../components/FormInput/FormInput';
import { Row, Col} from 'reactstrap';
import { BASE_URL} from "../global/globalVar";
import { useNavigate } from "react-router-dom";
import { POST } from "../functionHelper/APIFunction";
import { setCookie } from "../functionHelper/GetSetCookie";
import { toast } from "react-toastify"
import "../styles/login.css"
import "../styles/login/main.css"
import "../styles/login/util.css"
import logo from "../assets/images/3.gif"
import Register from './Register';
import LoginChatBot from './LoginChatBot';
import Helmet from '../components/Helmet/Helmet';
const LoginTest = () => {
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const [openLoginChatbot, setOpenLoginChatbot] = useState(false);
  const handleToogleSignup = () => {
    setOpenSignupModal(!openSignupModal)
  }
  const handleToogleLoginChatbot = () => {
    setOpenLoginChatbot(!openLoginChatbot)
  }
    const [values, setValues] = useState({
        username: "",
        password: "",
      });

      const handleLogin = () => {
        let apiURL = "api/user/log_in";

        try {
          let body = {
            username: values.username,
            password: values.password,
          };
          POST(BASE_URL + apiURL, JSON.stringify(body)).then((res) => {
            if (res.status.http_status === "OK"){
              setCookie("token", res.payload.token, 3)
              toast.success("Login successfully");
              navigate("/home");
              }
            if (res.status.http_status !== "OK"){
              toast.error("Username or password invalid")
            }
            
          });
        

          
        } catch (e) {
          console.log(e);
        }
      };
  
      

      const navigate = useNavigate();
      const inputs = [
        {
          id: 1,
          name: "username",
          type: "text",
          placeholder: "Username",
          errorMessage: "Cannot be left blank",
          label: "Username",
          required: true,
        },
        {
          id: 4,
          name: "password",
          type: "password",
          placeholder: "Password",
          errorMessage: "Cannot be left blank",
          label: "Password",
          required: true,
        },

      ];
     
      const handleSubmit = (e) => {
        
        e.preventDefault();

        handleLogin()
        
      };
    
      const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };
      
      return <>
      <Helmet title="Login">
        <div className="login__app">
        <Row style={{background:"#fff", borderRadius:"10px"}}>

            <Col>
          <form className="form__login" onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <button
            className="btn__login" 
            >Login</button>
            <p
            style={{color:"#304352", border:"solid 1px #304352", background:"#fff"}}
          onClick={handleToogleLoginChatbot}
            className="btn__loginchatbot mt-1" 
            >Login with Chatbot account</p>
            <p className="btn__register mt-1"
            onClick={() => {
              handleToogleSignup()
                }}
              >
            Create a new account</p>
          </form>
          
          </Col>
          <Col>
          <form className="form__imglogin">
          <p style={{width:"400px"}} className='p-t-70'
          >
					<img className='login1001-pic' src={logo} alt="IMG"/>
				  </p>
          </form>
          </Col>

          </Row>
        </div>
        <Register
         open={openSignupModal}
         toggle={handleToogleSignup}
        />
        <LoginChatBot
        open={openLoginChatbot}
        toggle={handleToogleLoginChatbot}
        />
        </Helmet>
        </>
}


export default LoginTest
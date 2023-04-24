import React, { useState} from 'react'
import FormInput from '../components/FormInput/FormInput';

import { BASE_URL} from "../global/globalVar";
import { useNavigate } from "react-router-dom";
import { POST } from "../functionHelper/APIFunction";
import { setCookie } from "../functionHelper/GetSetCookie";
import { toast } from "react-toastify"
import "../styles/login.css"
import "../styles/login/main.css"
import "../styles/login/util.css"
import LoginChatBot from './LoginChatBot';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection2';

const LoginTest = () => {
  
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const [openLoginChatbot, setOpenLoginChatbot] = useState(false);
  
  const handleToogleSignup = () => {
    navigate('/register')
    
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
              navigate("/homenew");
              }
            if (res.status.http_status !== "OK"){
              toast.error("Username or password invalid")
            }
            
          });
        

          
        } catch (e) {
          console.log(e);
        }
      };
  
      
      const [passwordShown, setPasswordShown] = useState(false);

      // Password toggle handler
      const togglePassword = () => {
        // When the handler is invoked
        // chnage inverse the boolean state passwordShown
        setPasswordShown(!passwordShown);
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
          type: passwordShown ? "text" : "password",
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
      <section className='login__app'>
        <div className="paddings innerWidth flexCenter hero-container">
               
                <div className="innerWidth flexCenter">


           
          <form className="form__login" onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <p className='btn_show m-l-6' ><input onChange={togglePassword} type='checkbox'/>  Show Password</p>
            <button
            className="button-background-move buy__btn w-100 mb-4 m-t-20" style={{background: "rgba(136, 160, 255, 0.46)", color: "#fff", fontSize: "20px", fontWeight: "700", wordSpacing:"10"}}
            >LOGIN</button>
            <p
          onClick={handleToogleLoginChatbot}
          className="button-background-move buy__btn w-100 mb-4 m-t-20"  style={{background: "#fff", color: "black",fontSize: "20px", fontWeight: "700", border: "1px solid #304352"}}


            >Login with Chatbot account</p>
            <p className="btn__register mt-1"
            onClick={() => {
              handleToogleSignup()
                }}
              >
            Create a new account</p>
          </form>
          
          
         
          {/* <Col>
          <form className="form__imglogin">
          <p style={{width:"400px"}} className='p-t-70'
          >
					<img className='login1001-pic' src={logo} alt="IMG"/>
				  </p>
          </form>
          </Col> */}

        </div>
        
        <LoginChatBot
        open={openLoginChatbot}
        toggle={handleToogleLoginChatbot}
        />
                </div>
    
    </section>
        
        </Helmet>
        </>
}


export default LoginTest
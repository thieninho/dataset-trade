import React, { useState} from 'react'
import FormInput from '../components/FormInput/FormInput';

import { BASE_URL,  originUrl} from "../global/globalVar";
import { useNavigate } from "react-router-dom";
import { POST } from "../functionHelper/APIFunction";
import { setCookie } from "../functionHelper/GetSetCookie";
import { toast } from "react-toastify"
import "../styles/login.css"
import "../styles/login/common.css"
import "../styles/login/util.css"
import Helmet from '../components/Helmet/Helmet';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
const LoginTest = () => {
  
  
  const handleToogleSignup = () => {
    navigate('/register')
    
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
      var screen = Screen
      var popupWindow = null;
      const popupCenter = ({url, title, w, h}) => {
        // Fixes dual-screen position                             Most browsers      Firefox
        const dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
        const dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY;
    
        const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    
        const systemZoom = width / window.screen.availWidth;
        const left = (width - w) / 2 / systemZoom + dualScreenLeft
        const top = (height - h) / 2 / systemZoom + dualScreenTop
        popupWindow = window.open(url, title, 
          `
          scrollbars=yes,
          width=${w / systemZoom}, 
          height=${h / systemZoom}, 
          top=${top}, 
          left=${left}
          `
        )
    
        if (window.focus) popupWindow.focus();
    }
      var stompClient =null;
      var socketConnected = false;
      function logInWithChatbot() {
        connectSocket();
        popupCenter({url: originUrl + "login_with_chatbot", title: 'Chatbot - Login', w: 770, h: 400});
    }
      function socketListener(result) {
        console.log(result);
        if (result === null || result.body === null) {
            alert("Log in fail!");
            return;
        }
    
        var message = JSON.parse(result.body);
        if (message.status === null || message.user === null) {
            alert("Something went wrong!");
            return;
        }
    
        if (message.status.http_status !== "OK") {
            alert(message.status.exception_code);
            return;
        }
    
        setCookie("user", JSON.stringify(message.user), 60*24);
        window.location.href = originUrl + "homenew";
    
    }
      const connectSocket =()=>{
        if (socketConnected) return;
        var socket = new SockJS(BASE_URL + 'api/ws_endpoint');
        stompClient = over(socket);
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            socketConnected = true;
            stompClient.subscribe('/socket_topic/log_in_with_chatbot_acc', function (result) {
                socketListener(result);
            });
        });
    }
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
            className="button-background-move buy__btn w-100 mb-4 m-t-20" style={{ color: "#000", fontSize: "20px", fontWeight: "700", wordSpacing:"10"}}
            >LOGIN</button>
            <p
          onClick={logInWithChatbot}
          className="button-background-move buy__btn w-100 mb-4 m-t-20"  style={{background: "#fff", color: "black",fontSize: "20px", fontWeight: "700", border: "1px solid #304352"}}


            >Login with Chatbot account</p>
            <p className="btn__register mt-1"
            onClick={() => {
              handleToogleSignup()
                }}
              >
            Create a new account</p>
          </form>
          
          
         
        </div>
      
                </div>
    
    </section>
        
        </Helmet>
        </>
}


export default LoginTest
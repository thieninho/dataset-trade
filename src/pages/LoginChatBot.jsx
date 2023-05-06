import React, { useState} from 'react'
import FormInput from '../components/FormInput/FormInput';
import {BASE_URL_CHATBOT} from "../global/globalVar";
import { POST } from "../functionHelper/APIFunction";
import { setCookie } from "../functionHelper/GetSetCookie";
import { toast } from "react-toastify"

function LoginChatBot(){

    const [values, setValues] = useState({
        username: "",
        password: "",
      });

      const handleLogin = () => {
        let apiURL1 = "api/user/login_from_data_everywhere";

        try {
          let body = {
            username: values.username,
            password: values.password,
          };
          POST(BASE_URL_CHATBOT + apiURL1, JSON.stringify(body)).then((res) => {
            if (res.http_status === "OK"){
              setCookie("token", res.token, 3)
              toast.success("Login successfully");
              window.close();              
              }
              if (res.http_status !== "OK"){
                toast.error("Username or password invalid")
              }
           
          })
          
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
        handleLogin();
      };
    
      const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };
      
    
  return (
    <>
	
        <div className="regis2__app">
          <form onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
              <p className='btn_show m-l-6' ><input onChange={togglePassword} type='checkbox'/>  Show Password</p>
            
            <button className="btn__login2">Submit</button>
            
          </form>
        </div>

        </>
  )
}

export default LoginChatBot
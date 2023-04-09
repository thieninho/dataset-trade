import React, { useState} from 'react'
import { Modal, ModalBody, Button, ModalFooter} from 'reactstrap'
import FormInput from '../components/FormInput/FormInput';
import {BASE_URL_CHATBOT} from "../global/globalVar";
import { useNavigate } from "react-router-dom";
import { POST } from "../functionHelper/APIFunction";
import { setCookie } from "../functionHelper/GetSetCookie";
import { toast } from "react-toastify"

function LoginChatBot({open, toggle}){

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
              navigate("/home");
              }
              if (res.http_status !== "OK"){
                toast.error("Username or password invalid")
              }
           
          })
          
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
        handleLogin();
      };
    
      const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };
    
  return (
    <>
	<Modal isOpen={open} style={{ maxWidth: "440px", borderRadius:"70px"}}>
    <ModalBody>
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
            
            <button className="btn__login">Submit</button>
            
          </form>
        </div>
        </ModalBody>
        <ModalFooter>
	<Button
        style={{color:"#304352", background:"#fff"}}
        onClick={() => {
			  toggle();
            }}>Close</Button>
    </ModalFooter>
	</Modal>
        </>
  )
}

export default LoginChatBot
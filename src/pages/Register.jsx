import React, {useState} from 'react'
import FormInput from '../components/FormInput/FormInputRegis';
import { Modal, ModalBody, Button, ModalFooter} from 'reactstrap'
import { POST } from "../functionHelper/APIFunction";
import { toast } from "react-toastify"
import { BASE_URL} from "../global/globalVar";

function Register({open, toggle}){
    const [values, setValues] = useState({
        username: "",
        full_name: "",
        address: "",
        birthday: "",
        password: "",
        confirm_password: "",
      });
      const handleLogin = () => {
        console.log("login")
        let apiURL = "api/user/sign_up";
        try {
          let body = {
            username: values.username,
            password: values.password,
            full_name: values.full_name,
            confirm_password: values.confirm_password,
            birthday: values.birthday,
            address: values.address,
          };
          POST(BASE_URL + apiURL, JSON.stringify(body)).then((res) => {
            console.log(res);
            if (res.status.http_status !== "OK") {
              toast.error("Register failure")
             
            }
            if (res.status.http_status === "OK"){
              toast.success("Register successfully");
			        toggle();

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
      const inputs = [
        {
          id: 1,
          name: "username",
          type: "text",
          placeholder: "Username",
          errorMessage:
            "Username should be 3-16 characters and shouldn't include any special character!",
          label: "Username(*)",
          pattern: "^[A-Za-z0-9]{3,16}$",
          required: true,
        },
        {
          id: 2,
          name: "full_name",
          type: "fullname",
          placeholder: "Fullname",
          errorMessage: "Cannot be left blank",
          label: "Fullname(*)",
          required: true,
        },
        {
          id: 6,
          name: "address",
          type: "address",
          placeholder: "Address",
          errorMessage: "Cannot be left blank",
          label: "Address",
          required: false,
        },
        {
          id: 3,
          name: "birthday",
          type: "date",
          min: "1900-01-01",
          max: "2010-01-01",
          errorMessage: "Cannot be left blank",
          placeholder: "Birthday",
          label: "Birthday",
          required: false,
        },
        {
          id: 4,
          name: "password",
          type: passwordShown ? "text" : "password",
          placeholder: "Password",
          errorMessage:
            "Password should be 6-20 characters and include at least 1 letter, 1 number!",
          label: "Password(*)",
          pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,20}$`,
          required: true,
        },
        {
          id: 5,
          name: "confirm_password",
          type: passwordShown ? "text" : "password",
          placeholder: "Confirm Password",
          errorMessage: "Passwords don't match!",
          label: "Confirm Password(*)",
          pattern: values.password,
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
        <div className="regis1__app">
          <form onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
              
            ))}
            <p className='btn_show' ><input onChange={togglePassword} type='checkbox'/> Show Password</p>
            
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

export default Register
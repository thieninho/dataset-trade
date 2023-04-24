import React, {useState} from 'react'
import FormInput from '../components/FormInput/FormInputRegis';
import { POST } from "../functionHelper/APIFunction";
import { toast } from "react-toastify"
import { BASE_URL} from "../global/globalVar";
import { useNavigate } from "react-router-dom";

import Helmet from '../components/Helmet/Helmet';
const Register = () => {
  const navigate = useNavigate();

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
              navigate("/homenew");
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
      const navigateToLogin = () =>{
        navigate('/login')
      }
    
      return (
        <>
	      <Helmet title="Login">
      <section className='login__app1'>
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
                     className="button-background-move buy__btn w-100 mb-4 m-t-20" style={{background:"rgba(136, 160, 255, 0.46)",color: "#fff", fontSize: "20px", fontWeight: "700", wordSpacing:"10"}}

            >Register</button>
             <p className="btn__register mt-1"
            onClick={() => {
              navigateToLogin()
                }}
              >
            Already have an account?</p>
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
      
                </div>
    
    </section>
        
        </Helmet>
        </>
      )
}

export default Register
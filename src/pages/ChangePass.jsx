import { POST } from "../functionHelper/APIFunction";
import React, {useState} from 'react'
import { Modal, ModalHeader, ModalBody, Button, ModalFooter} from 'reactstrap'
import { BASE_URL} from "../global/globalVar";
import FormInput from '../components/FormInput/FormInput';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


function ChangePass({ open, toggle, value}){

  const navigate = useNavigate()

  const [values, setValues] = useState({
    new_password: "",
    current_password: "",
    confirm_password: "",
  });

  const handleSave = () => {
    let body = {
      current_password: values.current_password,
      new_password: values.new_password,
      confirm_password: values.confirm_password,
    };
    let url = "api/user/update_password";
    POST(BASE_URL + url, JSON.stringify(body))
      .then((res) => {
        console.log(res)
        if (res.status.http_status !== "OK") {
          toast.error("Register failure")
         
        }
        if (res.status.http_status === "OK"){
          toast.success("Register successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigateLogout = () =>{
    navigate('/login')
  }
  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // chnage inverse the boolean state passwordShown
    setPasswordShown(!passwordShown);
  };
  const inputs = [

    {
      id: 4,
      name: "current_password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Cannot be left blank",
      label: "Password",
      required: true,
    },
    {
      id: 6,
      name: "new_password",
      type: passwordShown ? "text" : "password",
      placeholder: "New Password",
      errorMessage:
        "Password should be 6-20 characters and include at least 1 letter, 1 number!",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,20}$`,
      label: "New pasword",
      required: true,
    },
    {
      id: 5,
      name: "confirm_password",
      type: passwordShown ? "text" : "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.new_password,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
    navigateLogout();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
 
  return (
    <>
    <Modal isOpen={open} style={{ maxWidth: "380px" }}>
    <ModalHeader> Change Password </ModalHeader>
    <ModalBody>
        <div className="regis__app">
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

export default ChangePass
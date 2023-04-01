import React, {useState}  from 'react'
import { Modal, ModalBody, Button, ModalFooter} from 'reactstrap'
import { BASE_URL} from "../global/globalVar";
import { POST } from "../functionHelper/APIFunction";
import { toast } from "react-toastify"
import "../styles/login/main.css"
import "../styles/login/util.css"

function Signup({ open, toggle, value}){

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [full_name, setFull_name] = useState('')
  const [confirm_password, setConfirm_password] = useState('')
  const [birthday, setBirthday] = useState('')
  const [address, setAddress] = useState('')

  const handleLogin = () => {
    console.log("login")
    let apiURL = "api/user/sign_up";
    try {
      let body = {
        username: username,
        password: password,
        full_name: full_name,
        confirm_password: confirm_password,
        birthday: birthday,
        address: address,
      };
      POST(BASE_URL + apiURL, JSON.stringify(body)).then((res) => {
        console.log(res);
        if (res.status.http_status !== "OK") {
          throw res.status.exception_code;
        }
		toast.success("Register successfully");

        //setCookie("token", res.payload.token, 3);
      });
    } catch (e) {
      console.log(e);
    }
  };
  
    
  return (
    <>
	<Modal isOpen={open} style={{ maxWidth: "440px", borderRadius:"70px"}}>
    {/* <ModalHeader> Register </ModalHeader> */}
	<ModalBody>
    <div class="limiter">
	<h4 style={{fontWeight: "500"}}>Register</h4>
			<div class="wrap-login101">
				<form class="login101-form validate-form">
					<p>Username</p>
					<div class="wrap-input100">
						<input class="input100" type="text"
                        value={username} onChange={(e)=> setUsername(e.target.value)}
						/>
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>
					<p>Password</p>
					<div class="wrap-input100 validate-input">
						<input class="input100" type='password' 
                        value={password} onChange={(e)=> setPassword(e.target.value)} />
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					<p>Confirm Password</p>
					
                    <div class="wrap-input100 validate-input">
						<input class="input100" type='password' 
                        value={confirm_password} onChange={(e)=> setConfirm_password(e.target.value)} />
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					<p>Fullname</p>

                    <div class="wrap-input100 validate-input">
						<input class="input100" type='text' 
                        value={full_name} onChange={(e)=> setFull_name(e.target.value)} />
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>

					<p>Birthday</p>

                    <div class="wrap-input100 validate-input">
						<input class="input100" type='date' 
                        value={birthday} onChange={(e)=> setBirthday(e.target.value)} />
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					<p>Address</p>

                    <div class="wrap-input100 validate-input">
						<input class="input100" type='text' 
                        value={address} onChange={(e)=> setAddress(e.target.value)} />
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
				</form>
			</div>
		</div>
	</ModalBody>
	<ModalFooter>
    <Button
        style={{color:"#fff", background:"#076585"}}
        onClick={() => {
			handleLogin();
			  toggle();
            }}>Save</Button>
	<Button
        style={{color:"#076585", background:"#fff"}}
        onClick={() => {
              
			  toggle();
            }}>Close</Button>
    </ModalFooter>
	</Modal>
    </>
  )
}

export default Signup
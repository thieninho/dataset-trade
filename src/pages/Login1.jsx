import React, {useState}  from 'react'
import logo from '../assets/images/secure-login.gif'
import { BASE_URL} from "../global/globalVar";
import { useNavigate } from "react-router-dom";
import { POST } from "../functionHelper/APIFunction";
import { setCookie } from "../functionHelper/GetSetCookie";
import { toast } from "react-toastify"

import "../styles/login/main.css"
import "../styles/login/util.css"
import Signup from './Signup';

const Login1 = () => {
const [openSignupModal, setOpenSignupModal] = useState(false);
const handleToogleSignup = () => {
    setOpenSignupModal(!openSignupModal)
  }

  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    console.log("login")
    let apiURL = "api/user/log_in";
    try {
      let body = {
        username: username,
        password: password,
      };
      POST(BASE_URL + apiURL, JSON.stringify(body)).then((res) => {
        console.log(res);
        if (res.status.http_status !== "OK") {
          //throw res.status.exception_code;
		  toast.error("Username or password invalid")
        }
        setCookie("token", res.payload.token, 3);
		toast.success("Login successfully");
        navigate("/home");
      });
    } catch (e) {
      console.log(e);
    }
  };
    
  return (
    <>
    <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
					<img src={logo} alt="IMG" />
				</div>

				<form class="login100-form validate-form">
					{/* <span class="login100-form-title">
						Login Dataset Shop
					</span> */}

					<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input class="input100" type="text"
                        value={username} onChange={(e)=> setUsername(e.target.value)}
                        placeholder='Enter your username' />
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div class="wrap-input100 validate-input" data-validate = "Password is required">
						<input class="input100" type='password' placeholder='Enter your password'
                        value={password} onChange={(e)=> setPassword(e.target.value)} />
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
					<div class="container-login100-form-btn">
						<p class="login100-form-btn"
                        onClick={() => {
                            handleLogin();
                          }}
                        >
							Login
						</p>
					</div>
						<p class="login100-form-btn"
                        onClick={() => {
        				//navigate("/signup");
                        handleToogleSignup()
                          }}
                        >
							Signup
						</p>
				</form>
			</div>
		</div>
	</div>
	<Signup
    open={openSignupModal}
    toggle={handleToogleSignup}
    />
    </>
  )
}

export default Login1
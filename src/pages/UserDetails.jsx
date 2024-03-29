import React, {useEffect, useState}  from 'react'
import { BASE_URL} from "../global/globalVar";
import { GET, POST } from "../functionHelper/APIFunction";
import "../styles/login/common.css"
import "../styles/login/util.css"
import { toast } from "react-toastify";
import Helmet from '../components/Helmet/Helmet';
import ChangePass from './ChangePass';
import GetStarted from '../components/GetStarted/GetStarted';
const UserDetails = () => {
const [openPassModal, setOpenPassModal] = useState(false);


  //const [data, setData] = useState({username:'', address:'', full_name:'', birthday:''})
  const handleTooglePass = () => {
    setOpenPassModal(!openPassModal)
  }
const [username, setUsename] = useState("")
const [address, setAddress] = useState("")
const [fullname, setFulname] = useState("")
const [birthday, setBirthday] = useState("")


  const handleSave = () => {
    let body = {
      username: username,
      address: address,
      full_name: fullname,
      birthday: birthday
    };
    let url = "api/user/update";
    POST(process.env.REACT_APP_BASE_URL + url, JSON.stringify(body))
      .then((res) => {
        if (res.status.http_status !== "OK")
    {
        toast.error("Update fail")
    }
    if (res.status.http_status === "OK")
    {
        toast.success("Update successfully");
    }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData = () => {
    let apiURL = "api/user/detail";
      GET(
        process.env.REACT_APP_BASE_URL + apiURL
      ).then((res) => {
        console.log(res.payload.username);
        setUsename(res.payload.username);
        setFulname(res.payload.full_name);
        setAddress(res.payload.address);
        setBirthday(res.payload.birthday);
      })
    .catch ((e) => {
      console.log(e);
    })
  };
  useEffect(() => getData(), []);
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
  return (
    <>
    <Helmet title="Profile">
    <div className="limiter">
		<div className="container-login222 p-t-70 p-b-70">
				<form className="login222-form validate-form">
				
          {/* <div className="login100-pic js-tilt" data-tilt>
					<img src={logo} alt="IMG" />
				  </div> */}
          <p>Username</p>
					<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
          
						<input
            style={{color:"black", paddingLeft:"1rem"}}
            className="input100" type="text"
            readOnly
                        value={username}
                        onChange={(e)=> setUsename(e.target.value)}
                        />
                         
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>
          <p>Address</p>
					<div className="wrap-input100 validate-input" data-validate = "">
            
						<input 
            style={{color:"black", paddingLeft:"1rem"}}
            className="input100" type='text' 
                        value={address}
                        onChange={(e)=> setAddress(e.target.value)}
                         />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
          <p>Birthday</p>
					<div className="wrap-input100 validate-input" data-validate = "">
            
						<input 
            style={{color:"black", paddingLeft:"1rem"}}
            className="input100" type='date' 
            min="1900-01-01" max="2010-01-01"
                        value={birthday} onChange={(e)=> setBirthday(e.target.value)} />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>

          <p>Fullname</p>
					<div className="wrap-input100 validate-input" data-validate = "">
            
						<input 
            style={{color:"black", paddingLeft:"1rem"}}
            className="input100" type='text' 
                        value={fullname} onChange={(e)=> setFulname(e.target.value)} />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					<div className="container-login100-form-btn ">
						<p className="button-background-move buy__btn login100-form-btn"
                        onClick={() => {
                            handleSave();
                          }}
                        >
							Save
						</p>
            <div  
            
            className="text-center">
						<p 
            style={{background: "#fff", color: "black", border: "1px solid #304352"}}
            className="button-background-move buy__btn login100-form-btn" onClick={() => {
                      handleTooglePass();
                      
                    }}>
							Change Password!
						</p>
   
						
					</div>
          
          
					</div>
				</form>
			</div>
		</div>
    <ChangePass
    open={openPassModal}
    toggle={handleTooglePass}
    />
    </Helmet>
    </>
  )
}

export default UserDetails
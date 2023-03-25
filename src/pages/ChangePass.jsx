import { POST } from "../functionHelper/APIFunction";
import React, {useState} from 'react'
import { Modal, ModalHeader, ModalBody, Button, ModalFooter, Input } from 'reactstrap'
import { BASE_URL} from "../global/globalVar";
import { toast } from "react-toastify";


function ChangePass({ open, toggle, value}){
const [crrpass, setoldPass] = useState("")
const [newpass, setnewPass] = useState("")
const [confirmpass, setconfirmPass] = useState("")

  const handleSave = () => {
    let body = {
      current_password: crrpass,
      new_password: newpass,
      confirm_password: confirmpass,
    };
    let url = "api/user/update_password";
    POST(BASE_URL + url, JSON.stringify(body))
      .then((res) => {
        toggle();
        toast.success("Update successfully", "success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    <Modal isOpen={open} style={{ maxWidth: "400px" }}>
    <ModalHeader> Change Pass </ModalHeader>
    <ModalBody>
        <p>Current Password:</p>
        <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
          
						<Input
                        style={{color:"black", paddingLeft:"2rem"}}
                        className="input100" type="text"
                        value={crrpass}
                        onChange={(e) => {
                            setoldPass(e.target.value);
                          }}
                        />
                         
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>
        
                    <p>New Password:</p>
                     <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
          
						<Input
                        style={{color:"black", paddingLeft:"2rem"}}
                        className="input100" type="text"
                        value={newpass}
                        onChange={(e) => {
                            setnewPass(e.target.value);
                          }}
                        />
                         
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

                    <p>Confirm Password:</p>
                    <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
          
						<Input
                        style={{color:"black", paddingLeft:"2rem"}}
                        className="input100" type="text"
                        value={confirmpass}
                        onChange={(e) => {
                            setconfirmPass(e.target.value);
                          }}

                        />
                         
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>
                    

    </ModalBody>
    <ModalFooter>
    <Button
        style={{color:"#fff", background:"linear-gradient(-135deg, #c850c0, #4158d0)"}}
        onClick={() => {
              handleSave();
            }}>Save</Button>
        <Button
        style={{color:"#fff", background:"linear-gradient(-135deg, #c850c0, #4158d0)"}}
        onClick={() => {
              toggle();
            }}>Close</Button>
            
    </ModalFooter>
    </Modal>
    </>
  )
}

export default ChangePass
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./style.css"
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Login } from '@mui/icons-material';
function Example({ show, setShow }) {


  const handleClose = () => setShow(false);
  const [firstNameData, setFirstNameData] = useState({})
  const [lastNameData, setLastNameData] = useState({})
  const [gmailData, setGmailData] = useState({})
  const [passwordData, setPasswordData] = useState({})
  const [phoneData, setPhoneData] = useState({})
  const [isCreateAccountVisible, setIsCreateAccountVisible] = useState(true);

  async function createAccount() {
    const createInputData = {
      firstName: firstNameData,
      lastName: lastNameData,
      gmail: gmailData,
      password: passwordData,
      phoneNumber: phoneData
    }

    try {
      const response = await axios.post("http://localhost:5000", createInputData)
      console.log(response.data)
    } catch (error) {
      console.log("Error posting data", error.message)
    }
  }

  async function handleLogin() {
    const loginInputData = {
      gmail: gmailData,
      password: passwordData,
    }

    try {
      const response = await axios.post("http://localhost:5000/login", loginInputData)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log("Login successful and token saved!");
      } else {
        console.log("Token not received from server.");
      }
    } catch (error) {
      console.log("Wrong password", error.message)
    }
  }

  

  function signUp() {
    setIsCreateAccountVisible(true);
  }
  function login() {
    setIsCreateAccountVisible(false);
  }

  return (
    <>

      {isCreateAccountVisible ? (
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>LOGIN</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='loginAccount'>
              <input
                className='input'
                type='gmail'
                onChange={(e) => setGmailData(e.target.value)} value={gmailData?.gmail}
                placeholder='Enter your gmail'
              />
              <input
                className='input'
                type='password'
                onChange={(e) => setPasswordData(e.target.value)} value={passwordData?.Password}
                placeholder='Enter your password'
              />
              <h6 className='sign-up' onClick={login}>Create Account</h6>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className='btnAccount' onClick={handleClose}>
              Close
            </Button>
            <Button className="btn btn-dark btnCart" onClick={handleLogin}>
              login
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Create a new account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='createAccount'>
              <input className='input nameinput' onChange={(e) => setFirstNameData(e.target.value)} value={firstNameData?.firstName} id='firstName' type='text' placeholder='Enter your first Name' />
              <input className='input nameinput' onChange={(e) => setLastNameData(e.target.value)} value={lastNameData?.lastName} id='lastName' type='text' placeholder='Enter your Last Name' />
              <input className='input' onChange={(e) => setGmailData(e.target.value)} value={gmailData?.gmail} id='gamil' type='gmail' placeholder='Enter your gmail' />
              <input className='input' onChange={(e) => setPasswordData(e.target.value)} value={passwordData?.Password} id='password' type='password' placeholder='Enter your password' />
              <input className='input' onChange={(e) => setPhoneData(e.target.value)} value={phoneData?.phone} id='phoneNumber' type='text' placeholder='Enter your phone Number' />
              <h6 className='sign-up' onClick={signUp}>Already have an account?</h6>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className='btnAccount' onClick={handleClose}>
              Close
            </Button>
            <Button className="btn btn-dark btnCart" onClick={createAccount}>
              Sign up
            </Button>
          </Modal.Footer>
        </Modal>
      )

      }

    </>
  );
}

export default Example;
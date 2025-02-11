import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./style.css";
import axios from 'axios';
import { MdEdit } from "react-icons/md";
import { message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';

function Example({ show, setShow }) {
  const handleClose = () => setShow(false);
  const [firstNameData, setFirstNameData] = useState({});
  const [lastNameData, setLastNameData] = useState({});
  const [gmailData, setGmailData] = useState({});
  const [passwordData, setPasswordData] = useState({});
  const [phoneData, setPhoneData] = useState({});
  const [address, setAddress] = useState({});
  const [isCreateAccountVisible, setIsCreateAccountVisible] = useState(true);
  const [accountOpen, setAccountOpen] = useState(false);
  const [userData, setUserData] = useState({
    gmailUser: {}
  });
  const [loading, setLoading] = useState(false);  // Add loading state
  const tokenId = localStorage.getItem("token");

  // Create Account function with loader
  async function createAccount() {
    setLoading(true);  // Set loading to true when the request starts
    const createInputData = {
      firstName: firstNameData,
      lastName: lastNameData,
      gmail: gmailData,
      password: passwordData,
      phoneNumber: phoneData,
      address: address,
    };

    try {
      const response = await axios.post("http://localhost:5000", createInputData);
      const response1 = await axios.post("http://localhost:5000/login", createInputData);
      if (response1.data.token) {
        localStorage.setItem('token', response1.data.token);
        setAccountOpen(true);
        message.success("Login successful");
      } else {
        console.log("Token not received from server.");
      }
    } catch (error) {
      message.error("Your account is already created");
    } finally {
      setLoading(false);  // Set loading to false after the request is done
    }
  }

  // Handle Login with loader
  async function handleLogin() {
    setLoading(true);  // Set loading to true when login is attempted
    const loginInputData = {
      gmail: gmailData,
      password: passwordData,
    };

    try {
      const response = await axios.post("http://localhost:5000/login", loginInputData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setAccountOpen(true);
        message.success("Login successful");
      } else {
        console.log("Token not received from server.");
      }
    } catch (error) {
      message.error("Wrong password");
    } finally {
      setLoading(false);  // Set loading to false after login attempt
    }
  }

  async function ageEdit() {
    console.log("ya kam karna ha")
  }

  function Logout() {
    localStorage.removeItem("token");
    setAccountOpen(false);
    setLoading(false)
  }

  function signUp() {
    setIsCreateAccountVisible(true);
  }

  function login() {
    setIsCreateAccountVisible(false);
  }

  useEffect(() => {
    async function openAccount() {
      if (!tokenId) {
        console.log("No token found, user needs to log in");
        return;
      }
      try {
        const response = await axios.get("http://localhost:5000/fetch-me", {
          headers: {
            Authorization: tokenId,
          },
        });
        setUserData(response.data.data.gmailUser);
        setAccountOpen(response.data.status);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    openAccount();
  }, [tokenId]);

  return (
    <>
      {!accountOpen ? (
        isCreateAccountVisible ? (
          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>LOGIN</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="loginAccount">
                <input
                  className="input"
                  type="gmail"
                  onChange={(e) => setGmailData(e.target.value)}
                  value={gmailData?.gmail}
                  placeholder="Enter your gmail"
                />
                <input
                  className="input"
                  type="password"
                  onChange={(e) => setPasswordData(e.target.value)}
                  value={passwordData?.Password}
                  placeholder="Enter your password"
                />
                <h6 className="sign-up" onClick={login}>
                  Create Account
                </h6>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btnAccount" onClick={handleClose}>
                Close
              </Button>
              <Button 
                className="btn btn-dark btnCart" 
                onClick={handleLogin} 
                disabled={loading}  // Disable button when loading is true
              >
                {loading ? <Spin indicator={<LoadingOutlined spin style={{ color: 'white', fontSize: 24 }} />} size="small" /> : "Login"}  {/* Show spinner when loading */}
              </Button>
            </Modal.Footer>
          </Modal>
        ) : (
          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Create a new account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="createAccount">
                <input
                  className="input nameinput"
                  onChange={(e) => setFirstNameData(e.target.value)}
                  value={firstNameData?.firstName}
                  id="firstName"
                  type="text"
                  placeholder="Enter your first Name"
                />
                <input
                  className="input nameinput"
                  onChange={(e) => setLastNameData(e.target.value)}
                  value={lastNameData?.lastName}
                  id="lastName"
                  type="text"
                  placeholder="Enter your Last Name"
                />
                <input
                  className="input"
                  onChange={(e) => setGmailData(e.target.value)}
                  value={gmailData?.gmail}
                  id="gamil"
                  type="gmail"
                  placeholder="Enter your gmail"
                />
                <input
                  className="input"
                  onChange={(e) => setPasswordData(e.target.value)}
                  value={passwordData?.Password}
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
                <input
                  className="input"
                  onChange={(e) => setPhoneData(e.target.value)}
                  value={phoneData?.phone}
                  id="phoneNumber"
                  type="text"
                  placeholder="Enter your phone Number"
                />
                <input
                  className="input"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address?.address}
                  id="address"
                  type="text"
                  placeholder="Enter your address"
                />
                <h6 className="sign-up" onClick={signUp}>
                  Already have an account?
                </h6>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btnAccount" onClick={handleClose}>
                Close
              </Button>
              <Button 
                className="btn btn-dark btnCart" 
                onClick={createAccount} 
                disabled={loading}  // Disable button when loading is true
              >
                {loading ? <Spin indicator={<LoadingOutlined spin style={{ color: 'white', fontSize: 24 }} />} size="small" /> : "Sign up"}  {/* Show spinner when loading */}
              </Button>
            </Modal.Footer>
          </Modal>
        )
      ) : (
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Welcome</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='imgContinar'>
              <img className='userImg' src='https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg?semt=ais_incoming' />
            </div>
            <div className='nameContinar'>
              <h4>Name </h4>
              <h4>: {userData.firstName} {userData.lastName}</h4>
            </div>
            <div className='d-flex'>
              <h4>Age </h4>
              <h5>: -- --- ---- <MdEdit onClick={ageEdit} /></h5>
            </div>
            <div className='d-flex'>
              <h4>Address </h4>
              <h5>: {userData.address}</h5>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btnAccount" onClick={handleClose}>
              Close
            </Button>
            <Button 
                className="btn btn-dark btnCart" 
                onClick={Logout} 
                disabled={loading}  // Disable button when loading is true
              >
                {loading ? <Spin indicator={<LoadingOutlined spin style={{ color: 'white', fontSize: 24 }} />} size="small" /> : "Logout"}  {/* Show spinner when loading */}
              </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default Example;

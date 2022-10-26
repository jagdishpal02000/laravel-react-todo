import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";


const apiURL = "http://127.0.0.1:8000/api/";

const Signup = ({isLogin,setIsLogin,setShowSignup}) => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({ error: false, message: "" });

  const handleSubmit = async () => {
    // Make API Call to send the data.;
    if (
      signupData.name.length &&
      signupData.email.length &&
      signupData.password.length 
    ) {
      setError({ error: false, message: "" });
      try {
        const resp = await axios.post(apiURL + "register", signupData);
        console.log(resp.data);
        localStorage.setItem('token', resp.data.token);
        setIsLogin(true);
        setShow(false);
      } catch (error) {
       
          setError({
            error: true,
            message: `Something went wrong, please try again ${error}`,
          });
        
      }
    } else {
      setError({ error: true, message: "Please Fill all the details" });
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>Sign Up</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error.error && (
            <div className="alert alert-danger" role="alert">
              {error.message}
            </div>
          )}

          <form className="form-group">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Your Awesome Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={signupData.name}
                placeholder="Ramdev"
                onChange={(e) => {
                  setSignupData({ ...signupData, name: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={signupData.email}
                placeholder="abcd@mail.com"
                onChange={(e) => {
                  setSignupData({ ...signupData, email: e.target.value });
                }}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                value={signupData.password}
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(e) => {
                  setSignupData({ ...signupData, password: e.target.value });
                }}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{setShowSignup(false)}}>
            Login
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Signup
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Signup;

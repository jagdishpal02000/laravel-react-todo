import React, { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';

const apiURL= 'http://127.0.0.1:8000/api/';


const Login = ({isLogin,setIsLogin,setShowSignup}) => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loginData,setLoginData]=useState({email:'',password:''});
  const [error, setError] = useState({ error: false, message: "" });

  
  const handleSubmit = async () => {
    // Make API Call to send the data.;
   if(loginData.email.length && loginData.password.length){
    try {
        console.log(loginData);
      const resp = await axios.post("http://127.0.0.1:8000/api/login",loginData);
      console.log(resp.data);
      localStorage.setItem('token', resp.data.token);
      setShow(false);
      setIsLogin(true);
    } catch (error) {
        console.warn(error);
      if (error.response.status === 404) {
        setError({ error: true, message: "Email Not found, please Do signup first" });
      } 
      else if (error.response.status === 401) {
        setError({ error: true, message: "Password is incorrect :( " });
      } 
      else {
        setError({ error: true, message: "Something went wrong, please try again :( " });
      }
    }
   }
   else{
    setError({ error: true, message: "Please Fill all the details" });

   }
  }

  return (
    <>
      <Modal
        show={show}
        
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><h2>Login</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {error.error && (
            <div className="alert alert-danger" role="alert">
              {error.message}
            </div>
          )}
          <form className="form-group">
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" value={loginData.email} onChange={(e)=>setLoginData({...loginData,email:e.target.value})} placeholder="Enter email"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" value={loginData.password} className="form-control" onChange={(e)=>setLoginData({...loginData,password:e.target.value})} placeholder="Password"/>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
        
          <Button variant="primary" onClick={()=>{setShowSignup(true)}}>
            Sign Up
          </Button>
        
          <Button variant="success" onClick={handleSubmit}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Login;

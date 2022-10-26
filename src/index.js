import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import Auth from "./Auth";

const StartApp = () => {
  const [islogin,setIsLogin] = useState(false);
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      setIsLogin(true);
    }
  },[])
  return (
    <>
     {islogin ? <App /> : <Auth islogin={islogin} setIsLogin={setIsLogin} />}
    </>
  );
};

ReactDOM.render(<StartApp />, document.getElementById("root"));

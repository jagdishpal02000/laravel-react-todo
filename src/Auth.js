import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function Auth ({isLogin,setIsLogin}){
    const [showSignup,setShowSignup] = useState(true);

return (
    <>
{ showSignup ? <Signup islogin={isLogin} setIsLogin={setIsLogin} setShowSignup={setShowSignup} /> : <Login islogin={isLogin} setIsLogin={setIsLogin} setShowSignup={setShowSignup}/> }
    </>
)

}
export default Auth;

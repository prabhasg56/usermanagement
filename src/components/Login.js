import React, { useState,useEffect } from 'react';
import '../styles/Login.css';
import { useNavigate,Link } from 'react-router-dom';
import * as userApi from '../backend/API';
import { toast } from "react-toastify";
function Login(props) {
  const [isLogin,setIsLogin]=useState(true);
  const [formValue,setFormValue] =useState({
    "email":"",
    "password":"",
  })
  const navigate=useNavigate();
  const handleInput=(event)=>{
    let name=event.target.name;
    let value=event.target.value;
    setFormValue((prevValue)=>{
      return {...prevValue,[name]:value}
    })
  }
  useEffect(()=>{
    if(!isLogin){
      navigate("/");
      toast.error('Incorrect user name or password !');
    }
  },[isLogin])
 const handleLogin=(event)=>{
  setIsLogin(true)
    userApi.checkUser().then(response=>{
        response.data.forEach(item=>{
            if(item.email===formValue.email && item.password===formValue.password){
                props.checkLogin(true);
                toast.success("Login Successfully!");
                localStorage.setItem('login',true);
                localStorage.setItem('user',JSON.stringify(item))
                setIsLogin(true)
                navigate("/home");
            }
            else{
              setIsLogin(false);
            }
        })
    })
   
 }
  return (
    <>
    <div className='login-container'>
        <h1>Login Page</h1>
      <div className="input-part">
      <input type="text" placeholder='Email' name='email' value={formValue.email} onChange={handleInput}/>
        <input type="text" placeholder='Password' name='password' value={formValue.password} onChange={handleInput}/>
        <button onClick={handleLogin}>LOGIN</button>
        <h6>Not register yet ? <Link to="/signup">Sign Up</Link></h6>
      </div>
    </div>
    </>
  )
}
export default Login
import React, { useState } from 'react'
import * as userApi from '../backend/API';
import { useNavigate,Link } from 'react-router-dom';
import { toast } from "react-toastify";
function Signup() {
    const navigate=useNavigate();
    const [formValue,setFormValue]=useState({
        "name":"",
        "email":"",
        "password":"",
        "mob":""
    });
    const handleInput=(event)=>{
        let name=event.target.name;
        let value=event.target.value;
        setFormValue((prevValue)=>{
            return {...prevValue,[name]:value};
        })
    }
    const handleSignup=()=>{
        userApi.registerUser(formValue).then(response=>{
            if(response.status===201){
                toast.success("User Created Successfully!");
                navigate("/")
            }
        })
    }
  return (
    <div className='signup-container'>
        <h5>Sign Up</h5>
        <input type="text" placeholder='Enter Name' name='name' value={formValue.name} onChange={handleInput}/>
        <input type="email" placeholder='Enter Email' name='email' value={formValue.email} onChange={handleInput}/>
        <input type="password" placeholder='Enter Password' name='password' value={formValue.password} onChange={handleInput}/>
        <input type="number" placeholder='Enter Mob Number' name='mob' value={formValue.mob} onChange={handleInput}/>
        <button onClick={handleSignup}>Sign Up</button>
        <h6>Already a member <Link to="/">Login</Link></h6>
    </div>
  )
}

export default Signup
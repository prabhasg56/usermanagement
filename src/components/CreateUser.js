import React, { useState,useEffect} from 'react'
import '../styles/CreateUser.css';
import {useNavigate,useParams} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import * as userApi from '../backend/API';
import { toast } from "react-toastify";
function CreateUser(props) {
    const [formValue,setFormValue]=useState({
        name:"",
        salary:"",
        company:""
    });
    const [showBtn,setShowBtn] = useState(false);
    const [title,setTitle] = useState('Create User');
    const navigate=useNavigate();
    const createUsers=()=>{
        if(formValue.name==='' || formValue.salary==='' || formValue.company===''){
            toast.error("All Fields are required!");
        }else{
         userApi.createUsers(formValue).then(response=>{
            console.log("aman",response,response.status);
            if(response.status===201){
                toast.success("User Created Successfully!");
                setFormValue({
                    name:"",
                    salary:"",
                    company:""
                })
                navigate("/home")
            }
        }).catch(error=>{
            toast.error(error)
        })
    }
    }
    const handleFormValue=(event)=>{
        let name=event.target.name;
        let value=event.target.value;
        setFormValue((prevValue)=>{
            return {...prevValue,[name]:value}
        })
    }
    const params=useParams();
    const {id}=params;
    useEffect(()=>{
        if(id){
            setTitle('Update User');
            setShowBtn(true);
            userApi.getUser(id).then(response=>{
                setFormValue(response.data)
            })
        }
    },[id])
    const updateUsers=()=>{
        userApi.updateUser(id,formValue).then(response=>{
            console.log(response);
            if(response.status===200){
                toast.success("User Updated Successfully!");
                navigate("/home")
            }
        })
    }
  return (
    <div className='create-user-contents'>
        <h4>{title}</h4>
        <div className='each-label'>
        <label>Name:</label>
        <input type="text" name="name" placeholder='Enter Your Name' value={formValue.name} onChange={handleFormValue}/>
        </div>
        <div className='each-label'>
        <label>Salary:</label>
        <input type="text" name="salary" placeholder='Enter Your Salary' value={formValue.salary}  onChange={handleFormValue}/>
        </div>
        <div className='each-label1'>
        <label>Comapany:</label>
        <input type="text" name="company" placeholder='Enter Your Comapany' value={formValue.company}  onChange={handleFormValue}/>
        </div>
        {!showBtn && <Button variant="primary" onClick={createUsers}>Submit</Button>}
        {showBtn && <Button variant="primary" onClick={updateUsers}>Update</Button>}
    </div>
  )
}

export default CreateUser
import React, { useEffect, useState } from 'react'
import TableComponent from './TableComponent';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
import * as userApi from '../backend/API';
import { toast } from "react-toastify";
import '../styles/Home.css';
import { MdSearch } from "react-icons/md";
function Home() {
  const navigate=useNavigate();
  const [data,setData]=useState([]);
  const [search,setSearch] = useState("");
  const [datas,setDatas]=useState([])
useEffect(()=>{
userApi.getUsers().then((response)=>{
  setData(response.data);
  setDatas(response.data);
})
let login=localStorage.getItem('login');
if(login){
  navigate("/home")
}else{
  navigate("/")
}
},[])
const deleteUser=(id)=>{
  userApi.deleteUser(id).then(response=>{
    console.log(response);
    if(response.status===200){
      toast.success("User deleted")
    }
    else{
      toast.error('Something problem in backend')
    }
    userApi.getUsers().then((response)=>{
      setData(response.data);
      setDatas(response.data);
    })
  })
}

useEffect(()=>{
  if(search!==""){
    let results= data.filter(item=>{
       if(item.name.toLowerCase().includes(search.toLowerCase()) || String(item.id).includes(search) || item.company.toLowerCase().includes(search.toLowerCase())){
         return item
       }else{
         return ""
       }
     })
     setDatas(results);
  }
  else{
    setDatas(data);
  }
},[search])
  return (
    <div>
      {/* <Header/> */}
        <div className="home-header">
            <h5>Total user:<span>{datas.length}</span></h5>
         <div>
         <InputGroup className="mb-0">
        <InputGroup.Text id="basic-addon1"><MdSearch id='icons'/></InputGroup.Text>
        <Form.Control
          placeholder="Search Here..."
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={search}
          onChange={(event)=>setSearch(event.target.value)}
        />
      </InputGroup>
         </div>
        </div>
        <div className="home-contents">
        <TableComponent data={datas} deleteUser={deleteUser}/>
        </div>
        </div>
  )
}

export default Home
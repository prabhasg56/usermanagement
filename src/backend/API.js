import axios from 'axios';
const baseUrl='http://localhost:4000';

export async function createUsers(formValue){
  return await axios.post(`${baseUrl}/users`,{
    "name": formValue.name,
    "salary": formValue.salary,
    "company": formValue.company

  })
}
export async function getUsers(){
    return await axios.get(`${baseUrl}/users`)
}
export async function getUser(id){
  return await axios.get(`${baseUrl}/users/${id}`)
}
export async function updateUser(id,formValue){
  return await axios.patch(`${baseUrl}/users/${id}`,{
    "name": formValue.name,
    "salary": formValue.salary,
    "company": formValue.company
  })
}
export async function deleteUser(id){
  return await axios.delete(`${baseUrl}/users/${id}`)
}
export async function registerUser(formValue){
  return await axios.post(`${baseUrl}/login`,{
    "name": formValue.name,
    "email": formValue.email,
    "password": formValue.password,
    "mob": formValue.mob
  })
}
export async function updatePassword(formValue,id){
  return await axios.patch(`${baseUrl}/login/${id}`,{
    "password": formValue.newPassword,
  })
}
export async function checkUser(){
  return await axios.get(`${baseUrl}/login`)
}
import React,{useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/Modal.css';
import { Form } from 'react-bootstrap';
import * as userApi from '../backend/API';
import { toast } from "react-toastify";
function ChangePasswordModal(props) {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      const [isUser,setUser] = useState(false);
      useEffect(()=>{
        userApi.checkUser().then(response=>{
            response.data.forEach(item=>{
                if(item.id===props.id){
                    if(item.password===formData.currentPassword){
                        setUser(true);
                    }else{
                        setUser(false); 
                    }
                }
            })
        })
      },[props.id,formData.currentPassword])
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.confirmPassword==='' || formData.newPassword==='' || formData.currentPassword===''){
            toast.error("All Fields are required!");
        }else if(formData.confirmPassword!==formData.newPassword){
            toast.error("New Password and Confirm Password should be same!");
        }else if(formData.currentPassword===formData.newPassword){
            toast.error("Old Password and New Password should not be same!");
        }else if(isUser===false){
            toast.error("Please enter correct old password!");
        }else{
      userApi.updatePassword(formData,props.id).then((response)=>{
        toast.success("Password changed successfully!");
        handleClose();
      }) .catch((error) => {
        console.error('Password change failed:', error);
        toast.error('Password change failed:');
      });
    }
      };
    const handleClose=()=>{
        props.handleCloseModal();
    }
  return (
    <>
      <Modal
        show={props.showModal}
        onHide={props.handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton id="modal-title">
          <Modal.Title ><h4>Change Password</h4></Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal-body">
        <Form onSubmit={handleSubmit}>
      <Form.Group controlId="currentPassword">
        <Form.Label>Current Password</Form.Label>
        <Form.Control
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="newPassword">
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="confirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </Form.Group>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>Change Password</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ChangePasswordModal
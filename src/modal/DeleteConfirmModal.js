import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/Modal.css';
function DeleteConfirmModal(props) {
    const handleDelete=()=>{
        props.deleteUser(props.id);
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
          <Modal.Title ><h4>Delete User</h4></Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal-body">
          <h6>Are you sure you want to delete the user with id: {props.id} ?</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>Confirm Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default DeleteConfirmModal
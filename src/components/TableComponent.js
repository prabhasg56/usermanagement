import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit,FaTrashAlt } from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import DeleteConfirmModal from '../modal/DeleteConfirmModal';
function TableComponent(props) {
  const [showModal,setShowModal]=useState(false);
  const [id,setId]=useState('');
  const handleDelete=(id)=>{
    setShowModal(true);
    setId(id);
  }
  const handleCloseModal=()=>{
    setShowModal(false);
  }
  return (
    <>
    {showModal && <DeleteConfirmModal showModal={showModal} handleCloseModal={handleCloseModal} id={id} deleteUser={props.deleteUser}/>}
<Table striped hover >
      <thead>
        <tr>
          <th>User Id</th>
          <th>User Name</th>
          <th>Salary</th>
          <th>Company</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map(item=>{
          return <tr>
          <td>{item.id}</td>
          <td>{`${(item.name).slice(0,1).toUpperCase()}${(item.name).slice(1)}`}</td>
          <td>{item.salary}</td>
          <td>{item.company}</td>
          <td> <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-disabled">Edit</Tooltip>}
                      >
                        <span>
                        <Link to={`/createUser/${item.id}`} className='icon' ><FaEdit/></Link>{' '}
                        </span>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-disabled">Delete</Tooltip>}
                      >
                        <span>
                        <FaTrashAlt className='icon del-icon' onClick={()=>handleDelete(item.id)}/>
                        </span>
                      </OverlayTrigger>
            </td>
        </tr>
        }) }
      </tbody>
    </Table>
    {props.data.length<=0 && <h5 style={{textAlign:'center'}}>No Data Found</h5>}
    </>
  );
}
export default TableComponent;
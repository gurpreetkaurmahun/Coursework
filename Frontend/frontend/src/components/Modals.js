import React from "react";
// import 'bootswatch/dist/morph/bootstrap.min.css';
import { useEffect,useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Modals(props) {
 

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    handleShow();
  }, []);


  
  return (
    <> 
    {/* { <Button  type="button" onClick={handleShow}class="btn btn-secondary " style={{height:40,width:80}} >Edit</Button> } */}
     

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="update-product" onSubmit={props.handleSubmit}>
            <fieldset>
              <div>
                <label htmlFor="exampleInputQuantity" className="form-label mt-4">Quantity</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputQuantity"
                  placeholder="Enter Quantity"
                  autoComplete="off"
                  name="quantity"
                  onChange={props.handleInputChange}
                  value={props.quantity}
                />
              </div>
            </fieldset>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button  className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
          <button form="update-product" type="submit"  className="btn btn-primary">Submit</button>
         
        </Modal.Footer>
      </Modal>
    
    </>
  );
}

export default Modals;
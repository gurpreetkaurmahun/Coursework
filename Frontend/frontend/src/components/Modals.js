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

              <label for="exampleSelect1" class="form-label mt-4">Enter Quantity</label>
      <select class="form-select" name="quantity" value={props.quantity} id="exampleSelect1" onChange={props.handleInputChange}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
      </select>
                {/* <label htmlFor="exampleInputQuantity" className="form-label mt-4">Quantity</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputQuantity"
                  placeholder="Enter Quantity"
                  autoComplete="off"
                  name="quantity"
                  onChange={props.handleInputChange}
                  value={props.quantity}
                /> */}
              </div>
            </fieldset>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button  className="nav-link active butt tabs active-tabs" onClick={handleClose}>
            Close
          </button>
          <button form="update-product" type="submit"  className="nav-link active butt tabs active-tabs">Submit</button>
         
        </Modal.Footer>
      </Modal>
    
    </>
  );
}

export default Modals;
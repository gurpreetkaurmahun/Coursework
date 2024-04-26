import React, { useState, useEffect } from "react";

function ProductForm(product){
   


return <div>
    <form onSubmit={product.handleSubmit}>
  <fieldset>
   
 
    <div>
{        
        }
      <label for="exampleInputQuantity" class="form-label mt-4"  >Quantity</label>
      <input type="text" class="form-control" id="exampleInputQuantity" placeholder="Password" autocomplete="off" name="quantity" onChange={product.handleInputChange} value={product.quantity}></input>
    </div>
  
  
 
  


 
    <button type="submit" class="btn btn-primary">Submit</button>
  </fieldset>
</form>
</div>
}

export default ProductForm;
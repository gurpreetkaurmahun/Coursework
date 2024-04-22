import React, { useState, useEffect } from "react";

function ProductForm(product){
   


return <div>
    <form onSubmit={product.handleSubmit}>
  <fieldset>
   
 
    <div>
{        
        {/* <label for="examplePID" class="form-label mt-4"  >ProductId</label>
      <input type="text" class="form-control" id="examplePID" placeholder={product.productId ? product.productId : "ProductId"} autocomplete="off" name="quantity"  value={product.productId} readOnly></input>
      <label for="exampleName" class="form-label mt-4"  >Name</label>
      <input type="text" class="form-control" id="exampleName" placeholder={product.name} autocomplete="off" name="quantity" value={product.name} readOnly></input>
      <label for="examplePrice" class="form-label mt-4"  >Price</label>
      <input type="text" class="form-control" id="examplePrice" placeholder={product.price} autocomplete="off" name="quantity"  value={product.price} readOnly></input>
      <label for="exampleCatID" class="form-label mt-4"  >categoryId</label>
      <input type="text" class="form-control" id="exampleCatID" placeholder={product.categoryId} autocomplete="off" name="quantity"  value={product.categoryId} readOnly></input>
        */} }
      <label for="exampleInputQuantity" class="form-label mt-4"  >Quantity</label>
      <input type="text" class="form-control" id="exampleInputQuantity" placeholder="Password" autocomplete="off" name="quantity" onChange={product.handleInputChange} value={product.quantity}></input>
    </div>
  
  
 
  


 
    <button type="submit" class="btn btn-primary">Submit</button>
  </fieldset>
</form>
</div>
}

export default ProductForm;
import React from"react";
import product from"./product";
import NavBar from "./Navbar";
import { useState } from "react";
import 'bootswatch/dist/morph/bootstrap.min.css';

function Practice(props){
 
    return <div>
       
        { <div class="list-group" style={{width:400,display:"inline-block",margin:200}}>
      <h1>Wishlist</h1>
      {fav.map((product,index)=>(<Product   key={index}
            id={product.productId}
            name={product.name}
            price={product.price}
            quantity={product.quantity}
            value={"remove" }
            OnDelete={deleteFav}
            />))}</div>} 
    </div>
}

export default Practice;
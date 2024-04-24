import React from "react";
import NavBar from "./Navbar";
import Product from "./product";
import Footer from "./footer";
import { useState,useEffect } from "react";
import axios from "axios";
import {API_BASE_URL} from "../apiConfig";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function AllProducts(){
    const[products,setProducts]=useState([]);
  const[editProduct,setEditProduct]=useState(null);
  const[cart,setCart]=useState([]);
  const show=false;
  const design={
    outer:"small-product",
    image1:"small-image1",
    image2:"small-image2"
  }





  const[fav,setFav]=useState([]);


  useEffect(() => {
    Products();
  }, []);
  const Products=async () =>{
    try {
        const response=await axios.get(`${API_BASE_URL}Product`);
        setProducts(response.data)
    }
    catch(error){
        console.error('error fetching Products',error);
    }
}
const addToFavorites = (item) => {
    // Check if the item with the same id is already in the favouriteList
    const isDuplicate = fav.some((favItem) => favItem.name === item.name);

    // If it's not a duplicate, add the item to the favouriteList
    if (!isDuplicate) {
        
        setFav((prevFav) => [ item,...prevFav]);
        
    } else {
        alert("Item already in favourites!");
    }
};
const addToCart = (item) => {
  // Check if the item with the same id is already in the favouriteList
  const isDuplicate = cart.some((CartItem) => CartItem.name === item.name);

  // If it's not a duplicate, add the item to the favouriteList
  if (!isDuplicate) {
      
      setCart((prevCart) => [ item,...prevCart]);
      
  } else {
      alert("Item already in Cart!");
  }
};

console.log("cart",cart);

const renderCartProducts = () => {
  

  return cart.map((product, index) => (
  <Product
      key={index}
      id={index}
      name={product.name}
      price={product.price}
      quantity={product.quantity}
      value={"remove"}
      OnDelete={deleteFav}
      onStyleOuter={design.outer}
      onStyleImage1={design.image1}
      onStyleImage2={design.image2}
    />
    
  ));
};
function deleteFav(id){
    setFav(prevProd=>{
        return prevProd.filter((product,index)=>{
            return index!==id;
        })
    })
}

    return <>
    <NavBar renderCartProducts={renderCartProducts} />
    <div style={{position:"absolute",display:"inline_block",left:50,height:1000,width:300,marginTop:200,borderLeft:"1px solid black",borderTop:"1px solid black",boxShadow: "5px 5px 5px gray",marginRight:150}}> Categories
    <div class="list-group" style={{width:200}}>

      {products.map((product,index)=><Link key={index} to={`/product/${product.productId}`} >{product.name}</Link>)}

{/* {cart.map((product,index)=>(<Product   key={index}
      id={index}
      name={product.name}
      price={product.price}
      quantity={product.quantity}
      value={"remove" }
     
      OnDelete={deleteFav}
      onStyleOuter={design.outer} 
      onStyleImage1={design.image1} 
      onStyleImage2={design.image2}
      />))}  */}
      
      </div>
    </div>
    <div style={{position:"absolute",display:"inline_block",marginTop:200,width:850,left:450,borderLeft:"1px solid black",borderTop:"1px solid black",boxShadow: "5px 5px 5px gray"}}>
    {products.map((product, index) => (
        
    <Product key={index} id={product.productId}name={product.name} price={product.price}quantity={product.quantity}  
    value={"Add to Cart"} LinkId={`/product/${product.productId}`} OnCartAdd={addToCart}  OnfavAdd={addToFavorites} 
    onStyleOuter={design.outer} onStyleImage1={design.image1} onStyleImage2={design.image2}/>
  ))}</div>
  
    </>

}
export default AllProducts;
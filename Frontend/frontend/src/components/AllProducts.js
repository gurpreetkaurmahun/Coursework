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
  const design={
    outer:"small-product",
    image1:"small-image1",
    image2:"small-image2"
  }

//   Important
  const Location=[];
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
        setFav((prev) => [item, ...prev]);
    } else {
        alert("Item already in favourites!");
    }
};
    return <>
    <NavBar/>
    <div style={{position:"absolute",display:"inline_block",left:50,height:1000,width:300,marginTop:200,border:"1px solid pink",marginRight:150}}></div>
    <div style={{position:"absolute",display:"inline_block",marginTop:200,width:850,left:450,border:"1px solid blue"}}>
    {products.map((product, index) => (
         <Link key={index} to={`/product/${product.productId}`}>
    <Product key={index} id={product.productId}name={product.name} price={product.price}quantity={product.quantity}  value={"Add to Wish"}   OnfavAdd={addToFavorites} onStyleOuter={design.outer} onStyleImage1={design.image1} onStyleImage2={design.image2}/></Link>
  ))}</div>
  {/* <div style={{position:"absolute",display:"inline_block",left:1000,height:1000,width:500,marginTop:200,border:"1px solid green"}}></div> */}
  {/* <Footer/> */}
    </>

}
export default AllProducts;
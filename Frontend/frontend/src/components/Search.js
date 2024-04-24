import React from "react";
import { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from "axios";
import {API_BASE_URL} from "../apiConfig";

function SearchBar(){
  const[products,setProducts]=useState([]);
  const[productName,setProductName]=useState("");
  const[searchProduct,setSearchProduct]=useState({
    name:"",
    price:"",
    quantity:""

  });
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
  function handleNameChange(event){
    setProductName(event.target.value);
  }

  const SearchProducts = (item) => {
    // Check if the item with the same id is already in the favouriteList
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(item.name.toLowerCase())
    );
    // Update products state with filtered products
    setSearchProduct({
      name:filteredProducts.name,
      price:filteredProducts.price,
      quantity:filteredProducts.quantity
  
    });

};
  console.log(searchProduct);
    return   <form class="d-flex" role="search" style={{position:"relative",top:60,right:250}}>
    <input onChange={handleNameChange} class="form-control me-2" type="search" style={{width:200,right:150}}placeholder="Search" value={productName}aria-label="Search"/>
    <button onClick={SearchProducts} class="btn btn-outline-success" type="submit">Search</button>
  </form>
}

export default SearchBar;
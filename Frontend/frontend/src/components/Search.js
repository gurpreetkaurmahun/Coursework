import React from "react";
import { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {  Link } from 'react-router-dom';
import axios from "axios";
import {API_BASE_URL} from "../apiConfig";

function SearchBar(){
  const[products,setProducts]=useState([]);
  const[productName,setProductName]=useState("");
  const[searchProduct,setSearchProduct]=useState(null);
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

  const SearchProducts = () => {
    console.log("Searching for product:", productName);
    // Find the product by its name
    const foundProduct = products.find(product => product.name.toLowerCase() === productName.toLowerCase());
    console.log("Found product:", foundProduct);
    // Update searchProduct state
    setSearchProduct(foundProduct ); // Use null if product is not found
    console.log("Updated searchProduct:", searchProduct);
  };

  console.log("sp",searchProduct);
    return   <form class="d-flex" role="search" style={{position:"relative",top:60,right:250}}>
    <input onChange={handleNameChange} class="form-control me-2" type="search" style={{width:200,right:150}}placeholder="Search" value={productName}aria-label="Search"/>
    <button onClick={SearchProducts} class="btn btn-outline-success" type="submit">Search</button>
    {searchProduct && (
        <Link to={`/product/${searchProduct.productId}`} className="btn btn-primary ms-2">View Product</Link>
      )}
  </form>
}

export default SearchBar;
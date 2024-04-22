import React from "react";
import axios from "axios";
import Practice from "./practice";
import { useState,useEffect } from "react";
import {API_BASE_URL} from "../apiConfig";
import Product from "./product";
import Modals from "./Modals";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Category() {

  const[products,setProducts]=useState([]);
  const[editProduct,setEditProduct]=useState(null);
  const[fav,setFav]=useState([]);
  const[display,setDisplay]=useState("none");
  const visible=false;
  const design={
    outer:"product",
    image1:"image1",
    image2:"image2"
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

  useEffect(() => {
    Products();
  }, []);



  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplay("block");
    }, 1000);
    return () => clearTimeout(timeout);
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

function handleEdit(id) {
  const selected = products.find((product) => product.productId === id);
  console.log("selected", selected, id);
  // Update the editProduct state
  setEditProduct({ productId: selected.productId, name: selected.name, price: selected.price, quantity: selected.quantity,categoryId:selected.categoryId });
}
  console.log("products",products);
  function handleInputChange(event){
    const{name,value}=event.target;
    console.log(name);

    if (!isNaN(value) && Number(value) >= 1 && Number(value) <= 10) {
        setEditProduct((prevProduct) => ({
          ...prevProduct,
          [name]: value,
        }));
      } else {
        // Value is not within the valid range, so an alert message is delievered
        alert("Value must be numeric and between 1 and 10");
       
      }
    
}

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('Editing Product:', editProduct);
  
      if (editProduct) {
        if (editProduct.productId) {
          console.log('Updating existing product:', editProduct);
          await axios.put(`${API_BASE_URL}Product/${editProduct.productId}`, editProduct);
          
        } else {
          // Remove the existing id property for new product
          const { productId, ...newProduct } = editProduct;
          console.log('Creating new Product:', newProduct);
          await axios.post(`${API_BASE_URL}Product`, newProduct);
        }
        Products();
      }
    } catch (error) {
      console.error('Error saving student:', error);
      console.error('Response data:', error.response?.data);
    } finally {
      setEditProduct(null);

    }
  };

  function deleteFav(id){
    setFav(prevProd=>{
        return prevProd.filter((product,index)=>{
            return index!==id;
        })
    })
}

  return (
    <div class="container marketing" style={{marginTop:700}}>
     <Link to="/NewArrivals"> <h1 class="arrival" style={{ textAlign: "center" }}>New Arrivals</h1></Link> 


      {products.slice(0,3).map((product, index) => (
         <Link key={index} to={`/product/${product.productId}`}>
    <Product key={index} 
    id={product.productId}
    name={product.name} 
    price={product.price}
    quantity={product.quantity}  
    value={"Add to Wish"} OnEdit={handleEdit} 
     OnfavAdd={addToFavorites} 
     onStyleOuter={design.outer}
     onStyleImage1={design.image1} 
     onStyleImage2={design.image2} /></Link>
  ))}

{editProduct && (
            <Modals
            product={editProduct}
            handleInputChange={handleInputChange}
            handleSubmit={handleFormSubmit}
            productId={editProduct.productId}
           />
        )} 
      
  </div>
  );
}

export default Category;

    {/* { <div class="list-group" style={{width:400,display:"inline-block",margin:200}}>
      <h1>Wishlist</h1>
      {fav.map((product,index)=>(<Product   key={index}
            id={index}
            name={product.name}
            price={product.price}
            quantity={product.quantity}
            value={"remove" }
            OnDelete={deleteFav}
            />))}</div>}  */}
      

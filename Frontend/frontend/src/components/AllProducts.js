import React from "react";
import NavBar from "./Navbar";
import Product from "./product";
import Footer from "./footer";
import Modals from "./Modals";
import { useState,useEffect } from "react";
import axios from "axios";
import {API_BASE_URL} from "../apiConfig";
import images from "../Data/Image";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Aos from"aos";
import 'aos/dist/aos.css';

function AllProducts(){
  const[products,setProducts]=useState([]);
  const[editProduct,setEditProduct]=useState(null);
  const[category,setCategory]=useState([]);
  const[categoryname,setCategoryName]=useState([]);
  const[cart,setCart]=useState([]);
  const[price,setPrice]=useState(0);
  const [show,setShow]=useState(false);
 
  const design={
    outer:"small-product",
    image1:"small-image1",
    image2:"small-image2",
    detail:"small-detail",
    link:"small-Link",
    cart:"small-Cart",
    button:"small-button"
  }





  // const[fav,setFav]=useState([]);
  const [fav, setFav] = useState(
    JSON.parse(sessionStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    sessionStorage.setItem("favorites", JSON.stringify(fav));
  }, [fav]);


  useEffect(() => {
    Products();
    Categories();
  }, []);

  useEffect(() => {
    const newTotalPrice = calculateTotalPrice();
    setPrice(newTotalPrice);
  }, [fav]);

  const Products=async () =>{
    try {
        const response=await axios.get(`${API_BASE_URL}Product`);
        setProducts(response.data)
    }
    catch(error){
        console.error('error fetching Products',error);
    }
}

const Categories=async () =>{
  try {
    // Extract unique category IDs from the products array
    const uniqueCategoryIds = [...new Set(products.map(product => product.categoryId))];
    
    // Fetch categories from the API based on unique category IDs
    const categoriesPromises = uniqueCategoryIds.map(categoryId =>
      axios.get(`${API_BASE_URL}Category/${categoryId}`)
    );

    // Wait for all API requests to resolve
    const responses = await Promise.all(categoriesPromises);

    // Extract category names from the responses
    const categoryNames = responses.map(response => response.data);

    // Set the category name state with the category names
    setCategoryName(categoryNames);
   
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}





const addToFavorites = (item) => {
    // Check if the item with the same id is already in the favouriteList
    const isDuplicate = fav.some((favItem) => favItem.name === item.name);

    // If it's not a duplicate, add the item to the favouriteList
    if (!isDuplicate) {
        
        setFav((prevFav) => [ item,...prevFav]);
        setShow(true);
        
    } else {
        alert("Item already in favourites!");
    }
};

const calculateTotalPrice = () => {
  let totalPrice = 0;

  fav.forEach((favItem) => {
    totalPrice += favItem.price*favItem.quantity;
  });

  return totalPrice;
};

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
const addToCart = (item) => {
  // Check if the item with the same id is already in the CartList
  const isDuplicate = cart.some((CartItem) => CartItem.name === item.name);

  // If it's not a duplicate, add the item to the favouriteList
  if (!isDuplicate) {
      
      setCart((prevCart) => [ item,...prevCart]);
      
  } else {
      alert("Item already in Cart!");
  }
};

console.log("cart",cart);

async function deleteFav(id,producr){
  const deleteProduct=await axios.delete(`${API_BASE_URL}Product`);
    setFav(prevProd=>{
        return prevProd.filter((product,index)=>{
            return index!==id;
        })
    })
}

function handleEdit(id) {
  const selected = products.find((product) => product.productId === id);
  console.log("selected", selected, id);
  // Update the editProduct state
  setEditProduct({ productId: selected.productId, name: selected.name, price: selected.price, quantity: selected.quantity,categoryId:selected.categoryId });
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
    console.error('Error saving Product:', error);
    console.error('Response data:', error.response?.data);
  } finally {
    setEditProduct(null);

  }
};




    return <div >
    <NavBar  />
    <div  class="cartDetail"> 
<p style={{fontWeight:"bold"}}>Cart Details</p>
    <div class="list-group" style={{width:200,marginBottom:200}}>

      {/* {categoryname.map((product,index)=><Link key={index} to={product.categoryId} >{product.name}</Link>)} */}
      {fav.map((product, index) => {
  const image = images[String.fromCharCode(65 + index % Object.keys(images).length)]; 
  return (
    <Product
      key={index}
      id={index}
      name={product.name}
      price={product.price}
      quantity={product.quantity}
      value={"🚫"}
      image1={image.img1}
      image2={image.img2}
      OnDelete={deleteFav}
      OnEdit={handleEdit}
      onStyleDetail={design.detail}
      onStyleLink={design.link}
      onStyleCart={design.cart}
      onStyleOuter={design.outer}
      onStyleImage1={design.image1}
      onStyleImage2={design.image2}
      OnStyleButton={design.button}
     
    />
  );
})}
  <p>Total Price: {price}</p>
      
      </div>
    </div>
    <div  class="cartfav">
    {products.slice(0, 6).map((product, index) => {
  const image = images[String.fromCharCode(65 + index % Object.keys(images).length)]; 

  return (
    <Product
      key={index}
      id={product.productId}
      name={product.name}
      price={product.price}
      LinkId={`/product/${product.productId}`}
      quantity={product.quantity}
      image1={image.img1}
      image2={image.img2}
     
      value={"🛒"}
      OnCartAdd={addToCart}  
      OnEdit={handleEdit}
      onStyleDetail={design.detail}
      onStyleLink={design.link}
      onStyleCart={design.cart}
      OnfavAdd={addToFavorites}
      onStyleOuter={design.outer}
      onStyleImage1={design.image1}
      onStyleImage2={design.image2}
      OnStyleButton={design.button}
    />
    
  );
  
})}
     {editProduct && (
      <Modals
      product={editProduct}
      handleInputChange={handleInputChange}
      handleSubmit={handleFormSubmit}
      productId={editProduct.productId}
     />
  )}
  
  </div>
  {/* <div ><Footer/></div> */}
    </div>

}
export default AllProducts;

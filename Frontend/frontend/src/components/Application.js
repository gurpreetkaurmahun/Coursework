import React from"react";
import { useEffect,useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from "axios";
import {API_BASE_URL} from "../apiConfig";
import Product from "./product";
import Login from "./Login";
import NavBar from "./Navbar";
import Header from "./header";
import ProductForm from "./ProductForm";
import About from "./About";
import Modals from "./Modals";
import Footer from"./footer";
import Practice from "./practice";
import SingleProduct from "./SingleProduct";
import AllProducts from"./AllProducts";
import LogRegForm from "./LogRegForm";

import Home from"./Home";
import"./Style.css";
import 'bootswatch/dist/morph/bootstrap.min.css';

function Application(){

    const[products,setProducts]=useState([]);
    const [category,setCategory]=useState([]);
    const[loggedIn,setLoggedIn]=useState(false);
    const [initialFetchDone, setInitialFetchDone] = useState(false);
    const[fav,setFav]=useState([]);
    const[editProduct,setEditProduct]=useState(null);
    const[customer,setCustomer]=useState([]);
   
  

    
    // useEffect(()=>{
    //     fetchProducts();
    // },[]);

    useEffect(() => {
        if (loggedIn && !initialFetchDone) {
            fetchProducts();
            
            setInitialFetchDone(true);
        }
    }, [loggedIn, initialFetchDone]);

    useEffect(() => {
        // Log the updated editProduct state after it's set
        fetchCustomer();
        console.log("editProduct", editProduct);
    }, [editProduct]);

    useEffect(() => {
      // Log the updated editProduct state after it's set
      console.log("customer is", customer);
  }, [customer]);
 
    const fetchProducts=async () =>{
        try {
            const response=await axios.get(`${API_BASE_URL}Product`);
            setProducts(response.data)
        }
        catch(error){
            console.error('error fetching students',error);
        }
    }
    
    const fetchCustomer=async () =>{
      try {
          const response=await axios.get(`${API_BASE_URL}Customer`);
          setCustomer(response.data)
      }
      catch(error){
          console.error('error fetching students',error);
      }
  }

  
  function addChange(){ setLoggedIn(true);}


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

    function handleEdit(id) {
        const selected = products.find((product) => product.productId === id);
        console.log("selected", selected, id);
        // Update the editProduct state
        setEditProduct({ productId: selected.productId, name: selected.name, price: selected.price, quantity: selected.quantity,categoryId:selected.categoryId });
    }

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
            fetchProducts();
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


    function log(details){
        setUser({
            email:details.email,
            password:details.password
        });


    }
   
    return <div> 
<Router>


<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<LogRegForm />} />
        <Route path="/NewArrivals" element={<AllProducts />} />
        <Route path="/Product/:id" element={<SingleProduct />} />
      </Routes>
    </Router>
    </div>
     

       
 

    
}

export default Application;
import React from"react";
import { useEffect,useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from "axios";
import {API_BASE_URL} from "../apiConfig";
import Product from "./product";

import ProductForm from "./ProductForm";
import About from "./Pages/About";
import Modals from "./Modals";
import Footer from"./footer";
import Practice from "./practice";
import SingleProduct from "./Pages/SingleProduct";
import AllProducts from"./AllProducts";
import LogRegForm from "./Pages/LogRegForm";

import Home from"./Pages/Home";
import"./Style.css";


function Application(){


    
    
   
    return <div> 
<Router>


<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<LogRegForm />} />
        <Route path="/NewArrivals" element={<AllProducts />} />
        <Route path="/product" element={<AllProducts />} />
        <Route path="/Product/:id" element={<SingleProduct />} />
      </Routes>
    </Router>
    </div>
     

       
 

    
}

export default Application;

// Map Login widget pagination 
// abouit--done---sytling
//  content single product (zoom in zoom out---done)
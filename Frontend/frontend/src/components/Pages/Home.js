import React from "react";
import NavBar from "../Navbar";
import Category from "../Category";
import Carousel from "../Carousel";
import Footer from "../footer";
import LastContainer from "../LastContainer";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home(){

    return <div>
      <NavBar/>
      <Carousel/>
      <div class="link">    <Link to="/NewArrivals" class="link">View More</Link></div>
      <Category/>
     <LastContainer/>
     <Footer/>
  </div>

}
export default Home;

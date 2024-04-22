import React from "react";
import NavBar from "./Navbar";
import Category from "./Category";
import Carousel from "./Carousel";
import Footer from "./footer";
import LastContainer from "./LastContainer";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function Home(){

    return <div>
      <NavBar/>
      <Carousel/>
      <Category/>
     <LastContainer/>
     <Footer/>
  </div>

}
export default Home;

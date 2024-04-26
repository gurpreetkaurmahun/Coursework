import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {useEffect,useState}from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Aos from"aos";
import 'aos/dist/aos.css';

function LastContainer(){
  const [color,setColor]=useState("red");
  const colors=['#F7C8E0', '#BFEAF5', '#BCCEF8', '#D0F5BE', '#FFCEFE', '#CEEDC7', '#FFCBCB', '#BFEAF5', '#BCCEF8', '#D0F5BE'];
  useEffect(()=>{
    Aos.init({duration:2000});
  },[])

  useEffect(() => {
    const interval = setInterval(() => {

      updateColor();
    }, 500);
    return () => clearInterval(interval);
  }, []);
  function updateColor(){
    const min = 1;
    const max = 11;
    const randomInRange = Math.floor(Math.random() * (max - min + 1)) + min;
    setColor(colors[randomInRange]);
  
  }
    return<div style={{marginTop:100}}>
    {/* <h1> View Categories</h1> */}
    <div class="row featurette" style={{marginBottom:100}}>
      <div class="col-md-7" data-aos="fade-left" >
        <h2 class="featurette-heading fw-normal lh-1 fadetitle">Clothing <span class="text-body-secondary">It’ll blow your mind.</span></h2>
      <p class="lead fadetext" style={{color:color}}>  <span style={{fontSize:30}}>"</span>  Clothing is more than just fabric stitched together – it's a form of self-expression, a reflection of personality, 
        and a means of communicating identity to the world. At An Ode, we believe that every garment tells a story, 
        and we're here to help you create your own narrative through fashion. <span style={{fontSize:30}}>"</span></p>
      
          <Link className="nav-link active butt tabs active-tabs last-tab"to="/NewArrivals" style={{ fontSize: "20" ,marginLeft:350}}>View Options</Link>
      </div>
      <div class="col-md-5">
        <img class="fadeImage" src="https://www.gauriandnainika.com/cdn/shop/files/2.jpg?v=1694506904&width=900"  data-aos="fade-right"></img>
      </div>
    </div>

   

    <div class="row featurette" style={{marginBottom:100}}>
      <div class="col-md-7 order-md-2" data-aos="fade-right">
        <h2 class="featurette-heading fw-normal lh-1 fadetitle">Accessories</h2>
        <p class="lead fadetext" style={{color:color}}> <span style={{fontSize:30}}>"</span>  Discover the epitome of contemporary style with our collection of modern accessories. Elevate your everyday look with sleek and sophisticated pieces designed to complement your unique sense of fashion. 
        From minimalist designs to bold statements, our range of modern accessories offers something for every taste and occasion. <span style={{fontSize:30}}>"</span>  </p>
        <Link className="nav-link active butt tabs active-tabs last-tab"to="/NewArrivals" style={{ fontSize: "20",marginLeft:350 }}>View Options</Link>
      </div>
      <div class="col-md-5 order-md-1">
      <img class="fadeImageLeft"  src="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fa9%2Fb4%2Fa9b4d19f4196d50cb52231e6f00076dd8359300f.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]"data-aos="fade-left" ></img>
      </div>
    </div>



    <div class="row featurette" style={{marginBottom:100}}>
      <div class="col-md-7"data-aos="fade-left">
        
        <h2 class="featurette-heading fw-normal lh-1 fadetitle">Home and Living </h2>
        <p class="lead fadetext" style={{color:color}}> <span style={{fontSize:30}}>"</span> Transform your living space into a sanctuary of comfort and style with our curated selection of home and living essentials. Explore a world of possibilities as you browse through our collection, meticulously crafted to elevate every corner of your home. <span style={{fontSize:30}}>"</span>  </p>
        <Link className="nav-link active butt tabs active-tabs last-tab"to="/NewArrivals" style={{ fontSize: "20",marginLeft:350 }}>View Options</Link>
      </div>
      <div class="col-md-5">
       <img class="fadeImage" height="500px" width="500px"src="https://images.ctfassets.net/prxuf37q3ta2/6GpLO41bqXixpqJY4JbCfP/1d660d5e505c995173f1716adb6f21d7/0933_20240416_Home_QUADROUPLE_S_L_1200X1200_3.jpg?w=1200&fm=webp" data-aos="fade-right"/>
      </div>
    </div>

  

 

  </div>
}

export default LastContainer;
import React, { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Footer() {
  

  return <div class="footer">
  <footer >
    <div>
     
      <Link class="text-body-secondary footerp" to ="/About"> An Ode © 2024</Link>
    </div>
  <hr></hr>
   
    <div class="menu" > 
          
          <ul >
           
            <li class="ms-3" style={{display:"inline-block"}}><Link style={{color:"black"}} to="https://www.instagram.com/foodrizzle000/"><img src="/images/gmail.png"/></Link></li>
            <li class="ms-3" style={{display:"inline-block"}}><Link style={{color:"black"}} to="https://www.linkedin.com/in/gurpreet-kaur-mahun-601a33197/"><img src="/images/linkedin.png" /></Link></li>
            <li class="ms-3" style={{display:"inline-block"}}><Link style={{color:"black"}} to="https://www.facebook.com/priti.kaur.5/"><img src="/images/instagram.jpg" style={{height:40,width:40,border:"2px solid white",borderRadius:"10%"}}/></Link></li>
          </ul>
          </div>

    <div class="footerlink" >
      
      <Link style={{display:"inline-block",marginRight:30}} to="/">Home</Link>
      <Link style={{display:"inline-block",marginRight:30}} to="/About">More About Us</Link>
      <Link style={{display:"inline-block",marginRight:30}} to="/NewArrivals">More About Us</Link>
    </div>
  


  
  </footer></div>
}

export default Footer;





























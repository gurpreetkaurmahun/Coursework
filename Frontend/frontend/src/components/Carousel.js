import React from "react";
import { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Carousel(props) {
  const[title,setTitle]=useState("An Ode");

  const Ode=[  "Una Oda","Une Ode",       
  "Eine Ode",      
  "Un'Ode",       
  "Uma Ode",      
  "颂词",             
  "讃歌 ",    
  "قصيدة ", 
  "ایک نغمہ",
  "Ода ",      
  "स्तुति " 
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      updateTitle();
    }, 1000);
    return () => clearInterval(interval);
  }, []);
function updateTitle(){
  const min = 0;
  const max = 11;
  const randomInRange = Math.floor(Math.random() * (max - min + 1)) + min;
  setTitle(Ode[randomInRange]);

}
  return (
  
      <div style={{ position: "relative", zIndex: 0 }}>
        <div id="carouselExampleIndicators" className="carousel slide carousel-fade imageSlide" style={{height: 650}}>
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner" >
            <div className="carousel-item active">

              <img  src="https://stylecaster.com/wp-content/uploads/2023/01/vanillagirlaesthetic.png?w=960&h=580&crop=1" className="d-block w-100" id="image" alt="..." style={{ boxShadow: "0 4px 4px rgba(0, 0, 0, 0.4)",height:600 }} />
              <div className="imagetext">
                <h2 >{title}</h2>
                <p style={{fontWeight:"bold"}} >"An Ode, where fashion meets poetry. Dive into a world of timeless elegance and contemporary allure. With An Ode, every garment becomes a poetic tribute to individuality, weaving together threads of luxury and creativity to adorn your journey through life's myriad moments."</p>
               <Link className="nav-link butt tabs" style={{ backgroundColor:"rgb(250, 228, 231)",fontSize: 20, borderRadius: 2, height: 40, width: 160,display:props.visible?"none":"block" }}  to="/NewArrivals">View Collection</Link>
              </div>

            </div>
         
          
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button> 
           <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
 
  );
}

export default Carousel;

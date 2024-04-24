import React from "react";
import { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function Carousel(props) {
  const[title,setTitle]=useState("");

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
  
      <div style={{ position: "relative", zIndex: 0,border:"2px solid green" }}>
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
                <p style={{fontWeight:"bold"}} >{props.content}</p>
                <button className="nav-link butt tabs" style={{ backgroundColor:"rgb(250, 228, 231)",fontSize: 20, borderRadius: 2, height: 40, width: 160,display:props.visible?"none":"block" }}>View Collection</button>
              </div>

            </div>
            <div className="carousel-item">
              <img height="600px" src="../../public/CWK-Image.jpeg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img height="600px" src="../../public/CWK-Image.jpeg" className="d-block w-100" alt="..." />
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

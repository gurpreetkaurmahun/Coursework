import React, { useState,useEffect } from "react";
import SearchBar from "./Search";
import Carousel from "./Carousel";

import LogRegForm from "./LogRegForm";
import { Link, useNavigate } from "react-router-dom";
import "./Style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function NavBar() {
  const [toggle, setToggle] = useState(1);
  const [visible, setVisible] = useState(false);
  const[Content,setContent]=useState("");
 


const min = 0;
const max = 10;
const randomInRange = Math.floor(Math.random() * (max - min + 1)) + min;
console.log("random",randomInRange);
  
  const navigate = useNavigate();

  function toggleTab(index) {
    setToggle(index);
    setContent("An Ode, where fashion meets poetry. Dive into a world of timeless elegance and contemporary allure. With An Ode, every garment becomes a poetic tribute to individuality, weaving together threads of luxury and creativity to adorn your journey through life's myriad moments.");
    setVisible(true); // Always set visible to true when tab is clicked
  }

  function hideContent() {
    
    setVisible(false);
  }
 

  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 1 }}>
      <nav className="navbar navbar-expand-lg navbar-light header" style={{ backgroundColor: "none" }}>
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <div onMouseOver={() => toggleTab(1)} className={toggle === 1 ? "nav-link active butt tabs active-tabs" : "nav-link active butt tabs"} style={{ fontSize: "20" }} onMouseLeave={hideContent}>
                  Home
                </div>
              </li>
              <li className="nav-item">
                <div onMouseOver={() => toggleTab(2)} className={toggle === 2 ? "nav-link active butt tabs active-tabs" : "nav-link active butt tabs"} style={{ fontSize: "20" }} >
                  About
                </div>
              </li>
              <li className="nav-item">
                <div onMouseOver={() => toggleTab(3)} className={toggle === 3 ? "nav-link active butt tabs active-tabs" : "nav-link active butt tabs"} style={{ fontSize: "20" }} onMouseLeave={hideContent}>
                  Favourites
                </div>
              </li>
            
              <li className="nav-item">
                <a className="nav-link active butt tabs active-tabs" style={{ fontSize: "20" }}>All Products</a>
              </li>
              <li className="nav-item">
            <div onMouseOver={() => toggleTab(4)} className={toggle === 4 ? "nav-link active butt tabs active-tabs" : "nav-link active butt tabs"} style={{ fontSize: "20",marginLeft:500 }} >
            <svg class="svg-icon" style={{height:30}} viewBox="0 0 20 20">
							<path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
						</svg>
              Account
            </div>
                          {/* <Link to="/Login" className="nav-link butt" style={{ fontSize: "20" }}>Login</Link> */}
            </li>
            <li className="nav-item">
           
            <div onMouseOver={() => toggleTab(5)} className={toggle === 5 ? "nav-link active butt tabs active-tabs" : "nav-link active butt tabs"} style={{ fontSize: "20" }} onMouseLeave={hideContent}>
            <svg class="svg-icon" style={{height:30}} viewBox="0 0 20 20">
							<path d="M17.638,6.181h-3.844C13.581,4.273,11.963,2.786,10,2.786c-1.962,0-3.581,1.487-3.793,3.395H2.362c-0.233,0-0.424,0.191-0.424,0.424v10.184c0,0.232,0.191,0.424,0.424,0.424h15.276c0.234,0,0.425-0.191,0.425-0.424V6.605C18.062,6.372,17.872,6.181,17.638,6.181 M13.395,9.151c0.234,0,0.425,0.191,0.425,0.424S13.629,10,13.395,10c-0.232,0-0.424-0.191-0.424-0.424S13.162,9.151,13.395,9.151 M10,3.635c1.493,0,2.729,1.109,2.936,2.546H7.064C7.271,4.744,8.506,3.635,10,3.635 M6.605,9.151c0.233,0,0.424,0.191,0.424,0.424S6.838,10,6.605,10c-0.233,0-0.424-0.191-0.424-0.424S6.372,9.151,6.605,9.151 M17.214,16.365H2.786V7.029h3.395v1.347C5.687,8.552,5.332,9.021,5.332,9.575c0,0.703,0.571,1.273,1.273,1.273c0.702,0,1.273-0.57,1.273-1.273c0-0.554-0.354-1.023-0.849-1.199V7.029h5.941v1.347c-0.495,0.176-0.849,0.645-0.849,1.199c0,0.703,0.57,1.273,1.272,1.273s1.273-0.57,1.273-1.273c0-0.554-0.354-1.023-0.849-1.199V7.029h3.395V16.365z"></path>
						</svg>
              Cart
            </div>
                          {/* <Link to="/Login" className="nav-link butt" style={{ fontSize: "20" }}>Login</Link> */}
            </li>
              
            </ul>
            <Link className="navbar-brand" to="/" style={{ fontSize: 30, marginLeft: 600, position: "fixed" }}>An Ode</Link>
            
           
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <SearchBar />
            <div className="content-tabs" style={{ display: visible ? "block" : "none" }}>
              <div className={toggle === 1 ? "content active-content" : "content"}>
                <h2>Content1</h2>
                <hr />
                <p>
                  The front-end application team is responsible for building all things client side. We split ourselves
                  across the business working in mixed discipline delivery squads. These squads work with the rest of the
                  business to help shape their product roadmaps.
                </p>
              </div>
              <div className={toggle === 2 ? "content active-content" : "content"}>
                <h2>Content2</h2>
                <hr />
                <p>
                ...

An Ode, where fashion meets poetry. Dive into a world of timeless elegance and contemporary allure. With An Ode, every garment becomes a poetic tribute to individuality, weaving together threads of luxury and creativity to adorn your journey through life's <Link to="/About"> know more</Link>
                </p>
              </div>
              <div className={toggle === 3 ? "content active-content" : "content"}>
                <h2>Content3</h2>
                <hr />
                <p>
                  Everyone is welcome at M&S. No exceptions. It’s your background, abilities and differences that make you,
                  uniquely you. And when you’re part of M&S, that individuality has the potential to make waves.
                </p>
              </div>
             
            </div>
            <div className="right-content-tabs" style={{ display: visible ? "block" : "none" }}>
            <div className={toggle === 4 ? "content right-active-content" : "content"}>
              <h4 >Are you An User</h4>
              <hr />
              <Link to="/Login" className="nav-link butt tabs" ><p style={{ fontSize: "20",position:"relative",top:10 }}>Login</p></Link>
              <h4 style={{marginTop:10}}>Is this Your First Visit</h4>
              <Link to="/Login" className="nav-link butt tabs" ><p style={{ fontSize: "20",position:"relative",top:10 }}>Register</p></Link>
              </div>

            </div>

          </div>
        </div>
      </nav>
    {/* <Carousel  content={Content} visible={visible}/>  */}
    </div>
  );
}

export default NavBar;












































// import React from "react";
// import SearchBar from "./Search";
// import Carousel from "./Carousel";
// import { useState } from "react";
// import"./Style.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// function NavBar(){
//   const[toggle,setToggle]=useState(1);
//   const [visible, setVisible] = useState(false);
//   function toggleTab(index){
//       setToggle(index);
//   }
//   function hideContent() {
//     setVisible(false);
//   }

//     return<div style={{position: "absolute", top: 0, left: 0, right: 0, zIndex: 1 }}>
//   <nav class="navbar navbar-expand-lg navbar-light header" style={{backgroundColor:"none"}}>
//     <div class="container-fluid">
     
//       <div class="collapse navbar-collapse" id="navbarCollapse">
//         <ul class="navbar-nav me-auto mb-2 mb-md-0">

        
//           <li class="nav-item">
            
//             <p   onMouseOver={()=>toggleTab(1)}class={toggle===1?"nav-link active butt tabs active-tabs":" nav-link active butt tabs"} aria-current="page" href="#" style={{fontSize: "20"}} onMouseLeave={hideContent}>
//       Home 
    
//     <div class={toggle===1?"content active-content":"content"}   >
     
      
//     </div>
//             </p>
//           </li>
//           <li class="nav-item">
//             <p onMouseOver={()=>toggleTab(2)}class={toggle===2?"nav-link active butt tabs active-tabs":" nav-link active butt tabs"} href="#" style={{fontSize: "20"}} onMouseLeave={hideContent}>About</p>
//           </li>
//           <li class="nav-item">
//             <p onMouseOver={()=>toggleTab(3)}class={toggle===3?"nav-link active butt tabs active-tabs":" nav-link active butt tabs"}style={{fontSize: "20"}} onMouseLeave={hideContent}>Favourites</p>
//           </li>
//           <li class="nav-item">
//             <a class="nav-link butt " style={{fontSize: "20"}} >All Products</a>
//           </li>
//         </ul>
//         <a class="navbar-brand" href="#" style={{fontSize: 30,marginLeft: 600,position:"fixed"}}>AN Ode</a>
//         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
//           <span class="navbar-toggler-icon"></span>
//         </button>
//         <SearchBar/>
// <div className="content-tabs" style={{display: visible ? "block" : "none"}}>
//     <div className={toggle === 1 ? "content active-content" : "content"}>
//       <h2>Content1</h2>
//       <hr />
//       <p>
//         The front-end application team is responsible for building all things client side. We split ourselves
//         across the business working in mixed discipline delivery squads. These squads work with the rest of the
//         business to help shape their product roadmaps.
//       </p>
//     </div>
//     <div className={toggle === 2 ? "content active-content" : "content"}>
//       <h2>Content2</h2>
//       <hr />
//       <p>
//         tab 2 content all things client side. We split ourselves
//         across the business working in mixed discipline delivery squads. These squads work with the rest of the
//         business to help shape their product roadmaps.
//       </p>
//     </div>
//     <div className={toggle === 3 ? "content active-content" : "content"}>
//       <h2>Content3</h2>
//       <hr />
//       <p>
//         Everyone is welcome at M&S. No exceptions. It’s your background, abilities and differences that make you,
//         uniquely you. And when you’re part of M&S, that individuality has the potential to make waves.
//       </p>
//     </div>
//   </div> 
//       <div/>
        
//       </div>
      
//     </div>
//   </nav>
//   <Carousel/>
//   </div>
// }

// export default NavBar;



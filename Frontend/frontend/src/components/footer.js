import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Footer() {
  return <div style={{border:"2px solid red",width:"100%"}}>
  <footer class="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
    <div class="col mb-3">
      <a href="/" class="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none">
        <svg class="bi me-2" width="40" height="32"></svg>
      </a>
      <p class="text-body-secondary">© 2024</p>
    </div>

    <div class="col mb-3">

    </div>

    <div class="col mb-3">
      <h5>Section</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Home</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Features</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Pricing</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">FAQs</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">About</a></li>
      </ul>
    </div>

    <div class="col mb-3">
      <h5>Section</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Home</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Features</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Pricing</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">FAQs</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">About</a></li>
      </ul>
    </div>

  
  </footer></div>
}

export default Footer;















































// import React from "react";


// import { useState } from "react";

// function Footer() {
//     const[toggle,setToggle]=useState(1);
//     const[visible,setVisible]=useState(false);
//     function toggleTab(index){
//         setToggle(index);
//     }
//     return (
//       <div class="container">
//         <div class="bloc-tabs">
//           <div onClick={() => { toggleTab(1); setVisible(true); }} class={toggle === 1 ? "tabs active-tabs" : "tabs"}>
//             Tab1
//           </div>
//           <div onClick={() => toggleTab(2)} class={toggle === 2 ? "tabs active-tabs" : "tabs"}>
//             Tab2
//           </div>
//           <div onClick={() => toggleTab(3)} class={toggle === 3 ? "tabs active-tabs" : "tabs"}>
//             Tab3
//           </div>
//         </div>
//         <div class="content-tabs" style={{
//   position: "absolute",
//   top: "50px",
//   left: visible ? "0" : "-300px", // Slide content from left when visible is true
//   transition: "left 0.5s ease", // Adjust transition duration and timing function
//   padding: "10px",
//   backgroundColor: "none",
//   width: "300px",
//   boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
//   zIndex: "1",
//   display: visible ? "block" : "none"
// }}>
//           <div class={toggle === 1 ? "content active-content" : "content"}>
//             <h2>Content1</h2>
//             <hr></hr>
//             <p>
//               The front-end application team is responsible for building all things client side. We split ourselves
//               across the business working in mixed discipline delivery squads. These squads work with the rest of the
//               business to help shape their product roadmaps.
//             </p>
//           </div>
//           <div class={toggle === 2 ? "content active-content" : "content"}>
//             <h2>Content2</h2>
//             <hr></hr>
//             <p>
//               The front-end application team is responsible for building all things client side. We split ourselves
//               across the business working in mixed discipline delivery squads. These squads work with the rest of the
//               business to help shape their product roadmaps.
//             </p>
//           </div>
//           <div class={toggle === 3 ? "content active-content" : "content"}>
//             <h2>Content3</h2>
//             <hr></hr>
//             <p>
//               Everyone is welcome at M&S. No exceptions. It’s your background, abilities and differences that make you,
//               uniquely you. And when you’re part of M&S, that individuality has the potential to make waves.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }
//   export default Footer;
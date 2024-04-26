import React from"react";
import NavBar from "../Navbar";
import Footer from "../footer";
import { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Aos from"aos";
import 'aos/dist/aos.css';

function About(props) {
  const[title,setTitle]=useState("Hello");
  const [color,setColor]=useState("red");

  const greet=["Hola", "Bonjour", "Ciao", "Hallo", "Ni hao", "Namaste", "Merhaba", "Konnichiwa", "Olá", "Здравствуйте"];
 const colors=['#F7C8E0', '#BFEAF5', '#BCCEF8', '#D0F5BE', '#FFCEFE', '#CEEDC7', '#FFCBCB', '#BFEAF5', '#BCCEF8', '#D0F5BE'];



 useEffect(()=>{
  Aos.init({duration:2000});
},[])


  useEffect(() => {
    const interval = setInterval(() => {
      updateTitle();
      updateColor();
    }, 500);
    return () => clearInterval(interval);
  }, []);
function updateTitle(){
  const min = 1;
  const max = 11;
  const randomInRange = Math.floor(Math.random() * (max - min + 1)) + min;
  setTitle(greet[randomInRange]);

}
function updateColor(){
  const min = 1;
  const max = 11;
  const randomInRange = Math.floor(Math.random() * (max - min + 1)) + min;
  setColor(colors[randomInRange]);

}
  return <div style={{width:500,marginLeft:50,marginTop:60}}>
    <NavBar/>

    <div class="cover image" style={{marginTop:100,border:"2px solid transparent"}}>
      <div style={{position:"absolute",width:"50%",left:0}}><img src="https://media-api.xogrp.com/images/05cc2fa6-8006-44f2-bd9a-ffbc4e30224d~rs_768.h-cr_111.0.1888.1333" style={{width:"100%",height:"50%"}} ></img></div>
     <div class="introdiv">
      <h1 class="headingtext"style={{color:"white"}}>Good to meet You! Lets greet each other </h1>
      <p class="introtext" style={{color:color}}> {title}</p>
      <p  class="introtext1">Fashionable Living  has no boundaries for us! An Ode follows the latest trends, seamlessly blending classic patterns with new and unique fashion finds. Explore our diverse collection and discover the perfect pieces to elevate your style, regardless of your personal preferences or fashion sensibilities.</p></div>
     <div style={{position:"absolute",width:"50%",left:"50%"}}> <img src="https://images.squarespace-cdn.com/content/v1/61dc2acb6586d071bd3bc4ea/1641998707754-0RFSEEVDEDZD8VXKQERT/IMG_7670.jpg" style={{width:"100%",height:"50%"}} ></img></div>
   
    </div>

    <div class="Middle" style={{marginTop:600,height:1000}}>

    <h2 class="middleheading"style={{color:color}}>An Ode</h2>
    <p class="middleIntro" style={{color:color}}  data-aos="fade-left">  <span style={{fontSize:30}}>"</span> An Ode is an French brand managed by LPP S.A. company – the biggest clothing manufacturer in Central and Eastern Europe. <span style={{fontSize:30}}>"</span> </p>
    <img class="middlePic" src="https://cloudfront-eu-central-1.images.arcpublishing.com/businessoffashion/WZ4MPJS6TNEKPAYY7Y6XYE3KLQ.jpg" style={{boxShadow: "5px 5px 5px 5px gray"}} data-aos="fade-left"></img>
    <img class="midpic" src="https://www.gauriandnainika.com/cdn/shop/files/desktop_banner_2_1.jpg?v=1700479348&width=1920" style={{boxShadow: "5px 5px 5px 5px gray"}} data-aos="fade-right" ></img>
    <p class="midlast" style={{color:color}} data-aos="fade-left"><span style={{fontSize:30}}>"</span> 25
YEARS OF EXPERIENCE IN THE FASHION INDUSTRY
101
OF SALES GROWTH IN THE LAST 5 YEARS <span style={{fontSize:30}}>"</span> </p>


    </div>

    <div class="collection" > 
    <h1 class="collectionheading" style={{color:color}}>Home And Living</h1>
<p class="collectionpara"data-aos="fade-right" > With our collections, we strive to meet our customers’ needs in a flash – that’s why we mix classic forms with original inspirations straight from the catwalks, as well as alternative deals from influencers.


   </p>
<img class= "collectionimage" src="https://asset2.cxnmarksandspencer.com/is/image/mands/0932_20231116_Home_Trends_Outfitting_Carousel_1200x1600px_Natural_Luxe?wid=1200&qlt=70&fmt=pjpeg" style={{boxShadow: "5px 5px 5px 5px gray"}}data-aos="fade-left" ></img>
    </div>



    <div class="collection" > 
    <h1 class="collectionheading">Denims</h1>
<p  class="collectionpara" data-aos="fade-left">  With our collections, we strive to meet our customers’ needs in a flash – that’s why we mix classic forms with original inspirations straight from the catwalks, as well as alternative deals from influencers.

</p>
<img  class= "collectionimage" src="https://media.fashionnetwork.com/m/a982/08b0/6d8a/93bf/ad2e/f201/55a9/31aa/76b3/557d/557d.jpg" style={{boxShadow: "5px 5px 5px 5px gray"}}data-aos="fade-left" ></img>
    </div>


    <div class="collection" style={{marginTop:100,width:"100%"}}> 
    <h1 class="collectionheading">Heels </h1>
<p class="collectionpara" data-aos="fade-left">With our collections, we strive to meet our customers’ needs in a flash – that’s why we mix classic forms with original inspirations straight from the catwalks, as well as alternative deals from influencers.

</p>
<img  class= "collectionimage" src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/e6e8f5703648.5600a8c3b7939.jpg" style={{boxShadow: "5px 5px 5px 5px gray"}}data-aos="fade-left" ></img>
    </div>
    
 


<div style={{marginTop:100}}><Footer/></div>
</div> 
}

export default About;
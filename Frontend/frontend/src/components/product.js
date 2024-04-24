import React from "react";
import {useState,useEffect}from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ImageZoom from "react-image-zooom";

function Product(props){

    const[fav,setfavorite]=useState({
      name:"",
      price:"",
      quantity:""

    });

    const[cart,setCart]=useState({
      name:"",
      price:"",
      quantity:""

    });
    const [location,setLocation]=useState("");
    const ukCities = [
      "Manchester",
      "Birmingham",
      "Glasgow",
      "Edinburgh",
      "Liverpool",
      "Bristol",
      "Leeds",
      "Sheffield",
      "Newcastle",
      "Cardiff",
      "Belfast",
      "Nottingham",
      "Leicester",
      "Southampton",
      "Oxford"
    ];

    useEffect(() => {
      // Generate a random location for each product
      const randomIndex = Math.floor(Math.random() * ukCities.length);
      setLocation(ukCities[randomIndex]);
    }, []);

    function handleFavorite(){
      if (props.value==="Add to Wish"){
        setfavorite({  name:props.name,
          price:props.price,
          quantity:props.quantity
    
        })
        props.OnfavAdd({  name:props.name,
          price:props.price,
          quantity:props.quantity
    
        })
      }else if(props.value==="remove"){
        props. OnDelete(props.id);
      }else if  (props.value==="Add to Cart"){
        setCart({  name:props.name,
          price:props.price,
          quantity:props.quantity
    
        })
        props.OnCartAdd({ 
           name:props.name,
          price:props.price,
          quantity:props.quantity
    
        })
      }
    

    }


    return <div style={{ marginTop: "20px",display:"inline-block",marginLeft:20  }}>
    
  <div class="row" style={{ marginTop: "20px",display:"inline-block",marginLeft:10 }} >
      <div class={`col-lg-4 ${props.onStyleOuter}`} id="check" >

     
{props.OnZoom ? (
   <div className={props.onStyleImage1}> 
  <ImageZoom
  className={props.onStyleImage1} style={{height:100}}
    src="https://www.gauriandnainika.com/cdn/shop/files/1.jpg?v=1700486342&width=1200"
  /></div>
) :  <img class={props.onStyleImage1} src="https://www.gauriandnainika.com/cdn/shop/files/1.jpg?v=1700486342&width=1200" />}

{props.OnZoom ? (
  <div className={props.onStyleImage2}> 
  <ImageZoom
    className={props.onStyleImage2}
    style={{ border: "2px solid red",height:100 }}
    src="https://www.gauriandnainika.com/cdn/shop/files/gaurinainika_lookbook2293copy.jpg?v=1700207881&width=1000"
  /></div>
) : <img class={props.onStyleImage2}  src="https://www.gauriandnainika.com/cdn/shop/files/gaurinainika_lookbook2293copy.jpg?v=1700207881&width=1000" />}
   
        
        {/* <img class={props.onStyleImage1} src="https://www.gauriandnainika.com/cdn/shop/files/1.jpg?v=1700486342&width=1200" />
        <img class={props.onStyleImage2}  src="https://www.gauriandnainika.com/cdn/shop/files/gaurinainika_lookbook2293copy.jpg?v=1700207881&width=1000" /> */}
        <p class="fw-normal">Clothing</p>
        <p >{props.name}</p>
        <p >{props.price}</p>
        {/* <p > quantity:{props.quantity}</p> */}
        <p><svg class="svg-icon" style={{height:20,width:20,color:"red"}} viewBox="0 0 20 20">
							<path d="M10,1.375c-3.17,0-5.75,2.548-5.75,5.682c0,6.685,5.259,11.276,5.483,11.469c0.152,0.132,0.382,0.132,0.534,0c0.224-0.193,5.481-4.784,5.483-11.469C15.75,3.923,13.171,1.375,10,1.375 M10,17.653c-1.064-1.024-4.929-5.127-4.929-10.596c0-2.68,2.212-4.861,4.929-4.861s4.929,2.181,4.929,4.861C14.927,12.518,11.063,16.627,10,17.653 M10,3.839c-1.815,0-3.286,1.47-3.286,3.286s1.47,3.286,3.286,3.286s3.286-1.47,3.286-3.286S11.815,3.839,10,3.839 M10,9.589c-1.359,0-2.464-1.105-2.464-2.464S8.641,4.661,10,4.661s2.464,1.105,2.464,2.464S11.359,9.589,10,9.589"></path>
						</svg> {location}</p>
   
        <Link  class=" nav-link butt tabs " to={props.LinkId} style={{width:50,height:30,position:"relative",bottom:-55}}>View</Link>
      </div>
    </div>
  <div class="card-body">
 
  <button onClick={()=>{props.OnEdit(props.id)}}type="button" class="nav-link butt tabs " style={{height:40}} >Edit</button>
  <button onClick={handleFavorite} type="button" class="nav-link butt tabs " style={{height:30,width:100,position:"relative",bottom:90,left:100}}>{props.value}</button>
  
  </div>
 
</div>



        

}

export default Product;




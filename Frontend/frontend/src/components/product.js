import React from "react";
import {useState}from "react";

function Product(props){

    const[fav,setfavorite]=useState({
      name:"",
      price:"",
      quantity:""

    });
    


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
      }
    

    }
    return <div style={{ marginTop: "20px",display:"inline-block" }}>
    
  <div class="row" style={{ marginTop: "20px",display:"inline-block",marginLeft:10 ,border:"2px solid black"}} >
      <div class={`col-lg-4 ${props.onStyleOuter}`} id="check" >
        <img class={props.onStyleImage1} src="https://www.gauriandnainika.com/cdn/shop/files/1.jpg?v=1700486342&width=1200" />
        <img class={props.onStyleImage2}  src="https://www.gauriandnainika.com/cdn/shop/files/gaurinainika_lookbook2293copy.jpg?v=1700207881&width=1000" />
        <h2 class="fw-normal">Clothing</h2>
        <p>{props.name}</p>
        <p>{props.price}</p>
        <p> quantity:{props.quantity}</p>
    {/* Provide Routes */}
        <p><a class="btn btn-secondary" href="#">{props.link}</a></p>
      </div>
    </div>
  <div class="card-body">
 
  <button onClick={()=>{props.OnEdit(props.id)}}type="button" class="btn btn-secondary " style={{height:40}} >Edit</button>
  <button onClick={handleFavorite} type="button" class="btn btn-secondary " style={{height:40}}>{props.value}</button>
  
  </div>
 
</div>



        

}

export default Product;




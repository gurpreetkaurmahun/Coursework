import React from"react";
import NavBar from "./Navbar";
import Footer from "./footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function About(props) {
  return <div style={{width:500,marginLeft:50,marginTop:60}}>
    <NavBar/>

    <div class="cover image" style={{marginTop:100,border:"2px solid blue"}}>
      <div style={{position:"absolute",width:"50%",left:0}}><img src="https://media-api.xogrp.com/images/05cc2fa6-8006-44f2-bd9a-ffbc4e30224d~rs_768.h-cr_111.0.1888.1333" style={{width:"100%",height:"50%"}} ></img></div>
     <div style={{position:"absolute",left:400,top:300,border:"1px solid red", zIndex: 1,width:500}}>"An Ode, where fashion meets poetry. Dive into a world of timeless elegance and contemporary allure. With An Ode, every garment becomes a poetic tribute to individuality, weaving together threads of luxury and creativity to adorn your journey through life's myriad moments."</div>
     <div style={{position:"absolute",width:"50%",left:"50%"}}> <img src="https://images.squarespace-cdn.com/content/v1/61dc2acb6586d071bd3bc4ea/1641998707754-0RFSEEVDEDZD8VXKQERT/IMG_7670.jpg" style={{width:"100%",height:"50%"}} ></img></div>
   
    </div>

    <div class="Middle" style={{border:"2px solid red",marginTop:600,width:"100%"}}>

    <h2 style={{textAlign:"center",display:"inline-block"}}>About us</h2>
    <p  style={{border:"1px solid blue"}}>Reserved is a Polish brand managed by LPP S.A. company – the biggest clothing manufacturer in Central and Eastern Europe.</p>
    <img src="https://cloudfront-eu-central-1.images.arcpublishing.com/businessoffashion/WZ4MPJS6TNEKPAYY7Y6XYE3KLQ.jpg" style={{width:700,display:"inline-block"}}></img>
    <img src="https://cloudfront-eu-central-1.images.arcpublishing.com/businessoffashion/WZ4MPJS6TNEKPAYY7Y6XYE3KLQ.jpg" style={{width:600,display:"inline-block",position:"relative",left:800,bottom:200}}></img>
    <div style={{border:"2px solid black"}}>25
YEARS OF EXPERIENCE IN THE FASHION INDUSTRY
101
OF SALES GROWTH IN THE LAST 5 YEARS</div>


    </div>

    <div class="collection" style={{border:"3px solid yellow",marginTop:20,width:"100%"}}> 
    <h1 style={{textAlign:"center",border:"1px solid purple",marginLeft:100}}>COLLECTIONS BY RESERVED
With our collections, we strive to meet our customers’ needs in a flash – that’s why we mix classic forms with original inspirations straight from the catwalks, as well as alternative deals from influencers.

</h1>
<img src="https://cloudfront-eu-central-1.images.arcpublishing.com/businessoffashion/WZ4MPJS6TNEKPAYY7Y6XYE3KLQ.jpg" style={{width:700,marginLeft:500}}></img>
    </div>
  {/* <form onSubmit={props.OnSubmit} >
<fieldset>
  <legend>Shoppizle</legend>
  <div class="row">
    
  </div>
  <h1>Registration Form</h1>
  <div>
 
   
    <label for="staticName" class="col-sm-2 col-form-label">Customer Name</label>
    <input onChange={props.OnChangeReg} name="CName"type="text" class="form-control" id="staticName" placeholder="Enter Name"value={props.Cname}  ></input>
    
  </div>
  <div>
 
   
    <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
    <input onChange={props.OnChangeReg} name="email"type="email" class="form-control" id="staticEmail" aria-describedby="emailHelp" placeholder="Enter email"  value={props.email}></input>
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div>
    <label for="exampleInputPassword1" class="form-label mt-4">Password</label>
    <input onChange={props.OnChangeReg} name="password"type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" autocomplete="off" value={props.password} ></input>
  </div>
  <div>
    <label for="exampleInputPassword2" class="form-label mt-4">Confirm Password</label>
    <input onChange={props.OnChangeReg} name="password"type="password" class="form-control" id="exampleInputPassword2" placeholder="ConfirmPassword" autocomplete="off" value={props.confirmPassword} ></input>
  </div>
 

 

 


  <button  type="submit"class="btn btn-primary" style={{marginTop:20}}>Create Account</button>
  
</fieldset>
</form> */}
<Footer/>
</div> 
}

export default About;
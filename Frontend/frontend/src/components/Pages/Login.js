import React from "react";
import { useState } from "react";
import axios from "axios";
import {API_BASE_URL} from "../../apiConfig";


function Login(props){

 

    return <div style={{width:500,marginLeft:100}}>
      <form onSubmit={props.OnSubmit}>
    <fieldset>
    
      <div class="row">
        
      </div>
      <div>
       
       
        <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
        <input onChange={props.OnChanged} name="email"type="email" class="form-control" id="staticEmail" aria-describedby="emailHelp" placeholder="Enter email" style={{  borderTop: "none", // Remove top border
    borderLeft: "none", // Remove left border
    borderRight: "none", // Remove right border
    borderBottom: "1px solid black"}} value={props.email} ></input>
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div>
        <label for="exampleInputPassword1" class="form-label mt-4">Password</label>
        <input onChange={props.OnChanged} name="password"type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" autocomplete="off" style={{  borderTop: "none", // Remove top border
    borderLeft: "none", // Remove left border
    borderRight: "none", // Remove right border
    borderBottom: "1px solid black"}} value={props.password}></input>
      </div>
      
     <button class="nav-link active butt tabs active-tabs " type="submit" style={{width:250,marginLeft:100,marginTop:20}}><p style={{marginTop:10}}>Sign In</p></button>
     <button class="nav-link active butt tabs  " style={{width:250,marginTop:50,marginLeft:100}}onClick={props.OnVerify} href=""> <p style={{marginTop:10}}>I forgot my password</p></button>
     {/* <button class="nav-link active butt tabs active-tabs " onClick={props.logout} type="submit" style={{marginTop:20}}>Logout</button> */}
    </fieldset>
  </form>
  
  </div> 
}

export default Login;





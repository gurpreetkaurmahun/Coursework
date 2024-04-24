import React from "react";
import axios from "axios";
import {API_BASE_URL} from "../apiConfig";

function Registration(props){
    return  <div  > <form onSubmit={props.OnSubmit}  >
<fieldset>

 

  <div>
 
   
    <label for="staticName" class="col-sm-2 col-form-label"  style={{width:500,marginLeft:50}} >Customer Name</label>
    <input onChange={props.OnChangeReg} name="Cname"type="text" class="form-control" id="staticName" placeholder="Enter Name"value={props.Cname} style={{width:500,marginLeft:50}}  ></input>
    
  </div>
  <div>
 
   
    <label for="staticEmail" class="col-sm-2 col-form-label"  style={{width:500,marginLeft:50}} >Email</label>
    <input onChange={props.OnChangeReg} name="email"type="email" class="form-control" id="staticEmail" aria-describedby="emailHelp" placeholder="Enter email"  style={{width:500,marginLeft:50}}   value={props.email}></input>
    <small id="emailHelp" class="form-text text-muted"  style={{width:500,marginLeft:50}} >We'll never share your email with anyone else.</small>
  </div>
  <div>
    <label for="exampleInputPassword1" class="form-label mt-4"  style={{width:500,marginLeft:50}} >Password</label>
    <input onChange={props.OnChangeReg} name="password"type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" autocomplete="off"  style={{width:500,marginLeft:50}} value={props.password} ></input>
  </div>
  <div>
    <label for="exampleInputPassword2" class="form-label mt-4"  style={{width:500,marginLeft:50}} >Confirm Password</label>
    <input onChange={props.OnChangeReg} name="password1"type="password" class="form-control" id="exampleInputPassword2" placeholder="ConfirmPassword"  style={{width:500,marginLeft:50}}   value={props.confirmPassword} ></input>
  </div>
 

 

 


  <button class="nav-link active butt tabs active-tabs " type="submit" style={{marginTop:20,marginLeft:250}}>Create Account</button>
  
</fieldset>
</form> </div> }
export default Registration;

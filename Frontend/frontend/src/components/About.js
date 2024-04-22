import React from"react";
import NavBar from "./Navbar";


function About(props) {
  return <div style={{width:500,marginLeft:50,marginTop:60}}>
    <NavBar/>
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

</div> 
}

export default About;
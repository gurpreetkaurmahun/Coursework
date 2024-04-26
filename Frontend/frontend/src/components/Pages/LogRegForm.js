import React from "react";
import Login from"./Login";
import Registration from "./Registration";
import NavBar from "../Navbar";
import Footer from "../footer";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import {API_BASE_URL} from "../../apiConfig";

function LogRegForm(props){


  const[login,setLogin]=useState({
    userId:"",
    email:"",
    password:"",
    token:""
  })
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const [register,setRegister]=useState({
    id:"",
    Cname:"",
    email:"",
    password:"",
    confirmPassword:"",
    token:""

  });
  const[button,setButton]=useState(false);
  const[Reg,SetReg]=useState(false);

  const[visible,setVisible]=useState(true);
  useEffect(() => {
    // This useEffect will run whenever `isVisible` state changes
    if (isVisible) {
      console.log("isVisible changed:", isVisible);
    }
  }, [isVisible]); 
  function Openform(){
    setVisible(false);
    SetReg(false);
    setButton(true);
  }
  function openReg(){
    setVisible(false);
    setButton(false);
    SetReg(true);
  }

  useEffect(() => {
    // Load user data from session storage on component mount
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      setLogin(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    // Save user data to session storage whenever it changes
    sessionStorage.setItem("userData", JSON.stringify(login));
  }, [login]);
  function handleChange(event){
    const{name,value}=event.target;
    setLogin(prevlog=>{
      return {
        ...prevlog,
        [name]:value
      }
    })
    
  }

  async function handleLogout(){
    try{
      const postEmail={
        Email:login.email,
        Password:login.password
      };

      
      
      const logoutResponse = await axios.post(API_BASE_URL+'account/logout',postEmail.Email);
      if (logoutResponse.status === 200) {
        console.log("Logout successful");
      } else {
        console.error("Logout failed:", logoutResponse.data);
      }


    } catch{}
   
  }


   function registerUser(event){
    const{name,value}=event.target;
    setRegister(prevUser=>{
      return{
        ...prevUser,
        [name]:value
      }
    })
    
   }

   async function VerifyEmail(event) {
    event.preventDefault();
  
    try {
      const verifyData = {
        userId: login.userId,
        token: login.token
      };
      console.log("verifydata",verifyData);
      const response = await axios.get(API_BASE_URL + 'account/verify-email', {
        params: verifyData
      });
  
      if (response.status === 200) {
        console.log("User Verified!");
        // Redirect user to a success page or display a success message
      } else {
        console.error("Verification failed:", response.data);
        // Handle verification failure, display error message to user
      }
    } catch (error) {
      console.error("Verification error:", error);
      // Handle network or server error, display error message to user
      alert("Error verifying email. Please try again later.");
    }
  }

//    async function VerifyEmail(event){
//     event.preventDefault();
     
//     try{
//       const postEmail={
//         userId:login.userId,
//         token:login.token
//       };
      
//       const response = await axios.get(API_BASE_URL+'account/verify-email',postEmail);
     
//       // console.log("Response",response.data.token);
   
       
//        console.log("Response",response);
//         console.log("User Verified!");
    
//  }catch(error){

//       alert("User not Verified, try registering youraelf");
//       console.error(" Verification Error is:",error);
//     }
      
//    }



 async function handleSubmit(event) {
    event.preventDefault(); // Prevent form submission

 
    try{
      const postEmail={
        Email:login.email,
        Password:login.password
      };
      
      const response = await axios.post(API_BASE_URL+'account/login',postEmail);
     
     
      if (response.status === 200 && response.data.token) {
        await setIsVisible(true);
        
        login.token=response.data.token;

       console.log("Response",response.data.token);
        console.log("Welcome, user!",login);
        console.log(isVisible);
        navigate("/NewArrivals");

    
 }}catch(error){

      alert("Invalid Credentials");
      console.log("Error is: Invalid Credentials");
    }}

 
    async function handleRegSubmit(event) {
      event.preventDefault(); 
      if (register.Cname===null){
        alert("Name details required");
        return;
      }
      // if (register.password !== register.confirmPassword) {
      //   alert("Password and Confirm Password do not match");
      //   return;
      // }
   
      try{
        const custId = uuidv4();
        console.log("customer id ",custId)
        const postEmail={
          Email:register.email,
          Password:register.password
        };

        const customer={
          customerId:custId ,
          name: register.Cname,
          email: register.email
        }
        
    
    const [response, responseCustomer] = await Promise.all([
      axios.post(API_BASE_URL + 'account/register', postEmail),
      axios.post(API_BASE_URL + 'customer', customer)
    ]);

    console.log(response);
    console.log(responseCustomer);
        if(response.data.userId){
          setLogin(prevlogin=>({
            ...prevlogin,
            userId:response.data.userId
          }))
        }
       
 }catch(error){
  
        
        console.log("Error is: INVALID CREDENTISLS",error);
      }}

      
return<div >

<NavBar/>

<div class="logreg" style={{position:"absolute",width:"50%",height: 900,top:150}}>
<h2 style={{marginLeft:150,marginTop:40}}>Are You A user?</h2>
{button?<Login email={login.email} password={login.password}OnSubmit={handleSubmit} OnChanged={handleChange} logout={handleLogout} OnVerify={VerifyEmail}/>:null}

<button class="nav-link active butt tabs active-tabs " style={{ marginTop:20,width:200,marginLeft: 180, display: !visible ? 'none' : null }}onClick={Openform} >SignIn</button>




</div>

<div class="logreg1" style={{ left:710,position: "absolute",  width: "50%",height: 900,top:150,backgroundColor:"rgb(250, 228, 231)",marginBottom:100}}>
<h2 style={{marginLeft:150,marginTop:40}}>Is this your first Visit?</h2>
<button class="nav-link active butt tabs active-tabs " style={{ marginTop:20,width:200,marginLeft: 180, display: !visible ? 'none' : null }}onClick={openReg} >Create Account</button>

{Reg?<Registration OnSubmit={handleRegSubmit} OnChangeReg={registerUser}/>:null}
<p style={{marginLeft:200,marginTop:30}}>You'll Gain!</p>
<p style={{marginLeft:200}}><ion-icon name="newspaper-outline"></ion-icon>10% discount for newsletter sign up</p>
<p style={{marginLeft:200}}>Convenient way to track your order</p>
<p style={{marginLeft:200}}>Easy access to order history</p>




</div>
<Footer/>
</div>

}

export default LogRegForm;


import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function SearchBar(){

    return   <form class="d-flex" role="search" style={{position:"relative",top:60,right:250}}>
    <input class="form-control me-2" type="search" style={{width:200,right:150}}placeholder="Search" aria-label="Search"/>
    <button class="btn btn-outline-success" type="submit">Search</button>
  </form>
}

export default SearchBar;
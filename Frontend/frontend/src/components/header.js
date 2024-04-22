import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Header(){
    return (
        <div style={{position: "absolute", top: 0, left: 0, right: 0, zIndex: 1}}>
            <nav className="navbar navbar-expand-lg navbar-light header" style={{backgroundColor: "none"}}>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <a className="nav-link active butt" aria-current="page" href="#" style={{fontSize: "20px"}}>Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link butt" href="#" style={{fontSize: "20px"}}>About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link butt" style={{fontSize: "20px"}}>Favourites</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link butt" style={{fontSize: "20px"}}>All Products</a>
                            </li>
                        </ul>
                        <a className="navbar-brand" href="#" style={{fontSize: "30px", marginLeft: "600px", position: "fixed"}}>AN Ode</a>  <ul className="navbar-nav me-auto mb-2 mb-md-0">
                         
                            <li className="nav-item">
                                <a className="nav-link butt" href="#" style={{fontSize: "20px"}}>Favourites</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link butt" style={{fontSize: "20px"}}>Account</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link butt" style={{fontSize: "20px"}}>Cart</a>
                            </li>
                        </ul>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>

        </div>
    );
}

export default Header;


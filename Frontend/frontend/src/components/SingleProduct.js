import React, { useState, useEffect } from "react";
import NavBar from "./Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import {API_BASE_URL} from "../apiConfig";
import Product from "./product";
import Footer from "./footer";
import { TransformWrapper, TransformComponent,useControls } from "react-zoom-pan-pinch";
import ImageZoom from "react-image-zooom";


function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState();

  const zoom=true;
  const design={
    outer:"big-product",
    image1:"big-image1",
    image2:"big-image2"
  }


  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}Product/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    return (
      <>
        <button onClick={() => zoomIn()}>+</button>
        <button onClick={() => zoomOut()}>-</button>
        <button onClick={() => resetTransform()}></button>
      </>
    );
  };

  return (
    <div >
      <NavBar/>

      <div style={{marginTop:100,width:1000}}>

    
      {product && (
        <Product
          name={product.name}
          price={product.price}
          quantity={product.quantity}
          onStyleOuter={design.outer} 
          
        
          OnZoom={zoom}
          onStyleImage1={design.image1} 
          onStyleImage2={design.image2}
          value={"Add to Wish"}
          
        />
      )}

     

      </div>
    <Footer/>
    </div>
  );
}

export default SingleProduct;
{/* <TransformWrapper>
<Controls />
<TransformComponent>
</TransformComponent>
    </TransformWrapper> */}
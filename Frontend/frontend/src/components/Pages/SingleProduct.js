import React, { useState, useEffect } from "react";
import NavBar from "../Navbar";

import axios from "axios";
import {API_BASE_URL} from "../../apiConfig";
import Product from "../product";
import Footer from "../footer";
import images from "../../Data/Image";
import { useNavigate, useParams } from "react-router-dom";
import ImageZoom from "react-image-zooom";
import AllProducts from "../AllProducts";
import Map from "../Map";


function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState();
  const [products, setProducts] = useState();
  const[editProduct,setEditProduct]=useState(null);

  const show=true;

  const zoom=true;
  const design={
    outer:"big-product",
    image1:"big-image1",
    image2:"big-image2",
    image3:"big-image3",
    detail:"big-detail",
    link:"big-Link",
    cart:"big-Cart"

  }
  const design1={
    outer:"mini-product",
    image1:"mini-image1",
    image2:"mini-image2",
    image3:"mini-image3",
    detail:"mini-detail",
    link:"mini-Link",
    cart:"mini-Cart",
  

  }



  useEffect(() => {
    fetchProduct();
    Products();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}Product/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error); 
      navigate("/NewArrivals");

    }
  };

  const Products=async () =>{
    try {
        const response=await axios.get(`${API_BASE_URL}Product`);
        setProducts(response.data)
    }
    catch(error){
        console.error('error fetching Products',error);
    }
}
 console.log("products",product);
  function handleEdit(id) {
    const selected = products.find((product) => product.productId === id);
    console.log("selected", selected, id);
    // Update the editProduct state
    setEditProduct({ productId: selected.productId, name: selected.name, price: selected.price, quantity: selected.quantity,categoryId:selected.categoryId });
  }

  if (!id) {
    // If there's no ID parameter in the URL, redirect the user to /NewArrivals
    navigate("/NewArrivals");
  }

  const addToFavorites = (item) => {
    // Check if the item with the same id is already in the favouriteList
    const isDuplicate = fav.some((favItem) => favItem.name === item.name);

    // If it's not a duplicate, add the item to the favouriteList
    if (!isDuplicate) {
        
        setFav((prevFav) => [ item,...prevFav]);
        
    } else {
        alert("Item already in favourites!");
    }
};
  return (
    <div >
      <NavBar/>

      <div style={{marginTop:100,width:1000}}>
      <h1></h1>
      {product &&
    <Product
    
      id={product.productId}
      name={product.name}
      price={product.price}
      LinkId={`/product/${product.productId}`}
      quantity={product.quantity}
      image1={images[product.name].img1} // Using product name to select the image
      image2={images[product.name].img2}
      image3={images[product.name].img3}
      value={"+ Cart"}
      OnZoom={zoom}
      OnShow={show}
      // OnEdit={handleEdit}
      OnfavAdd={addToFavorites}
      onStyleOuter={design.outer}
      onStyleImage1={design.image1}
      onStyleImage2={design.image2}
      onStyleImage3={design.image3}
      onStyleDetail={design.detail}
      onStyleLink={design.link}
      onStyleCart={design.cart}
      OnStyleButton={design.button}
    />
  
}
{products && (
  <div class="likeproduct" >
    <h2 style={{marginleft:100}}> You May Also Like</h2>
    {products.slice(0, 6).map((product, index) => {
      const image = images[String.fromCharCode(65 + index % Object.keys(images).length)]; 
      return (
        <Product
          key={index}
          id={product.productId}
          name={product.name}
          price={product.price}
          LinkId={`/product/${product.productId}`}
          quantity={product.quantity}
          image1={image.img1}
          image2={image.img2}
          value={"+ Cart"}
          // OnCartAdd={addToCart}  
          // OnEdit={handleEdit}
          onStyleDetail={design1.detail}
          onStyleLink={design1.link}
          onStyleCart={design1.cart}
          OnfavAdd={addToFavorites}
          onStyleOuter={design1.outer}
          onStyleImage1={design1.image1}
          onStyleImage2={design1.image2}
        />
      );
    })}
  </div>
)}



      </div>
      <Map/>
      <div ><Footer/></div>
    </div>
  );
}

export default SingleProduct;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {API_BASE_URL} from "../apiConfig";
import Product from "./product";

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState();

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

  return (
    <div>
      {product && (
        <Product
          name={product.name}
          price={product.price}
          quantity={product.quantity}
          
          value={"Add to Wish"}
          
        />
      )}
    </div>
  );
}

export default SingleProduct;

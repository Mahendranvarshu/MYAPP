import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";

function Productcatelog() {
 const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from your API
    fetch("https://mahishop-app.onrender.com/Product/getAll")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
   
      <div>
        <ProductList products={products} />
      </div>
         
      
      
      
      
   
  );
}

export default Productcatelog;

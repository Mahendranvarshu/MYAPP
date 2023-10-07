
import React, { useState, useEffect } from 'react';


const ProductListview = ({ onClose }) => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from your Spring Boot API
    fetch('http://localhost:8080/Product/getAll') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); // Update the state with the fetched data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDeleteCustomer = (product_ID) => {
    // Make an HTTP request to delete the customer with the specified ID
    fetch(`http://localhost:8080/Product/delete/${product_ID}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Update the state by filtering out the deleted customer
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.product_ID !== product_ID)
        );
      })
      .catch((error) => {
        console.error('Error deleting customer:', error);
      });
  };


  return (
    <div className="popCL">
    <h2>Product List</h2>
    <div className="close-button2">
        <button onClick={onClose} className="btn btn-primary">
          Close
        </button>
      </div>
    <table className="table">
      <thead>
        <tr>
        <th>Product ID</th>
          <th>Product Name</th>
          <th>Brand Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Stack</th>
          <th>Warranty</th>
          <th>Offer End Date</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.product_ID}>
            <td>{product.product_ID}</td>
            <td>{product.product_name}</td>
            <td>{product.brand_name}</td>
            <td>${product.price}</td>
            <td>{product.category}</td>
            <td>{product.stack}</td>
            <td>{product.warenty || 'N/A'}</td>
            <td>{product.offerEnd_date || 'N/A'}</td>

            <td>
                <button
                  onClick={() => handleDeleteCustomer(product.product_ID)} // Pass the customer ID to the delete function
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
    
  );
};

export default ProductListview;

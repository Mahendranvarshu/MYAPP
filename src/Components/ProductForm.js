import {mobile} from "../responsive";
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";
function ProductForm({onClose}) {
  const [Product, setProduct] = useState({
    product_name: '',
    brand_name: '',
    price: '',
    category: '',
    stack: '',
    warranty: '',
    offer_end_date: '',
  });
  
  const Container = styled.div`
  ${mobile({ width: "75%" })}
background-color: #cde1f2; /* Set the background color */
border: 2px solid #c2e8f3; /* Set border thickness and color */
box-shadow: -2px 0 10px rgba(0, 0, 0, 0.6); /* Add shadow for depth */
transition: right 0.3s ease-in-out; /* Transition for smooth appearance */
flex: 1;
right:-700px;
  
width: 400px;

z-index: 999;

background-color: #f5fbfd;
position: relative;

`;
const TopButton = styled.button`
padding: 10px;
font-weight: 600;
cursor: pointer;
border: ${(props) => props.type === "filled" && "none"};
background-color: ${(props) =>
  props.type === "filled" ? "black" : "transparent"};
color: ${(props) => props.type === "filled" && "white"};
`;



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...Product,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:8080/Product/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Product),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Product created:', data);
        // Handle success, reset form, or navigate to a different page
        toast.success('Product created successfully!', {
          position: 'top-right',
          autoClose: 3000, // Close the message after 3 seconds
        });
        // Reset the form fields
        setProduct({
          product_name: '',
          brand_name: '',
          price: '',
          category: '',
          stack: '',
          warranty: '',
          offer_end_date: '',
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error, show an error message, etc.
      });
  };

  return (
    <Container>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h2 className='h22'>Add Product</h2>
          <TopButton onClick={onClose} >Back</TopButton>
          <form onSubmit={handleSubmit}>
          <div>
          <label className="form-label">Product Name:</label>
          <input
          className="form-control"
            type="text"
            name="product_name"
            value={Product.product_name}
            onChange={handleInputChange}
            
          />
        </div>
        <div>
          <label className="form-label">Brand Name: </label>
          <input
          className="form-control"
            type="text"
            name="brand_name"
            value={Product.brand_name}
            onChange={handleInputChange}
            
          />
        </div>
        <div>
          <label className="form-label">Price:</label>
          <input
          className="form-control"
            type="number"
            name="price"
            value={Product.price}
            onChange={handleInputChange}
           
          />
        </div>
        <div >
          <label className="form-label">Category:</label>
          <input
          className="form-control"
            type="text"
            name="category"
            value={Product.category}
            onChange={handleInputChange}
           
          />
        </div>
        <div>
          <label className="form-label">Stack:</label>
          <input
          className="form-control"
            type="number"
            name="stack"
            value={Product.stack}
            onChange={handleInputChange}
           
          />
        </div>
        <div>
          <label className="form-label">Warranty:</label>
          <input
          className="form-control"
            type="number"
            name="warranty"
            value={Product.warranty}
            onChange={handleInputChange}
          
          />
        </div>
        <div className='fill'>
          <label className="form-label">Offer End Date:</label>
          <input
          className="form-control"
            type="text"
            name="offer_end_date"
            value={Product.offer_end_date}
            onChange={handleInputChange}
          
          />
        </div>
            <div>
              <button type="submit" className="btn btn-primary">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </Container>
  );
}

export default ProductForm;

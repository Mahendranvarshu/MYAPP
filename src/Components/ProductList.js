  import React from 'react';
  import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
  } from "@material-ui/icons";
 

  import styled from "styled-components";

  function ProductList({ products }) {

    const Info = styled.div`
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(45deg, rgba(255, 87, 51, 0.7), rgba(0, 82, 212, 0.7));
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.5s ease;
      cursor: pointer;
    `;

    const Container = styled.div`
      flex: 1;
      margin: 5px;
      min-width: 180px;
      height: 350px;
      display: flex;
      align-items: center;
      
      justify-content: center;
      background-color: linear-gradient(45deg, #FF5733, #0052D4); /* Change the background color to white */
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2); /* Add box shadow for a card effect */
      position: relative;

      &:hover ${Info}{
        opacity: 1;
      }
    `;

    const Icon = styled.div`
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px;
      transition: all 0.5s ease;
      &:hover {
        background-color: #e9f5f5;
        transform: scale(1.1);
      }
    `;

   
  
       
  const handleIconClick = async (productid) => {
    try {
      const formData = {
        productid: productid, // Pass the productid from the parameter
      };

      const response = await fetch("https://mahishop-app.onrender.com/Order/addcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.status === 201) {
        alert('Product added to cart');
      } else {
        alert('Error adding the product to the cart');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
    
    return (
      <div className="container">
        <h1>Product List</h1>
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card" style={{boxShadow: '4px 7px 15px gold' }}>
                <Container>
                  <div className="card-body" 
                  style={{
                    backgroundImage: `url(data:image/png;base64,${product.image})`,
                    backgroundSize: '370px 370px', // ensure the entire image is visible
                    backgroundPosition: 'center', // center the image
                    backgroundRepeat: 'no-repeat', // prevent the image from repeating
                    width: '300px', // set a fixed width
                    height: '270px' // set a fixed height
                  }}>
                      <h5 className="card-title" style={{ color: 'white',  background: 'linear-gradient(45deg, #FF5733, #0052D4)', padding: '5px', borderRadius: '6px',boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.4)' , width: `${product.productName.length+2}ch`}}>{product.productName}</h5>
                    <h6 className="card-text"  style={{ color: 'black',  background: 'white', padding: '5px', borderRadius: '6px',boxShadow: '5px 5px 10px rgba(244, 53, 10, 0.7)' , width: `${product.brandName.length+2}ch`}}>  {product.brandName}</h6>
                    <h6 className="card-text" style={{ color: 'black',  background: 'white', padding: '5px', borderRadius: '8px', boxShadow: '5px 5px 10px rgba(0, 82, 212, 0.7)' ,width: `${6}ch`}}>${product.price}</h6>
                    <h6 className="card-text" style={{ color: 'black',  background: 'white', padding: '5px', borderRadius: '8px',boxShadow: '5px 5px 10px rgba(244, 53, 10, 0.7)' , width: `${9}ch`}}>Stock: {product.stock}</h6>
                    <h6 className="card-text" style={{ color: 'black',  background: 'white', padding: '5px', borderRadius: '8px',boxShadow: '5px 5px 10px rgba(0, 82, 212, 0.7)' , width: `${17}ch`}}>Warranty: {product.warranty} years</h6>
                    <h6 className="card-text" style={{ color: 'black',  background: 'white', padding: '5px', borderRadius: '8px', boxShadow: '5px 5px 10px rgba(244, 53, 10, 0.7)' ,width: `${25}ch`}}>Offer End Date: {product.offerEndDate }</h6>
                    <Info>
                      
                    <Icon onClick={() => handleIconClick(product.id)}>
                      <ShoppingCartOutlined />
                    </Icon>
                      <Icon>
                        <SearchOutlined />
                      </Icon>
                      <Icon>
                        <FavoriteBorderOutlined />
                      </Icon>
                    </Info>
                  </div>
                </Container>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  export default ProductList;

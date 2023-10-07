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
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(189, 188, 176);
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;




const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
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

 

  return (
    <div className="container">
      <h1>Product List</h1>
      <div className="row">
      
         {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.product_ID}>
            <div className="card" >
            
              
              <Container>
              <div className="card-body" >
         
                <h5 className="card-title">{product.product_name}</h5>
                <p className="card-text">Brand: {product.brand_name}</p>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">Category: {product.category}</p>
                <p className="card-text">Stock: {product.stack}</p>
                <p className="card-text">
                  Warranty: {product.warenty} years
                </p>
                <p className="card-text">
                  Offer End Date: {product.offerEnd_date || 'N/A'}
                </p>
                <Info>
        <Icon>
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

import styled from "styled-components";
import React, { useState, useEffect } from 'react';

import Login from "../pages/Login";
import Error from "../pages/Error";

import Newsletter from "../Components/Newsletter";
 // Import your background image
 import '../Components/TextMovingAnimation.css';


import { mobile } from "../responsive";
import Productcatelog from "../Components/Productcatelog";

const Container = styled.div`
background-color: #fcf5f5`;

const Title = styled.h1`
  margin: 20px;
  color: black;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;


const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {

  
  const [customer, setCustomer] = useState({
    name: "",
    lastname: "",
    phone_no: "",
    address: "",
    email: "",
    password: "",
  });

  const [showLogin, setShowLogin] = useState(false); // State to control the display of the Login component

  const [showError, setShowError] = useState(true);


  useEffect(() => {
 
    // Fetch data from your Spring Boot API
    fetch('http://localhost:8080/Customer/get') // Replace with your API endpoint
      .then((response) => {
        
        if (response.ok) {
          setShowError(false);
          return response.json();

          
        } else if (response.status === 404) {
          setShowLogin(true); // Set the state to show the Login component
          setShowError(false); // Set the state to hide the error component
          throw new Error('Not Found');
          
        } 
        
      })
      .then((data) => {
        setCustomer(data); // Update the state with the fetched data
      })
      .catch((error) => {
        
        
       
      });
    
     
    
  }, []);

  return (

    
      
    
   
    
    <Container >
        <div className="text-moving-animation">
      <p >Super Deal! Free Shipping on Orders Over $50</p>
    </div>
       {showLogin && <Login />}
       {showError && <Error />}
      
     
      <Title>Hi  {customer.name}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select>
            <Option disabled selected>
              Category
            </Option>
            <Option>Smarphone</Option>
            <Option>Labtop</Option>
            <Option>Taplet</Option>
            <Option>Smart watches</Option>
            <Option>earsBuds</Option>
            
          </Select>
          <Select>
            <Option disabled selected>
              Price
            </Option>
            <Option>primeum</Option>
            <Option>Pro</Option>
            <Option>Meadium</Option>
            <Option>Low</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select>
            <Option selected>Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Productcatelog />
      <Newsletter/>
     

    </Container>
  );
};

export default ProductList;
